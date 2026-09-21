#!/usr/bin/env bash
# =============================================================================
# DeFreitas & Associates — Production Deployment Script
# Target OS   : Ubuntu 24.04 LTS
# Stack       : React.js (Vite) + Python FastAPI + Nginx + Systemd
# Domain      : site1.defreitas-consulting.ca
# =============================================================================

set -e

# --- Visual Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info()    { echo -e "${CYAN}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_err()     { echo -e "${RED}[ERROR]${NC} $1"; }

# --- Check Root Privileges ---
if [ "$EUID" -ne 0 ]; then
  log_err "Please run this script with sudo or as root."
  echo "Usage: sudo bash deploy.sh [--domain site1.defreitas-consulting.ca] [--skip-ssl]"
  exit 1
fi

# --- Automatically derive domain / base URL from root folder name ---
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_FOLDER_NAME="$(basename "${SCRIPT_DIR}")"

# Determine running deployment user (fallback to SUDO_USER if run via sudo)
DEPLOY_USER="${SUDO_USER:-$USER}"
if [ -z "$DEPLOY_USER" ]; then
  DEPLOY_USER="www-data"
fi

# Default Parameters derived directly from root folder
DOMAIN="${ROOT_FOLDER_NAME}"
INSTALL_DIR="/var/www/html/${ROOT_FOLDER_NAME}"
PORT=8000
SKIP_SSL=false

# Parse Flags (allows overriding if explicitly provided)
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --domain) DOMAIN="$2"; shift ;;
    --dir) INSTALL_DIR="$2"; shift ;;
    --port) PORT="$2"; shift ;;
    --skip-ssl) SKIP_SSL=true ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

echo -e "${CYAN}======================================================================${NC}"
echo -e "${GREEN}  DeFreitas & Associates — Ubuntu 24.04 Full-Stack Deployment${NC}"
echo -e "  Deploy User   : ${DEPLOY_USER} (Group: www-data)"
echo -e "  Root Folder   : ${ROOT_FOLDER_NAME}"
echo -e "  Virtual Host  : ${DOMAIN}"
echo -e "  Install Dir   : ${INSTALL_DIR}"
echo -e "  SQLite DB     : ${INSTALL_DIR}/database.db"
echo -e "  Backend Port  : 127.0.0.1:${PORT}"
echo -e "${CYAN}======================================================================${NC}"

# 1. Verify Prerequisites
log_info "Verifying system prerequisites..."
command -v python3 >/dev/null 2>&1 || { log_err "python3 is required but not found on PATH."; exit 1; }
command -v node >/dev/null 2>&1 || { log_err "node is required but not found on PATH."; exit 1; }
command -v nginx >/dev/null 2>&1 || { log_err "nginx is required but not found on PATH."; exit 1; }

# Ensure python3-venv and python3-pip are installed on Debian/Ubuntu
if ! dpkg -s python3-venv >/dev/null 2>&1 || ! dpkg -s python3-pip >/dev/null 2>&1; then
  log_info "Installing python3-venv and python3-pip packages via apt..."
  apt-get update -y && apt-get install -y python3-venv python3-pip
fi

log_success "Prerequisites confirmed: Python $(python3 --version 2>&1 | awk '{print $2}'), Node $(node -v), Nginx."

# 2. Setup Project Files in Target Directory
log_info "Synchronizing application files to ${INSTALL_DIR}..."
mkdir -p "${INSTALL_DIR}"

if [ "${SCRIPT_DIR}" != "${INSTALL_DIR}" ]; then
  # Copy frontend, backend directories, and root SQLite database
  mkdir -p "${INSTALL_DIR}/frontend" "${INSTALL_DIR}/backend"
  cp -r "${SCRIPT_DIR}/backend/"* "${INSTALL_DIR}/backend/"
  # Remove any venv directory copied from Windows / local machine
  if [ -d "${INSTALL_DIR}/backend/venv/Scripts" ] || [ ! -x "${INSTALL_DIR}/backend/venv/bin/python3" ]; then
    rm -rf "${INSTALL_DIR}/backend/venv"
  fi
  cp -r "${SCRIPT_DIR}/frontend/"* "${INSTALL_DIR}/frontend/"
  if [ -f "${SCRIPT_DIR}/database.db" ]; then
    cp "${SCRIPT_DIR}/database.db" "${INSTALL_DIR}/database.db"
    log_info "Synchronized SQLite database.db to root of ${INSTALL_DIR}."
  fi
