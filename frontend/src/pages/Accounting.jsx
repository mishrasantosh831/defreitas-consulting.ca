import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

export default function Accounting({ onOpenStrategy }) {
  const [data, setData] = useState({
    seo_title: "Accounting & Bookkeeping Services Canada | DeFreitas & Associates",
    seo_description: "Professional accounting and bookkeeping services in Canada. DeFreitas & Associates offers bookkeeping setup, financial statement preparation, and WSIB filing support.",
    canonical_url: "https://defreitas-consulting.ca/accounting-bookkeeping/",
    breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://defreitas-consulting.ca/services/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Accounting & Bookkeeping\",\"item\":\"https://defreitas-consulting.ca/accounting-bookkeeping/\"}]}",
    title: "Accounting & Bookkeeping Services in Canada",
    hero_eyebrow: "Accounting Services for Businesses",
    hero_title: "Accounting & Bookkeeping Services in Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional accounting and bookkeeping services designed to help businesses maintain clear, organized, and reliable financial records. Our approach is practical and personalized.",
    hero_banner: "/images/accounting-bookkeeping-banner.png",
    content_image: "/images/658.png",
    section_eyebrow: "Bookkeeping Setup & Ongoing Support",
    section_title: "Accounting & Bookkeeping Solutions",
    intro: "Consistent bookkeeping is an important part of maintaining accurate financial records and understanding the financial position of your business. DeFreitas & Associates provides comprehensive bookkeeping services to help businesses keep their financial information organized and up to date. Whether you require assistance establishing your bookkeeping process or ongoing support, our team can work with you based on your business requirements.",
    section_list_title: "Our Accounting & Bookkeeping Services:",
    services_list: [
      "Comprehensive Bookkeeping Services",
      "Bookkeeping Setup & Ongoing Consultation",
      "WSIB Filing & Remittances",
      "Financial Statement Preparation",
      "Notice to Reader / Compilation Engagement Financial Statements",
      "Monthly Bank and Credit Card Reconciliations"
    ],
    body: "A well-organized bookkeeping process can make it easier to manage financial information as your business operates and grows. We provide bookkeeping setup and ongoing consultation to help businesses establish and maintain an appropriate bookkeeping process. Our support is tailored to your business, allowing you to receive professional guidance when you need it.",
    card_title: "Get Your Books Up-To-Date",
    card_text: "Looking for professional accounting services in Canada or reliable bookkeeping services for your business? Contact DeFreitas & Associates. We can discuss your requirements and determine the appropriate level of accounting and bookkeeping support for your business.",
    card_button_text: "Consult Our Bookkeeping Team",
    faq_items: [
      {
        q: "What bookkeeping services does DeFreitas & Associates provide?",
        a: "Our bookkeeping services include comprehensive bookkeeping, bookkeeping setup, and ongoing consultation. We work with businesses to understand their requirements and provide bookkeeping services suited to their needs."
      },
      {
        q: "Can you help set up bookkeeping for my business?",
        a: "Yes. DeFreitas & Associates provides bookkeeping setup and consultation to help businesses establish an organized bookkeeping process. In addition to bookkeeping setup, we provide ongoing consultation and comprehensive bookkeeping services."
      },
      {
        q: "Do you assist with WSIB filing and remittances?",
        a: "Yes. WSIB filing and remittances are included within our accounting and bookkeeping services."
      },
      {
        q: "Do you prepare financial statements?",
        a: "Yes. DeFreitas & Associates provides financial statement preparation as part of our accounting services. We work with businesses to prepare clear and organized financial information based on their requirements."
      },
      {
        q: "Do you also provide tax services?",
        a: "Yes. Tax services are provided separately through our Tax Advisory Services, including personal and corporate tax preparation and other tax matters within our scope of services."
      }
    ],
    cta_eyebrow: "Financial Record Management",
    cta_title: "Automate your financial records with senior CPA oversight",
    cta_subtitle: "Gain absolute clarity over cash flows, profit margins, and monthly tax obligations with our dedicated bookkeeping team.",
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

      {/* ===== FAQS ===== */}
      <FAQSection 
        items={data.faq_items} 
        title="Frequently Asked Questions About Accounting & Bookkeeping" 
        subtitle="Common questions regarding financial record keeping, compilation engagements, and bookkeeping services in Canada."
      />

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
