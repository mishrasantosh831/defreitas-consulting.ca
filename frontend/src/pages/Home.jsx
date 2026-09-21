import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';

export default function Home({ onOpenStrategy }) {
  const [content, setContent] = useState({
    hero_eyebrow: "Executive Tax Accountants · 30+ Years Legacy",
    hero_title: "Corporate advisory that builds real growth.",
    hero_description: "From corporate T2 filings and SR&ED tax credit claims to full-cycle accounting and business financing — DeFreitas & Associates delivers executive financial strategy for businesses across Toronto & Canada. Exceeding expectations for over 30 years.",
    hero_image: "/images/hero-tax-accountants.jpg",
    stat_1_number: "30",
    stat_1_suffix: "+ Yrs",
    stat_1_label: "Corporate Advisory Legacy",
    stat_2_number: "50",
    stat_2_suffix: "M+",
    stat_2_label: "Tax & SR&ED Recovered",
    stat_3_number: "1200",
    stat_3_suffix: "+",
    stat_3_label: "Businesses Served",
    stat_4_number: "100",
    stat_4_suffix: "%",
    stat_4_label: "CPA On-Time Compliance",
    why_title: "Proactive business advisors, not just annual tax filers",
    why_description: "We don't wait until year-end to examine your balance sheet. Our senior Chartered Professional Accountants provide continuous tax strategies, helping you seize capital opportunities and avoid CRA pitfalls.",
    why_image: "/images/why-choose-us.jpg"
  });

  useEffect(() => {
    fetchPageContent('home')
      .then(data => { if (data) setContent(data); })
      .catch(err => console.warn("Using default home content:", err.message));
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">{content.hero_eyebrow}</span>
              <h1>
                {content.hero_title.includes('builds') ? (
                  <>Corporate advisory that<br /><em>builds real growth.</em></>
                ) : (
                  content.hero_title
                )}
              </h1>
              <p className="hero-tag">{content.hero_description}</p>
              
              <div className="hero-actions">
                <button onClick={onOpenStrategy} className="btn btn-solid">
                  Get a Free Consultation <span className="arr">→</span>
                </button>
                <Link to="/services" className="btn btn-ghost">Explore Services</Link>
              </div>

              <div className="hero-trust">
                <div className="hero-avatars"><span>D</span><span>A</span><span>CPA</span><span>+</span></div>
                <span><b>4.9 / 5</b> rating from 1,200+ Canadian corporate clients &amp; entrepreneurs</span>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-frame">
                <img 
                  src={content.hero_image || '/images/hero-tax-accountants.jpg'} 
                  alt="DeFreitas CPA Executive Team"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/hero-tax-accountants.jpg';
                  }}
                />
              </div>
              <div className="hero-badge">
                <span className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>
                  </svg>
                </span>
                <div>
                  <div className="n">${content.stat_2_number}{content.stat_2_suffix}</div>
                  <div className="l">Total Tax &amp; SR&amp;ED Saved</div>
                </div>
              </div>
              <div className="hero-float">
                <span className="dot">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </span>
                <span><b>100% CPA</b> Compliance &amp; Audit Defense</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGOS ===== */}
      <section className="logos">
        <div className="wrap">
          <p className="logos-head">Affiliated &amp; Trusted Across Major Canadian Industry Sectors</p>
          <div className="logos-row">
            <span className="lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Canadian Tax Foundation
            </span>
            <span className="lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>
              Registered EFILE Practice
            </span>
            <span className="lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M8 9.5h5.5a2 2 0 0 1 0 4H8"/></svg>
              SR&amp;ED Claims Authority
            </span>
            <span className="lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12h8"/></svg>
              GTA Corporate Advisory
            </span>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="wrap">
          <div className="stats-grid">
            <div className="stat">
              <div className="n">{content.stat_1_number}<span className="suf">{content.stat_1_suffix}</span></div>
              <div className="l">{content.stat_1_label}</div>
            </div>
            <div className="stat">
              <div className="n">${content.stat_2_number}<span className="suf">{content.stat_2_suffix}</span></div>
              <div className="l">{content.stat_2_label}</div>
            </div>
            <div className="stat">
              <div className="n">{content.stat_3_number}<span className="suf">{content.stat_3_suffix}</span></div>
              <div className="l">{content.stat_3_label}</div>
            </div>
            <div className="stat">
              <div className="n">{content.stat_4_number}<span className="suf">{content.stat_4_suffix}</span></div>
              <div className="l">{content.stat_4_label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES HIGHLIGHTS ===== */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">What We Do</span>
            <h2>Comprehensive financial strategy,<br />tailored for your business</h2>
            <p>One dedicated team handling your day-to-day accounting, tax planning, and growth capital — with clear pricing and zero surprise bills.</p>
          </div>

          <div className="svc-grid">
            <article className="svc">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7h6M9 11h6M9 15h4"/><rect x="5" y="3" width="14" height="18" rx="2"/></svg>
              </span>
              <h3>Tax Advisory &amp; Filing</h3>
              <p>Accurate corporate T2, personal T1, estate tax planning, and aggressive CRA audit defense to legally minimize liabilities.</p>
              <Link to="/tax-advisory" className="more">Explore Tax Services →</Link>
            </article>

            <article className="svc">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v4H4zM4 10h16v10H4zM8 14h8M8 17h5"/></svg>
              </span>
              <h3>Accounting &amp; Bookkeeping</h3>
              <p>Full-cycle cloud bookkeeping, monthly financial statements (Notice to Reader), payroll, and GST/HST filing.</p>
              <Link to="/accounting" className="more">Explore Accounting →</Link>
            </article>

            <article className="svc">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>
              </span>
              <h3>SR&amp;ED Tax Credit Claims</h3>
              <p>Recover up to 64% of qualifying software engineering, R&amp;D, and technical innovation costs via government tax refunds.</p>
              <Link to="/sred" className="more">Explore SR&amp;ED Claims →</Link>
            </article>

            <article className="svc">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg>
              </span>
              <h3>Business Financing Solutions</h3>
              <p>Preparation of financial statement models, business plans, and direct introductions to commercial lenders and financiers.</p>
              <Link to="/financing" className="more">Explore Financing →</Link>
            </article>

            <article className="svc">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>
              </span>
              <h3>Incorporation &amp; Registration</h3>
              <p>Federal (Canada) &amp; Provincial (Ontario) incorporation, minute books, shareholder structure, and CRA account registration.</p>
              <Link to="/incorporation" className="more">Explore Incorporation →</Link>
            </article>

            <article className="svc">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </span>
              <h3>CPA Fractional CFO Advisory</h3>
              <p>Strategic executive advisory, cash flow forecasting, and succession planning for established mid-market companies.</p>
              <Link to="/services" className="more">Explore Advisory Packages →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section soft">
        <div className="wrap">
          <div className="split">
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '5/4' }}>
                <img 
                  src={content.why_image || '/images/why-choose-us.jpg'} 
                  alt="DeFreitas & Associates Advisory"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/why-choose-us.jpg';
                  }}
                />
              </div>
              <div className="tab">
                <span className="ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </span>
                <div><b>30+ Years Experience</b><span>GTA &amp; National CPA Coverage</span></div>
              </div>
            </div>

            <div className="split-copy">
              <span className="eyebrow">Why Choose Us</span>
              <h2>{content.why_title}</h2>
              <p className="lead">{content.why_description}</p>
              
              <ul className="feature-list">
                <li>
                  <span className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>
                  </span>
                  <div>
                    <h4>Senior CPA Leadership</h4>
                    <p>Direct counsel from seasoned chartered accountants with decades of experience across diverse industries.</p>
                  </div>
                </li>
                <li>
                  <span className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </span>
                  <div>
                    <h4>Rapid &amp; Direct Response</h4>
                    <p>No call centers. Direct email and phone access to your assigned accounting team with fast turnaround times.</p>
                  </div>
                </li>
                <li>
                  <span className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </span>
                  <div>
                    <h4>Competitive &amp; Transparent Rates</h4>
                    <p>Professional services delivered with transparent pricing designed to exceed client expectations without hidden fees.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">How We Work</span>
            <h2>Seamless onboarding in four simple steps</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h4>Free Consultation</h4>
              <p>A 30-minute review to examine your corporate setup, tax position, and accounting goals.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h4>Tailored Strategy</h4>
              <p>We present a customized plan covering tax optimization, bookkeeping, and grant opportunities.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h4>Seamless Setup</h4>
              <p>We migrate your records, handle CRA authorizations, and establish automated cloud workflows.</p>
            </div>
            <div className="step">
              <div className="num">4</div>
              <h4>Ongoing Growth</h4>
              <p>Continuous compliance, monthly reporting, and proactive tax saving strategies year-round.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section soft">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">Client Success</span>
            <h2>Trusted by business owners<br />across Canada</h2>
          </div>
          <div className="quotes-grid">
            <div className="qcard">
              <div className="stars">★★★★★</div>
              <blockquote>
                "DeFreitas &amp; Associates transformed our corporate tax planning. Their SR&amp;ED claim team recovered over $120,000 in refundable credits for our engineering work."
              </blockquote>
              <div className="qmeta"><span className="av">M</span><div><b>Marcus Vance</b><span>CEO, Apex Tech Solutions</span></div></div>
            </div>
            <div className="qcard">
              <div className="stars">★★★★★</div>
              <blockquote>
                "Their team handled our commercial loan documentation and business plan flawlessly. We secured the expansion capital we needed within weeks."
              </blockquote>
              <div className="qmeta"><span className="av">S</span><div><b>Sandra Rodriguez</b><span>Director, Logistics Corp GTA</span></div></div>
            </div>
            <div className="qcard">
              <div className="stars">★★★★★</div>
              <blockquote>
                "Over 12 years of partnership. Prompt, professional, and always looking out for our company's bottom line. I recommend them to every business owner."
              </blockquote>
              <div className="qmeta"><span className="av">D</span><div><b>David Chen</b><span>President, Heritage Group</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">Ready to Upgrade Your Accounting?</span>
          <h2>Let's discuss your financial roadmap today</h2>
          <p>Book a free, no-obligation consultation with our senior CPA partners. We'll analyze your current tax setup and show you exact optimization pathways.</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              Schedule Free Call <span className="arr">→</span>
            </button>
            <Link to="/services" className="btn btn-soft">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