else
  log_info "Running directly in target directory (${INSTALL_DIR}). Keeping existing files intact."
fi

# Create required runtime directories
mkdir -p "${INSTALL_DIR}/backend/uploads"

# 3. Setup Python Backend & Virtual Environment
log_info "Configuring Python virtual environment in ${INSTALL_DIR}/backend/venv..."
cd "${INSTALL_DIR}/backend"

# If venv is from Windows or incomplete, remove it completely
if [ -d "venv" ]; then
  if [ -d "venv/Scripts" ] || [ ! -x "venv/bin/python3" ] || [ ! -f "venv/bin/pip" ]; then
    log_warn "Existing venv is platform-mismatched or incomplete. Recreating clean Linux venv..."
    rm -rf venv
  fi
fi

# Create fresh venv using system python3
if [ ! -d "venv" ]; then
  log_info "Creating native Linux Python virtual environment..."
  python3 -m venv venv || {
    apt-get update -y && apt-get install -y python3-venv python3-pip
    python3 -m venv venv
  }
fi

# Ensure pip is present inside venv
if [ ! -f "venv/bin/pip" ]; then
  log_info "Bootstrapping pip inside venv via get-pip.py..."
  curl -fsSL https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py
  "${INSTALL_DIR}/backend/venv/bin/python3" /tmp/get-pip.py --no-warn-script-location
  rm -f /tmp/get-pip.py
fi

# Install dependencies and uvicorn
"${INSTALL_DIR}/backend/venv/bin/python3" -m pip install --upgrade pip setuptools wheel
"${INSTALL_DIR}/backend/venv/bin/python3" -m pip install -r requirements.txt
"${INSTALL_DIR}/backend/venv/bin/python3" -m pip install "uvicorn[standard]"

# Verify uvicorn is available
"${INSTALL_DIR}/backend/venv/bin/python3" -c "import uvicorn; print('✓ Uvicorn installed at:', uvicorn.__file__)"
log_success "FastAPI backend packages and uvicorn verified successfully."

# 4. Build Frontend Production Bundle
log_info "Installing npm packages and building React production bundle in ${INSTALL_DIR}/frontend..."
cd "${INSTALL_DIR}/frontend"

# Grant execute permissions to node_modules binaries (resolves Windows zip/copy permission issues)
if [ -d "node_modules" ]; then
  chmod -R +x node_modules/.bin 2>/dev/null || true
  find node_modules -type f -name "esbuild" -exec chmod +x {} + 2>/dev/null || true
  find node_modules -path "*/bin/*" -type f -exec chmod +x {} + 2>/dev/null || true
fi

npm install

# Ensure esbuild and all toolchain binaries have execute permissions
if [ -d "node_modules" ]; then
  chmod -R +x node_modules/.bin 2>/dev/null || true
  find node_modules -type f -name "esbuild" -exec chmod +x {} + 2>/dev/null || true
  find node_modules -path "*/bin/*" -type f -exec chmod +x {} + 2>/dev/null || true
fi

# Run build; fallback to direct node invocation if shell execution is blocked
npm run build || node ./node_modules/vite/bin/vite.js build

if [ ! -d "${INSTALL_DIR}/frontend/dist" ]; then
  log_err "Frontend build failed! dist/ directory not found."
  exit 1
fi
log_success "React production bundle compiled in ${INSTALL_DIR}/frontend/dist."

# 5. Apply File Permissions & Least-Privilege Security Hardening
log_info "Applying least-privilege file ownership (${DEPLOY_USER}:www-data) & permissions..."

# Base ownership: deploy user owns code & files; web group www-data has read access
chown -R "${DEPLOY_USER}:www-data" "${INSTALL_DIR}"

