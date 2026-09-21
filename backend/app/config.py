import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BASE_DIR.parent
UPLOADS_DIR = BASE_DIR / "uploads"
SQLITE_DB_PATH = ROOT_DIR / "database.db"

UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "defreitas_cpa_executive_secret_key_2026_x99")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "defreitas2026!")

# Brevo SMTP Email Configuration
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp-relay.brevo.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
SMTP_SECURE = os.environ.get("SMTP_SECURE", "tls")
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
SMTP_FROM = os.environ.get("SMTP_FROM", "info@defreitas-consulting.com")
SMTP_FROM_NAME = os.environ.get("SMTP_FROM_NAME", "Defreitas Consulting")
ADMIN_NOTIFICATION_EMAIL = os.environ.get("ADMIN_NOTIFICATION_EMAIL", "info@defreitas-consulting.com")
