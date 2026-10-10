import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';

export default function AboutUs({ onOpenStrategy }) {
  const [data, setData] = useState({
    seo_title: "Business & Tax Advisors Toronto | DeFreitas & Associates",
    seo_description: "DeFreitas & Associates, based in Toronto, Canada, provides accounting, tax, business advisory and consulting services to clients globally",
    canonical_url: "http://localhost:3000/about/",
    breadcrumb_schema: "",
    title: "About DeFreitas & Associates Toronto, Canada",
    hero_title: "About DeFreitas & Associates Toronto, Canada",
    hero_subtitle: "We are a firm of Chartered Professional Accountants providing a wide array of business consulting and tax advisory services to individuals and business enterprises across Canada.",
    hero_image: "/images/about-team.jpg",
    philosophy_title: "Financial Consultants, Business Advisors & Tax Professionals Toronto, Canada",
    expertise_title: "Tax & Accounting Expertise Toronto, Canada",
    lead_text: "Tax & Accounting Expertise Toronto, Canada",
    body_text: "We pride ourselves on the extensive experience our team possesses along with a high level of professionalism extended to all of our clients, delivered at rates that are competitive.",
    credentials: [
      "Member, Canadian Tax Foundation (CTF)",
      "Registered EFILE Association of Canada Practice",
      "Decades of CRA audit defense and compilation experience",
      "Toronto Head Office serving clients across GTA and nationwide"
    ],
    about_services: [
      { title: "Tax Advisory, Preparation & Filing", desc: "Professional personal and corporate tax return preparation, strategic planning and CRA audit defense.", link: "/tax-advisory" },
      { title: "Accounting & Bookkeeping", desc: "Comprehensive cloud bookkeeping, monthly financial reporting, and payroll compliance.", link: "/accounting-bookkeeping" },
      { title: "SR&ED Tax Credits", desc: "Scientific Research & Experimental Development tax credit claim scoping and financial filing.", link: "/sred-tax-credits" },
      { title: "Business Incorporation & Registration", desc: "Federal and provincial corporate registration, articles of incorporation and minute books.", link: "/incorporation-business-registration" }
    ]
  });

  useEffect(() => {
    fetchPageContent('about')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default About data:", err.message));
  }, []);

  return (
    <div>
      <SEOHead 
        title={data.seo_title}
        description={data.seo_description}
        canonical={data.canonical_url}
        breadcrumbSchema={data.breadcrumb_schema}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb"><Link to="/">Home</Link> / <span>About Us</span></div>
          <span className="eyebrow center">Our Legacy</span>
          <h1>{data.hero_title}</h1>
          <p>{data.hero_subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/5' }}>
                <img 
                  src={data.hero_image || '/images/about-team.jpg'} 
                  alt="DeFreitas Senior Partner Advisory" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/about-team.jpg';
                  }}
                />
              </div>
              <div className="tab">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.39 4.84L20 7.63l-3.8 3.7.9 5.23L12 14.1 6.9 16.56l.9-5.23L4 7.63l5.61-.79L12 2z"/></svg>
                </span>
                <div><b>Certified Excellence</b><span>Member, Canadian Tax Foundation</span></div>
              </div>
            </div>

            <div className="split-copy">
              <span className="eyebrow">Our Philosophy</span>
              <h2>{data.philosophy_title}</h2>
              <h2 style={{ fontSize: '1.45rem', marginTop: '1.4rem', marginBottom: '0.6rem', color: 'var(--ink)', lineHeight: '1.3' }}>
                {data.expertise_title || data.lead_text}
              </h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '1.8rem' }}>{data.body_text}</p>

              <h4 style={{ marginBottom: '1rem', color: 'var(--ink)' }}>Distinguishing Highlights:</h4>
              <ul className="feature-list" style={{ marginBottom: '2rem' }}>
                {data.credentials.map((cred, idx) => (
                  <li key={idx} style={{ alignItems: 'center' }}>
                    <span className="ico" style={{ width: '30px', height: '30px', minWidth: '30px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--ink)' }}>{cred}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-actions">
                <button onClick={onOpenStrategy} className="btn btn-solid">
                  Speak to Our Senior Partners <span className="arr">→</span>
                </button>
                <Link to="/services" className="btn btn-ghost">View Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Practice Areas (H3 Headings) */}
      <section className="section" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">Practice Areas</span>
            <h2>Integrated Financial &amp; Tax Solutions</h2>
          </div>
          <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {(data.about_services || [
              { title: "Tax Advisory, Preparation & Filing", desc: "Professional personal and corporate tax return preparation, strategic planning and CRA audit defense.", link: "/tax-advisory" },
              { title: "Accounting & Bookkeeping", desc: "Comprehensive cloud bookkeeping, monthly financial reporting, and payroll compliance.", link: "/accounting-bookkeeping" },
              { title: "SR&ED Tax Credits", desc: "Scientific Research & Experimental Development tax credit claim scoping and financial filing.", link: "/sred-tax-credits" },
              { title: "Business Incorporation & Registration", desc: "Federal and provincial corporate registration, articles of incorporation and minute books.", link: "/incorporation-business-registration" }
            ]).map((s, idx) => (
              <article key={idx} className="svc">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to={s.link} className="more">Explore Service →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="section soft">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">Track Record</span>
            <h2>Why Canada's Business Leaders Choose DeFreitas</h2>
            <p>Our long-standing presence in Toronto is built on delivering quantifiable financial impact year after year.</p>
          </div>
          <div className="steps" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="step">
              <div className="num">1</div>
              <h4>Direct Senior Access</h4>
              <p>Work directly with seasoned Chartered Professional Accountants who understand your industry and business model.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h4>Proactive Tax Optimization</h4>
              <p>We actively identify SR&amp;ED grants, capital dividend accounts, and corporate deduction pathways year-round.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h4>Zero Bill Surprises</h4>
              <p>Transparent agreements and fixed pricing packages that establish long-term trust and alignment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">Partner With Experience</span>
          <h2>Ready to elevate your financial strategy?</h2>
          <p>Book a consultation with our senior management team in Toronto today.</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">Schedule Free Consultation <span className="arr">→</span></button>
            <Link to="/contact" className="btn btn-soft">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
