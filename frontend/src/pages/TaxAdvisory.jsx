import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function TaxAdvisory({ onOpenStrategy }) {
  const [data, setData] = useState({
    title: "Tax Advisory, Preparation And Filing",
    hero_title: "Tax Advisory, Preparation And Filing",
    hero_subtitle: "Accurate and professional preparation for both business and personal submissions, backed by decades of CPA audit experience.",
    hero_banner: "/images/tax-advisory-banner.png",
    content_image: "/images/648.png",
    intro: "For individuals (employed or self-employed), proprietorships, partnerships and corporations, our firm is equipped to represent, prepare and/or file the following with the Canada Revenue Agency (CRA):",
    services_list: [
      "T1 General – personal tax return (employed and self-employed)",
      "T2 Corporate Tax Return with Compilation Engagement financial statements",
      "Personal or Corporate Tax Review or Audit Representation",
      "GST/HST Review or Audit Defense",
      "GST/HST Filings for Self-Employed, Proprietorships, Partnerships and Corporations",
      "T1 Adjustments and Prior Year Reassessments",
      "Notices of Objection and Dispute Resolution with the CRA",
      "Tax Appeals and Tax Court Representation Coordination",
      "T4, T4A, T5 Slips & T4 Summary Filing",
      "GST/HST Rebate Applications (New Housing Rebate - NHR, NRRP Rebate)",
      "Non-Resident Tax Compliance (Employment, Rental, or Investment Income)",
      "Section 116 Certificate of Compliance for Non-Resident Real Estate Dispositions",
      "Commodity Tax Transactions including HST and Cross-Border Withholding",
      "Scientific Research & Experimental Development (SR&ED) Tax Credit Claims",
      "Voluntary Tax Disclosure Program (VDP) Applications"
    ],
    affiliation_text: "OUR FIRM IS A PROUD MEMBER OF THE CANADIAN TAX FOUNDATION AND THE EFILE ASSOCIATION OF CANADA",
    hero_eyebrow: "Executive CPA Tax Practice",
    section_eyebrow: "Canada Revenue Agency Representation",
    section_title: "Complete Corporate & Individual Tax Scope",
    card_title: "Need Strategic Tax Advisory?",
    card_text: "Whether dealing with an overdue corporate T2 return, CRA audit letter, or cross-border asset disposition, speak with our senior partners today.",
    card_button_text: "Book Tax Strategy Call",
    cta_eyebrow: "Eliminate CRA Surprises",
    cta_title: "Proactive tax advisory throughout the entire calendar year",
    cta_subtitle: "We work closely with Canadian entrepreneurs, incorporated professionals, and multi-entity businesses to minimize tax liabilities legally and reliably.",
    cta_primary_btn: "Schedule Free Consultation",
    cta_secondary_btn: "View Pricing Plans"
  });

  useEffect(() => {
    fetchPageContent('tax_advisory')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Tax Advisory data:", err.message));
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
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Tax Advisory &amp; Filing</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Executive CPA Tax Practice"}</span>
            <h1>{data.hero_title}</h1>
            <p>{data.hero_subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{data.section_eyebrow || "Canada Revenue Agency Representation"}</span>
            <h2>{data.section_title || "Complete Corporate & Individual Tax Scope"}</h2>
            <p>{data.intro}</p>
          </div>

          <div className="split">
            <div className="split-copy">
              <ul className="feature-list">
                {data.services_list.map((item, idx) => (
                  <li key={idx} style={{ alignItems: 'flex-start' }}>
                    <span className="ico" style={{ width: '30px', height: '30px', minWidth: '30px', marginTop: '3px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ 
                marginTop: '2.5rem', background: 'var(--mint-50)', padding: '1.4rem 1.8rem', 
                borderRadius: '12px', borderLeft: '5px solid var(--mint-600)' 
              }}>
                <b style={{ color: 'var(--mint-700)', fontSize: '.88rem', letterSpacing: '.05em' }}>
                  {data.affiliation_text}
                </b>
              </div>
            </div>

            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img src={data.content_image} alt="CPA Tax Preparation" />
              </div>
              <div style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
                <h3>{data.card_title || "Need Strategic Tax Advisory?"}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem' }}>
                  {data.card_text || "Whether dealing with an overdue corporate T2 return, CRA audit letter, or cross-border asset disposition, speak with our senior partners today."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Book Tax Strategy Call"} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Eliminate CRA Surprises"}</span>
          <h2>{data.cta_title || "Proactive tax advisory throughout the entire calendar year"}</h2>
          <p>{data.cta_subtitle || "We work closely with Canadian entrepreneurs, incorporated professionals, and multi-entity businesses to minimize tax liabilities legally and reliably."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">{data.cta_primary_btn || "Schedule Free Consultation"} <span className="arr">→</span></button>
            <Link to="/services" className="btn btn-soft">{data.cta_secondary_btn || "View Pricing Plans"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
