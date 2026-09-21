from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import traceback
import logging
import os
from app.config import UPLOADS_DIR, SQLITE_DB_PATH
from app.database import init_db, get_db_connection
from app.routers import auth, content, upload, inquiries, posts, analytics

logger = logging.getLogger("defreitas.core")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database and default site contents
    try:
        init_db()
    except Exception as e:
        logger.error(f"Error during lifespan init_db: {e}")
    yield

app = FastAPI(
    title="DeFreitas & Associates System",
    description="Corporate Content Management & Service Architecture for DeFreitas & Associates",
    version="2.0.0",
    lifespan=lifespan
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    err_trace = traceback.format_exc()
    logger.error(f"Unhandled exception on {request.method} {request.url.path}: {err_trace}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server processing error",
            "message": str(exc),
            "type": type(exc).__name__,
            "path": request.url.path
        }
    )

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Uploads directory for public image access
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Include Routers
app.include_router(auth.router)
app.include_router(content.router)
app.include_router(upload.router)
app.include_router(inquiries.router)
app.include_router(posts.router)
app.include_router(analytics.router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "DeFreitas & Associates Core Service",
        "version": "2.0.0"
    }

@app.get("/api/debug-db", tags=["Health"])
def debug_db():
    info = {
        "db_path": str(SQLITE_DB_PATH),
        "db_exists": SQLITE_DB_PATH.exists(),
        "db_size": SQLITE_DB_PATH.stat().st_size if SQLITE_DB_PATH.exists() else 0,
        "db_writable": os.access(str(SQLITE_DB_PATH), os.W_OK) if SQLITE_DB_PATH.exists() else False,
        "parent_dir": str(SQLITE_DB_PATH.parent),
        "parent_writable": os.access(str(SQLITE_DB_PATH.parent), os.W_OK),
    }
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [r[0] for r in cursor.fetchall()]
        info["tables"] = tables
        for tbl in tables:
            cursor.execute(f"PRAGMA table_info({tbl})")
            info[f"columns_{tbl}"] = [r[1] for r in cursor.fetchall()]
            cursor.execute(f"SELECT COUNT(*) FROM {tbl}")
            info[f"count_{tbl}"] = cursor.fetchone()[0]
        conn.close()
        info["status"] = "ok"
    except Exception as e:
        info["status"] = "error"
        info["error"] = str(e)
        info["trace"] = traceback.format_exc()
    return info

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
