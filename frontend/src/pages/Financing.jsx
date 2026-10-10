import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

export default function Financing({ onOpenStrategy }) {
  const [data, setData] = useState({
    seo_title: "Business Financing Solutions Toronto | DeFreitas & Associates",
    seo_description: "DeFreitas & Associates, based in Toronto, Canada, provides business financing solutions and guidance to help businesses access funding and support their growth.",
    canonical_url: "https://defreitas-consulting.ca/business-financing/",
    breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Business Financing\",\"item\":\"https://defreitas-consulting.ca/business-financing/\"}]}",
    title: "Business Financing Solutions in Toronto, Canada",
    hero_eyebrow: "Business Financing Solutions",
    hero_title: "Business Financing Solutions in Toronto, Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional business financing support for companies preparing to pursue commercial lending and other financing opportunities.",
    hero_overview: "From financial statements and cash flow projections to lender-focused business plans and financing application packages, we help businesses prepare the financial information and documentation needed to present their financing requirements clearly.",
    hero_banner: "/images/business-solution-banner.png",
    hero_banner_alt: "Business Financing Services in Canada",
    content_image: "/images/668.png",
    content_image_alt: "DeFreitas & Associates Business Financing Support",
    
    support_title: "Financial Advisory Services",
    projections_title: "Financial Projections for Business Financing",
    support_intro: "A well-prepared financing application gives lenders a clearer understanding of your business, its financial position, future outlook, and funding requirements.",
    services_list_title: "Our business financing services include:",
    financing_services: [
      {
        title: "Financial Statements for Financing",
        desc: "Preparation of financial statements, including Notice to Reader and Compilation Engagements, to support commercial financing and lender requirements.\n\nFor ongoing financial reporting support, explore our [Accounting & Bookkeeping Services]."
      },
      {
        title: "Business Plans for Financing",
        desc: "Comprehensive business plan preparation designed to present your business, financial outlook, objectives, and funding requirements clearly to commercial lenders."
      },
      {
        title: "Business Loan & Lease Preparation",
        desc: "Support for businesses preparing to pursue commercial equipment lease, loan or working capital financing, with a focus on organizing the financial information required for the financing process."
      },
      {
        title: "CSBFP Application Packages",
        desc: "Support with Canada Small Business Financing Program (CSBFP) application packages, including the preparation and organization of relevant financial information and supporting documentation."
      }
    ],
    
    preparing_title: "Preparing for Business Financing",
    preparing_content: "Commercial lenders typically need a clear picture of both where a business stands today and how it expects to perform going forward.\n\nFinancial statements provide historical context, while financial projections and cash flow modelling help demonstrate the expected financial outlook. A well-prepared business plan brings this information together with the company’s objectives and financing requirements.\n\nDeFreitas & Associates helps businesses prepare these materials as a coordinated financing package, making it easier to present clear, organized financial information to potential lenders.",
    
    card_title: "Preparing for Business Financing",
    card_text: "If your business is preparing to pursue commercial financing, DeFreitas & Associates can help you develop the financial statements, projections, cash flow models, business plan, and supporting documentation required for the process.",
    card_button_text: "Discuss Financing Requirements",
    
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Common questions regarding commercial loan applications, financial projections, and CSBFP packages.",
    faq_items: [
      {
        q: "What business financing services does DeFreitas & Associates provide?",
        a: "Our services include financial statement preparation, multi-year financial projections and detailed cash flow modelling, business plan preparation for commercial lenders, CSBFP application packages, commercial equipment lease and working capital financing support, and capital structure and debt versus equity advisory."
      },
      {
        q: "What should a business prepare before approaching a commercial lender?",
        a: "Requirements vary by lender and financing situation, but businesses may be asked to provide financial statements, financial projections, cash flow forecasts, a business plan, and other supporting information.\n\nWe help prepare and organize the financial information relevant to the financing process."
      },
      {
        q: "Can you prepare financial projections and cash flow models?",
        a: "Yes. We prepare multi-year financial projections and detailed cash flow models to provide a forward-looking view of the business and its financing requirements.\n\nThese materials can help potential lenders better understand expected financial performance and cash flow."
      },
      {
        q: "Can you prepare a business plan for a commercial lender?",
        a: "Yes. We prepare comprehensive business plans for commercial lenders, bringing together relevant information about the business, its objectives, financial outlook, and financing requirements."
      },
      {
        q: "Can you help with a Canada Small Business Financing Program (CSBFP) application?",
        a: "Yes. We assist with the preparation of CSBFP application packages, including relevant financial information and supporting documentation.\n\nEligibility and financing approval remain subject to applicable program and lender requirements."
      },
      {
        q: "Do you provide commercial equipment lease financing support?",
        a: "Yes. We support businesses preparing to pursue commercial equipment lease financing by helping organize the financial information and documentation required for the financing process."
      },
      {
        q: "Can you help with working capital financing?",
        a: "Yes. We provide working capital financing support based on the needs and circumstances of the business, including assistance with preparing relevant financial information and supporting documentation."
      },
      {
        q: "Can you advise on debt versus equity financing?",
        a: "Yes. We provide advisory support on capital structure and debt versus equity considerations.\n\nThe appropriate structure depends on the financial position, financing requirements, and objectives of the individual business."
      },
      {
        q: "Does DeFreitas & Associates provide financing directly?",
        a: "DeFreitas & Associates provides business financing support, financial preparation, and advisory services. Financing decisions, amounts, rates, terms, and approvals remain subject to the applicable lender or financing provider."
      }
    ],
    
    cta_eyebrow: "Commercial Financing Support",
    cta_title: "Discuss Your Business Financing Requirements",
    cta_subtitle: "If your business is preparing to pursue commercial financing, DeFreitas & Associates can help you develop the financial statements, projections, cash flow models, business plan, and supporting documentation required for the process. Contact our team to discuss your business financing requirements and determine how we can assist.",
    cta_primary_btn: "Contact Our Team",
    cta_secondary_btn: "Explore Accounting Services"
  });

  useEffect(() => {
    fetchPageContent('financing')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Financing data:", err.message));
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
        style={{ backgroundImage: `url(${data.hero_banner || '/images/business-solution-banner.png'})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Business Financing</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Business Financing Services"}</span>
            <h1>{data.hero_title || "Business Financing Services in Canada"}</h1>
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
              
              {/* Section 1: Business Financing Support */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.support_title || "Business Financing Support"}
                </h2>
                {data.support_intro && (
                  <p className="lead" style={{ marginBottom: '1.5rem', color: 'var(--ink)' }}>
                    {data.support_intro}
                  </p>
                )}

                {data.services_list_title && (
                  <h4 style={{ marginBottom: '1.2rem', color: 'var(--ink)', fontSize: '1.15rem' }}>
                    {data.services_list_title}
                  </h4>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  {Array.isArray(data.financing_services) && data.financing_services.map((item, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        background: '#ffffff', 
                        padding: '1.4rem 1.6rem', 
                        borderRadius: '10px', 
                        border: '1px solid #e2e8f0', 
                        borderLeft: '4px solid var(--mint-600)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                      }}
                    >
                      <h3 style={{ fontSize: '1.18rem', margin: '0 0 .6rem 0', color: 'var(--ink)' }}>
                        {item.title}
                      </h3>
                      <div style={{ color: 'var(--ink-soft)', lineHeight: '1.7', fontSize: '.96rem' }}>
                        {item.desc && item.desc.split('\n\n').map((descP, dIdx) => (
                          <p key={dIdx} style={{ margin: dIdx > 0 ? '.6rem 0 0' : 0 }}>
                            {renderParagraphWithLinks(descP)}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Preparing for Business Financing */}
              <div className="content-block" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.projections_title || data.preparing_title || "Financial Projections for Business Financing"}
                </h2>
                {data.preparing_content && data.preparing_content.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {renderParagraphWithLinks(para)}
                  </p>
                ))}
              </div>

            </div>

            {/* Sidebar Column: Image & Consultation Card */}
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img 
                  src={data.content_image || '/images/668.png'} 
                  alt={data.content_image_alt || "Commercial Business Financing Support"} 
                />
              </div>

              <div style={{ marginTop: '2rem', background: 'var(--paper-2)', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)' }}>
                  {data.card_title || "Preparing for Business Financing"}
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
                  {data.card_button_text || "Discuss Financing Requirements"} <span className="arr">→</span>
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
        subtitle={data.faq_subtitle || "Common questions regarding commercial loan applications, financial projections, and CSBFP packages."}
      />

      {/* ===== CLOSING CTA BAND ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Commercial Financing Support"}</span>
          <h2>{data.cta_title || "Discuss Your Business Financing Requirements"}</h2>
          <div style={{ maxWidth: '780px', margin: '0 auto 1.8rem auto' }}>
            {data.cta_subtitle && data.cta_subtitle.split('\n\n').map((subP, sIdx) => (
              <p key={sIdx} style={{ margin: sIdx > 0 ? '.6rem 0 0' : 0, opacity: 0.95 }}>
                {subP}
              </p>
            ))}
          </div>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Contact Our Team"} <span className="arr">→</span>
            </button>
            <Link to="/accounting-bookkeeping" className="btn btn-soft">
              {data.cta_secondary_btn || "Explore Accounting Services"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