# Directory permissions: 755 (owner rwx, group/others rx - www-data cannot modify code structure)
find "${INSTALL_DIR}" -type d -exec chmod 755 {} +

# File permissions: 644 (owner rw, group/others r - www-data cannot modify code files)
find "${INSTALL_DIR}" -type f -exec chmod 644 {} +

# Virtual environment binaries: 755 (must be executable by www-data)
if [ -d "${INSTALL_DIR}/backend/venv/bin" ]; then
  find "${INSTALL_DIR}/backend/venv/bin" -type f -exec chmod 755 {} +
fi

# Deploy script: restricted to deploy user (web worker cannot read or execute)
if [ -f "${INSTALL_DIR}/deploy.sh" ]; then
  chmod 750 "${INSTALL_DIR}/deploy.sh"
fi

# Runtime Writable Directory: uploads (only folder where uploaded media is written)
mkdir -p "${INSTALL_DIR}/backend/uploads"
chown -R "${DEPLOY_USER}:www-data" "${INSTALL_DIR}/backend/uploads"
chmod -R 775 "${INSTALL_DIR}/backend/uploads"
chmod g+s "${INSTALL_DIR}/backend/uploads" # newly created files inherit www-data group

# Runtime Writable Database: SQLite database & directory (required for WAL/SHM lock files)
chmod 775 "${INSTALL_DIR}"
chown "${DEPLOY_USER}:www-data" "${INSTALL_DIR}"

# Run schema initialization and migrations using virtualenv Python
log_info "Initializing database schema and running dynamic migrations..."
"${INSTALL_DIR}/backend/venv/bin/python3" -c "
import sys
sys.path.insert(0, '${INSTALL_DIR}/backend')
from app.database import init_db
init_db()
" || log_warn "Database initialization returned non-zero; continuing..."

# Ensure database file permissions allow read & write for www-data
if [ -f "${INSTALL_DIR}/database.db" ]; then
  chown -f "${DEPLOY_USER}:www-data" "${INSTALL_DIR}/database.db"* 2>/dev/null || true
  chmod -f 664 "${INSTALL_DIR}/database.db"* 2>/dev/null || true
fi

log_success "Least-privilege permissions applied (${DEPLOY_USER}:www-data). Writable in uploads and database."

# 6. Create Systemd Service for FastAPI
SERVICE_NAME="defreitas-$(echo "${DOMAIN}" | tr '.' '-' | tr '/' '-')"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
log_info "Configuring systemd service ${SERVICE_NAME} for FastAPI backend..."

cat <<EOF > "${SERVICE_FILE}"
[Unit]
Description=DeFreitas & Associates FastAPI Backend (${DOMAIN})
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=${INSTALL_DIR}/backend
Environment="PATH=${INSTALL_DIR}/backend/venv/bin"
ExecStart=${INSTALL_DIR}/backend/venv/bin/python3 -m uvicorn app.main:app --host 127.0.0.1 --port ${PORT} --workers 2
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

# Security Sandboxing & Least Privilege Isolation
NoNewPrivileges=true
ProtectSystem=full
ProtectHome=false
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "${SERVICE_NAME}.service"
systemctl restart "${SERVICE_NAME}.service"

# Verify backend service health
log_info "Verifying backend service response on 127.0.0.1:${PORT}/api/health..."
BACKEND_OK=false
for i in 1 2 3 4 5; do
  sleep 1
  if curl -s "http://127.0.0.1:${PORT}/api/health" | grep -q "healthy"; then
    BACKEND_OK=true
    break
  fi
done

if [ "$BACKEND_OK" = true ]; then
  log_success "${SERVICE_NAME} systemd service active and healthy on 127.0.0.1:${PORT}."
else
  log_warn "Backend did not respond on 127.0.0.1:${PORT}/api/health yet. Recent service logs:"
  journalctl -u "${SERVICE_NAME}.service" -n 20 --no-pager || true
fi

# 7. Configure Nginx Server Block
NGINX_AVAILABLE="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"

