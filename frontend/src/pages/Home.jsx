import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

const defaultPracticeServices = [
  {
    title: "Tax Advisory & Filing",
    desc: "Personal and corporate tax preparation, planning, GST/HST support, and assistance with CRA reviews, objections, and appeals.",
    link_text: "Explore Tax Services →",
    link: "/tax-advisory"
  },
  {
    title: "Accounting & Bookkeeping",
    desc: "Comprehensive bookkeeping, setup and ongoing consultation, financial statement preparation, and WSIB filing and remittance support.",
    link_text: "Explore Accounting →",
    link: "/accounting-bookkeeping"
  },
  {
    title: "SR&ED Tax Credits",
    desc: "Professional SR&ED tax credit support, including claim preparation, financial documentation, and related tax matters.",
    link_text: "Explore SR&ED Services →",
    link: "/sred-tax-credits"
  },
  {
    title: "Business Financing",
    desc: "Financial statements, multi-year projections, cash flow modelling, lender-focused business plans, and commercial financing support.",
    link_text: "Explore Financing →",
    link: "/business-financing"
  },
  {
    title: "Incorporation & Registration",
    desc: "Professional business incorporation and registration support, with practical guidance based on your business requirements.",
    link_text: "Explore Incorporation →",
    link: "/incorporation-business-registration"
  },
  {
    title: "CPA Fractional CFO Advisory",
    desc: "Strategic executive advisory, cash flow forecasting, and succession planning support for established and growing businesses.",
    link_text: "Explore Advisory Services →",
    link: "/services"
  }
];

const getServiceIcon = (title = '', idx = 0) => {
  const t = title.toLowerCase();
  if (t.includes('tax')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7h6M9 11h6M9 15h4"/><rect x="5" y="3" width="14" height="18" rx="2"/></svg>;
  }
  if (t.includes('accounting') || t.includes('bookkeeping')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v4H4zM4 10h16v10H4zM8 14h8M8 17h5"/></svg>;
  }
  if (t.includes('sred') || t.includes('sr&ed') || t.includes('r&d')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>;
  }
  if (t.includes('financing') || t.includes('loan') || t.includes('capital')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg>;
  }
  if (t.includes('incorporation') || t.includes('registration')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>;
  }
  if (t.includes('cfo') || t.includes('advisory')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
  }
  const defaultIcons = [
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7h6M9 11h6M9 15h4"/><rect x="5" y="3" width="14" height="18" rx="2"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v4H4zM4 10h16v10H4zM8 14h8M8 17h5"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ];
  return defaultIcons[idx % defaultIcons.length];
};

const defaultHowWeWorkSteps = [
  {
    step: "1",
    title: "Initial Consultation",
    desc: "We start by understanding your needs, current situation, and the tax, accounting, financial, or business matters you want to address."
  },
  {
    step: "2",
    title: "Tailored Guidance",
    desc: "Our team reviews your requirements and recommends a practical approach aligned with your personal or business objectives."
  },
  {
    step: "3",
    title: "Professional Support",
    desc: "We work with you to prepare the required information, documentation, filings, or financial materials based on the services you need."
  },
  {
    step: "4",
    title: "Ongoing Advisory",
    desc: "As your needs evolve, our team remains available to provide ongoing tax, accounting, financial, and business advisory support."
  }
];

const defaultWhyItems = [
  {
    title: "Experienced CPA-Led Advice",
    desc: "Work with experienced Chartered Professional Accountants who bring decades of tax, accounting and business advisory experience across a range of industries."
  },
  {
    title: "Personalized, Responsive Service",
    desc: "Receive direct, timely support from professionals who understand your business and provide guidance tailored to your circumstances."
  },
  {
    title: "Year-Round Advisory Support",
    desc: "Access practical tax planning and business advice throughout the year—not only when it’s time to file a return."
  },
  {
    title: "Clear & Transparent Fees",
    desc: "Professional services delivered with straightforward pricing, clear expectations and no hidden fees."
  }
];

const getWhyIcon = (title = '', idx = 0) => {
  const t = title.toLowerCase();
  if (t.includes('cpa') || t.includes('advice') || t.includes('leadership')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>;
  }
  if (t.includes('responsive') || t.includes('personalized') || t.includes('service')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
  }
  if (t.includes('year-round') || t.includes('round') || t.includes('advisory')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  }
  if (t.includes('fee') || t.includes('transparent') || t.includes('rates') || t.includes('pricing')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
  }
  const icons = [
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ];
  return icons[idx % icons.length];
};

