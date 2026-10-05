import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

export default function Financing({ onOpenStrategy }) {
  const [data, setData] = useState({
    seo_title: "Business Financing Solutions Canada | DeFreitas & Associates",
    seo_description: "DeFreitas & Associates, based in Toronto, Canada, provides accounting and bookkeeping services, financial statements and financial reporting for businesses.",
    canonical_url: "https://defreitas-consulting.ca/business-financing/",
    breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://defreitas-consulting.ca/services/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Business Financing\",\"item\":\"https://defreitas-consulting.ca/business-financing/\"}]}",
    title: "Business Financing Solutions in Canada",
    hero_eyebrow: "Financial Advisory Services",
    hero_title: "Business Financing Services in Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional financial statement preparation and loan documentation support for businesses.",
    hero_banner: "/images/business-solution-banner.png",
    content_image: "/images/668.png",
    intro: "A well-prepared financing application gives lenders a clearer understanding of your business, its financial position, future outlook, and funding requirements. From financial statements and cash flow projections to lender-focused business plans and financing application packages, we help businesses prepare the financial information and documentation needed to present their financing requirements clearly.",
    section_eyebrow: "Financial Preparation & Documentation",
    section_title: "Commercial Financing Support",
    section_list_title: "Our Financing Advisory Services Include:",
    services_list: [
      "Financial Statement Preparation – Notice to Reader & Compilation Engagements",
      "Multi-Year Financial Projections & Detailed Cash Flow Modelling",
      "Business Plans for Commercial Lenders",
      "CSBFP Application Packages",
      "Commercial Equipment Lease & Working Capital Financing Support",
      "Capital Structure & Debt vs. Equity Advisory"
    ],
    body: "Commercial lenders typically need a clear picture of both where a business stands today and how it expects to perform going forward. Financial statements provide historical context, while financial projections and cash flow modelling help demonstrate the expected financial outlook. A well-prepared business plan brings this information together with the company’s objectives and financing requirements. DeFreitas & Associates helps businesses prepare these materials as a coordinated financing package, making it easier to present clear, organized financial information to potential lenders.",
    card_title: "Preparing for Business Financing",
    card_text: "Commercial lenders typically need a clear picture of both where a business stands today and how it expects to perform going forward. DeFreitas & Associates helps businesses prepare these materials as a coordinated financing package.",
    card_button_text: "Discuss Financing Requirements",
    faq_items: [
      {
        q: "What business financing services does DeFreitas & Associates provide?",
        a: "Our services include financial statement preparation, multi-year financial projections and detailed cash flow modelling, business plan preparation for commercial lenders, CSBFP application packages, commercial equipment lease and working capital financing support, and capital structure and debt versus equity advisory."
      },
      {
        q: "What should a business prepare before approaching a commercial lender?",
        a: "Requirements vary by lender and financing situation, but businesses may be asked to provide financial statements, financial projections, cash flow forecasts, a business plan, and other supporting information. We help prepare and organize the financial information relevant to the financing process."
      },
      {
        q: "Can you prepare financial projections and cash flow models?",
        a: "Yes. We prepare multi-year financial projections and detailed cash flow models to provide a forward-looking view of the business and its financing requirements. These materials can help potential lenders better understand expected financial performance and cash flow."
      },
      {
        q: "Can you prepare a business plan for a commercial lender?",
        a: "Yes. We prepare comprehensive business plans for commercial lenders, bringing together relevant information about the business, its objectives, financial outlook, and financing requirements."
      },
      {
        q: "Can you help with a Canada Small Business Financing Program (CSBFP) application?",
        a: "Yes. We assist with the preparation of CSBFP application packages, including relevant financial information and supporting documentation. Eligibility and financing approval remain subject to applicable program and lender requirements."
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
        q: "Does DeFreitas & Associates provide financing directly?",
        a: "DeFreitas & Associates provides business financing support, financial preparation, and advisory services. Financing decisions, amounts, rates, terms, and approvals remain subject to the applicable lender or financing provider."
      }
    ],
    cta_eyebrow: "Financial Projections for Business Financing",
    cta_title: "Build lender confidence with CPA-certified financial models",
    cta_subtitle: "If your business is preparing to pursue commercial financing, DeFreitas & Associates can help you develop the financial statements, projections, cash flow models, business plan, and supporting documentation required for the process.",
    cta_primary_btn: "Book Financing Strategy Call",
    cta_secondary_btn: "Contact Us"
  });

  useEffect(() => {
    fetchPageContent('financing')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Financing data:", err.message));
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
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Business Financing</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Growth Capital Advisory"}</span>
            <h1>{data.hero_title}</h1>
            <p>{data.hero_subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              <span className="eyebrow">{data.section_eyebrow || "Institutional Access"}</span>
              <h2>{data.section_title || "Bank-Ready Commercial Financing Packages"}</h2>
              <p className="lead">{data.intro}</p>

              <h4 style={{ marginBottom: '1rem', color: 'var(--ink)' }}>{data.section_list_title || "Our Financing Advisory Services Include:"}</h4>
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
                <img src={data.content_image} alt="Commercial Business Loan Packaging" />
              </div>
              <div style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
                <h3>{data.card_title || "Preparing to Seek Commercial Capital?"}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem' }}>
                  {data.card_text || "Lenders review business proposals critically. Ensure your projections and Notice to Reader statements present your corporate capability in the best light."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Discuss Financing Requirements"} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQS ===== */}
      <FAQSection 
        items={data.faq_items} 
        title="Frequently Asked Questions About Business Financing" 
        subtitle="Common questions regarding commercial loan applications, financial projections, and CSBFP packages."
      />

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Unlock Your Expansion Capital"}</span>
          <h2>{data.cta_title || "Build lender confidence with CPA-certified financial models"}</h2>
          <p>{data.cta_subtitle || "Let's prepare your business for commercial loans, equipment leases, or government backed financing."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">{data.cta_primary_btn || "Book Financing Strategy Call"} <span className="arr">→</span></button>
            <Link to="/contact" className="btn btn-soft">{data.cta_secondary_btn || "Contact Us"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
