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
    hero_eyebrow: "Business Incorporation & Registration",
    hero_title: "Business Incorporation & Registration Services in Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional business incorporation and business registration services for individuals and entrepreneurs establishing a business.",
    hero_overview: "Starting a business involves important decisions from the outset. We provide practical support through the incorporation or business registration process, helping you establish your business on the right footing.",
    hero_banner: "/images/icoopration-business-banner.png",
    hero_banner_alt: "Business Incorporation & Registration Services in Canada",
    content_image: "/images/668.png",
    content_image_alt: "DeFreitas & Associates Incorporation & Business Registration",
    
    incorporation_title: "Business Incorporation Services",
    incorporation_content: "If you are planning to incorporate a business, DeFreitas & Associates can assist with the incorporation process based on your business requirements by helping you navigate the steps involved in establishing your corporation.\n\nOnce your business is established, our [Accounting & Bookkeeping Services] can provide ongoing support with your financial records and reporting.",
    
    registration_title: "Business Registration Services",
    registration_content: "For entrepreneurs establishing a business, we also provide business registration services. We help make the registration process easier to understand and provide professional support based on the needs and structure of your business.\n\nFor ongoing tax preparation, planning, and related taxation matters, explore our [Tax Advisory Services].",
    
    advisory_closing: "DeFreitas & Associates combines business incorporation and registration support with access to accounting, tax, and business advisory services, allowing clients to continue working with our team as their business develops.",
    
    card_title: "Incorporate or Register Your Business",
    card_text: "If you are looking to incorporate or register a business, DeFreitas & Associates can help you navigate the process with professional, personalized support. Contact our team to discuss your business incorporation or registration requirements.",
    card_button_text: "Discuss Incorporation",
    
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Common questions regarding business registration, corporate structures, and requirements in Canada.",
    faq_items: [
      {
        q: "What is the difference between business incorporation and business registration?",
        a: "Business registration and incorporation are different ways of establishing a business.\n\nIncorporation creates a corporation as a separate legal entity, while business registration may apply when establishing and registering another form of business. The appropriate approach depends on your individual circumstances and business requirements."
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
        a: "Yes. Businesses that require ongoing accounting or bookkeeping support can explore our [Accounting & Bookkeeping Services]. Keeping financial records organized from the beginning can make ongoing business administration and reporting easier to manage."
      },
      {
        q: "Can you also help with corporate tax matters?",
        a: "Yes. Corporate taxation is handled through our [Tax Advisory Services], which provides tax preparation, planning, filing, and advisory support within our scope of services."
      },
      {
        q: "Can you help if my new business requires financing?",
        a: "DeFreitas & Associates also provides [Business Financing Services] for businesses preparing to pursue commercial financing."
      }
    ],
    
    cta_eyebrow: "Starting a Business in Canada",
    cta_title: "Incorporate or Register with Professional Confidence",
    cta_subtitle: "If you are looking to incorporate or register a business, DeFreitas & Associates can help you navigate the process with professional, personalized support. Contact our team to discuss your business incorporation or registration requirements.",
    cta_primary_btn: "Contact Our Team",
    cta_secondary_btn: "Explore Tax Advisory"
  });

  useEffect(() => {
    fetchPageContent('incorporation')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Incorporation data:", err.message));
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
        style={{ backgroundImage: `url(${data.hero_banner || '/images/icoopration-business-banner.png'})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Incorporation</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Business Incorporation & Registration"}</span>
            <h1>{data.hero_title || "Business Incorporation & Registration Services in Canada"}</h1>
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
              
              {/* Section 1: Business Incorporation Services */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.incorporation_title || "Business Incorporation Services"}
                </h2>
                {data.incorporation_content && data.incorporation_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(paragraph)}
                  </p>
                ))}
              </div>

              {/* Section 2: Business Registration Services */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.registration_title || "Business Registration Services"}
                </h2>
                {data.registration_content && data.registration_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(paragraph)}
                  </p>
                ))}
              </div>

              {/* Section 3: Advisory Combined Closing */}
              {data.advisory_closing && (
                <div 
                  className="content-block" 
                  style={{ 
                    marginBottom: '2rem',
                    padding: '1.5rem 1.8rem',
                    background: 'var(--mint-50, #f0fdf4)',
                    borderLeft: '4px solid var(--mint-600, #16a34a)',
                    borderRadius: '8px'
                  }}
                >
                  <p style={{ margin: 0, lineHeight: '1.75', color: 'var(--ink)' }}>
                    {renderParagraphWithLinks(data.advisory_closing)}
                  </p>
                </div>
              )}

            </div>

            {/* Sidebar Column: Image & Consultation Card */}
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img 
                  src={data.content_image || '/images/668.png'} 
                  alt={data.content_image_alt || "Business Incorporation and Registration Canada"} 
                />
              </div>

              <div style={{ marginTop: '2rem', background: 'var(--paper-2)', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)' }}>
                  {data.card_title || "Incorporate or Register Your Business"}
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
                  {data.card_button_text || "Discuss Incorporation"} <span className="arr">→</span>
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
        subtitle={data.faq_subtitle || "Common questions regarding business registration, corporate structures, and requirements in Canada."}
      />

      {/* ===== CLOSING CTA BAND ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Starting a Business in Canada"}</span>
          <h2>{data.cta_title || "Incorporate or Register with Professional Confidence"}</h2>
          <p>{data.cta_subtitle || "If you are looking to incorporate or register a business, DeFreitas & Associates can help you navigate the process with professional, personalized support. Contact our team to discuss your business incorporation or registration requirements."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Contact Our Team"} <span className="arr">→</span>
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
