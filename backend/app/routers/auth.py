from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas import LoginRequest, TokenResponse, ChangePasswordRequest
from app.auth import verify_admin_password, hash_password, create_access_token, get_current_admin
from app.config import ADMIN_USERNAME

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest):
    if req.username != ADMIN_USERNAME or not verify_admin_password(req.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    token = create_access_token(data={"sub": req.username})
    return TokenResponse(access_token=token, username=req.username)

@router.get("/me")
def get_current_user(username: str = Depends(get_current_admin)):
    return {"username": username, "role": "admin"}

@router.post("/change-password")
def change_password(req: ChangePasswordRequest, username: str = Depends(get_current_admin)):
    if not verify_admin_password(req.current_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    if not req.new_password or len(req.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 6 characters long"
        )
    from app.database import set_admin_password_hash
    set_admin_password_hash(hash_password(req.new_password))
    return {"success": True, "message": "Admin password updated successfully"}

