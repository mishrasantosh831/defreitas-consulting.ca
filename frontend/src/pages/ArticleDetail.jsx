import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostById, fetchPosts } from '../api';

const DEFAULT_POSTS = [
  {
    id: "1",
    title: "Tax Time Approaching in Canada: Key Deadlines & Preparation Steps",
    category: "Tax Strategy",
    tag: "Tax Season 2026",
    summary: "This is our usual time of year when our firm reminds all our valuable clients and friends in Canada about the crucial corporate installment deadlines and personal tax filing steps.",
    content: `TAX TIME APPROACHING IN CANADA.

Important dates to remember for Canadian corporate and private clients:
• T1 Personal income tax filing deadline is April 30th (June 15th for self-employed individuals).
• T2 Corporate tax return is due 6 months following the corporation's fiscal year-end, while corporate taxes owed are payable 2 to 3 months following year-end depending on whether your company qualifies for the small business deduction.

Early preparation and accurate documentation are essential for ensuring full deduction recovery, taking advantage of capital cost allowance (CCA) opportunities, and safeguarding your enterprise from CRA reassessment audits.

Contact DeFreitas & Associates today to organize your records and ensure prompt filing with the Canada Revenue Agency.`,
    date: "2026-03-01",
    image: "/images/post-tax-season.jpg",
    slug: "tax-time-approaching-in-canada-key-deadlines-preparation-steps",
    seo_title: "Tax Time Approaching in Canada: Key Deadlines & Preparation Steps",
    seo_description: "Essential CRA tax deadlines and preparation steps for Canadian corporations and individuals for the 2026 tax year.",
    seo_keywords: "Canadian Tax Deadlines, T2 Corporate Tax, T1 Personal Tax, CRA Filing 2026, DeFreitas CPAs"
  },
  {
    id: "2",
    title: "DeFreitas & Associates Sponsors Dominica Rising Benefit Gala",
    category: "Firm News",
    tag: "Corporate Sponsor",
    summary: "DeFreitas & Associates (D&A) was proud to be a corporate sponsor supporting the Dominica Rising Benefit Gala hosted by Trade & Investment Commissioner Frances Delsol.",
    content: `DeFreitas & Associates (D&A) was proud to be a corporate sponsor of the Dominica Rising Benefit Gala hosted by the Trade & Investment Commissioner for Dominica (in Canada), Ms. Frances Delsol.

Our firm remains deeply dedicated to philanthropic community leadership, international business partnerships, and supporting sustainable economic empowerment initiatives across both the Caribbean diaspora and North American markets.

We extend our sincere gratitude to Trade & Investment Commissioner Frances Delsol, community leaders, and all benefactors who contributed to an exceptional and memorable gala.`,
    date: "2025-11-15",
    image: "/images/recent-post.jpg",
    slug: "defreitas-associates-sponsors-dominica-rising-benefit-gala",
    seo_title: "DeFreitas & Associates Sponsors Dominica Rising Benefit Gala",
    seo_description: "DeFreitas & Associates proud corporate sponsor of the Dominica Rising Benefit Gala hosted by Trade & Investment Commissioner Frances Delsol.",
    seo_keywords: "Dominica Rising Gala, Frances Delsol, Corporate Sponsorship, DeFreitas & Associates News"
  },
  {
    id: "3",
    title: "DeFreitas & Associates Joins the Canadian Tax Foundation",
    category: "Affiliation",
    tag: "CTF Membership",
    summary: "D&A is proud to announce that the firm's North American affiliated office in Toronto has become a member of the Canadian Tax Foundation (ctf.ca).",
    content: `DeFreitas & Associates (D&A) is proud to announce that the firm’s North American affiliated office in Toronto, Canada has become an active member of the Canadian Tax Foundation (www.ctf.ca).

Membership in the Canadian Tax Foundation further reinforces our capacity to deliver leading-edge tax planning, high-level statutory compliance, and CRA policy insights to our corporate and private wealth clients.

Through active participation in the CTF, our CPA practitioners maintain real-time access to the latest Canadian tax jurisprudence, landmark tax court decisions, and advanced statutory analysis, ensuring our clients receive the most robust tax strategies available in Canada today.`,
    date: "2025-08-20",
    image: "/images/post-tax-foundation.jpg",
    slug: "defreitas-associates-joins-canadian-tax-foundation",
    seo_title: "DeFreitas & Associates Joins the Canadian Tax Foundation",
    seo_description: "DeFreitas & Associates North American affiliated office in Toronto becomes an active member of the prestigious Canadian Tax Foundation.",
    seo_keywords: "Canadian Tax Foundation, CTF Member, Canadian Tax Planning, DeFreitas & Associates Toronto"
  }
];

