import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onOpenStrategy, siteMeta }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const phone = siteMeta?.phone || '647-722-5442';
  const rawLogo = siteMeta?.logo_url;
  const logo = (rawLogo && !rawLogo.includes('defreitas-consulting.ca/wp-content/uploads')) ? rawLogo : '/images/logo.png';

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <nav className="nav">
            <Link to="/" className="brand">
              <img 
                src={logo} 
                alt="DeFreitas & Associates Logo" 
                className="brand-logo-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/logo.png';
                }}
              />
            </Link>

            <ul className="nav-links">
              <li>
                <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className={['/services', '/sred', '/tax-advisory', '/accounting', '/financing', '/incorporation'].includes(location.pathname) ? 'active' : ''}
                >
                  Services &amp; Plans
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </Link>
                <div className="nav-dropdown">
                  <Link to="/services">
                    <b>All Services &amp; Pricing Packages</b>
                    <span className="desc">Overview of corporate plans and fees</span>
                  </Link>
                  <Link to="/tax-advisory">
                    <b>Tax Advisory, Preparation &amp; Filing</b>
                    <span className="desc">T1, T2, CRA audit defense, GST/HST</span>
                  </Link>
                  <Link to="/sred">
                    <b>SR&amp;ED Tax Credit Claims</b>
                    <span className="desc">Up to 64% refundable innovation grants</span>
                  </Link>
                  <Link to="/accounting">
                    <b>Accounting &amp; Bookkeeping</b>
                    <span className="desc">Notice to Reader, monthly cloud ledgers</span>
                  </Link>
                  <Link to="/financing">
                    <b>Business Financing Solutions</b>
                    <span className="desc">Lender proposals, cash flows, loan packages</span>
                  </Link>
                  <Link to="/incorporation">
                    <b>Incorporation &amp; Registration</b>
                    <span className="desc">Federal &amp; Ontario articles, minute books</span>
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link>
              </li>
              <li>
                <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>Tax Journal</Link>
              </li>
              <li>
                <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
              </li>
            </ul>

            <div className="nav-cta">
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="nav-phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {phone}
              </a>
              <button onClick={onOpenStrategy} className="btn btn-solid">
                Book Free Strategy Call
              </button>
            </div>

            <button 
              className="nav-toggle" 
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <span></span><span></span><span></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}></div>}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        <div style={{ marginTop: '1rem' }}>
          <img src={logo} alt="Logo" style={{ height: '38px' }} />
        </div>
        <ul className="mobile-links">
          <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
          <li>
            <Link to="/services" onClick={() => setMobileOpen(false)}>Services &amp; Pricing</Link>
            <div className="mobile-sublinks">
              <Link to="/tax-advisory" onClick={() => setMobileOpen(false)}>→ Tax Advisory &amp; Filing</Link>
              <Link to="/sred" onClick={() => setMobileOpen(false)}>→ SR&amp;ED Claims</Link>
              <Link to="/accounting" onClick={() => setMobileOpen(false)}>→ Accounting &amp; Bookkeeping</Link>
              <Link to="/financing" onClick={() => setMobileOpen(false)}>→ Business Financing</Link>
              <Link to="/incorporation" onClick={() => setMobileOpen(false)}>→ Incorporation</Link>
            </div>
          </li>
          <li><Link to="/about" onClick={() => setMobileOpen(false)}>About Us</Link></li>
          <li><Link to="/blog" onClick={() => setMobileOpen(false)}>Tax Journal</Link></li>
          <li><Link to="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link></li>
        </ul>
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => { setMobileOpen(false); onOpenStrategy(); }} 
            className="btn btn-solid" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Book Free Strategy Call
          </button>
        </div>
      </div>
    </>
  );
}
