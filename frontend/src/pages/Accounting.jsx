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
    hero_eyebrow: "Accounting & Bookkeeping Services",
    hero_title: "Accounting & Bookkeeping Services in Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional accounting and bookkeeping services designed to help businesses maintain clear, organized, and reliable financial records.",
    hero_overview: "Our approach is practical and personalized. We work with businesses to understand their bookkeeping and accounting requirements and provide the level of support that best fits their needs.",
    hero_banner: "/images/accounting-bookkeeping-banner.png",
    hero_banner_alt: "Accounting & Bookkeeping Services in Canada",
    content_image: "/images/658.png",
    content_image_alt: "DeFreitas & Associates Accounting & Bookkeeping Services",
    
    bookkeeping_title: "Comprehensive Bookkeeping Services",
    bookkeeping_content: "Consistent bookkeeping is an important part of maintaining accurate financial records and understanding the financial position of your business.\n\nDeFreitas & Associates provides comprehensive bookkeeping services to help businesses keep their financial information organized and up to date.\n\nWhether you require assistance establishing your bookkeeping process or ongoing support, our team can work with you based on your business requirements.\n\nFor assistance with corporate tax, GST/HST, and other taxation matters, explore our [Tax Advisory Services].",
    
    setup_title: "Bookkeeping Setup & Ongoing Consultation",
    setup_content: "A well-organized bookkeeping process can make it easier to manage financial information as your business operates and grows.\n\nWe provide bookkeeping setup and ongoing consultation to help businesses establish and maintain an appropriate bookkeeping process.\n\nOur support is tailored to your business, allowing you to receive professional guidance when you need it.",
    
    wsib_title: "WSIB Filing & Remittances",
    wsib_content: "DeFreitas & Associates assists businesses with WSIB filing and remittances.\n\nWe work with clients to help ensure the necessary information is properly organized and filing requirements are addressed within the scope of our accounting and bookkeeping services.",
    
    financial_statements_title: "Financial Statement Preparation",
    financial_statements_content: "Clear financial statements provide important information about the financial position and performance of a business.\n\nDeFreitas & Associates provides financial statement preparation as part of our professional accounting services, helping businesses maintain useful and organized financial information.\n\nBusinesses that require financial statements as part of a financing process can also explore our [Business Financing Services].",
    
    card_title: "Professional Accounting Services",
    card_text: "If you are looking for professional accounting services in Canada or reliable bookkeeping services for your business, contact DeFreitas & Associates.\n\nWe can discuss your requirements and determine the appropriate level of accounting and bookkeeping support for your business.",
    card_button_text: "Contact DeFreitas & Associates",
    
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Common questions regarding bookkeeping setup, ongoing consultation, WSIB remittances, and financial statement preparation.",
    faq_items: [
      {
        q: "What bookkeeping services does DeFreitas & Associates provide?",
        a: "Our bookkeeping services include comprehensive bookkeeping, bookkeeping setup, and ongoing consultation.\n\nWe work with businesses to understand their requirements and provide bookkeeping services suited to their needs."
      },
      {
        q: "Can you help set up bookkeeping for my business?",
        a: "Yes. DeFreitas & Associates provides bookkeeping setup and consultation to help businesses establish an organized bookkeeping process.\n\nIn addition to bookkeeping setup, we provide ongoing consultation and comprehensive bookkeeping services."
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
        a: "Yes. Tax services are provided separately through our [Tax Advisory Services], including personal and corporate tax preparation and other tax matters within our scope of services."
      }
    ],
    cta_eyebrow: "Accounting & Bookkeeping in Canada",
    cta_title: "Looking for Professional Accounting or Bookkeeping Support?",
    cta_subtitle: "If you are looking for professional accounting services in Canada or reliable bookkeeping services for your business, contact DeFreitas & Associates. We can discuss your requirements and determine the appropriate level of accounting and bookkeeping support for your business.",
    cta_primary_btn: "Contact Us Today",
    cta_secondary_btn: "Explore Tax Advisory"
  });

  useEffect(() => {
    fetchPageContent('accounting')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Accounting data:", err.message));
  }, []);

  // Helper to render text with internal markdown-like links [Link Text] or [Link Text](url)
  const renderParagraphWithLinks = (text) => {
    if (!text) return null;
    const regex = /\[(.*?)\](?:\((.*?)\))?/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      let url = match[2];
      if (!url) {
        const lower = label.toLowerCase();
        if (lower.includes('tax')) url = '/tax-advisory';
        else if (lower.includes('accounting') || lower.includes('bookkeeping')) url = '/accounting-bookkeeping';
        else if (lower.includes('financing')) url = '/business-financing';
        else if (lower.includes('sred') || lower.includes('sr&ed')) url = '/sred-tax-credits';
        else if (lower.includes('incorporation') || lower.includes('registration')) url = '/incorporation-business-registration';
        else url = '/services';
      }
      elements.push(
        <Link 
          key={match.index} 
          to={url} 
          style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}
        >
          {label}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }
    return elements;
  };

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
        style={{ backgroundImage: `url(${data.hero_banner || '/images/accounting-bookkeeping-banner.png'})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Accounting &amp; Bookkeeping</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Accounting & Bookkeeping Services"}</span>
            <h1>{data.hero_title || "Accounting & Bookkeeping Services in Canada"}</h1>
            <p style={{ marginBottom: '1rem' }}>
              {data.hero_subtitle}
            </p>
            {data.hero_overview && data.hero_overview.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ opacity: 0.95, fontSize: '1.02rem', marginTop: '.5rem', lineHeight: '1.65' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT SECTIONS & SIDEBAR ===== */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              
              {/* Section 1: Comprehensive Bookkeeping Services */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.bookkeeping_title || "Comprehensive Bookkeeping Services"}
                </h2>
                {data.bookkeeping_content && data.bookkeeping_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(paragraph)}
                  </p>
                ))}
              </div>

              {/* Section 2: Bookkeeping Setup & Ongoing Consultation */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.setup_title || "Bookkeeping Setup & Ongoing Consultation"}
                </h2>
                {data.setup_content && data.setup_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(paragraph)}
                  </p>
                ))}
              </div>

              {/* Section 3: WSIB Filing & Remittances */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.wsib_title || "WSIB Filing & Remittances"}
                </h2>
                {data.wsib_content && data.wsib_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(paragraph)}
                  </p>
                ))}
              </div>

              {/* Section 4: Financial Statement Preparation */}
              <div className="content-block" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.financial_statements_title || "Financial Statement Preparation"}
                </h2>
                {data.financial_statements_content && data.financial_statements_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(paragraph)}
                  </p>
                ))}
              </div>

            </div>

            {/* Sidebar Column: Image & Contact / Consultation Card */}
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img 
                  src={data.content_image || '/images/658.png'} 
                  alt={data.content_image_alt || "Professional Accounting & Bookkeeping Services"} 
                />
              </div>

              <div style={{ marginTop: '2rem', background: 'var(--paper-2)', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)' }}>
                  {data.card_title || "Professional Accounting Services"}
                </h3>
                <div style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem', lineHeight: '1.65' }}>
                  {data.card_text && data.card_text.split('\n\n').map((cardP, cIdx) => (
                    <p key={cIdx} style={{ marginBottom: cIdx > 0 ? 0 : '.5rem' }}>
                      {cardP}
                    </p>
                  ))}
                </div>
                <button 
                  onClick={onOpenStrategy} 
                  className="btn btn-solid" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {data.card_button_text || "Contact DeFreitas & Associates"} <span className="arr">→</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQS ACCORDION SECTION ===== */}
      <FAQSection 
        items={data.faq_items} 
        title={data.faq_title || "Frequently Asked Questions"} 
        subtitle={data.faq_subtitle || "Common questions regarding bookkeeping setup, ongoing consultation, WSIB remittances, and financial statement preparation."}
      />

      {/* ===== CLOSING CTA BAND ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Accounting & Bookkeeping in Canada"}</span>
          <h2>{data.cta_title || "Looking for Professional Accounting or Bookkeeping Support?"}</h2>
          <p>{data.cta_subtitle || "If you are looking for professional accounting services in Canada or reliable bookkeeping services for your business, contact DeFreitas & Associates to discuss your requirements."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Contact Us Today"} <span className="arr">→</span>
            </button>
            <Link to="/tax-advisory" className="btn btn-soft">
              {data.cta_secondary_btn || "Explore Tax Advisory"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
