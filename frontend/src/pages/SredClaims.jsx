import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

const defaultSredData = {
  seo_title: "SR&ED Tax Credit Services Canada | DeFreitas & Associates",
  seo_description: "DeFreitas & Associates, based in Toronto, Canada, provides professional SR&ED tax credit services for businesses involved in research, development, innovation, and technological advancement.",
  canonical_url: "https://defreitas-consulting.ca/sred-tax-credits/",
  breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://defreitas-consulting.ca/services/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"SR&ED Tax Credits\",\"item\":\"https://defreitas-consulting.ca/sred-tax-credits/\"}]}",
  title: "SR&ED Tax Credit Services in Canada",
  hero_eyebrow: "Scientific Research & Experimental Development",
  hero_title: "SR&ED Tax Credit Services in Canada",
  hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional SR&ED tax credit services for businesses involved in research, development, innovation, and technological advancement.",
  hero_overview: "If your business is developing or improving products, processes, technologies, or technical capabilities, your activities may be worth reviewing under Canada’s Scientific Research & Experimental Development (SR&ED) tax incentive program.\n\nOur team provides practical SR&ED consulting and tax support to help businesses understand the process, review their circumstances, and prepare their SR&ED claims.",
  hero_banner: "/images/sred-hero.jpg",
  consulting_title: "SR&ED Consulting & Tax Credit Support",
  consulting_content: "Preparing an SR&ED tax credit claim involves both the work performed and the expenditures associated with eligible activities.\n\nAs an SR&ED consultant in Canada, DeFreitas & Associates works with businesses to review their research and development activities and provide professional guidance throughout the SR&ED claim process.\n\nOur SR&ED tax credit services can also complement broader Tax Advisory Services and Accounting & Bookkeeping Services when additional tax, accounting, or financial support is required.",
  services_list_title: "Our SR&ED Services",
  services_list_intro: "Our SR&ED consulting services include support with:",
  services_list: [
    "Reviewing potential SR&ED activities",
    "SR&ED tax credit claims",
    "SR&ED claim preparation and filing support",
    "Supporting financial information and documentation",
    "Tax-related SR&ED matters",
    "CRA-related SR&ED matters"
  ],
  services_list_closing: "Every business and project is different. We take the time to understand your activities and determine how we can assist with your SR&ED tax credit requirements.",
  content_image: "/images/sred-turning-innovation.jpg",
  card_title: "Talk to an SR&ED Consultant",
  card_text: "Whether assessing potential research activities or organizing documentation for filing, speak with our SR&ED specialists today.",
  card_button_text: "Talk to an SR&ED Consultant",
  affiliation_text: "OUR FIRM IS A PROUD MEMBER OF THE CANADIAN TAX FOUNDATION AND THE EFILE ASSOCIATION OF CANADA",
  faq_items: [
    {
      q: "What is the SR&ED tax credit?",
      a: "The Scientific Research & Experimental Development (SR&ED) program is a Canadian tax incentive program that supports eligible research and development activities.\n\nBusinesses conducting qualifying work may be able to claim SR&ED tax incentives based on eligible activities and expenditures."
    },
    {
      q: "What types of businesses may qualify for SR&ED?",
      a: "SR&ED is not limited to one particular industry. Businesses involved in research, experimentation, technological development, or improvements to products and processes may have activities worth reviewing for potential SR&ED eligibility.\n\nEligibility depends on the nature of the work performed and the applicable program requirements."
    },
    {
      q: "Does my business need a dedicated R&D department to consider SR&ED?",
      a: "Not necessarily. Research and development activities can take place as part of regular operations, product development, technical work, or process improvement.\n\nWhat matters is the nature of the work being performed, rather than whether your company has a department formally labelled “R&D.”"
    },
    {
      q: "What information is needed for an SR&ED claim?",
      a: "An SR&ED claim generally requires information about the work performed and the expenditures associated with eligible activities.\n\nMaintaining appropriate technical and financial records can help support SR&ED claim preparation and the overall filing process."
    },
    {
      q: "Can an SR&ED consultant help with claim preparation?",
      a: "An SR&ED consultant can help businesses review potential SR&ED activities, understand the claim process, and organize relevant information for the preparation of an SR&ED tax credit claim.\n\nDeFreitas & Associates provides SR&ED consulting and tax support based on the circumstances and requirements of each client."
    },
    {
      q: "Can you help with the financial side of an SR&ED claim?",
      a: "Yes. DeFreitas & Associates can assist with the tax and financial aspects of SR&ED matters within our scope of services.\n\nBusinesses requiring broader financial reporting or bookkeeping support can also explore our Accounting & Bookkeeping Services."
    },
    {
      q: "Can you assist with CRA-related SR&ED matters?",
      a: "We can review CRA-related SR&ED matters and determine how our team can assist based on the circumstances involved."
    },
    {
      q: "Is SR&ED only for large companies?",
      a: "No. Businesses of different sizes may conduct activities that fall within the SR&ED program. Eligibility depends on the applicable requirements and the nature of the work and expenditures involved."
    }
  ],
  cta_eyebrow: "SR&ED Consultation",
  cta_title: "Talk to an SR&ED Consultant",
  cta_subtitle: "If you are looking for an SR&ED consultant in Canada or professional support with an SR&ED tax credit claim, contact DeFreitas & Associates to discuss your requirements.",
  cta_primary_btn: "Schedule Consultation",
  cta_secondary_btn: "Explore Business Financing"
};

