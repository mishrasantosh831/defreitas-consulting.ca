import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function Financing({ onOpenStrategy }) {
  const [data, setData] = useState({
    title: "Business Financing Solutions",
    hero_title: "Business Financing Solutions",
    hero_subtitle: "Preparation of financial statement packages and direct introductions to qualified Canadian commercial lenders.",
    hero_banner: "/images/business-solution-banner.png",
    content_image: "/images/668.png",
    intro: "Our firm's extensive network of institutions enables us to not only introduce your company, but prepare a comprehensive financial package acceptable to chartered banks and financial institutions that will qualify each client for a desired loan or lease to grow and scale your enterprise.",
    services_list: [
      "Financial Statement Preparation – Notice to Reader & Compilation Engagements",
      "Multi-Year Financial Projections & Detailed Cash Flow Modeling",
      "Comprehensive Business Plan Preparation for Commercial Lenders",
      "Canada Small Business Financing Program (CSBFP) application packages",
      "Commercial Equipment Lease and Working Capital Financing Support",
      "Advisory on Capital Structure and Debt vs. Equity Optimization"
    ],
    hero_eyebrow: "Growth Capital Advisory",
    section_eyebrow: "Institutional Access",
    section_title: "Bank-Ready Commercial Financing Packages",
    section_list_title: "Our Financing Advisory Services Include:",
    card_title: "Preparing to Seek Commercial Capital?",
    card_text: "Lenders review business proposals critically. Ensure your projections and Notice to Reader statements present your corporate capability in the best light.",
    card_button_text: "Discuss Financing Requirements",
    cta_eyebrow: "Unlock Your Expansion Capital",
    cta_title: "Build lender confidence with CPA-certified financial models",
    cta_subtitle: "Let's prepare your business for commercial loans, equipment leases, or government backed financing.",
    cta_primary_btn: "Book Financing Strategy Call",
    cta_secondary_btn: "Contact Us"
  });

  useEffect(() => {
    fetchPageContent('financing')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Financing data:", err.message));
  }, []);

  return (
    <div>
      {/* ===== HERO WITH BACKGROUND BANNER ===== */}
      <section 
        className="service-banner-hero" 
        style={{ backgroundImage: `url(${data.hero_banner})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Business Financing</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Growth Capital Advisory"}</span>
            <h1>{data.hero_title}</h1>
            <p>{data.hero_subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              <span className="eyebrow">{data.section_eyebrow || "Institutional Access"}</span>
              <h2>{data.section_title || "Bank-Ready Commercial Financing Packages"}</h2>
              <p className="lead">{data.intro}</p>

              <h4 style={{ marginBottom: '1rem', color: 'var(--ink)' }}>{data.section_list_title || "Our Financing Advisory Services Include:"}</h4>
              <ul className="feature-list">
                {data.services_list.map((item, idx) => (
                  <li key={idx} style={{ alignItems: 'flex-start' }}>
                    <span className="ico" style={{ width: '30px', height: '30px', minWidth: '30px', marginTop: '3px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--ink)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img src={data.content_image} alt="Commercial Business Loan Packaging" />
              </div>
              <div style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
                <h3>{data.card_title || "Preparing to Seek Commercial Capital?"}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem' }}>
                  {data.card_text || "Lenders review business proposals critically. Ensure your projections and Notice to Reader statements present your corporate capability in the best light."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Discuss Financing Requirements"} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Unlock Your Expansion Capital"}</span>
          <h2>{data.cta_title || "Build lender confidence with CPA-certified financial models"}</h2>
          <p>{data.cta_subtitle || "Let's prepare your business for commercial loans, equipment leases, or government backed financing."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">{data.cta_primary_btn || "Book Financing Strategy Call"} <span className="arr">→</span></button>
            <Link to="/contact" className="btn btn-soft">{data.cta_secondary_btn || "Contact Us"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
