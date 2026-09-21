import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function AboutUs({ onOpenStrategy }) {
  const [data, setData] = useState({
    title: "About Us — DeFreitas & Associates",
    hero_title: "Exceeding expectations for over 30 years",
    hero_subtitle: "We are a firm of Chartered Professional Accountants providing a wide array of business consulting and tax advisory services to individuals and business enterprises across Canada.",
    hero_image: "/images/about-team.jpg",
    philosophy_title: "Professionalism delivered with personal commitment",
    lead_text: "We pride ourselves on the extensive experience our team possesses along with a high level of professionalism extended to all of our clients, delivered at rates that are competitive.",
    body_text: "Whether managing complex corporate restructures, preparing T2 corporate returns, recovering SR&ED research credits, or securing commercial bank loans, our advisors operate with unwavering diligence.",
    credentials: [
      "Member, Canadian Tax Foundation (CTF)",
      "Registered EFILE Association of Canada Practice",
      "Decades of CRA audit defense and compilation experience",
      "Toronto Head Office serving clients across GTA and nationwide"
    ]
  });

  useEffect(() => {
    fetchPageContent('about')
      .then(res => { if (res) setData(res); })
      .catch(err => console.warn("Using default About data:", err.message));
  }, []);

  return (
    <div>
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
              <p className="lead">{data.lead_text}</p>
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
