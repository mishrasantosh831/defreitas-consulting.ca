import sqlite3
import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from app.config import SQLITE_DB_PATH, UPLOADS_DIR
from app.seed_data import DEFAULT_SITE_DATA

import logging

logger = logging.getLogger("defreitas.database")

def get_db_connection():
    """Returns a SQLite connection with Row factory, WAL mode, and busy timeout."""
    conn = sqlite3.connect(str(SQLITE_DB_PATH), check_same_thread=False, timeout=15.0)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("PRAGMA journal_mode=WAL;")
    except Exception:
        pass
    return conn

def init_db():
    """Initializes the SQLite database schema, performs dynamic migrations, and seeds initial data."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # 1. Create Tables
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS site_meta (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS pages (
                page_id TEXT PRIMARY KEY,
                content TEXT NOT NULL
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT,
                tag TEXT,
                summary TEXT,
                content TEXT,
                date TEXT,
                image TEXT,
                slug TEXT,
                seo_title TEXT,
                seo_description TEXT,
                seo_keywords TEXT,
                canonical_url TEXT,
                status TEXT DEFAULT 'published',
                created_at TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS inquiries (
                id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                company_name TEXT,
                phone TEXT,
                email TEXT,
                service TEXT,
                message TEXT,
                created_at TEXT,
                status TEXT DEFAULT 'pending',
                acknowledged INTEGER DEFAULT 0,
                acknowledged_at TEXT
            )
        """)

        # Dynamic migration for inquiries table
        try:
            cursor.execute("PRAGMA table_info(inquiries)")
            inq_cols = [col[1] for col in cursor.fetchall()]
            if inq_cols:
                if "status" not in inq_cols:
                    cursor.execute("ALTER TABLE inquiries ADD COLUMN status TEXT DEFAULT 'pending'")
                if "acknowledged" not in inq_cols:
                    cursor.execute("ALTER TABLE inquiries ADD COLUMN acknowledged INTEGER DEFAULT 0")
                if "acknowledged_at" not in inq_cols:
                    cursor.execute("ALTER TABLE inquiries ADD COLUMN acknowledged_at TEXT")
        except Exception as e:
            logger.warning(f"Inquiries migration notice: {e}")

        # Dynamic migration for posts table (prevents 500 when columns were added)
        try:
            cursor.execute("PRAGMA table_info(posts)")
            post_cols = [col[1] for col in cursor.fetchall()]
            if post_cols:
                if "slug" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN slug TEXT")
                if "seo_title" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN seo_title TEXT")
                if "seo_description" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN seo_description TEXT")
                if "seo_keywords" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN seo_keywords TEXT")
                if "canonical_url" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN canonical_url TEXT")
                if "status" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'published'")
                if "created_at" not in post_cols:
                    cursor.execute("ALTER TABLE posts ADD COLUMN created_at TEXT")
        except Exception as e:
            logger.warning(f"Posts migration notice: {e}")

        conn.commit()

        # 2. Seed initial data if tables are empty
        # Seed site_meta
        cursor.execute("SELECT COUNT(*) FROM site_meta")
        if cursor.fetchone()[0] == 0:
            source_meta = DEFAULT_SITE_DATA.get("site_meta", {})
            for k, v in source_meta.items():
                cursor.execute("INSERT OR REPLACE INTO site_meta (key, value) VALUES (?, ?)", (k, str(v)))
            conn.commit()

        # Seed pages
        cursor.execute("SELECT COUNT(*) FROM pages")
        if cursor.fetchone()[0] == 0:
            source_pages = DEFAULT_SITE_DATA.get("pages", {})
            for page_id, page_data in source_pages.items():
                cursor.execute("INSERT OR REPLACE INTO pages (page_id, content) VALUES (?, ?)", (page_id, json.dumps(page_data, ensure_ascii=False)))
            conn.commit()

        # Non-destructive backfill for pages: ensure all pages in DEFAULT_SITE_DATA exist, and merge any new keys
        source_pages = DEFAULT_SITE_DATA.get("pages", {})
        for page_id, default_data in source_pages.items():
            cursor.execute("SELECT content FROM pages WHERE page_id = ?", (page_id,))
            row = cursor.fetchone()
            if not row:
                cursor.execute("INSERT INTO pages (page_id, content) VALUES (?, ?)", (page_id, json.dumps(default_data, ensure_ascii=False)))
            else:
                try:
                    current_data = json.loads(row["content"])
                    updated = False
                    for k, v in default_data.items():
                        if k not in current_data or current_data[k] is None or current_data[k] == "":
                            current_data[k] = v
                            updated = True
                    if updated:
                        cursor.execute("UPDATE pages SET content = ? WHERE page_id = ?", (json.dumps(current_data, ensure_ascii=False), page_id))
                except Exception as e:
                    logger.warning(f"Error merging page {page_id}: {e}")
        conn.commit()

        # Seed posts
        cursor.execute("SELECT COUNT(*) FROM posts")
        if cursor.fetchone()[0] == 0:
            source_posts = DEFAULT_SITE_DATA.get("posts", [])
            for p in source_posts:
                cursor.execute("""
                    INSERT OR REPLACE INTO posts (
                        id, title, category, tag, summary, content, date, image,
                        slug, seo_title, seo_description, seo_keywords, canonical_url, status, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    str(p.get("id", int(datetime.now().timestamp() * 1000))),
                    p.get("title", ""),
                    p.get("category", "Tax Strategy"),
                    p.get("tag", "Update"),
                    p.get("summary", ""),
                    p.get("content", ""),
                    p.get("date", datetime.now().strftime("%Y-%m-%d")),
                    p.get("image", ""),
                    p.get("slug", ""),
                    p.get("seo_title", ""),
                    p.get("seo_description", ""),
                    p.get("seo_keywords", ""),
                    p.get("canonical_url", ""),
                    p.get("status", "published"),
                    datetime.now(timezone.utc).isoformat()
                ))
            conn.commit()

        # Backfill missing slugs or SEO fields for existing posts
        try:
            import re
            cursor.execute("SELECT id, title, slug, seo_title, seo_description, seo_keywords FROM posts")
            existing_posts = cursor.fetchall()
            default_lookup = {str(p["id"]): p for p in DEFAULT_SITE_DATA.get("posts", [])}

            for row in existing_posts:
                pid = str(row["id"])
                title = row["title"] or ""
                curr_slug = row["slug"]
                curr_seo_title = row["seo_title"]
                curr_seo_desc = row["seo_description"]
                curr_seo_keys = row["seo_keywords"]

                updates = []
                params = []

                if not curr_slug or not curr_slug.strip():
                    fallback_slug = default_lookup.get(pid, {}).get("slug")
                    clean_slug = fallback_slug or re.sub(r'[^a-zA-Z0-9]+', '-', title).strip('-').lower() or f"article-{pid}"
                    updates.append("slug = ?")
                    params.append(clean_slug)

                if not curr_seo_title:
                    fallback_st = default_lookup.get(pid, {}).get("seo_title", title)
                    updates.append("seo_title = ?")
                    params.append(fallback_st)

                if not curr_seo_desc:
                    fallback_sd = default_lookup.get(pid, {}).get("seo_description", "")
                    updates.append("seo_description = ?")
                    params.append(fallback_sd)

                if not curr_seo_keys:
                    fallback_sk = default_lookup.get(pid, {}).get("seo_keywords", "Tax Advisory, DeFreitas CPAs, Canada")
                    updates.append("seo_keywords = ?")
                    params.append(fallback_sk)

                if updates:
                    params.append(pid)
                    cursor.execute(f"UPDATE posts SET {', '.join(updates)} WHERE id = ?", params)

            conn.commit()
        except Exception as e:
            logger.warning(f"Error backfilling post metadata: {e}")

        conn.close()
    except Exception as e:
        logger.error(f"init_db encountered error: {e}")

# Auto-initialize on module load
init_db()

# --- Site Meta ---
def get_site_meta() -> Dict[str, Any]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT key, value FROM site_meta")
        rows = cursor.fetchall()
        conn.close()
        res = {row["key"]: row["value"] for row in rows}
        if not res:
            return DEFAULT_SITE_DATA.get("site_meta", {})
        return res
    except Exception as e:
        logger.error(f"Error in get_site_meta: {e}")
        return DEFAULT_SITE_DATA.get("site_meta", {})

def update_site_meta(meta: Dict[str, Any]) -> Dict[str, Any]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        for k, v in meta.items():
            cursor.execute("INSERT OR REPLACE INTO site_meta (key, value) VALUES (?, ?)", (k, str(v) if v is not None else ""))
        conn.commit()
        conn.close()
    except Exception as e:
        logger.error(f"Error updating site_meta: {e}")
    return get_site_meta()

# --- Pages ---
def get_page_content(page_id: str) -> Optional[Dict[str, Any]]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT content FROM pages WHERE page_id = ?", (page_id,))
        row = cursor.fetchone()
        conn.close()
        if row and row["content"]:
            try:
                return json.loads(row["content"])
            except Exception:
                pass
    except Exception as e:
        logger.error(f"Error reading page '{page_id}': {e}")
    
    # Fallback to seed data
    return DEFAULT_SITE_DATA.get("pages", {}).get(page_id)

def update_page_content(page_id: str, new_data: Dict[str, Any]) -> Dict[str, Any]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        content_json = json.dumps(new_data, ensure_ascii=False)
        cursor.execute("INSERT OR REPLACE INTO pages (page_id, content) VALUES (?, ?)", (page_id, content_json))
        conn.commit()
        conn.close()
    except Exception as e:
        logger.error(f"Error updating page '{page_id}': {e}")
    return new_data

def get_all_content() -> Dict[str, Any]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Meta
        cursor.execute("SELECT key, value FROM site_meta")
        meta = {row["key"]: row["value"] for row in cursor.fetchall()}
        
        # Pages
        cursor.execute("SELECT page_id, content FROM pages")
        pages = {}
        for row in cursor.fetchall():
            try:
                pages[row["page_id"]] = json.loads(row["content"])
            except Exception:
                pages[row["page_id"]] = {}

        # Posts
        posts = get_all_posts()
        conn.close()

        # Merge with default seed data if anything is missing
        default_meta = DEFAULT_SITE_DATA.get("site_meta", {})
        default_pages = DEFAULT_SITE_DATA.get("pages", {})
        
        for k, v in default_meta.items():
            if k not in meta:
                meta[k] = v
        for p_id, p_data in default_pages.items():
            if p_id not in pages:
                pages[p_id] = p_data

        return {
            "site_meta": meta,
            "pages": pages,
            "posts": posts
        }
    except Exception as e:
        logger.error(f"Error in get_all_content: {e}")
        return DEFAULT_SITE_DATA

# --- Posts ---
def get_all_posts() -> List[Dict[str, Any]]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, category, tag, summary, content, date, image,
                   slug, seo_title, seo_description, seo_keywords, canonical_url, status, created_at
            FROM posts
            ORDER BY date DESC, id DESC
        """)
        rows = cursor.fetchall()
        conn.close()
        if rows:
            return [dict(row) for row in rows]
    except Exception as e:
        logger.error(f"Error in get_all_posts: {e}")
        # Try fallback query without newly added columns in case table is from old schema
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM posts")
            rows = cursor.fetchall()
            conn.close()
            if rows:
                return [dict(row) for row in rows]
        except Exception:
            pass

    return DEFAULT_SITE_DATA.get("posts", [])

