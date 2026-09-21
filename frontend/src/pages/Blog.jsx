import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api';
import Pagination from '../components/Pagination';

export default function Blog() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Tax Time Approaching in Canada: Key Deadlines & Preparation Steps",
      category: "Tax Strategy",
      tag: "Tax Season 2026",
      summary: "This is our usual time of year when our firm reminds all our valuable clients and friends in Canada about the crucial corporate installment deadlines and personal tax filing steps.",
      content: "TAX TIME APPROACHING IN CANADA. Important dates to remember: T1 Personal income tax filing deadline is April 30th (June 15th for self-employed individuals). T2 Corporate tax return is due 6 months following the corporation's fiscal year-end, while corporate taxes owed are payable 2 to 3 months following year-end depending on whether your company qualifies for the small business deduction. Contact DeFreitas & Associates today to organize your records and ensure prompt filing.",
      date: "2026-03-01",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1024&q=80",
      slug: "tax-time-approaching-in-canada-key-deadlines-preparation-steps"
    },
    {
      id: "2",
      title: "DeFreitas & Associates Sponsors Dominica Rising Benefit Gala",
      category: "Firm News",
      tag: "Corporate Sponsor",
      summary: "DeFreitas & Associates (D&A) was proud to be a corporate sponsor supporting the Dominica Rising Benefit Gala hosted by Trade & Investment Commissioner Frances Delsol.",
      content: "DeFreitas & Associates (D&A) was proud to be a corporate sponsor of the Dominica Rising Benefit Gala hosted by the Trade & Investment Commissioner for Dominica (in Canada), Ms. Frances Delsol. Our team remains committed to community engagement and international business collaboration.",
      date: "2025-11-15",
      image: "/images/recent-post.jpg",
      slug: "defreitas-associates-sponsors-dominica-rising-benefit-gala"
    },
    {
      id: "3",
      title: "DeFreitas & Associates Joins the Canadian Tax Foundation",
      category: "Affiliation",
      tag: "CTF Membership",
      summary: "D&A is proud to announce that the firm's North American affiliated office in Toronto has become a member of the Canadian Tax Foundation (ctf.ca).",
      content: "DeFreitas & Associates (D&A) is proud to announce that the firm’s North American affiliated office in Toronto, Canada has become a member of the Canadian Tax Foundation (www.ctf.ca). Membership in the Canadian Tax Foundation further reinforces our capacity to deliver leading-edge tax planning and CRA policy insights to our corporate and private clients.",
      date: "2025-08-20",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1024&q=80",
      slug: "defreitas-associates-joins-canadian-tax-foundation"
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    document.title = "Tax Journal & News — DeFreitas & Associates CPAs";
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "Stay informed on Canadian corporate tax updates, CRA filing deadlines, SR&ED credit strategies, and firm announcements from DeFreitas & Associates CPAs.";
    }

    fetchPosts('published')
      .then(res => { 
        if (res && res.length) {
          const livePosts = res.filter(p => (p.status || 'published') === 'published');
          setPosts(livePosts);
        }
      })
      .catch(err => console.warn("Using default blog posts:", err.message));
  }, []);

  const remainingPosts = posts.slice(1);

  useEffect(() => {
    const maxP = Math.max(1, Math.ceil(remainingPosts.length / pageSize));
    if (currentPage > maxP) setCurrentPage(maxP);
  }, [remainingPosts.length]);

  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb"><Link to="/">Home</Link> / <span>Tax Journal</span></div>
          <span className="eyebrow center">Tax Journal &amp; Insights</span>
          <h1>Clear guides for Canadian<br />business owners</h1>
          <p>Stay informed on corporate tax updates, CRA filing deadlines, SR&amp;ED credit strategies, and firm announcements.</p>
        </div>
      </section>

      {/* Featured First Post */}
      {posts.length > 0 && (
        <section className="section" style={{ paddingBottom: '2rem' }}>
          <div className="wrap">
            <div className="cat-card" style={{ 
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', 
              padding: '2.5rem', background: '#fff', borderRadius: 'var(--r-lg)',
              alignItems: 'center', boxShadow: 'var(--shadow-sm)'
            }}>
              <Link 
                to={`/blog/${posts[0].slug || posts[0].id}`} 
                style={{ borderRadius: 'var(--r)', overflow: 'hidden', height: '320px', display: 'block' }}
              >
                <img 
                  src={posts[0].image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1024&q=80'} 
                  alt={posts[0].title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s ease' }} 
                />
              </Link>
              <div>
                <div className="meta" style={{ color: 'var(--mint-600)', fontWeight: '700', fontSize: '.8rem', marginBottom: '.6rem' }}>
                  {posts[0].category} · {posts[0].tag}
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                  <Link to={`/blog/${posts[0].slug || posts[0].id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {posts[0].title}
                  </Link>
                </h2>
                <p style={{ color: 'var(--ink-soft)', lineHeight: '1.6', marginBottom: '1.6rem' }}>{posts[0].summary}</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Link to={`/blog/${posts[0].slug || posts[0].id}`} className="btn btn-solid">
                    Read Full Article <span className="arr">→</span>
                  </Link>
                  <span style={{ fontSize: '.84rem', color: 'var(--ink-faint)' }}>{posts[0].date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Other Posts */}
      <section className="section" id="recent-publications" style={{ paddingTop: '1rem' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Recent Publications</span>
            <h2>Latest News &amp; Bulletins</h2>
          </div>

          <div className="journal-grid">
            {remainingPosts
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((p) => (
              <Link 
                key={p.id} 
                to={`/blog/${p.slug || p.id}`} 
                className="post" 
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
              >
                <div className="pmedia">
                  <img src={p.image || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1024&q=80'} alt={p.title} />
                </div>
                <div className="pbody" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="meta">
                    <span>{p.category}</span> · <span>{p.tag}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p style={{ flex: 1 }}>{p.summary}</p>
                  <div style={{ 
                    borderTop: '1px solid var(--line)', paddingTop: '1rem', 
                    display: 'flex', justifyContent: 'space-between', fontSize: '.84rem', 
                    color: 'var(--mint-700)', fontWeight: '600', marginTop: 'auto' 
                  }}>
                    <span>Read Article →</span>
                    <span style={{ color: 'var(--ink-faint)' }}>{p.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={remainingPosts.length}
            pageSize={pageSize}
            onPageChange={(p) => {
              setCurrentPage(p);
              const elem = document.getElementById('recent-publications');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            alignCenter={true}
            itemName="articles"
          />
        </div>
      </section>
    </div>
  );
}
