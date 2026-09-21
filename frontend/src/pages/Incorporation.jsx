import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function Incorporation({ onOpenStrategy }) {
  const [data, setData] = useState({
    title: "Incorporation and Business Registration",
    hero_title: "Incorporation and Business Registration",
    hero_subtitle: "Setting up your enterprise for legal protection, tax deferral, and strategic shareholder growth.",
    hero_banner: "/images/icoopration-business-banner.png",
    content_image: "/images/668.png",
    intro: "We offer full incorporation and business registration services across Canada while advising on the various business structures available (incorporation vs. sole proprietorship or partnership), their benefits and trade-offs, and providing a clear course of action from a business, tax, and accounting standpoint.",
    services_list: [
      "Federal (Canada) & Provincial (Ontario) Incorporation",
      "Name Reservation (NUANS search) and Corporate Articles of Incorporation",
      "Digital Minute Book Setup, Corporate By-laws, and Shareholder Registers",
      "Shareholder Structure, Voting vs. Non-Voting shares, and Dividend Classes",
      "CRA Business Number (BN), Corporate Tax (RC), GST/HST (RT), and Payroll (RP) Registration",
      "Ongoing Corporate Annual Return filings and minute book maintenance"
    ],
    hero_eyebrow: "Enterprise Structuring",
    section_eyebrow: "Strategic Foundation",
    section_title: "Incorporate Right From Day One",
    section_list_title: "Our Full Incorporation Package Includes:",
    card_title: "Starting a New Venture?",
    card_text: "Structuring your corporation properly avoids substantial tax costs down the road. Speak with our incorporation specialists.",
    card_button_text: "Book Incorporation Consultation",
    cta_eyebrow: "Launch With Legal & Tax Confidence",
    cta_title: "Protect your personal assets and unlock small business tax deductions",
    cta_subtitle: "Get your corporate registration, minute book, and CRA tax accounts setup seamlessly.",
    cta_primary_btn: "Incorporate Today",
    cta_secondary_btn: "Explore All Services"
  });

  useEffect(() => {
    fetchPageContent('incorporation')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Incorporation data:", err.message));
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
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Incorporation</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Enterprise Structuring"}</span>
            <h1>{data.hero_title}</h1>
            <p>{data.hero_subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              <span className="eyebrow">{data.section_eyebrow || "Strategic Foundation"}</span>
              <h2>{data.section_title || "Incorporate Right From Day One"}</h2>
              <p className="lead">{data.intro}</p>

              <h4 style={{ marginBottom: '1rem', color: 'var(--ink)' }}>{data.section_list_title || "Our Full Incorporation Package Includes:"}</h4>
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
                <img src={data.content_image} alt="Incorporating business in Ontario and Canada" />
              </div>
              <div style={{ marginTop: '2rem', background: 'var(--paper-2)', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
                <h3>{data.card_title || "Starting a New Venture?"}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem' }}>
                  {data.card_text || "Structuring your corporation properly avoids substantial tax costs down the road. Speak with our incorporation specialists."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Book Incorporation Consultation"} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Launch With Legal & Tax Confidence"}</span>
          <h2>{data.cta_title || "Protect your personal assets and unlock small business tax deductions"}</h2>
          <p>{data.cta_subtitle || "Get your corporate registration, minute book, and CRA tax accounts setup seamlessly."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">{data.cta_primary_btn || "Incorporate Today"} <span className="arr">→</span></button>
            <Link to="/services" className="btn btn-soft">{data.cta_secondary_btn || "Explore All Services"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
