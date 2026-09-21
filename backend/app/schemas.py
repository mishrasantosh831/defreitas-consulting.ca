from pydantic import BaseModel, EmailStr
from typing import Dict, Any, List, Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str

class InquiryCreate(BaseModel):
    full_name: str
    company_name: Optional[str] = ""
    phone: str
    email: str
    service: Optional[str] = "General"
    message: Optional[str] = ""

class PostCreate(BaseModel):
    title: str
    category: str
    tag: str
    summary: str
    content: str
    date: Optional[str] = None
    image: Optional[str] = ""
    # SEO & Search Engine Optimization Fields
    slug: Optional[str] = ""
    seo_title: Optional[str] = ""
    seo_description: Optional[str] = ""
    seo_keywords: Optional[str] = ""
    canonical_url: Optional[str] = ""
    # Publishing Status: 'published' or 'draft'
    status: Optional[str] = "published"

class PostUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    tag: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    image: Optional[str] = None
    # SEO & Search Engine Optimization Fields
    slug: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    canonical_url: Optional[str] = None
    # Publishing Status: 'published' or 'draft'
    status: Optional[str] = None