export default function Home({ onOpenStrategy }) {
  const [content, setContent] = useState({
    seo_title: "Tax & Business Services Toronto | DeFreitas & Associates",
    seo_description: "DeFreitas & Associates provides tax, accounting, bookkeeping and business consulting services from Toronto, Canada, serving clients globally.",
    canonical_url: "https://defreitas-consulting.ca/",
    breadcrumb_schema: "",
    hero_eyebrow: "Tax, Accounting & Business Advisory Services",
    hero_title: "Tax, Accounting & Business Advisory Services Toronto, Canada",
    hero_description: "DeFreitas & Associates provides professional tax, accounting, financial and business advisory services to individuals and businesses. For more than 30 years, we have helped clients navigate financial, tax and business matters with practical advice and personalized support.",
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
    services_eyebrow: "What We Do",
    services_title: "Professional Services for Individuals & Businesses in Toronto, Canada",
    services_subtitle: "One dedicated team handling your day-to-day accounting, tax planning, and growth capital — with clear pricing and zero surprise bills.",
    practice_services: defaultPracticeServices,
    how_we_work_eyebrow: "HOW WE WORK",
    how_we_work_title: "A Simple, Seamless and Personalized Approach",
    how_we_work_steps: defaultHowWeWorkSteps,
    why_title: "Experienced Business & Financial Advisors in Toronto, Canada",
    why_image: "/images/why-choose-us.jpg",
    why_items: defaultWhyItems,
    faq_items: [
      {
        q: "Do you work with both individuals and businesses?",
        a: "Yes. DeFreitas & Associates works with individuals, entrepreneurs and businesses that need professional tax services, accounting services, financial guidance and business advisory services. Based in Toronto, Canada, we provide support based on each client’s circumstances and requirements."
      },
      {
        q: "I’m not sure which service I need. Can you help me figure that out?",
        a: "Yes. You don’t need to know exactly which service you need before contacting us. We can discuss your situation and determine whether you need tax advisory services, accounting and bookkeeping services, business financing services, incorporation and business registration, SR&ED tax credit support or CPA Fractional CFO Advisory."
      },
      {
        q: "Can you handle more than just my taxes?",
        a: "Yes. In addition to personal and corporate tax services, DeFreitas & Associates provides accounting and bookkeeping services, business financing services, SR&ED tax credit support, incorporation and business registration, and CPA Fractional CFO Advisory. This allows clients to access broader financial and business advisory services as their needs evolve."
      },
      {
        q: "When is the right time to speak with a tax or business advisor?",
        a: "You don’t have to wait until tax season or until a financial issue arises. An experienced tax advisor or business advisor can provide valuable guidance when you are starting or growing a business, considering business financing, managing a tax matter, reviewing cash flow or planning an important financial decision."
      },
      {
        q: "What can I expect when I work with DeFreitas & Associates?",
        a: "We start by understanding your situation, priorities and objectives before recommending an appropriate approach. With more than 30 years of experience, DeFreitas & Associates provides practical, personalized tax, accounting, financial and business advisory services based on each client’s needs."
      }
    ]
  });

  useEffect(() => {
    fetchPageContent('home')
      .then(data => { if (data) setContent(prev => ({ ...prev, ...data })); })
      .catch(err => console.warn("Using default home content:", err.message));
  }, []);

  return (
    <div>
      <SEOHead 
        title={content.seo_title}
        description={content.seo_description}
        canonical={content.canonical_url}
        breadcrumbSchema={content.breadcrumb_schema}
      />
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
            <span className="eyebrow center">{content.services_eyebrow || "What We Do"}</span>
            <h2>{content.services_title || "Comprehensive financial strategy,\ntailored for your business"}</h2>
            <p>{content.services_subtitle || "One dedicated team handling your day-to-day accounting, tax planning, and growth capital — with clear pricing and zero surprise bills."}</p>
          </div>

          <div className="svc-grid">
            {(content.practice_services && content.practice_services.length > 0 
              ? content.practice_services 
              : defaultPracticeServices
            ).map((svc, idx) => (
              <article key={idx} className="svc">
                <span className="ico">
                  {getServiceIcon(svc.title, idx)}
                </span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link to={svc.link || "/services"} className="more">
                  {svc.link_text || "Explore Services →"}
                </Link>
              </article>
            ))}
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
              
              <ul className="feature-list" style={{ marginTop: '2.2rem' }}>
                {(content.why_items && content.why_items.length > 0 
                  ? content.why_items 
                  : defaultWhyItems
                ).map((item, idx) => (
                  <li key={idx}>
                    <span className="ico">
                      {getWhyIcon(item.title, idx)}
                    </span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK STEPS ===== */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">{content.how_we_work_eyebrow || "HOW WE WORK"}</span>
            <h2>{content.how_we_work_title || "A Simple, Seamless and Personalized Approach"}</h2>
          </div>
          <div className="steps">
            {(content.how_we_work_steps && content.how_we_work_steps.length > 0 
              ? content.how_we_work_steps 
              : defaultHowWeWorkSteps
            ).map((st, i) => (
              <div key={i} className="step">
                <div className="num">{st.step || (i + 1)}</div>
                <h4>{st.title}</h4>
                <p>{st.desc}</p>
              </div>
            ))}
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

      {/* ===== FAQS (FROM SPREADSHEET PAGE CONTENT DOC) ===== */}
      <FAQSection 
        title="Frequently Asked Questions" 
        subtitle="Common questions about our professional tax, accounting, financial, and business advisory services."
        items={content.faq_items} 
      />

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