# Check if a valid SSL certificate is already installed for ${DOMAIN} or related domains
SSL_CERT=""
SSL_KEY=""
SSL_AVAILABLE=false

# 1. Check exact domain in Let's Encrypt
if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${DOMAIN}/privkey.pem" ]; then
  SSL_CERT="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
  SSL_KEY="/etc/letsencrypt/live/${DOMAIN}/privkey.pem"
fi

# 2. Check certbot numbered renewals (e.g. ${DOMAIN}-0001)
if [ -z "${SSL_CERT}" ]; then
  for cert_candidate in /etc/letsencrypt/live/${DOMAIN}-*/fullchain.pem; do
    if [ -f "${cert_candidate}" ]; then
      key_candidate="$(dirname "${cert_candidate}")/privkey.pem"
      if [ -f "${key_candidate}" ]; then
        SSL_CERT="${cert_candidate}"
        SSL_KEY="${key_candidate}"
        break
      fi
    fi
  done
fi

# 3. Check base domain if subdomain (e.g. site1.defreitas-consulting.ca -> defreitas-consulting.ca)
if [ -z "${SSL_CERT}" ]; then
  BASE_DOMAIN="${DOMAIN#*.}"
  if [ -n "${BASE_DOMAIN}" ] && [ "${BASE_DOMAIN}" != "${DOMAIN}" ]; then
    if [ -f "/etc/letsencrypt/live/${BASE_DOMAIN}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${BASE_DOMAIN}/privkey.pem" ]; then
      SSL_CERT="/etc/letsencrypt/live/${BASE_DOMAIN}/fullchain.pem"
      SSL_KEY="/etc/letsencrypt/live/${BASE_DOMAIN}/privkey.pem"
    fi
  fi
fi

# 4. Check known target domains (defreitas-consulting.ca or site1.defreitas-consulting.ca)
if [ -z "${SSL_CERT}" ]; then
  for candidate_domain in "defreitas-consulting.ca" "site1.defreitas-consulting.ca"; do
    if [ -f "/etc/letsencrypt/live/${candidate_domain}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${candidate_domain}/privkey.pem" ]; then
      SSL_CERT="/etc/letsencrypt/live/${candidate_domain}/fullchain.pem"
      SSL_KEY="/etc/letsencrypt/live/${candidate_domain}/privkey.pem"
      break
    fi
  done
fi

# 5. Check existing Nginx configuration if it already references an SSL certificate
if [ -z "${SSL_CERT}" ] && [ -f "${NGINX_AVAILABLE}" ]; then
  EXISTING_CERT=$(grep -E '^\s*ssl_certificate\s+' "${NGINX_AVAILABLE}" 2>/dev/null | head -n 1 | awk '{print $2}' | tr -d ';')
  EXISTING_KEY=$(grep -E '^\s*ssl_certificate_key\s+' "${NGINX_AVAILABLE}" 2>/dev/null | head -n 1 | awk '{print $2}' | tr -d ';')
  if [ -n "${EXISTING_CERT}" ] && [ -f "${EXISTING_CERT}" ] && [ -n "${EXISTING_KEY}" ] && [ -f "${EXISTING_KEY}" ]; then
    SSL_CERT="${EXISTING_CERT}"
    SSL_KEY="${EXISTING_KEY}"
  fi
fi

