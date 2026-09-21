import os
import shutil
import uuid
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.config import UPLOADS_DIR
from app.auth import get_current_admin
from app.database import get_uploaded_media

router = APIRouter(prefix="/api/upload", tags=["Upload"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".ico"}

@router.post("")
async def upload_image(
    file: UploadFile = File(...),
    admin: str = Depends(get_current_admin)
):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Generate clean, unique filename
    clean_stem = "".join(c for c in Path(file.filename).stem if c.isalnum() or c in ("-", "_"))[:30]
    unique_name = f"{clean_stem}_{uuid.uuid4().hex[:8]}{ext}"
    dest_path = UPLOADS_DIR / unique_name
    
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {
        "url": f"/uploads/{unique_name}",
        "filename": unique_name,
        "original_name": file.filename,
        "size": dest_path.stat().st_size
    }

@router.get("/list")
def list_uploads(admin: str = Depends(get_current_admin)):
    return get_uploaded_media()

@router.delete("/{filename}")
def delete_media(filename: str, admin: str = Depends(get_current_admin)):
    file_path = UPLOADS_DIR / filename
    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(status_code=404, detail="Media file not found")
    os.remove(file_path)
    return {"message": "File deleted successfully"}
