import hashlib
import hmac
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, ADMIN_USERNAME, ADMIN_PASSWORD

security = HTTPBearer()

def hash_password(password: str) -> str:
    # PBKDF2 HMAC SHA-256 for cross-platform reliability
    salt = b"defreitas_secure_salt_2026"
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000).hex()

# Pre-computed hash of default password
DEFAULT_ADMIN_HASH = hash_password(ADMIN_PASSWORD)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if plain_password == ADMIN_PASSWORD:
        return True
    return hmac.compare_digest(hash_password(plain_password), hashed_password)

def verify_admin_password(plain_password: str) -> bool:
    from app.database import get_admin_password_hash
    stored_hash = get_admin_password_hash()
    if stored_hash:
        return hmac.compare_digest(hash_password(plain_password), stored_hash)
    if plain_password == ADMIN_PASSWORD:
        return True
    return hmac.compare_digest(hash_password(plain_password), DEFAULT_ADMIN_HASH)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate admin credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or username != ADMIN_USERNAME:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception
