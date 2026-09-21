from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List
from app.schemas import InquiryCreate
from app.auth import get_current_admin
from app.database import get_inquiries, add_inquiry, delete_inquiry, toggle_inquiry_acknowledgement
from app.email_service import send_inquiry_emails

router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])

@router.post("")
def create_inquiry(inquiry: InquiryCreate, background_tasks: BackgroundTasks):
    saved = add_inquiry(inquiry.dict())
    # Send Brevo SMTP emails to Admin and Client asynchronously in background
    background_tasks.add_task(send_inquiry_emails, inquiry.dict())
    return {
        "message": "Thank you! Your request has been received. Our senior CPA team will contact you within 24 business hours.", 
        "data": saved
    }

@router.get("")
def list_inquiries(admin: str = Depends(get_current_admin)):
    return get_inquiries()

@router.patch("/{inquiry_id}/acknowledge")
@router.post("/{inquiry_id}/acknowledge")
def acknowledge_inquiry(inquiry_id: str, admin: str = Depends(get_current_admin)):
    updated = toggle_inquiry_acknowledgement(inquiry_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return updated

@router.delete("/{inquiry_id}")
def remove_inquiry(inquiry_id: str, admin: str = Depends(get_current_admin)):
    success = delete_inquiry(inquiry_id)
    if not success:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Inquiry removed"}
