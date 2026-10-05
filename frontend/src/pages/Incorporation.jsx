import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

export default function Incorporation({ onOpenStrategy }) {
  const [data, setData] = useState({
    seo_title: "Business Incorporation & Registration Services | DeFreitas & Associates Canada",
    seo_description: "Business incorporation and registration services from DeFreitas & Associates Toronto, Canada. Get professional guidance to incorporate and register a business.",
    canonical_url: "https://defreitas-consulting.ca/incorporation-business-registration/",
    breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://defreitas-consulting.ca/services/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Incorporation & Business Registration\",\"item\":\"https://defreitas-consulting.ca/incorporation-business-registration/\"}]}",
    title: "Business Incorporation & Registration Services in Canada",
    hero_eyebrow: "Professional Business Incorporation Services",
    hero_title: "Business Incorporation & Registration Services in Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional business incorporation and business registration services for individuals and entrepreneurs establishing a business.",
    hero_banner: "/images/icoopration-business-banner.png",
    content_image: "/images/668.png",
    intro: "Starting a business involves important decisions from the outset. We provide practical support through the incorporation or business registration process, helping you establish your business on the right footing. If you are planning to incorporate a business, DeFreitas & Associates can assist with the incorporation process based on your business requirements by helping you navigate the steps involved in establishing your corporation.",
    section_eyebrow: "Business Incorporation Requirements",
    section_title: "Business Setup & Advisory Services",
    section_list_title: "Our Full Incorporation Package Includes:",
    services_list: [
      "Federal (Canada) & Provincial (Ontario) Incorporation",
      "Business Registration Services",
      "Name Reservation (NUANS search) and Corporate Articles of Incorporation",
      "Digital Minute Book Setup, Corporate By-laws, and Shareholder Registers",
      "Shareholder Structure, Voting vs. Non-Voting shares, and Dividend Classes",
      "CRA Business Number (BN), Corporate Tax (RC), GST/HST (RT), and Payroll (RP) Registration",
      "Ongoing Corporate Annual Return filings and minute book maintenance"
    ],
    card_title: "Starting a New Venture?",
    card_text: "Structuring your corporation properly avoids substantial tax costs down the road. Whether incorporation is appropriate depends on your business, financial circumstances, objectives, and other considerations.",
    card_button_text: "Book Incorporation Consultation",
    faq_items: [
      {
        q: "What is the difference between business incorporation and business registration?",
        a: "Business registration and incorporation are different ways of establishing a business. Incorporation creates a corporation as a separate legal entity, while business registration may apply when establishing and registering another form of business. The appropriate approach depends on your individual circumstances and business requirements."
      },
      {
        q: "Can you help me incorporate a business in Canada?",
        a: "Yes. DeFreitas & Associates provides business incorporation services and can assist clients through the incorporation process based on their requirements."
      },
      {
        q: "Do you provide business registration services?",
        a: "Yes. In addition to incorporation services, DeFreitas & Associates provides business registration support for individuals and entrepreneurs establishing a business."
      },
      {
        q: "Should I incorporate my business?",
        a: "Whether incorporation is appropriate depends on your business, financial circumstances, objectives, and other considerations. Rather than treating incorporation as the right choice for every business, it is important to consider your individual circumstances before deciding how to structure your business."
      },
      {
        q: "What are some considerations when incorporating a business?",
        a: "There are several factors that may need to be considered, including the nature of the business, ownership, ongoing administrative requirements, financial reporting, and taxation."
      },
      {
        q: "Do you provide accounting services after incorporation?",
        a: "Yes. Businesses that require ongoing accounting or bookkeeping support can explore our Accounting & Bookkeeping Services. Keeping financial records organized from the beginning can make ongoing business administration and reporting easier to manage."
      },
      {
        q: "Can you also help with corporate tax matters?",
        a: "Yes. Corporate taxation is handled through our Tax Advisory Services, which provides tax preparation, planning, filing, and advisory support within our scope of services."
      },
      {
        q: "Can you help if my new business requires financing?",
        a: "DeFreitas & Associates also provides Business Financing Services for businesses preparing to pursue commercial financing."
      }
    ],
    cta_eyebrow: "Launch With Legal & Tax Confidence",
    cta_title: "Protect your personal assets and unlock small business tax deductions",
    cta_subtitle: "If you are looking to incorporate or register a business, DeFreitas & Associates can help you navigate the process with professional, personalized support. Contact our team to discuss your business incorporation or registration requirements.",
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
      <SEOHead 
        title={data.seo_title}
        description={data.seo_description}
        canonical={data.canonical_url}
        breadcrumbSchema={data.breadcrumb_schema}
      />
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

      {/* ===== FAQS ===== */}
      <FAQSection 
        items={data.faq_items} 
        title="Frequently Asked Questions About Incorporation" 
        subtitle="Common questions regarding business registration, corporate structures, and requirements in Canada."
      />

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