export default function SredClaims({ onOpenStrategy }) {
  const [data, setData] = useState(defaultSredData);

  useEffect(() => {
    fetchPageContent('sred')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default SRED data:", err.message));
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
        style={{ backgroundImage: `url(${data.hero_banner || '/images/sred-hero.jpg'})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>SR&amp;ED Tax Credits</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Scientific Research & Experimental Development"}</span>
            <h1>{data.hero_title}</h1>
            <p style={{ marginBottom: '1rem' }}>{data.hero_subtitle}</p>
            {data.hero_overview && data.hero_overview.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ opacity: 0.95, fontSize: '1.02rem', marginTop: '.5rem', lineHeight: '1.65' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT & ADVISORY SECTIONS ===== */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              
              {/* Section 1: SR&ED Consulting & Tax Credit Support */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1.2rem', color: 'var(--ink)' }}>
                  {data.consulting_title || "SR&ED Consulting & Tax Credit Support"}
                </h2>
                {data.consulting_content && data.consulting_content.split('\n\n').map((paragraph, pIdx) => {
                  // If paragraph mentions Tax Advisory Services or Accounting & Bookkeeping Services, enrich with clickable internal links
                  if (paragraph.includes('Tax Advisory Services') || paragraph.includes('Accounting & Bookkeeping Services')) {
                    return (
                      <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                        Our SR&amp;ED tax credit services can also complement broader{' '}
                        <Link to="/tax-advisory" style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}>
                          Tax Advisory Services
                        </Link>{' '}
                        and{' '}
                        <Link to="/accounting-bookkeeping" style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}>
                          Accounting &amp; Bookkeeping Services
                        </Link>{' '}
                        when additional tax, accounting, or financial support is required.
                      </p>
                    );
                  }
                  return (
                    <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Section 2: Our SR&ED Services */}
              <div className="content-block" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '.6rem', color: 'var(--ink)' }}>
                  {data.services_list_title || "Our SR&ED Services"}
                </h2>
                <p style={{ marginBottom: '1.25rem', color: 'var(--ink-soft)', fontWeight: '500' }}>
                  {data.services_list_intro || "Our SR&ED consulting services include support with:"}
                </p>

                <ul className="feature-list" style={{ marginTop: '1rem', marginBottom: '1.8rem' }}>
                  {(data.services_list || []).map((item, idx) => (
                    <li key={idx} style={{ alignItems: 'flex-start' }}>
                      <span className="ico" style={{ width: '28px', height: '28px', minWidth: '28px', marginTop: '3px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      <span style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {data.services_list_closing && (
                  <p style={{ lineHeight: '1.75', color: 'var(--ink-soft)', marginTop: '1rem' }}>
                    {data.services_list_closing}
                  </p>
                )}

                <div style={{ marginTop: '2rem', padding: '1.2rem 1.4rem', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid var(--mint-600)' }}>
                  <span style={{ color: 'var(--ink)' }}>Businesses looking for broader financial support can also explore our </span>
                  <Link to="/business-financing" style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}>
                    Business Financing Services
                  </Link>.
                </div>
              </div>

            </div>

            {/* Sticky Sidebar with Photo, Strategy Card, and Canadian Tax Foundation Badge */}
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img 
                  src={data.content_image || '/images/sred-turning-innovation.jpg'} 
                  alt="SR&ED Claim Preparation and Advisory" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/sred-turning-innovation.jpg';
                  }}
                />
              </div>

              <div style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', margin: 0 }}>
                  {data.card_title || "Talk to an SR&ED Consultant"}
                </h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem', lineHeight: '1.6' }}>
                  {data.card_text || "Whether assessing potential research activities or organizing documentation for filing, speak with our SR&ED specialists today."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Talk to an SR&ED Consultant"} <span className="arr">→</span>
                </button>
              </div>

              {data.affiliation_text && (
                <div style={{ 
                  marginTop: '1.8rem', background: 'var(--mint-50)', padding: '1.4rem 1.8rem', 
                  borderRadius: '12px', borderLeft: '5px solid var(--mint-600)' 
                }}>
                  <b style={{ color: 'var(--mint-700)', fontSize: '.88rem', letterSpacing: '.05em', lineHeight: '1.5', display: 'block' }}>
                    {data.affiliation_text}
                  </b>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQS (8 Complete FAQs) ===== */}
      <FAQSection 
        items={data.faq_items} 
        title="Frequently Asked Questions" 
        subtitle="Common questions regarding eligibility, documentation, and claiming SR&ED tax incentives in Canada."
      />

      {/* ===== CTA BAND ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "SR&ED Consultation"}</span>
          <h2>{data.cta_title || "Talk to an SR&ED Consultant"}</h2>
          <p>{data.cta_subtitle || "If you are looking for an SR&ED consultant in Canada or professional support with an SR&ED tax credit claim, contact DeFreitas & Associates to discuss your requirements."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Schedule Consultation"} <span className="arr">→</span>
            </button>
            <Link to="/business-financing" className="btn btn-soft">
              {data.cta_secondary_btn || "Explore Business Financing"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
