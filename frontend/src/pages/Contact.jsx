import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageContent, submitInquiry } from '../api';

export default function Contact() {
  const [data, setData] = useState({
    title: "Contact Us — DeFreitas & Associates CPAs",
    hero_title: "Schedule Your Free Initial Consultation",
    hero_subtitle: "We look forward to being of service to you. Reach out to our senior management team in Toronto today.",
    address: "255 Duncan Mill Road, Suite 409, Toronto, ON, M3B 3H9, Canada",
    phone: "647-722-5442",
    toll_free: "1-855-227-9136",
    email: "info@defreitas-consulting.com",
    hours_weekday: "Monday – Friday: 9:00 AM – 5:00 PM EST",
    hours_saturday: "Saturday: By Appointment",
    hours_sunday: "Sunday: Closed",
    map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.4672158511629!2d-79.35250192432324!3d43.761437474386454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d290ca474381%3A0xe186bc90507bbbd1!2sUnited%20Center!5e0!3m2!1sen!2sin!4v1676705837626!5m2!1sen!2sin"
  });

  const [form, setForm] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    email: '',
    service: 'Tax Advisory & Filing',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPageContent('contact')
      .then(res => { if (res) setData(res); })
      .catch(err => console.warn("Using default contact data:", err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitInquiry(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Error submitting form. Please call us at 647-722-5442.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb"><Link to="/">Home</Link> / <span>Contact Us</span></div>
          <span className="eyebrow center">Let's Connect</span>
          <h1>{data.hero_title}</h1>
          <p>{data.hero_subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '.6rem' }}>Book a Consultation</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '1.6rem' }}>
                Fill in your details and a senior chartered accountant will contact you within 24 business hours.
              </p>

              {submitted ? (
                <div style={{ padding: '2.5rem 1rem', textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', background: 'var(--mint-100)', 
                    color: 'var(--mint-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    margin: '0 auto 1.2rem', fontSize: '1.8rem' 
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>Inquiry Received!</h3>
                  <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                    Thank you, <strong>{form.full_name}</strong>. Our corporate advisory team in Toronto has received your consultation request.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ full_name: '', company_name: '', phone: '', email: '', service: 'Tax Advisory & Filing', message: '' });
                    }} 
                    className="btn btn-ghost"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '.8rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '.88rem' }}>
                      {error}
                    </div>
                  )}

                  <div className="field-row">
                    <div className="field">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Sarah Jenkins"
                        value={form.full_name}
                        onChange={(e) => setForm({...form, full_name: e.target.value})}
                      />
                    </div>
                    <div className="field">
                      <label>Company Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Apex Tech Corp"
                        value={form.company_name}
                        onChange={(e) => setForm({...form, company_name: e.target.value})}
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
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                      />
                    </div>
                    <div className="field">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="e.g. s.jenkins@company.ca"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Service Focus *</label>
                    <select 
                      value={form.service}
                      onChange={(e) => setForm({...form, service: e.target.value})}
                    >
                      <option value="Tax Advisory & Filing">Corporate &amp; Personal Tax Advisory / Filing</option>
                      <option value="SR&ED Claims">SR&amp;ED Tax Credit Claims ($100k+ Refund)</option>
                      <option value="Accounting & Bookkeeping">Monthly Accounting &amp; Bookkeeping</option>
                      <option value="Business Financing">Business Financing &amp; Capital Advisory</option>
                      <option value="Incorporation">Federal &amp; Provincial Incorporation</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>How Can We Help Your Business?</label>
                    <textarea 
                      placeholder="Briefly describe your requirements or questions..."
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-solid" 
                    style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}
                  >
                    {loading ? 'Sending Request...' : 'Submit Free Consultation Request →'}
                  </button>
                </form>
              )}
            </div>

            {/* Office Info & Map */}
            <div className="contact-info">
              <div className="info-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Toronto Head Office
                </h3>
                <div className="nap-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/></svg>
                  <div>
                    <strong>Address:</strong><br />
                    {data.address}
                  </div>
                </div>
                <div className="nap-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <div>
                    <strong>Direct Phone:</strong> <a href={`tel:${data.phone.replace(/[^0-9]/g, '')}`}>{data.phone}</a><br />
                    <strong>Toll Free:</strong> <a href={`tel:${data.toll_free.replace(/[^0-9]/g, '')}`}>{data.toll_free}</a>
                  </div>
                </div>
                <div className="nap-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <div>
                    <strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Business Hours
                </h3>
                <div className="hours-row"><span>{data.hours_weekday}</span></div>
                <div className="hours-row"><span>{data.hours_saturday}</span></div>
                <div className="hours-row closed"><span>{data.hours_sunday}</span></div>
              </div>

              <div className="map-frame">
                <iframe 
                  src={data.map_embed_url} 
                  width="100%" 
                  height="260" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DeFreitas Toronto Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
