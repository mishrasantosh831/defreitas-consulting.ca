# DeFreitas & Associates — Executive Website & CMS Platform

Modern, full-stack decoupled architecture for **DeFreitas & Associates (Management Consultants, Business Advisors & Tax Accountants)**.

- **Frontend**: React.js 18 + Vite (SPA, React Router v6, responsive mobile drawer, strategy booking modal, modern high-converting design system).
- **Backend**: Python FastAPI (Uvicorn, REST API, SQLite database store, JWT authentication, contact leads inbox, media upload handler).
- **Database**: Pure SQLite database stored directly in the project root folder as `database.db`.
- **Admin Panel**: Full-featured CMS at `/admin` to edit page copy, headlines, bullet lists, services, pricing, manage draft & live articles with SEO, and view consultation inquiries.
- **Server Deployment**: Automated `deploy.sh` script for **Ubuntu 24.04 LTS** that automatically creates an Nginx virtual host whose base URL matches the project's root folder name.

---

## Folder Structure

```
site1.defreitas-consulting.ca/
├── database.db                  # Primary SQLite database (in root folder)
├── deploy.sh                    # Automated Ubuntu 24.04 Nginx virtual host deployment
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app & CORS configuration
│   │   ├── config.py            # SQLite path (root database.db), JWT, SMTP config
│   │   ├── auth.py              # JWT token generation & verify
│   │   ├── database.py          # SQLite3 database engine (site_meta, pages, posts, inquiries)
│   │   ├── seed_data.py         # Pre-seeded content from defreitas-consulting.ca
│   │   ├── schemas.py           # Pydantic validation schemas
│   │   └── routers/
│   │       ├── auth.py          # /api/auth/login, /api/auth/me
│   │       ├── content.py       # /api/content/page/{id}, /api/content/site-meta
│   │       ├── upload.py        # /api/upload
│   │       ├── inquiries.py     # /api/inquiries (leads & contact submissions)
│   │       ├── posts.py         # /api/posts (Tax Journal / Blog CRUD with Drafts)
│   │       └── analytics.py     # /api/analytics/stats (Real SEO audit & stats)
│   ├── uploads/                 # Public media storage
│   └── requirements.txt         # FastAPI, Uvicorn, python-multipart, jose, etc.
│
├── frontend/
│   ├── src/
│   │   ├── api.js               # Frontend API client
│   │   ├── styles/
│   │   │   └── index.css        # Complete executive design system & admin styles
│   │   ├── components/
│   │   │   ├── Header.jsx       # Nav with services dropdown & mobile drawer
│   │   │   ├── Footer.jsx       # NAP, service links, copyright, social
│   │   │   ├── StrategyModal.jsx# Consultation modal connected to backend
│   │   │   └── ProtectedRoute.jsx
│   │   └── pages/
│   │       ├── Home.jsx         # Executive home with stat counters & quotes
│   │       ├── Services.jsx     # Filterable catalog & monthly pricing plans
│   │       ├── SredClaims.jsx   # Full authentic SR&ED tax incentives page
│   │       ├── TaxAdvisory.jsx  # Tax Advisory, Preparation & Filing
│   │       ├── Accounting.jsx   # Accounting & Bookkeeping (Notice to Reader)
│   │       ├── Financing.jsx    # Business Financing Solutions
│   │       ├── Incorporation.jsx# Incorporation & Registration
│   │       ├── AboutUs.jsx      # About Us & Why Choose Us
│   │       ├── Blog.jsx         # Tax Journal articles & reader modal
│   │       ├── Contact.jsx      # Working contact form & Google Maps embed
│   │       └── admin/
│   │           ├── AdminLogin.jsx      # Admin login form
│   │           └── AdminDashboard.jsx  # CMS (Pages, Media, Inquiries, Blog, Meta)
│   ├── dist/                    # Compiled production build
│   └── vite.config.js           # Vite dev server & API proxy
│
└── deploy.sh                    # Automated Ubuntu 24.04 Nginx deployment script
```

---

## Running Locally

### 1. Start the FastAPI Backend
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API runs on `http://127.0.0.1:8000`. Swagger API docs available at `http://127.0.0.1:8000/docs`.

### 2. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000` with automated proxy to the FastAPI backend.

---

## Admin CMS Portal

- **URL**: `http://localhost:3000/admin` (or `https://site1.defreitas-consulting.ca/admin` in production)
- **Default Username**: `admin`
- **Default Password**: `defreitas2026!`

Features:
- **Pages Editor**: Live update headlines, subtext, image URLs, and service bullet points for Home, SR&ED, Tax Advisory, Accounting, Financing, Incorporation, About Us, and Contact Us.
- **Media & Image Manager**: Upload pictures, logos, and banners; copy their direct URLs with one click.
- **Inquiries Inbox**: Review incoming client leads submitted through the website forms.
- **Tax Journal Manager**: Add, edit, or remove news & tax planning articles.
- **Global Settings**: Update phone numbers, emails, addresses, and logos.

---

## Production Deployment on Ubuntu 24.04

To deploy on your Ubuntu 24.04 LTS server with Nginx and Node.js:

```bash
# Clone or transfer repository to server, then run:
sudo bash deploy.sh --domain site1.defreitas-consulting.ca
```

The script will automatically:
1. Verify system prerequisites (`nginx`, `python3`, `node`, `npm`, `venv`).
2. Build the React frontend with Vite into `frontend/dist`.
3. Configure and launch the `defreitas-backend.service` systemd service running FastAPI.
4. Set up Nginx reverse proxy routing `/` to the React SPA and `/api/` & `/uploads/` to FastAPI.
5. Apply security headers, Gzip compression, and caching.
6. Configure UFW firewall and offer Let's Encrypt SSL setup.