export default function ArticleDetail({ onOpenStrategy }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch the target article by slug or ID
    fetchPostById(slug)
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("API article lookup failed, checking local defaults:", err.message);
        // Fallback to local default posts
        const match = DEFAULT_POSTS.find(
          p => p.slug === slug || String(p.id) === String(slug)
        );
        if (match) {
          setPost(match);
        } else {
          setError("Article not found");
        }
        setLoading(false);
      });

    // Fetch related articles
    fetchPosts('published')
      .then(res => {
        if (res && res.length) {
          const others = res.filter(p => p.slug !== slug && String(p.id) !== String(slug)).slice(0, 3);
          setRelatedPosts(others);
        }
      })
      .catch(() => {
        const others = DEFAULT_POSTS.filter(p => p.slug !== slug && String(p.id) !== String(slug)).slice(0, 3);
        setRelatedPosts(others);
      });
  }, [slug]);

  // Dynamic SEO Meta Tags & Schema.org JSON-LD injection
  useEffect(() => {
    if (!post) return;

    // 1. Title
    const pageTitle = post.seo_title || `${post.title} — DeFreitas & Associates CPAs`;
    document.title = pageTitle;

    // 2. Meta Description
    const metaDescContent = post.seo_description || post.summary || post.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = metaDescContent;

    // 3. Meta Keywords
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
      metaKeys = document.createElement('meta');
      metaKeys.name = 'keywords';
      document.head.appendChild(metaKeys);
    }
    metaKeys.content = post.seo_keywords || `${post.category}, ${post.tag}, Canadian Tax, DeFreitas & Associates CPAs`;

    // 4. Open Graph Tags
    const updateOrCreateMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateOrCreateMeta('og:title', pageTitle);
    updateOrCreateMeta('og:description', metaDescContent);
    updateOrCreateMeta('og:type', 'article');
    updateOrCreateMeta('og:url', window.location.href);
    if (post.image) updateOrCreateMeta('og:image', post.image);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = post.canonical_url || window.location.href;

    // 6. Schema.org JSON-LD Structured Data
    let schemaScript = document.getElementById('article-structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'article-structured-data';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.seo_title || post.title,
      "description": metaDescContent,
      "image": post.image ? [post.image] : [],
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Organization",
        "name": "DeFreitas & Associates",
        "url": window.location.origin
      },
      "publisher": {
        "@type": "Organization",
        "name": "DeFreitas & Associates",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/images/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    });

    return () => {
      // Cleanup schema script on unmount
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [post]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid var(--line)', borderTopColor: 'var(--mint-600)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem', color: 'var(--ink-soft)' }}>Loading publication...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="section" style={{ minHeight: '60vh', textAlign: 'center', padding: '6rem 2rem' }}>
        <div className="wrap">
          <span className="eyebrow center">Article Not Found</span>
          <h1 style={{ marginBottom: '1rem' }}>We couldn't find that publication</h1>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '500px', margin: '0 auto 2rem' }}>
            The article you are looking for may have been moved, updated, or unpublished.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/blog" className="btn btn-solid">Return to Tax Journal →</Link>
            <Link to="/" className="btn btn-ghost">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="article-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* Breadcrumbs & Hero Header */}
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="crumb" style={{ marginBottom: '1.5rem' }}>
            <Link to="/">Home</Link> / <Link to="/blog">Tax Journal</Link> / <span>{post.category || 'Article'}</span>
          </div>

          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ 
              background: 'rgba(5, 150, 105, 0.1)', color: 'var(--mint-700)', 
              padding: '4px 12px', borderRadius: '20px', fontSize: '.82rem', fontWeight: '700' 
            }}>
              {post.category || 'Tax Strategy'}
            </span>
            {post.tag && (
              <span style={{ 
                background: 'var(--bg-soft)', color: 'var(--ink-soft)', 
                padding: '4px 12px', borderRadius: '20px', fontSize: '.82rem', fontWeight: '600' 
              }}>
                #{post.tag}
              </span>
            )}
            <span style={{ fontSize: '.85rem', color: 'var(--ink-faint)', marginLeft: 'auto' }}>
              Published: {post.date}
            </span>
          </div>

          <h1 itemProp="headline" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: '1.25', marginBottom: '1.5rem' }}>
            {post.title}
          </h1>

          {post.summary && (
            <p itemProp="description" style={{ fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: '1.7', borderLeft: '4px solid var(--mint-500)', paddingLeft: '1.2rem' }}>
              {post.summary}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          {/* Article Featured Image */}
          {post.image && (
            <div style={{ 
              borderRadius: 'var(--r-lg)', overflow: 'hidden', maxHeight: '480px', 
              boxShadow: 'var(--shadow-md)', marginBottom: '3rem' 
            }}>
              <img 
                src={post.image} 
                alt={post.title} 
                itemProp="image"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          )}

          {/* Article Body Content */}
          <div 
            itemProp="articleBody"
            className="article-body-content"
            style={{ 
              color: 'var(--ink)', 
              fontSize: '1.1rem', 
              lineHeight: '1.85', 
              letterSpacing: '-0.01em',
              whiteSpace: 'pre-line',
              marginBottom: '3.5rem'
            }}
          >
            {post.content || post.summary}
          </div>

          {/* Firm & Author Signature Box */}
          <div style={{ 
            background: '#ffffff', 
            border: '1px solid var(--line)', 
            borderRadius: 'var(--r-lg)', 
            padding: '2rem', 
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '3rem',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', background: 'var(--mint-100)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              color: 'var(--mint-700)', fontWeight: '800', fontSize: '1.3rem' 
            }}>
              D&amp;A
            </div>
            <div>
              <h4 style={{ margin: '0 0 .3rem 0', fontSize: '1.1rem' }}>DeFreitas &amp; Associates CPAs</h4>
              <p style={{ margin: 0, fontSize: '.92rem', color: 'var(--ink-soft)', lineHeight: '1.5' }}>
                Executive tax accountants, management consultants, and SR&amp;ED practitioners in Toronto, Ontario. Proud member of the Canadian Tax Foundation and EFILE Association of Canada.
              </p>
            </div>
          </div>

          {/* CTA Strategy Box */}
          <div style={{ 
            background: 'linear-gradient(135deg, var(--navy-900) 0%, #1e3a5f 100%)', 
            borderRadius: 'var(--r-lg)', 
            padding: '2.5rem', 
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ maxWidth: '520px' }}>
              <span style={{ color: 'var(--mint-400)', fontWeight: '700', fontSize: '.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Professional Consultation
              </span>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', marginTop: '.4rem', marginBottom: '.6rem' }}>
                Need tailored advice on this tax update?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '.98rem', lineHeight: '1.6' }}>
                Speak directly with our senior CPA partners regarding corporate returns, CRA audits, or corporate restructuring.
              </p>
            </div>
            <button 
              onClick={onOpenStrategy} 
              className="btn btn-solid" 
              style={{ background: 'var(--mint-500)', color: '#fff', padding: '.9rem 1.6rem', fontSize: '1rem', whiteSpace: 'nowrap' }}
            >
              Schedule Free Consultation →
            </button>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                <h3 style={{ fontSize: '1.4rem', margin: 0 }}>More From Our Tax Journal</h3>
                <Link to="/blog" style={{ color: 'var(--mint-700)', fontWeight: '600', fontSize: '.92rem' }}>
                  View All Articles →
                </Link>
              </div>

              <div className="journal-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {relatedPosts.map(rp => (
                  <Link 
                    key={rp.id} 
                    to={`/blog/${rp.slug || rp.id}`}
                    className="post" 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="pmedia">
                      <img 
                        src={rp.image || '/images/post-tax-season.jpg'} 
                        alt={rp.title} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/post-tax-season.jpg';
                        }}
                      />
                    </div>
                    <div className="pbody">
                      <div className="meta">
                        <span>{rp.category}</span> · <span>{rp.date}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', margin: '.4rem 0 .6rem 0', lineHeight: '1.4' }}>{rp.title}</h4>
                      <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)', margin: 0 }}>{rp.summary}</p>
                      <div style={{ marginTop: '1rem', color: 'var(--mint-700)', fontWeight: '600', fontSize: '.86rem' }}>
                        Read Article →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
