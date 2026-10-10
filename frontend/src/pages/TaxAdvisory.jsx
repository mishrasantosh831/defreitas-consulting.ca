import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

const defaultTaxAdvisoryData = {
  seo_title: "Tax Consultant & Tax Firm Toronto | DeFreitas & Associates",
  seo_description: "DeFreitas & Associates is a tax consulting firm in Toronto, Canada, providing professional tax advisory, tax consultancy and tax services for businesses.",
  canonical_url: "http://localhost:3000/tax-advisory/",
  breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"http://localhost:3000/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Tax Advisory\",\"item\":\"http://localhost:3000/tax-advisory/\"}]}",
  title: "Professional Tax Advisory & Tax Services in Toronto, Canada",
  hero_eyebrow: "Professional Tax Consultants & Tax Advisors Toronto, Canada",
  hero_title: "Professional Tax Advisory & Tax Services in Toronto, Canada",
  hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional tax consulting, advisory, preparation, and filing services to individuals and businesses. Whether you need help preparing a tax return, planning ahead, responding to a tax matter, or understanding your obligations, our team offers practical guidance based on your specific circumstances.",
  hero_overview: "For those looking for a tax consultant in Canada, a knowledgeable tax advisor, or an experienced tax firm, we provide personalized support across a broad range of personal and business tax matters.",
  hero_banner: "/images/tax-advisory-banner.png",
  advisory_title: "Professional Tax Consultants & Tax Advisors Toronto, Canada",
  h3_experienced_advisors: "Experienced Tax Consultants & Tax Advisors",
  advisory_content: "Good tax planning is about more than meeting filing deadlines. It’s about understanding your obligations, anticipating potential issues, and making informed decisions throughout the year.\n\nOur tax consultants work with employed and self-employed individuals, proprietorships, partnerships, small and mid-sized businesses, and corporations on a variety of tax planning and advisory matters.",
  advisory_link_text: "Accounting & Bookkeeping Services",
  advisory_link_url: "/accounting-bookkeeping",
  personal_corporate_title: "Tax Planning Services Toronto, Canada",
  h3_corporate_tax: "Corporate & Business Tax Advisory",
  personal_corporate_content: "We provide tax preparation, filing, planning, and advisory services for both individuals and businesses.\n\nFor individuals, this includes T1 General personal tax returns, adjustments, and related tax matters. For businesses, we assist with T2 Corporate Tax Returns, Compilation Engagement financial statements, corporate tax planning, and related filing requirements.",
  personal_corporate_link_text: "Business Incorporation Services",
  personal_corporate_link_url: "/incorporation-business-registration",
  cra_matters_title: "GST/HST Tax Services Toronto, Canada",
  cra_matters_content: "Tax questions don’t always end once a return has been filed. We assist clients with GST/HST filings as well as a range of CRA-related matters that may arise afterward.\n\nOur services include personal and corporate tax reviews and audits, GST/HST reviews and audits, tax adjustments, Notices of Objection, tax appeals, and related CRA correspondence.",
  reviews_appeals_title: "Tax Reviews, Objections & Appeals Toronto, Canada",
  cross_border_title: "Non-Resident & Cross-Border Tax Matters",
  cross_border_content: "Certain tax situations become more complex when income, investments, employment, or transactions extend beyond one jurisdiction.\n\nDeFreitas & Associates assists with selected non-resident employment and investment tax matters, Certificates of Compliance, commodity tax transactions, and HST-related cross-border matters.\n\nBecause every situation is different, we review each matter individually to understand the circumstances and determine how we can assist.",
  services_list_title: "Tax Services We Provide",
  services_list_intro: "Our tax services include:",
  services_list: [
    "T1 General Personal Tax Returns",
    "T2 Corporate Tax Returns",
    "T1 Adjustments",
    "Tax Planning & Strategy",
    "GST/HST Filing, Reviews & Audits",
    "T4, T4A and T5 Slips",
    "T4 Summary",
    "GST/HST Rebate Applications",
    "New Housing Rebate (NHR)",
    "New Residential Rental Property (NRRP) Rebate",
    "Personal & Corporate Tax Reviews and Audits",
    "Notices of Objection & Tax Appeals",
    "Non-Resident Tax Matters",
    "Voluntary Tax Disclosure",
    "Commodity & Selected Cross-Border Tax Matters",
    "Scientific Research & Experimental Development (SR&ED) Tax Credit"
  ],
  sred_link_text: "SR&ED Tax Credit Services",
  sred_link_url: "/sred-tax-credits",
  content_image: "/images/648.png",
  affiliation_text: "OUR FIRM IS A PROUD MEMBER OF THE CANADIAN TAX FOUNDATION AND THE EFILE ASSOCIATION OF CANADA",
  card_title: "Talk to a Tax Consultant",
  card_text: "Whether dealing with a corporate T2 return, personal T1 filing, GST/HST audit, or CRA correspondence, speak with our advisors today.",
  card_button_text: "Talk to a Tax Consultant",
  faq_items: [
    {
      q: "What does a tax consultant do?",
      a: "A tax consultant can help you understand your tax obligations, prepare and file returns, plan ahead, and address tax issues as they arise. Depending on your situation, this may include personal or corporate tax matters, GST/HST, tax adjustments, reviews, audits, objections, or appeals."
    },
    {
      q: "Do you provide both personal and corporate tax services?",
      a: "Yes. We work with individuals, self-employed professionals, proprietorships, partnerships, and corporations. Our services include T1 General personal tax returns, T2 Corporate Tax Returns, tax planning, adjustments, and related advisory support."
    },
    {
      q: "Can I work with your tax advisors online?",
      a: "Yes. We can work with clients remotely, making it easier to access professional tax support without an in-person meeting. We serve clients across Canada and may also work with international clients, depending on the nature and jurisdiction of the matter."
    },
    {
      q: "Can you help with CRA reviews and tax audits?",
      a: "Yes. We assist with personal and corporate tax reviews and audits, GST/HST reviews and audits, supporting documentation, and related CRA correspondence."
    },
    {
      q: "Can you help with a Notice of Objection or tax appeal?",
      a: "Yes. We assist with Notices of Objection and tax appeals. We begin by reviewing the circumstances and relevant information so we can determine the appropriate way to support your matter."
    },
    {
      q: "Do you provide GST/HST services?",
      a: "Yes. We assist with GST/HST preparation and filing, reviews and audits, and rebate applications. This includes New Housing Rebate (NHR) and New Residential Rental Property (NRRP) rebate applications."
    },
    {
      q: "Do you handle non-resident and cross-border tax matters?",
      a: "We assist with selected non-resident and cross-border matters, including non-resident employment and investment taxation, Certificates of Compliance, commodity tax transactions, and HST-related cross-border matters.\n\nBecause requirements can vary considerably, each situation is reviewed individually."
    },
    {
      q: "Do you provide SR&ED tax credit services?",
      a: "Yes. We provide services related to the Scientific Research & Experimental Development (SR&ED) Tax Credit. Visit our SR&ED Tax Credit Services page to learn more."
    }
  ],
  cta_eyebrow: "Professional Tax Advisory",
  cta_title: "Talk to a Tax Consultant",
  cta_subtitle: "Tax matters can be straightforward or complex, but getting the right guidance can make the process easier to manage. If you’re looking for a tax consultant in Canada, a professional tax advisor, or an experienced tax firm, contact DeFreitas & Associates to discuss your personal or business tax needs.",
  cta_primary_btn: "Schedule Tax Consultation",
  cta_secondary_btn: "Explore All Services"
};

