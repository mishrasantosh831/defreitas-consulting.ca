import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function Accounting({ onOpenStrategy }) {
  const [data, setData] = useState({
    title: "Accounting and Bookkeeping",
    hero_title: "Accounting and Bookkeeping",
    hero_subtitle: "Accurate monthly accounting, cloud integration, and financial statements that empower commercial financing.",
    hero_banner: "/images/accounting-bookkeeping-banner.png",
    content_image: "/images/658.png",
    intro: "Regardless of the size of your business, our firm can provide a bookkeeping solution that fits the unique needs of your business and ultimately provides timely and useful information in the preparation of Notice to Reader / Compilation Engagement financial statements that are used to secure financing arrangements for sole proprietorships, partnerships and Canadian-Controlled Private Corporations (CCPCs) in Canada.",
    body: "Our firm's network is expansive and can be utilized to locate and manage the right bookkeeping professionals for your business who have the competence to handle any assignment and utilize cutting edge technological solutions and software (i.e. QuickBooks Online, Xero, FreshBooks) to achieve the desired results for our clients.",
    services_list: [
      "Comprehensive Full-Cycle Bookkeeping – setup, ledger cleanup, and ongoing consultation",
      "WSIB (Workplace Safety and Insurance Board) filing and monthly remittances",
      "Preparation of Notice to Reader / Compilation Engagement financial statements",
      "Monthly Bank and Credit Card Reconciliations",
      "Payroll Management, Source Deductions, and CRA remittances",
      "Quarterly and Annual Financial Performance Reviews"
    ],
    hero_eyebrow: "Financial Statement Preparation",
    section_eyebrow: "Cloud Precision",
    section_title: "Tailored Accounting For Canadian Businesses",
    section_list_title: "Our Continuous Ongoing Support:",
    card_title: "Get Your Books Up-To-Date",
    card_text: "Behind on filings or need a clean Notice to Reader package for your banker? Let our team streamline your bookkeeping today.",
    card_button_text: "Consult Our Bookkeeping Team",
    cta_eyebrow: "Zero Reconciliation Headaches",
    cta_title: "Automate your financial records with senior CPA oversight",
    cta_subtitle: "Gain absolute clarity over cash flows, profit margins, and monthly tax obligations.",
    cta_primary_btn: "Get Started Today",
    cta_secondary_btn: "View Monthly Plans"
  });

  useEffect(() => {
    fetchPageContent('accounting')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Accounting data:", err.message));
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
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Accounting &amp; Bookkeeping</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Financial Statement Preparation"}</span>
            <h1>{data.hero_title}</h1>
            <p>{data.hero_subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              <span className="eyebrow">{data.section_eyebrow || "Cloud Precision"}</span>
              <h2>{data.section_title || "Tailored Accounting For Canadian Businesses"}</h2>
              <p className="lead">{data.intro}</p>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '1.8rem' }}>{data.body}</p>

              <h4 style={{ marginBottom: '1rem', color: 'var(--ink)' }}>{data.section_list_title || "Our Continuous Ongoing Support:"}</h4>
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
                <img src={data.content_image} alt="Full cycle accounting" />
              </div>
              <div style={{ marginTop: '2rem', background: 'var(--paper-2)', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
                <h3>{data.card_title || "Get Your Books Up-To-Date"}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem' }}>
                  {data.card_text || "Behind on filings or need a clean Notice to Reader package for your banker? Let our team streamline your bookkeeping today."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Consult Our Bookkeeping Team"} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Zero Reconciliation Headaches"}</span>
          <h2>{data.cta_title || "Automate your financial records with senior CPA oversight"}</h2>
          <p>{data.cta_subtitle || "Gain absolute clarity over cash flows, profit margins, and monthly tax obligations."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">{data.cta_primary_btn || "Get Started Today"} <span className="arr">→</span></button>
            <Link to="/services" className="btn btn-soft">{data.cta_secondary_btn || "View Monthly Plans"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
