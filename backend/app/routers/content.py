from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from app.auth import get_current_admin
from app.database import (
    get_all_content,
    get_page_content,
    update_page_content,
    get_site_meta,
    update_site_meta
)

router = APIRouter(prefix="/api/content", tags=["Content"])

@router.get("/all")
def read_all_content():
    return get_all_content()

@router.get("/site-meta")
def read_site_meta():
    return get_site_meta()

@router.put("/site-meta")
def save_site_meta(meta: Dict[str, Any], admin: str = Depends(get_current_admin)):
    return update_site_meta(meta)

@router.get("/page/{page_id}")
def read_page(page_id: str):
    data = get_page_content(page_id)
    if data is None:
        raise HTTPException(status_code=404, detail=f"Page '{page_id}' not found")
    return data

@router.put("/page/{page_id}")
def save_page(page_id: str, new_data: Dict[str, Any], admin: str = Depends(get_current_admin)):
    return update_page_content(page_id, new_data)