export default function TaxAdvisory({ onOpenStrategy }) {
  const [data, setData] = useState(defaultTaxAdvisoryData);

  useEffect(() => {
    fetchPageContent('tax_advisory')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Tax Advisory data:", err.message));
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
        style={{ backgroundImage: `url(${data.hero_banner || '/images/tax-advisory-banner.png'})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Tax Advisory &amp; Filing</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Professional Tax Consultants & Tax Advisors"}</span>
            <h1>{data.hero_title}</h1>
            <p style={{ marginBottom: '1rem' }}>{data.hero_subtitle}</p>
            {data.hero_overview && (
              <p style={{ opacity: 0.95, fontSize: '1.05rem', marginTop: '.6rem' }}>{data.hero_overview}</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT & ADVISORY SECTIONS ===== */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split-copy">
              
              {/* Section 1: Tax Consulting & Advisory */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1rem', color: 'var(--ink)' }}>
                  {data.advisory_title || "Professional Tax Consultants & Tax Advisors Toronto, Canada"}
                </h2>
                <h3 style={{ fontSize: '1.22rem', marginBottom: '.8rem', color: 'var(--mint-700)', fontWeight: '600' }}>
                  {data.h3_experienced_advisors || "Experienced Tax Consultants & Tax Advisors"}
                </h3>
                {data.advisory_content && data.advisory_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {paragraph}
                  </p>
                ))}
                <div style={{ marginTop: '1.2rem', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--mint-600)' }}>
                  <span style={{ color: 'var(--ink)' }}>Need ongoing support with your financial records and reporting? Explore our </span>
                  <Link to={data.advisory_link_url || "/accounting-bookkeeping"} style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}>
                    {data.advisory_link_text || "Accounting & Bookkeeping Services"}
                  </Link>.
                </div>
              </div>

              {/* Section 2: Personal & Corporate Tax Services */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1rem', color: 'var(--ink)' }}>
                  {data.personal_corporate_title || "Tax Planning Services Toronto, Canada"}
                </h2>
                <h3 style={{ fontSize: '1.22rem', marginBottom: '.8rem', color: 'var(--mint-700)', fontWeight: '600' }}>
                  {data.h3_corporate_tax || "Corporate & Business Tax Advisory"}
                </h3>
                {data.personal_corporate_content && data.personal_corporate_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {paragraph}
                  </p>
                ))}
                <div style={{ marginTop: '1.2rem', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--mint-600)' }}>
                  <span style={{ color: 'var(--ink)' }}>Starting a new business or corporation? Learn more about our </span>
                  <Link to={data.personal_corporate_link_url || "/incorporation-business-registration"} style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}>
                    {data.personal_corporate_link_text || "Business Incorporation Services"}
                  </Link>.
                </div>
              </div>

              {/* Section 3: GST/HST & CRA Tax Matters */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1rem', color: 'var(--ink)' }}>
                  {data.cra_matters_title || "GST/HST Tax Services Toronto, Canada"}
                </h2>
                {data.cra_matters_content && data.cra_matters_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Section 4: Reviews, Objections, Appeals & Cross-Border */}
              <div className="content-block" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '1rem', color: 'var(--ink)' }}>
                  {data.reviews_appeals_title || "Tax Reviews, Objections & Appeals Toronto, Canada"}
                </h2>
                {data.cross_border_content && data.cross_border_content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.75', color: 'var(--ink-soft)' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Section 5: Tax Services We Provide (List of 16 Services) */}
              <div className="content-block" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.65rem', marginBottom: '.6rem', color: 'var(--ink)' }}>
                  {data.services_list_title || "Tax Services We Provide"}
                </h2>
                <p style={{ marginBottom: '1.25rem', color: 'var(--ink-soft)', fontWeight: '500' }}>
                  {data.services_list_intro || "Our tax services include:"}
                </p>

                <ul className="feature-list">
                  {(data.services_list || []).map((item, idx) => (
                    <li key={idx} style={{ alignItems: 'flex-start' }}>
                      <span className="ico" style={{ width: '28px', height: '28px', minWidth: '28px', marginTop: '3px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      <span style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--mint-600)' }}>
                  <span style={{ color: 'var(--ink)' }}>For more specialized support, visit our </span>
                  <Link to={data.sred_link_url || "/sred-tax-credits"} style={{ color: 'var(--mint-700)', fontWeight: '600', textDecoration: 'underline' }}>
                    {data.sred_link_text || "SR&ED Tax Credit Services"}
                  </Link>
                  <span style={{ color: 'var(--ink)' }}> page.</span>
                </div>
              </div>

            </div>

            {/* Sticky Sidebar with Photo, Strategy Card, and Canadian Tax Foundation Badge */}
            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img 
                  src={data.content_image || '/images/648.png'} 
                  alt="CPA Tax Preparation and Consulting" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/648.png';
                  }}
                />
              </div>

              <div style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', margin: 0 }}>
                  {data.card_title || "Talk to a Tax Consultant"}
                </h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem', lineHeight: '1.6' }}>
                  {data.card_text || "Whether dealing with a corporate T2 return, personal T1 filing, GST/HST audit, or CRA correspondence, speak with our advisors today."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Talk to a Tax Consultant"} <span className="arr">→</span>
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
        subtitle="Common questions about our Canadian tax consulting, advisory, and CRA representation services."
      />

      {/* ===== CTA BAND ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Professional Tax Advisory"}</span>
          <h2>{data.cta_title || "Talk to a Tax Consultant"}</h2>
          <p>{data.cta_subtitle || "Tax matters can be straightforward or complex, but getting the right guidance can make the process easier to manage. If you’re looking for a tax consultant in Canada, a professional tax advisor, or an experienced tax firm, contact DeFreitas & Associates to discuss your personal or business tax needs."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Schedule Tax Consultation"} <span className="arr">→</span>
            </button>
            <Link to="/services" className="btn btn-soft">
              {data.cta_secondary_btn || "Explore All Services"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