# 6. Check any other valid certificates in /etc/letsencrypt/live/
if [ -z "${SSL_CERT}" ] && [ -d "/etc/letsencrypt/live" ]; then
  for cert_candidate in /etc/letsencrypt/live/*/fullchain.pem; do
    if [ -f "${cert_candidate}" ]; then
      key_candidate="$(dirname "${cert_candidate}")/privkey.pem"
      if [ -f "${key_candidate}" ]; then
        if openssl x509 -checkend 0 -noout -in "${cert_candidate}" >/dev/null 2>&1; then
          SSL_CERT="${cert_candidate}"
          SSL_KEY="${key_candidate}"
          break
        fi
      fi
    fi
  done
fi

# 7. Check standard system SSL certificates in /etc/ssl/
if [ -z "${SSL_CERT}" ]; then
  for cert_candidate in "/etc/ssl/certs/${DOMAIN}.crt" "/etc/ssl/certs/${DOMAIN}.pem"; do
    if [ -f "${cert_candidate}" ]; then
      for key_candidate in "/etc/ssl/private/${DOMAIN}.key" "/etc/ssl/certs/${DOMAIN}.key"; do
        if [ -f "${key_candidate}" ]; then
          SSL_CERT="${cert_candidate}"
          SSL_KEY="${key_candidate}"
          break 2
        fi
      done
    fi
  done
fi

# Validate discovered certificate
if [ -n "${SSL_CERT}" ] && [ -f "${SSL_CERT}" ] && [ -n "${SSL_KEY}" ] && [ -f "${SSL_KEY}" ]; then
  if openssl x509 -checkend 0 -noout -in "${SSL_CERT}" >/dev/null 2>&1; then
    SSL_AVAILABLE=true
    log_success "Existing valid SSL certificate detected: ${SSL_CERT}"
  else
    log_warn "SSL certificate found at ${SSL_CERT} but is expired. Renewal needed."
  fi
else
  log_info "No existing SSL certificate found on system for ${DOMAIN}."
fi

SSL_CONFIG_INCLUDES=""
if [ -f "/etc/letsencrypt/options-ssl-nginx.conf" ]; then
  SSL_CONFIG_INCLUDES="${SSL_CONFIG_INCLUDES}
    include /etc/letsencrypt/options-ssl-nginx.conf;"
fi
if [ -f "/etc/letsencrypt/ssl-dhparams.pem" ]; then
  SSL_CONFIG_INCLUDES="${SSL_CONFIG_INCLUDES}
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;"
fi
if [ -z "${SSL_CONFIG_INCLUDES}" ]; then
  SSL_CONFIG_INCLUDES="
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';"
fi

log_info "Generating Nginx reverse proxy configuration for ${DOMAIN}..."

if [ "${SSL_AVAILABLE}" = true ]; then
  # Write Nginx configuration with HTTPS enabled and HTTP to HTTPS redirect
  cat <<EOF > "${NGINX_AVAILABLE}"
# =============================================================================
# Nginx Configuration for ${DOMAIN} (HTTPS Enabled)
# Frontend: React SPA static build
# Backend : FastAPI reverse proxy (port ${PORT})
# =============================================================================

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ${DOMAIN};

    ssl_certificate ${SSL_CERT};
    ssl_certificate_key ${SSL_KEY};
${SSL_CONFIG_INCLUDES}

    root ${INSTALL_DIR}/frontend/dist;
    index index.html;

    # Client upload size limit (allows up to 25MB image uploads)
    client_max_body_size 25M;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json image/svg+xml;

    # React Single Page Application Route
    location / {
        try_files \$uri \$uri/ /index.html =404;
    }

    # FastAPI API Reverse Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:${PORT}/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 90;
    }

    # Uploaded Media Static Serving (Script Execution Blocked)
    location /uploads/ {
        alias ${INSTALL_DIR}/backend/uploads/;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
        add_header X-Content-Type-Options "nosniff" always;

        # Block direct execution of any uploaded scripts
        location ~* \.(php|pl|py|jsp|asp|sh|cgi|exe|bat|cmd|phtml|phar)$ {
            deny all;
            return 404;
        }
    }

    # Cache Vite Assets
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff|woff2|ttf)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Deny direct HTTP access to sensitive files (.py, .db, .sqlite, .env, .sh, .log, etc.)
    location ~* \.(py|pyc|db|sqlite|sqlite3|env|sh|log|ini|conf|bak|backup)$ {
        deny all;
        return 404;
    }

    # Deny access to hidden files (.git, .env, etc.)
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log /var/log/nginx/${DOMAIN}.error.log;
}
EOF
else
  # Write initial HTTP configuration on port 80
  cat <<EOF > "${NGINX_AVAILABLE}"
# =============================================================================
# Nginx Configuration for ${DOMAIN} (HTTP Initial)
# Frontend: React SPA static build
# Backend : FastAPI reverse proxy (port ${PORT})
# =============================================================================

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    root ${INSTALL_DIR}/frontend/dist;
    index index.html;

    # Client upload size limit (allows up to 25MB image uploads)
    client_max_body_size 25M;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json image/svg+xml;

    # React Single Page Application Route
    location / {
        try_files \$uri \$uri/ /index.html =404;
    }

    # FastAPI API Reverse Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:${PORT}/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 90;
    }

    # Uploaded Media Static Serving (Script Execution Blocked)
    location /uploads/ {
        alias ${INSTALL_DIR}/backend/uploads/;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
        add_header X-Content-Type-Options "nosniff" always;

        # Block direct execution of any uploaded scripts
        location ~* \.(php|pl|py|jsp|asp|sh|cgi|exe|bat|cmd|phtml|phar)$ {
            deny all;
            return 404;
        }
    }

    # Cache Vite Assets
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff|woff2|ttf)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Deny direct HTTP access to sensitive files (.py, .db, .sqlite, .env, .sh, .log, etc.)
    location ~* \.(py|pyc|db|sqlite|sqlite3|env|sh|log|ini|conf|bak|backup)$ {
        deny all;
        return 404;
    }

    # Deny access to hidden files (.git, .env, etc.)
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log /var/log/nginx/${DOMAIN}.error.log;
}
EOF
fi

# Enable virtual host site
ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"

# Disable default Nginx site if present to prevent port 80 collisions
if [ -f /etc/nginx/sites-enabled/default ]; then
  rm -f /etc/nginx/sites-enabled/default
  log_info "Removed default Nginx site configuration."
fi

# Test Nginx syntax
nginx -t
systemctl reload nginx
log_success "Nginx virtual host active for ${DOMAIN}."

# 8. Firewall Configuration
if ufw status | grep -q "Status: active"; then
  log_info "Configuring UFW firewall for Nginx..."
  ufw allow 'Nginx Full'
fi

# 9. SSL Configuration
if [ "$SSL_AVAILABLE" = true ]; then
  log_success "SSL certificate is already active and valid (${SSL_CERT}). Skipping certificate generation."
elif [ "$SKIP_SSL" = false ]; then
  log_info "No valid SSL certificate found for ${DOMAIN}. Requesting Let's Encrypt certificate..."

  # Check for running or orphaned certbot processes and stale lock files
  if pgrep -f certbot >/dev/null 2>&1; then
    log_warn "Another Certbot process was detected. Clearing background process..."
    pkill -9 -f certbot 2>/dev/null || true
    sleep 2
  fi

  # Clear any stale lock files left by interrupted executions
  rm -f /var/lib/letsencrypt/.certbot.lock /etc/letsencrypt/.certbot.lock /var/log/letsencrypt/.certbot.lock /tmp/certbot*lock 2>/dev/null || true

  log_info "Generating initial SSL certificate from Let's Encrypt for ${DOMAIN}..."
  if certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos --register-unsafely-without-email --redirect; then
    log_success "SSL certificate successfully generated and configured with automatic HTTPS redirect!"
  else
    log_warn "Certbot auto-enrollment encountered an issue."
    echo -e "${YELLOW}To retry manually, execute:${NC}"
    echo -e "  sudo pkill -9 -f certbot"
    echo -e "  sudo rm -f /var/lib/letsencrypt/.certbot.lock /etc/letsencrypt/.certbot.lock"
    echo -e "  sudo certbot --nginx -d ${DOMAIN}"
  fi
else
  log_info "SSL generation skipped (--skip-ssl specified)."
fi

echo -e "${CYAN}======================================================================${NC}"
echo -e "${GREEN}  ✓ Deployment Complete!${NC}"
echo -e "  Website URL   : https://${DOMAIN} (or http://${DOMAIN})"
echo -e "  Admin Panel   : https://${DOMAIN}/admin"
echo -e "  API Health    : http://127.0.0.1:${PORT}/api/health"
echo -e "${CYAN}======================================================================${NC}"