def add_post(post: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_db_connection()
    cursor = conn.cursor()
    post_id = str(int(datetime.now().timestamp() * 1000))
    post["id"] = post_id
    created_at = datetime.now(timezone.utc).isoformat()
    post["created_at"] = created_at
    status = post.get("status") or "published"
    post["status"] = status

    cursor.execute("""
        INSERT INTO posts (
            id, title, category, tag, summary, content, date, image,
            slug, seo_title, seo_description, seo_keywords, canonical_url, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        post_id,
        post.get("title", ""),
        post.get("category", "Tax Strategy"),
        post.get("tag", "Update"),
        post.get("summary", ""),
        post.get("content", ""),
        post.get("date", datetime.now().strftime("%Y-%m-%d")),
        post.get("image", ""),
        post.get("slug", ""),
        post.get("seo_title", ""),
        post.get("seo_description", ""),
        post.get("seo_keywords", ""),
        post.get("canonical_url", ""),
        status,
        created_at
    ))
    conn.commit()
    conn.close()
    return post

def update_post(post_id: str, post_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM posts WHERE id = ?", (str(post_id),))
    if not cursor.fetchone():
        conn.close()
        return None

    # Update columns
    allowed_cols = [
        "title", "category", "tag", "summary", "content", "date",
        "image", "slug", "seo_title", "seo_description", "seo_keywords",
        "canonical_url", "status"
    ]
    set_clauses = []
    values = []
    for col in allowed_cols:
        if col in post_data and post_data[col] is not None:
            set_clauses.append(f"{col} = ?")
            values.append(post_data[col])

    if set_clauses:
        values.append(str(post_id))
        query = f"UPDATE posts SET {', '.join(set_clauses)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()

    # Fetch updated
    cursor.execute("SELECT * FROM posts WHERE id = ?", (str(post_id),))
    updated_row = cursor.fetchone()
    conn.close()
    return dict(updated_row) if updated_row else None

def delete_post(post_id: str) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM posts WHERE id = ?", (str(post_id),))
    affected = cursor.rowcount
    conn.commit()
    conn.close()
    return affected > 0

# --- Inquiries ---
def get_inquiries() -> List[Dict[str, Any]]:
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, full_name, company_name, phone, email, service, message, created_at,
                   COALESCE(status, 'pending') as status,
                   COALESCE(acknowledged, 0) as acknowledged,
                   acknowledged_at
            FROM inquiries
            ORDER BY created_at DESC, id DESC
        """)
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
    except Exception as e:
        logger.error(f"Error in get_inquiries: {e}")
        return []

def add_inquiry(inquiry: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_db_connection()
    cursor = conn.cursor()
    inq_id = str(int(datetime.now().timestamp() * 1000))
    created_at = datetime.now(timezone.utc).isoformat()
    inquiry["id"] = inq_id
    inquiry["created_at"] = created_at
    inquiry["status"] = "pending"
    inquiry["acknowledged"] = 0
    inquiry["acknowledged_at"] = None

    cursor.execute("""
        INSERT INTO inquiries (
            id, full_name, company_name, phone, email, service, message, created_at, status, acknowledged, acknowledged_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        inq_id,
        inquiry.get("full_name", ""),
        inquiry.get("company_name", ""),
        inquiry.get("phone", ""),
        inquiry.get("email", ""),
        inquiry.get("service", "General"),
        inquiry.get("message", ""),
        created_at,
        "pending",
        0,
        None
    ))
    conn.commit()
    conn.close()
    return inquiry

def toggle_inquiry_acknowledgement(inquiry_id: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, status, acknowledged FROM inquiries WHERE id = ?", (str(inquiry_id),))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None

    curr_ack = row["acknowledged"] or 0
    new_ack = 0 if curr_ack else 1
    new_status = "acknowledged" if new_ack else "pending"
    now_iso = datetime.now(timezone.utc).isoformat() if new_ack else None

    cursor.execute("""
        UPDATE inquiries
        SET acknowledged = ?, status = ?, acknowledged_at = ?
        WHERE id = ?
    """, (new_ack, new_status, now_iso, str(inquiry_id)))
    conn.commit()

    cursor.execute("""
        SELECT id, full_name, company_name, phone, email, service, message, created_at,
               status, acknowledged, acknowledged_at
        FROM inquiries WHERE id = ?
    """, (str(inquiry_id),))
    updated = cursor.fetchone()
    conn.close()
    return dict(updated) if updated else None

def delete_inquiry(inquiry_id: str) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM inquiries WHERE id = ?", (str(inquiry_id),))
    affected = cursor.rowcount
    conn.commit()
    conn.close()
    return affected > 0

# --- Media Files ---
def get_uploaded_media() -> List[Dict[str, Any]]:
    items = []
    if UPLOADS_DIR.exists():
        for file in sorted(UPLOADS_DIR.iterdir(), key=os.path.getmtime, reverse=True):
            if file.is_file():
                items.append({
                    "filename": file.name,
                    "url": f"/uploads/{file.name}",
                    "size": file.stat().st_size,
                    "modified": datetime.fromtimestamp(file.stat().st_mtime, timezone.utc).isoformat()
                })
    return items

# --- Admin Password Management ---
def get_admin_password_hash() -> Optional[str]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM site_meta WHERE key = 'admin_password_hash'")
    row = cursor.fetchone()
    conn.close()
    if row and row["value"]:
        return row["value"]
    return None

def set_admin_password_hash(new_hash: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT OR REPLACE INTO site_meta (key, value) VALUES ('admin_password_hash', ?)", (new_hash,))
    conn.commit()
    conn.close()

