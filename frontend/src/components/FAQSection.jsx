import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQSection({ 
  title = "Frequently Asked Questions", 
  subtitle = "Clear answers to common questions about our professional services and process.",
  items = [] 
}) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items || items.length === 0) return null;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data (FAQPage Schema) for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a ? item.a.replace(/\[(.*?)\](?:\(.*?\))?/g, '$1') : ''
      }
    }))
  };

  const renderFormattedAnswer = (text) => {
    if (!text) return null;
    const paragraphs = text.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      const regex = /\[(.*?)\](?:\((.*?)\))?/g;
      const elements = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(para)) !== null) {
        if (match.index > lastIndex) {
          elements.push(para.substring(lastIndex, match.index));
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
      if (lastIndex < para.length) {
        elements.push(para.substring(lastIndex));
      }

      return (
        <p key={pIdx} style={{ margin: pIdx > 0 ? '0.75rem 0 0' : '0' }}>
          {elements}
        </p>
      );
    });
  };

  return (
    <section className="section faq-section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <div className="wrap" style={{ maxWidth: '960px' }}>
        <div className="sec-head center" style={{ marginBottom: '2.5rem' }}>
          <span className="eyebrow center">Common Inquiries</span>
          <h2 style={{ fontSize: '2.1rem', color: '#0f172a' }}>{title}</h2>
          {subtitle && <p className="lead" style={{ margin: '.5rem auto 0 auto', maxWidth: '640px' }}>{subtitle}</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: isOpen ? '1.5px solid var(--mint-600)' : '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 4px 12px rgba(22, 163, 88, 0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.6rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '1.08rem', fontWeight: '700', color: isOpen ? 'var(--mint-700)' : '#1e293b', lineHeight: '1.4' }}>
                    {item.q}
                  </span>
                  <span style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    width: '28px', height: '28px', borderRadius: '50%', 
                    background: isOpen ? '#ecfdf5' : '#f1f5f9', 
                    color: isOpen ? 'var(--mint-700)' : '#64748b',
                    fontSize: '1.2rem', fontWeight: 'bold', flexShrink: 0,
                    transition: 'transform 0.25s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div style={{ 
                    padding: '0 1.6rem 1.4rem 1.6rem', 
                    fontSize: '.98rem', 
                    lineHeight: '1.7', 
                    color: '#475569',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '1rem'
                  }}>
                    {renderFormattedAnswer(item.a)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

