import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from app.config import (
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_FROM_NAME,
    ADMIN_NOTIFICATION_EMAIL
)

logger = logging.getLogger("email_service")

def send_smtp_email(to_email: str, to_name: str, subject: str, html_body: str) -> bool:
    """Helper to send a single HTML email via Brevo SMTP."""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{SMTP_FROM_NAME} <{SMTP_FROM}>"
    msg["To"] = f"{to_name} <{to_email}>" if to_name else to_email

    part = MIMEText(html_body, "html", "utf-8")
    msg.attach(part)

    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_FROM, [to_email], msg.as_string())
        server.quit()
        logger.info(f"Email sent successfully to {to_email} with subject: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email} via Brevo SMTP: {e}")
        return False

def send_inquiry_emails(inquiry: dict):
    """
    Triggers two emails on contact/strategy form submission:
    1. Admin Alert Email: Notifies the DeFreitas team of the new lead.
    2. Client Confirmation Email: Auto-responder thanking the client and confirming receipt.
    """
    client_name = inquiry.get("full_name", "Valued Client")
    client_email = inquiry.get("email", "")
    client_phone = inquiry.get("phone", "N/A")
    company_name = inquiry.get("company_name", "N/A")
    service = inquiry.get("service", "General Advisory")
    message = inquiry.get("message", "No additional notes provided.")
    timestamp = datetime.now().strftime("%B %d, %Y at %I:%M %p EST")

    # 1. ADMIN NOTIFICATION EMAIL
    admin_subject = f"New Consultation Lead: {client_name} ({service})"
    admin_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }}
        .header {{ background: #0c1f17; color: #ffffff; padding: 25px 30px; border-bottom: 4px solid #22c46e; }}
        .header h2 {{ margin: 0; font-size: 20px; color: #ffffff; }}
        .header p {{ margin: 5px 0 0; font-size: 13px; color: #94a3b8; }}
        .body {{ padding: 30px; }}
        .lead-badge {{ display: inline-block; background: #dcfce9; color: #15803d; padding: 4px 12px; border-radius: 50px; font-weight: 600; font-size: 12px; margin-bottom: 20px; }}
        .table {{ width: 100%; border-collapse: collapse; margin-bottom: 25px; }}
        .table td {{ padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }}
        .table td.label {{ width: 35%; font-weight: 600; color: #64748b; }}
        .table td.val {{ font-weight: 500; color: #0f172a; }}
        .msg-box {{ background: #f8fafc; border-left: 4px solid #22c46e; padding: 15px; border-radius: 0 8px 8px 0; margin-top: 15px; font-size: 14px; line-height: 1.6; color: #334155; }}
        .footer {{ background: #f8fafc; padding: 20px 30px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>DeFreitas &amp; Associates</h2>
          <p>New Client Consultation Request Received</p>
        </div>
        <div class="body">
          <span class="lead-badge">Service Focus: {service}</span>
          <table class="table">
            <tr><td class="label">Client Name:</td><td class="val">{client_name}</td></tr>
            <tr><td class="label">Company Name:</td><td class="val">{company_name}</td></tr>
            <tr><td class="label">Email Address:</td><td class="val"><a href="mailto:{client_email}">{client_email}</a></td></tr>
            <tr><td class="label">Phone Number:</td><td class="val"><a href="tel:{client_phone}">{client_phone}</a></td></tr>
            <tr><td class="label">Submitted At:</td><td class="val">{timestamp}</td></tr>
          </table>

          <div style="font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase;">Inquiry Details / Message:</div>
          <div class="msg-box">{message}</div>
        </div>
        <div class="footer">
          &copy; {datetime.now().year} DeFreitas &amp; Associates Executive Portal · 255 Duncan Mill Road, Suite 409, Toronto, ON
        </div>
      </div>
    </body>
    </html>
    """
    send_smtp_email(ADMIN_NOTIFICATION_EMAIL, "DeFreitas Team", admin_subject, admin_html)

    # 2. CLIENT AUTO-RESPONDER CONFIRMATION EMAIL
    if client_email:
        client_subject = "We Received Your Consultation Request — DeFreitas & Associates"
        client_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }}
            .header {{ background: #0c1f17; color: #ffffff; padding: 30px; text-align: center; border-bottom: 4px solid #22c46e; }}
            .header h1 {{ margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; }}
            .header p {{ margin: 8px 0 0; font-size: 14px; color: #86efb4; }}
            .body {{ padding: 35px 30px; line-height: 1.7; font-size: 15px; color: #334155; }}
            .card {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0; }}
            .card h4 {{ margin: 0 0 10px; font-size: 14px; color: #0c1f17; text-transform: uppercase; letter-spacing: .05em; }}
            .card p {{ margin: 5px 0; font-size: 14px; color: #475569; }}
            .btn {{ display: inline-block; background: #22c46e; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 14px; margin-top: 15px; }}
            .footer {{ background: #f8fafc; padding: 25px 30px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; line-height: 1.6; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>DeFreitas &amp; Associates</h1>
              <p>Executive Tax Accountants &amp; Management Consultants</p>
            </div>
            <div class="body">
              <p>Dear <strong>{client_name}</strong>,</p>
              <p>
                Thank you for contacting <strong>DeFreitas &amp; Associates</strong>. We have successfully received your consultation request regarding <strong>{service}</strong>.
              </p>
              <p>
                One of our senior Chartered Professional Accountants in Toronto will review your requirements and reach out to you within <strong>24 business hours</strong>.
              </p>

              <div class="card">
                <h4>Summary of Your Request:</h4>
                <p><strong>Primary Practice:</strong> {service}</p>
                <p><strong>Company:</strong> {company_name}</p>
                <p><strong>Contact Phone:</strong> {client_phone}</p>
                <p><strong>Submitted Date:</strong> {timestamp}</p>
              </div>

              <p>
                If your inquiry is time-sensitive (e.g., an impending CRA corporate filing deadline or urgent audit response), please feel free to call our Toronto office directly at <strong><a href="tel:6477225442" style="color: #16a358; text-decoration: none;">647-722-5442</a></strong> or toll-free at <strong>1-855-227-9136</strong>.
              </p>

              <p style="margin-top: 30px;">
                Warm regards,<br />
                <strong>Senior Management Team</strong><br />
                DeFreitas &amp; Associates CPAs
              </p>
            </div>
            <div class="footer">
              <strong>DeFreitas &amp; Associates</strong><br />
              255 Duncan Mill Road, Suite 409, Toronto, ON, M3B 3H9, Canada<br />
              Direct: (647) 722-5442 · Toll Free: 1-855-227-9136<br />
              Member of the Canadian Tax Foundation · Registered EFILE Practice
            </div>
          </div>
        </body>
        </html>
        """
        send_smtp_email(client_email, client_name, client_subject, client_html)
