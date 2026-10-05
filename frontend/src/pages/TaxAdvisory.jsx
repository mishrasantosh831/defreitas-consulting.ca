import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

export default function TaxAdvisory({ onOpenStrategy }) {
  const [data, setData] = useState({
    seo_title: "Tax Consultant & Advisory Services Toronto | DeFreitas & Associates",
    seo_description: "DeFreitas & Associates is a tax consulting firm in Toronto, Canada, providing professional tax advisory, tax consultancy and tax services for businesses.",
    canonical_url: "https://defreitas-consulting.ca/tax-advisory/",
    breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://defreitas-consulting.ca/services/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Tax Advisory\",\"item\":\"https://defreitas-consulting.ca/tax-advisory/\"}]}",
    title: "Tax Consultant & Tax Advisory Services in Canada",
    hero_eyebrow: "Professional Tax Consultants & Tax Advisors",
    hero_title: "Tax Consultant & Tax Advisory Services in Canada",
    hero_subtitle: "DeFreitas & Associates, based in Toronto, Canada, provides professional tax consulting, advisory, preparation, and filing services to individuals and businesses. Whether you need help preparing a tax return, planning ahead, responding to a tax matter, or understanding your obligations, our team offers practical guidance based on your specific circumstances.",
    hero_banner: "/images/tax-advisory-banner.png",
    content_image: "/images/648.png",
    section_eyebrow: "Tax Planning Services",
    section_title: "GST/HST Tax Services",
    intro: "Good tax planning is about more than meeting filing deadlines. It's about understanding your obligations, anticipating potential issues, and making informed decisions throughout the year. Our tax consultants work with employed and self-employed individuals, proprietorships, partnerships, small and mid-sized businesses, and corporations on a variety of tax planning and advisory matters.",
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
    affiliation_text: "OUR FIRM IS A PROUD MEMBER OF THE CANADIAN TAX FOUNDATION AND THE EFILE ASSOCIATION OF CANADA",
    card_title: "Corporate & Business Tax Advisory",
    card_text: "Whether dealing with an overdue corporate T2 return, CRA audit letter, or cross-border asset disposition, speak with our senior tax consultants today.",
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
        q: "Do you provide SR&ED tax credit services?",
        a: "Yes. We provide services related to the Scientific Research & Experimental Development (SR&ED) Tax Credit. Visit our SR&ED Tax Credit Services page to learn more."
      }
    ],
    cta_eyebrow: "Tax Reviews, Objections & Appeals",
    cta_title: "Talk to a Tax Consultant",
    cta_subtitle: "Tax matters can be straightforward or complex, but getting the right guidance can make the process easier to manage. If you're looking for a tax consultant in Canada, a professional tax advisor, or an experienced tax firm, contact DeFreitas & Associates to discuss your personal or business tax needs.",
    cta_primary_btn: "Schedule Free Consultation",
    cta_secondary_btn: "View Pricing Plans"
  });

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
        style={{ backgroundImage: `url(${data.hero_banner})` }}
      >
        <div className="wrap">
          <div className="service-hero-copy">
            <div className="crumb">
              <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>Tax Advisory &amp; Filing</span>
            </div>
            <span className="eyebrow">{data.hero_eyebrow || "Executive CPA Tax Practice"}</span>
            <h1>{data.hero_title}</h1>
            <p>{data.hero_subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{data.section_eyebrow || "Canada Revenue Agency Representation"}</span>
            <h2>{data.section_title || "Complete Corporate & Individual Tax Scope"}</h2>
            <p>{data.intro}</p>
          </div>

          <div className="split">
            <div className="split-copy">
              <ul className="feature-list">
                {data.services_list.map((item, idx) => (
                  <li key={idx} style={{ alignItems: 'flex-start' }}>
                    <span className="ico" style={{ width: '30px', height: '30px', minWidth: '30px', marginTop: '3px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ 
                marginTop: '2.5rem', background: 'var(--mint-50)', padding: '1.4rem 1.8rem', 
                borderRadius: '12px', borderLeft: '5px solid var(--mint-600)' 
              }}>
                <b style={{ color: 'var(--mint-700)', fontSize: '.88rem', letterSpacing: '.05em' }}>
                  {data.affiliation_text}
                </b>
              </div>
            </div>

            <div className="split-media">
              <div className="frame" style={{ aspectRatio: '4/3' }}>
                <img src={data.content_image} alt="CPA Tax Preparation" />
              </div>
              <div style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 'var(--r)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
                <h3>{data.card_title || "Need Strategic Tax Advisory?"}</h3>
                <p style={{ color: 'var(--ink-soft)', margin: '.8rem 0 1.5rem', fontSize: '.92rem' }}>
                  {data.card_text || "Whether dealing with an overdue corporate T2 return, CRA audit letter, or cross-border asset disposition, speak with our senior partners today."}
                </p>
                <button onClick={onOpenStrategy} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
                  {data.card_button_text || "Book Tax Strategy Call"} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQS ===== */}
      <FAQSection 
        items={data.faq_items} 
        title="Frequently Asked Questions About Tax Services" 
        subtitle="Common questions about Canadian personal and corporate tax planning, preparation, audits, and CRA representation."
      />

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Eliminate CRA Surprises"}</span>
          <h2>{data.cta_title || "Proactive tax advisory throughout the entire calendar year"}</h2>
          <p>{data.cta_subtitle || "We work closely with Canadian entrepreneurs, incorporated professionals, and multi-entity businesses to minimize tax liabilities legally and reliably."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">{data.cta_primary_btn || "Schedule Free Consultation"} <span className="arr">→</span></button>
            <Link to="/services" className="btn btn-soft">{data.cta_secondary_btn || "View Pricing Plans"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
