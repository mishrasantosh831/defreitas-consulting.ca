import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ siteMeta }) {
  const phone = siteMeta?.phone || '647-722-5442';
  const tollFree = siteMeta?.toll_free || '1-855-227-9136';
  const email = siteMeta?.email || 'info@defreitas-consulting.com';
  const address = siteMeta?.address || '255 Duncan Mill Road, Suite 409, Toronto, ON, M3B 3H9, Canada';
  const rawFooterLogo = siteMeta?.footer_logo_url;
  const footerLogo = (rawFooterLogo && !rawFooterLogo.includes('defreitas-consulting.ca/wp-content/uploads')) 
    ? rawFooterLogo 
    : '/images/footer_logo.png';

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1.2rem' }}>
              <img 
                src={footerLogo} 
                alt="DeFreitas & Associates Logo" 
                className="brand-footer-img" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/footer_logo.png';
                }}
              />
            </Link>
            <p>
              Management Consultants, Business Advisors and Tax Accountants providing trusted accounting, SR&amp;ED, and corporate tax advisory in the GTA and across Canada for over 30 years.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24h-4.5zM8.5 8.25h4.3v2.15h.06c.6-1.1 2.06-2.26 4.24-2.26 4.54 0 5.38 2.98 5.38 6.86V24h-4.5v-6.98c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.81-2.68 3.68V24H8.5z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h7l4.8 6.4zM16.7 20h1.7L7.4 3.8H5.6z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services &amp; Pricing</Link>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Tax Journal</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-col">
            <h4>Core Practices</h4>
            <Link to="/tax-advisory">Tax Advisory &amp; Filing</Link>
            <Link to="/sred">SR&amp;ED Tax Credits</Link>
            <Link to="/accounting">Accounting &amp; Bookkeeping</Link>
            <Link to="/financing">Business Financing</Link>
            <Link to="/incorporation">Incorporation &amp; Registration</Link>
          </div>

          <div className="footer-col">
            <h4>Toronto Head Office</h4>
            <address className="footer-nap">
              {address}<br />
              Direct Phone: <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>{phone}</a><br />
              Toll Free: <a href={`tel:${tollFree.replace(/[^0-9]/g, '')}`}>{tollFree}</a><br />
              Email: <a href={`mailto:${email}`}>{email}</a>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} DeFreitas &amp; Associates. All rights reserved.</span>
          <span>Member of the Canadian Tax Foundation · Registered EFILE Practice</span>
        </div>
      </div>
    </footer>
  );
}
