import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent } from '../api';
import SEOHead from '../components/SEOHead';

export default function Services({ onOpenStrategy }) {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState({
    seo_title: "Business & Tax Advisory Services | DeFreitas & Associates Canada",
    seo_description: "DeFreitas & Associates provides tailored business consulting, tax planning, bookkeeping, and advisory services to support growing businesses in Canada.",
    canonical_url: "https://defreitas-consulting.ca/services/",
    breadcrumb_schema: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://defreitas-consulting.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://defreitas-consulting.ca/services/\"}]}",
    title: "Business & Tax Advisory Services | DeFreitas & Associates Canada",
    hero_eyebrow: "Services & Pricing",
    hero_title: "Clear plans, fixed fees, no surprise bills",
    hero_subtitle: "Select a service bundle tailored to your corporate stage, or customize a package with our senior CPA team. Every plan includes dedicated advisory and total CRA compliance.",
    catalog_eyebrow: "Full Service Catalog",
    catalog_title: "Pick the exact help you need",
    catalog_services: [
      {
        cat: 'tax',
        title: 'Corporate T2 Tax Returns',
        meta: 'Tax & Compliance',
        desc: 'Professional corporate tax preparation and T2 filing support, including tax planning and assistance with CRA reviews and audits.',
        fee: 'From $1,100 / filing',
        link: '/tax-advisory'
      },
      {
        cat: 'tax',
        title: 'Personal T1 Tax Returns',
        meta: 'Tax & Compliance',
        desc: 'Professional personal tax preparation and T1 filing for individuals, with practical tax planning and advisory support.',
        fee: 'From $200 / filing',
        link: '/tax-advisory'
      },
      {
        cat: 'bookkeeping',
        title: 'Business Bookkeeping Services',
        meta: 'Accounting & Bookkeeping',
        desc: 'Professional bookkeeping services with bookkeeping setup, ongoing consultation, and organized financial record support for businesses.',
        fee: 'From $249 / month',
        link: '/accounting-bookkeeping'
      },
      {
        cat: 'bookkeeping',
        title: 'Financial Statements & WSIB Support',
        meta: 'Accounting & Bookkeeping',
        desc: 'Professional financial statement preparation, along with WSIB filing and remittance support for businesses.',
        fee: 'From $99 / month',
        link: '/accounting-bookkeeping'
      },
      {
        cat: 'sred',
        title: 'SR&ED Tax Credit Claim Support',
        meta: 'SR&ED Tax Credit',
        desc: 'Professional SR&ED tax credit support, including claim preparation, financial information and documentation, and related tax matters.',
        fee: 'Success-based 15% fee',
        link: '/sred-tax-credits'
      },
      {
        cat: 'financing',
        title: 'Business Financing & Lender Preparation',
        meta: 'Business Financing',
        desc: 'Professional financing support, including financial statement and projection preparation for lenders, and business plans for financing.',
        fee: 'From $1,500 one-off',
        link: '/business-financing'
      },
      {
        cat: 'incorporation',
        title: 'Business Incorporation & Registration',
        meta: 'Incorporation & Registration',
        desc: 'Professional guidance and support for business incorporation, business registration, and business setup.',
        fee: 'From $599 package',
        link: '/incorporation-business-registration'
      }
    ],
    pricing_eyebrow: "Structured Packages",
    pricing_title: "Predictable monthly pricing, maximum value",
    pricing_subtitle: "All plans include senior CPA counsel, cloud software integration, and year-round compliance support with no hidden fees.",
    packages: [
      {
        name: "Sole Proprietor",
        price: "$199",
        period: "/mo",
        subtitle: "For freelancers, contractors & consultants",
        featured: false,
        features: [
          "Annual T1 Personal Tax Return",
          "Cloud Bookkeeping & Bank Feeds",
          "GST/HST Filing & Remittances",
          "Direct Phone & Email Support"
        ],
        button_text: "Select Plan"
      },
      {
        name: "Growth Corporation",
        price: "$499",
        period: "/mo",
        subtitle: "For incorporated companies & CCPCs",
        featured: true,
        features: [
          "Everything in Sole Proprietor",
          "Corporate T2 Tax Return & Financials",
          "Quarterly Notice to Reader Statements",
          "Payroll for up to 5 Employees",
          "Salary vs. Dividend Tax Optimization"
        ],
        button_text: "Select Plan"
      },
      {
        name: "Executive Scale",
        price: "$999",
        period: "/mo",
        subtitle: "For high-growth & multi-entity firms",
        featured: false,
        features: [
          "Everything in Growth Corporation",
          "Fractional CFO Advisory Support",
          "Full SR&ED Claim Management",
          "Priority CRA Audit Representation"
        ],
        button_text: "Select Plan"
      }
    ],
    cta_eyebrow: "Not Sure Which Plan You Need?",
    cta_title: "Let's build a customized solution",
    cta_subtitle: "Speak directly with our senior CPA partners in Toronto. We will assess your requirements and tailor an exact service plan.",
    cta_primary_btn: "Book Free Consultation",
    cta_secondary_btn: "Back to Home"
  });

  useEffect(() => {
    fetchPageContent('services')
      .then(res => { if (res) setData(prev => ({ ...prev, ...res })); })
      .catch(err => console.warn("Using default Services data:", err.message));
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const catalogItems = data.catalog_services || [];
  const filtered = filter === 'all' ? catalogItems : catalogItems.filter(s => s.cat === filter);
  const packageItems = data.packages || [];

  return (
    <div>
      <SEOHead 
        title={data.seo_title}
        description={data.seo_description}
        canonical={data.canonical_url}
        breadcrumbSchema={data.breadcrumb_schema}
      />
      {/* ===== PAGE HERO ===== */}
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb"><Link to="/">Home</Link> / <span>Services &amp; Pricing</span></div>
          <span className="eyebrow center">{data.hero_eyebrow || "Services & Pricing"}</span>
          <h1>{data.hero_title || "Clear plans, fixed fees, no surprise bills"}</h1>
          <p>{data.hero_subtitle || "Select a service bundle tailored to your corporate stage, or customize a package with our senior CPA team. Every plan includes dedicated advisory and total CRA compliance."}</p>
        </div>
      </section>

      {/* ===== FILTERABLE CATALOG ===== */}
      <section className="section" id="services-catalog">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">{data.catalog_eyebrow || "Full Service Catalog"}</span>
            <h2>{data.catalog_title || "Pick the exact help you need"}</h2>
          </div>

          <div className="filter-bar" role="tablist">
            <button className={`filter ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All Services</button>
            <button className={`filter ${filter === 'tax' ? 'active' : ''}`} onClick={() => handleFilterChange('tax')}>Tax &amp; Compliance</button>
            <button className={`filter ${filter === 'bookkeeping' ? 'active' : ''}`} onClick={() => handleFilterChange('bookkeeping')}>Bookkeeping &amp; Payroll</button>
            <button className={`filter ${filter === 'sred' ? 'active' : ''}`} onClick={() => handleFilterChange('sred')}>SR&amp;ED Claims</button>
            <button className={`filter ${filter === 'financing' ? 'active' : ''}`} onClick={() => handleFilterChange('financing')}>Business Financing</button>
            <button className={`filter ${filter === 'incorporation' ? 'active' : ''}`} onClick={() => handleFilterChange('incorporation')}>Incorporation</button>
          </div>

          <div className="cat-grid">
            {filtered.map((item, idx) => (
              <article key={idx} className="cat-card">
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7h6M9 11h6M9 15h4"/><rect x="5" y="3" width="14" height="18" rx="2"/></svg>
                </span>
                <div className="meta">{item.meta}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="from">
                  <b>{item.fee}</b>
                  <div style={{ marginTop: '.6rem' }}>
                    <Link to={item.link} style={{ color: 'var(--mint-700)', fontWeight: '600', fontSize: '.88rem' }}>
                      Learn More &amp; Scope →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MONTHLY PACKAGES ===== */}
      <section className="section soft" id="pricing">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">{data.pricing_eyebrow || "Structured Packages"}</span>
            <h2>{data.pricing_title || "Predictable monthly pricing, maximum value"}</h2>
            <p>{data.pricing_subtitle || "All plans include senior CPA counsel, cloud software integration, and year-round compliance support with no hidden fees."}</p>
          </div>

          <div className="price-grid">
            {packageItems.map((plan, idx) => (
              <article key={idx} className={`plan ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <span className="tag">Most Popular</span>}
                <div className="plan-name">{plan.name}</div>
                <div className="price">{plan.price}<span className="per">{plan.period || '/mo'}</span></div>
                <div className="price-sub">{plan.subtitle}</div>
                <ul>
                  {(plan.features || []).map((feat, fIdx) => (
                    <li key={fIdx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      {' '}{feat}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onOpenStrategy} 
                  className={`btn ${plan.featured ? 'btn-light' : 'btn-ghost'}`} 
                  style={{ justifyContent: 'center' }}
                >
                  {plan.button_text || "Select Plan"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow center light">{data.cta_eyebrow || "Not Sure Which Plan You Need?"}</span>
          <h2>{data.cta_title || "Let's build a customized solution"}</h2>
          <p>{data.cta_subtitle || "Speak directly with our senior CPA partners in Toronto. We will assess your requirements and tailor an exact service plan."}</p>
          <div className="hero-actions">
            <button onClick={onOpenStrategy} className="btn btn-light">
              {data.cta_primary_btn || "Book Free Consultation"} <span className="arr">→</span>
            </button>
            <Link to="/" className="btn btn-soft">{data.cta_secondary_btn || "Back to Home"}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
