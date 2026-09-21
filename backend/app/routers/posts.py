from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from app.schemas import PostCreate, PostUpdate
from app.auth import get_current_admin
from app.database import get_all_posts, add_post, update_post, delete_post

router = APIRouter(prefix="/api/posts", tags=["Posts"])

from typing import List, Optional

@router.get("")
def list_posts(status: Optional[str] = None):
    posts = get_all_posts()
    if status:
        return [p for p in posts if p.get("status", "published") == status]
    return posts

@router.get("/{post_id}")
def get_post(post_id: str):
    posts = get_all_posts()
    query = str(post_id).strip().lower()
    for p in posts:
        if str(p.get("id")).strip().lower() == query or (p.get("slug") and str(p.get("slug")).strip().lower() == query):
            return p
    raise HTTPException(status_code=404, detail="Post not found")

import re

@router.post("")
def create_new_post(post: PostCreate, admin: str = Depends(get_current_admin)):
    data = post.dict()
    if not data.get("date"):
        data["date"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Auto-generate clean SEO slug if not provided
    if not data.get("slug"):
        slug_clean = re.sub(r'[^a-zA-Z0-9]+', '-', data.get("title", "")).strip('-').lower()
        data["slug"] = slug_clean or f"post-{int(datetime.now().timestamp())}"
        
    if not data.get("seo_title"):
        data["seo_title"] = data.get("title", "")
    if not data.get("seo_description"):
        data["seo_description"] = data.get("summary", "")[:160]
    if not data.get("seo_keywords"):
        data["seo_keywords"] = f"{data.get('category', '')}, {data.get('tag', '')}, DeFreitas & Associates, Canadian Tax"

    # Status: 'published' or 'draft'
    data["status"] = data.get("status") or "published"

    return add_post(data)

@router.put("/{post_id}")
def edit_post(post_id: str, post: PostUpdate, admin: str = Depends(get_current_admin)):
    # Filter out unset fields
    update_dict = {k: v for k, v in post.dict().items() if v is not None}
    # Fetch existing
    posts = get_all_posts()
    existing = None
    for p in posts:
        if str(p.get("id")) == str(post_id):
            existing = p
            break
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    existing.update(update_dict)
    updated = update_post(post_id, existing)
    return updated

@router.delete("/{post_id}")
def remove_post(post_id: str, admin: str = Depends(get_current_admin)):
    success = delete_post(post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}
