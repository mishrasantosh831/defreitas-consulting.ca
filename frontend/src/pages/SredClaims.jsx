import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function SredClaims({ onOpenStrategy }) {
  const [data, setData] = useState({
    title: "SR&ED Tax Incentive Claims",
    hero_title: "Turn Canadian Innovation Into a Stronger SR&ED Claim",
    hero_subtitle: "DeFreitas & Associates helps innovative businesses identify eligible work, assemble defensible technical documentation, calculate qualifying expenditures, and prepare complete SR&ED tax incentive claims.",
    hero_image: "/images/sred-hero.jpg",
    intro_image: "/images/sred-turning-innovation.jpg",
    intro_bullets: [
      "A complete claim approach coordinated by senior CPAs",
      "Technical depth. Financial discipline. Clear documentation.",
      "Initial eligibility screening and technological uncertainty scoping",
      "Technical project interviews & T661 project narratives",
      "Expenditure review, contractor tracking, and calculation optimization",
      "Claim submission coordination directly integrated with your T2 corporate return",
      "CRA review and objection defense support",
      "30+ years of business and tax advisory experience"
    ],
    services: [
      {
        title: "1. Opportunity Assessment",
        description: "We review your projects, technical challenges, experiments, personnel, and costs to identify work that may meet the SR&ED requirements."
      },
      {
        title: "2. Technical Claim Preparation",
        description: "Structured interviews capture technological uncertainties, hypotheses, experiments, results, and advances for clear project descriptions."
      },
      {
        title: "3. Expenditure Analysis",
        description: "We work with your accounting records to identify and link eligible salaries, materials, contracts, equipment costs, and applicable overhead."
      },
      {
        title: "4. Documentation Improvement",
        description: "We help establish practical contemporaneous records so future claims are better supported without burdening your technical team."
      },
      {
        title: "5. CRA Review Support",
        description: "When questions arise, we help organize responses, clarify the technical work, prepare supporting materials, and participate in review discussions."
      },
      {
        title: "6. Previously Denied Claims",
        description: "We independently assess a reviewed or denied claim, identify weaknesses, and advise whether further representation or an objection may be appropriate."
      }
    ],
    qualify_title: "Could Your Work Qualify?",
    qualify_description: "SR&ED is not limited to laboratories or research institutions. Eligible work can occur when a Canadian business faces a technological uncertainty that cannot be resolved using readily available knowledge and undertakes systematic experimentation or analysis to find an answer. You do not necessarily need a successful result — learning why an approach did not work still creates valuable technological knowledge.",
    qualify_indicators: [
      "Your team developed or improved a product, process, material, device, or software system.",
      "Experienced personnel could not determine the solution in advance using standard industry knowledge.",
      "You tested alternatives, prototypes, models, formulations, code algorithms, or system configurations.",
      "You encountered technical obstacles, failures, limitations, or unexpected results.",
      "Your work generated new technological knowledge or incremental advancement for your business."
    ],
    industries: [
      "Manufacturing & Processing",
      "Software & Information Technology",
      "Clean Technology & Renewable Energy",
      "Food & Beverage Formulation",
      "Engineering & Industrial Design",
      "Life Sciences & Pharmaceuticals",
      "Mining & Environmental Engineering",
      "Construction & Building Sciences"
    ],
    process_steps: [
      { step: "1", title: "Preliminary Discussion", desc: "Initial consultation to understand your technological operations and identify eligible projects." },
      { step: "2", title: "Technical Scoping", desc: "Interviews with your technical leads to document uncertainties, hypotheses, and testing cycles." },
      { step: "3", title: "Narrative Drafting", desc: "Preparation of robust, CRA-defensible Form T661 project descriptions and reports." },
      { step: "4", title: "Cost Identification", desc: "Quantifying eligible direct wages, contractor expenditures, and proxy overhead calculations." },
      { step: "5", title: "Filing Integration", desc: "Seamless filing integration with your corporate T2 tax return with the Canada Revenue Agency." },
      { step: "6", title: "Post-Filing Support", desc: "Defending and representing the claim before CRA auditors until tax credits or refunds are issued." }
    ],
    hero_eyebrow: "Innovation Tax Credits",
    hero_primary_btn: "Request Free SR&ED Assessment",
    hero_secondary_btn: "Contact Team",
    intro_eyebrow: "Maximize Your Refund",
    intro_title: "Experienced technical & financial claim support",
    intro_lead: "Coordinated directly through the accounting professionals you already trust, preventing costly audit disconnects between your technical write-ups and corporate financials.",
    services_eyebrow: "End-To-End Practice",
    services_title: "SR&ED Advisory Services",
    services_subtitle: "From early technical scoping to full filing and CRA audit defense.",
    qualify_eyebrow: "Eligibility Check",
    qualify_indicators_title: "Common Qualification Indicators:",
    expenditures_title: "Eligible Expenditures:",
    expenditures_intro: "Under Canadian tax law, qualifying work enables you to claim expenditures directly linked to R&D activities:",
    expenditures: [
      {
        title: "Canadian Salaries & Wages",
        desc: "Directly engaged technical staff + proxy overhead allowance (55%)."
      },
      {
        title: "Arm's Length Contractors",
        desc: "Canadian third-party developer and engineering contract costs (80% rate)."
      },
      {
        title: "Consumed Materials",
        desc: "Physical prototypes, testing materials, and experimental components."
      }
    ],
    industries_eyebrow: "Sectors We Serve",
    industries_title: "Eligible Canadian Industries",
    industries_subtitle: "SR&ED claims span dozens of commercial fields beyond pure science.",
    process_eyebrow: "Methodology",
    process_title: "How We Work With You",
    process_subtitle: "A disciplined 6-stage process designed to minimize distraction for your technical team.",
    cta_eyebrow: "Maximize Your Refund Today",
    cta_title: "Ready to discover your eligible SR&ED refund?",
    cta_subtitle: "Schedule a confidential screening with our senior CPA partners and technical specialists. We evaluate eligibility with no upfront fees.",
    cta_primary_btn: "Book Free Assessment",
    cta_secondary_btn: "Contact Toronto Office"
  });

  useEffect(() => {
    fetchPageContent('sred')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default SRED data:", err.message));
  }, []);

  const expendituresList = data.expenditures || [
    { title: "Canadian Salaries & Wages", desc: "Directly engaged technical staff + proxy overhead allowance (55%)." },
    { title: "Arm's Length Contractors", desc: "Canadian third-party developer and engineering contract costs (80% rate)." },
    { title: "Consumed Materials", desc: "Physical prototypes, testing materials, and experimental components." }
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb"><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>SR&amp;ED Claims</span></div>
          <span className="eyebrow center">{data.hero_eyebrow || "Innovation Tax Credits"}</span>
          <h1>{data.hero_title}</h1>
          <p>{data.hero_subtitle}</p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={onOpenStrategy} className="btn btn-solid">
              {data.hero_primary_btn || "Request Free SR&ED Assessment"} <span className="arr">→</span>
            </button>
            <Link to="/contact" className="btn btn-ghost">{data.hero_secondary_btn || "Contact Team"}</Link>
          </div>
        </div>
      </section>

      {/* Hero Banner Image */}
      <div className="wrap" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <div style={{ borderRadius: 'var(--r)', overflow: 'hidden', maxHeight: '420px', boxShadow: 'var(--shadow)' }}>
          <img src={data.hero_image} alt="SR&ED Tax Incentives" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* ===== INTRO SPLIT ===== */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img src={data.intro_image} alt="Turning Innovation into Advantage" />
              </div>
            </div>
            <div className="split-copy">
              <span className="eyebrow">{data.intro_eyebrow || "Maximize Your Refund"}</span>
              <h2>{data.intro_title || "Experienced technical & financial claim support"}</h2>
              <p className="lead">
                {data.intro_lead || "Coordinated directly through the accounting professionals you already trust, preventing costly audit disconnects between your technical write-ups and corporate financials."}
              </p>
              <ul className="feature-list">
                {data.intro_bullets.map((b, i) => (
                  <li key={i} style={{ alignItems: 'center' }}>
                    <span className="ico" style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                    <span style={{ fontSize: '.95rem', color: 'var(--ink)' }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6 ADVISORY SERVICES ===== */}
      <section className="section soft">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">{data.services_eyebrow || "End-To-End Practice"}</span>
            <h2>{data.services_title || "SR&ED Advisory Services"}</h2>
            <p>{data.services_subtitle || "From early technical scoping to full filing and CRA audit defense."}</p>
          </div>
          <div className="svc-grid">
            {data.services.map((svc, i) => (
              <article key={i} className="svc" style={{ borderTop: '4px solid var(--mint-600)' }}>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUALIFYING SECTION ===== */}
      <section className="section" style={{ background: 'var(--ink)', color: '#fff' }}>
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow light">{data.qualify_eyebrow || "Eligibility Check"}</span>
              <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{data.qualify_title}</h2>
              <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                {data.qualify_description}
              </p>
              <h4 style={{ color: 'var(--mint-300)', marginBottom: '1rem' }}>{data.qualify_indicators_title || "Common Qualification Indicators:"}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                {data.qualify_indicators.map((ind, i) => (
                  <li key={i} style={{ display: 'flex', gap: '.8rem', color: 'rgba(255,255,255,.9)', fontSize: '.95rem' }}>
                    <span style={{ color: 'var(--mint-400)', fontWeight: 'bold' }}>✓</span>
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,.06)', padding: '2.5rem', borderRadius: 'var(--r)', border: '1px solid rgba(255,255,255,.1)' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{data.expenditures_title || "Eligible Expenditures:"}</h3>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.92rem', marginBottom: '1.2rem' }}>
                {data.expenditures_intro || "Under Canadian tax law, qualifying work enables you to claim expenditures directly linked to R&D activities:"}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {expendituresList.map((exp, expIdx) => (
                  <div key={expIdx} style={{ background: 'rgba(255,255,255,.08)', padding: '1rem', borderRadius: '10px' }}>
                    <b style={{ color: 'var(--mint-300)' }}>{exp.title}</b>
                    <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.7)' }}>{exp.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">{data.industries_eyebrow || "Sectors We Serve"}</span>
            <h2>{data.industries_title || "Eligible Canadian Industries"}</h2>
            <p>{data.industries_subtitle || "SR&ED claims span dozens of commercial fields beyond pure science."}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem' }}>
            {data.industries.map((ind, i) => (
              <div key={i} style={{ 
                background: 'var(--paper-2)', padding: '1.3rem', borderRadius: '12px', 
                fontWeight: '600', color: 'var(--ink)', textAlign: 'center', border: '1px solid var(--line)' 
              }}>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6 STEP PROCESS ===== */}
      <section className="section soft">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">{data.process_eyebrow || "Methodology"}</span>
            <h2>{data.process_title || "How We Work With You"}</h2>
            <p>{data.process_subtitle || "A disciplined 6-stage process designed to minimize distraction for your technical team."}</p>
          </div>
          <div className="steps" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {data.process_steps.map((st, i) => (
              <div key={i} className="step">
                <div className="num">{st.step}</div>
                <h4>{st.title}</h4>
                <p>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Maximize Your Refund Today"}</span>
          <h2>{data.cta_title || "Ready to discover your eligible SR&ED refund?"}</h2>
          <p>{data.cta_subtitle || "Schedule a confidential screening with our senior CPA partners and technical specialists. We evaluate eligibility with no upfront fees."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Book Free Assessment"} <span className="arr">→</span>
            </button>
            <Link to="/contact" className="btn btn-soft">{data.cta_secondary_btn || "Contact Toronto Office"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
