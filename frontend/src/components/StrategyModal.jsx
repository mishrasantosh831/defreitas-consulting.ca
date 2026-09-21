import React, { useState } from 'react';
import { submitInquiry } from '../api';

export default function StrategyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    email: '',
    service: 'Corporate Tax & Strategy',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitInquiry(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error submitting request. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ 
              width: '60px', height: '60px', borderRadius: '50%', background: 'var(--mint-100)', 
              color: 'var(--mint-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.2rem', fontSize: '1.8rem' 
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>Strategy Call Requested!</h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.8rem' }}>
              Thank you, <strong>{formData.full_name}</strong>. One of our senior CPA partners will review your details and reach out within 24 business hours.
            </p>
            <button onClick={onClose} className="btn btn-solid">Done</button>
          </div>
        ) : (
          <>
            <span className="eyebrow" style={{ marginBottom: '.8rem' }}>Free Consultation</span>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '.6rem' }}>Book Free Strategy Call</h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.6rem', fontSize: '.95rem' }}>
              Speak directly with a seasoned Chartered Professional Accountant. We'll analyze your current corporate structure and identify tax minimization and grant opportunities.
            </p>

            {error && (
              <div style={{ 
                background: '#fee2e2', color: '#b91c1c', padding: '.8rem', 
                borderRadius: '8px', marginBottom: '1.2rem', fontSize: '.88rem' 
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>
                <div className="field">
                  <label>Company Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Apex Tech Inc."
                    value={formData.company_name}
                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="e.g. 647-722-5442"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="field">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="e.g. sarah@apex.ca"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="field">
                <label>Primary Focus *</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="Corporate Tax & Strategy">Corporate T2 Tax &amp; Minimization Strategy</option>
                  <option value="SR&ED Tax Credits">SR&amp;ED Refund Claim ($100k+ Tech Grant)</option>
                  <option value="Accounting & Bookkeeping">Monthly Bookkeeping &amp; Financial Statements</option>
                  <option value="Business Financing">Business Financing &amp; Bank Proposal Package</option>
                  <option value="Incorporation & Structure">Federal / Ontario Incorporation Setup</option>
                  <option value="CRA Audit Representation">CRA Review or Audit Defense</option>
                </select>
              </div>

              <div className="field">
                <label>Notes / Questions (Optional)</label>
                <textarea 
                  placeholder="Share any background or specific targets..."
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="btn btn-solid" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}
              >
                {loading ? 'Submitting...' : 'Confirm Strategy Call Request →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
