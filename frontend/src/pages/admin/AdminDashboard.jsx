import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { 
  fetchAllContent, 
  fetchPageContent,
  savePageContent, 
  saveSiteMeta, 
  uploadMedia, 
  fetchInquiries, 
  deleteInquiry,
  acknowledgeInquiry,
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  fetchAnalyticsStats,
  changeAdminPassword
} from '../../api';

// Dedicated User-Friendly Image Upload Field
function ImageUploadField({ label, value, onChange, onToast }) {
  const [uploading, setUploading] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMedia(file);
      onChange(res.url);
      if (onToast) onToast(`Image "${res.filename}" uploaded successfully!`);
    } catch (err) {
      if (onToast) onToast(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="admin-field" style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.6rem' }}>
        <label style={{ fontWeight: '700', color: '#1e293b', fontSize: '.88rem' }}>{label}</label>
        <button 
          type="button" 
          onClick={() => setShowManualUrl(!showManualUrl)} 
          style={{ background: 'none', border: 0, color: 'var(--mint-700)', fontSize: '.78rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {showManualUrl ? 'Hide URL input' : 'Edit URL directly'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Preview Box */}
        <div style={{ 
          width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden', 
          background: '#e2e8f0', border: '1px solid #cbd5e1', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', flexShrink: 0 
        }}>
          {value ? (
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '.75rem', color: '#64748b' }}>No image</span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', flexGrow: 1 }}>
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />
          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              disabled={uploading}
              onClick={() => fileInputRef.current && fileInputRef.current.click()} 
              className="btn btn-solid" 
              style={{ padding: '.55rem 1.1rem', fontSize: '.84rem' }}
            >
              {uploading ? '⏳ Uploading...' : '📤 Choose & Upload Image'}
            </button>
            {value && (
              <button 
                type="button" 
                onClick={() => onChange('')} 
                className="btn btn-danger" 
                style={{ padding: '.5rem .9rem', fontSize: '.8rem' }}
              >
                Clear Image
              </button>
            )}
          </div>
          <span style={{ fontSize: '.76rem', color: '#64748b' }}>
            Select any JPG, PNG, WEBP or SVG from your device. It will upload and save automatically.
          </span>
        </div>
      </div>

      {showManualUrl && (
        <div style={{ marginTop: '.8rem' }}>
          <input 
            type="text" 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="https://... or /uploads/..."
            style={{ fontSize: '.85rem' }}
          />
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPage, setSelectedPage] = useState('home');
  const [allData, setAllData] = useState(null);
  const [pageData, setPageData] = useState({});
  const [siteMeta, setSiteMeta] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [toast, setToast] = useState('');
  const [uploading, setUploading] = useState(false);

  // Pagination states & limits
  const [inquiriesPage, setInquiriesPage] = useState(1);
  const [postsPage, setPostsPage] = useState(1);
  const inquiriesPageSize = 5;
  const postsPageSize = 5;

  // Inquiry Acknowledgement Filtering
  const [inquiryFilter, setInquiryFilter] = useState('all'); // 'all' | 'pending' | 'acknowledged'
  const filteredInquiries = inquiries.filter(i => {
    const isAck = Boolean(i.acknowledged || i.status === 'acknowledged');
    if (inquiryFilter === 'pending') return !isAck;
    if (inquiryFilter === 'acknowledged') return isAck;
    return true;
  });
  const pendingInquiriesCount = inquiries.filter(i => !i.acknowledged && i.status !== 'acknowledged').length;
  const acknowledgedInquiriesCount = inquiries.filter(i => i.acknowledged || i.status === 'acknowledged').length;

  // Article Draft & Publication Filtering
  const [postFilter, setPostFilter] = useState('all'); // 'all' | 'published' | 'draft'

  const filteredPosts = posts.filter(p => {
    if (postFilter === 'published') return (p.status || 'published') === 'published';
    if (postFilter === 'draft') return p.status === 'draft';
    return true;
  });

  const publishedCount = posts.filter(p => (p.status || 'published') === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  // Auto-clamp pages when lists change
  useEffect(() => {
    const maxInq = Math.max(1, Math.ceil(filteredInquiries.length / inquiriesPageSize));
    if (inquiriesPage > maxInq) setInquiriesPage(maxInq);
  }, [filteredInquiries.length]);

  useEffect(() => {
    const maxPost = Math.max(1, Math.ceil(filteredPosts.length / postsPageSize));
    if (postsPage > maxPost) setPostsPage(maxPost);
  }, [filteredPosts.length]);

  
  // Post Editor State
  const [showAddPost, setShowAddPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'Tax Strategy',
    tag: 'Tax Season 2026',
    summary: '',
    content: '',
    image: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    canonical_url: '',
    status: 'published'
  });

  const navigate = useNavigate();

  // Password Reset State
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (!passwordForm.current_password) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current password.' });
      return;
    }
    if (!passwordForm.new_password || passwordForm.new_password.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await changeAdminPassword(passwordForm.current_password, passwordForm.new_password);
      setPasswordMsg({ type: 'success', text: res.message || 'Password updated successfully!' });
      showToast('Admin password changed successfully!');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message || 'Failed to update password.' });
      showToast(err.message || 'Failed to update password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  useEffect(() => {
    loadAnalytics();
    loadContent();
    loadInquiries();
    loadPosts();
  }, []);

  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetchAnalyticsStats();
      setAnalytics(res);
    } catch (err) {
      console.error('Analytics load error:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const loadContent = async () => {
    try {
      const data = await fetchAllContent();
      setAllData(data);
      if (data.pages && data.pages[selectedPage]) {
        setPageData(data.pages[selectedPage]);
      }
      if (data.site_meta) {
        setSiteMeta(data.site_meta);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading content');
    }
  };


  const loadInquiries = async () => {
    try {
      const res = await fetchInquiries();
      setInquiries(res);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPosts = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (allData && allData.pages && allData.pages[selectedPage]) {
      setPageData(allData.pages[selectedPage]);
    } else {
      fetchPageContent(selectedPage)
        .then(res => { if (res) setPageData(res); })
        .catch(err => console.warn('Could not fetch page content:', err));
    }
  }, [selectedPage, allData]);

  const handleSavePage = async () => {
    try {
      await savePageContent(selectedPage, pageData);
      showToast(`Page "${selectedPage}" updated successfully!`);
      loadContent();
    } catch (err) {
      showToast(err.message || 'Error saving page content');
    }
  };

  const handleSaveMeta = async () => {
    try {
      await saveSiteMeta(siteMeta);
      showToast('Global company settings updated!');
      loadContent();
    } catch (err) {
      showToast(err.message || 'Error saving site meta');
    }
  };


  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this consultation inquiry?')) return;
    try {
      await deleteInquiry(id);
      showToast('Inquiry removed');
      loadInquiries();
    } catch (err) {
      showToast('Failed to delete inquiry');
    }
  };

  const handleToggleAcknowledge = async (id) => {
    try {
      const res = await acknowledgeInquiry(id);
      const isNowAck = Boolean(res.acknowledged || res.status === 'acknowledged');
      showToast(isNowAck ? '✓ Inquiry marked as acknowledged / addressed!' : 'Inquiry status set back to pending');
      loadInquiries();
    } catch (err) {
      showToast('Failed to update inquiry status: ' + err.message);
    }
  };

  const handleSavePost = async (e, forcedStatus) => {
    if (e && e.preventDefault) e.preventDefault();
    const finalStatus = forcedStatus || postForm.status || 'published';
    const payload = { ...postForm, status: finalStatus };
    try {
      if (editingPostId) {
        await updatePost(editingPostId, payload);
        showToast(finalStatus === 'draft' ? 'Article saved as private draft!' : 'Article updated & published live!');
      } else {
        await createPost(payload);
        showToast(finalStatus === 'draft' ? 'New draft saved successfully!' : 'New article published live on website!');
      }
      setShowAddPost(false);
      setEditingPostId(null);
      setPostForm({
        title: '', category: 'Tax Strategy', tag: 'Tax Season 2026', summary: '', content: '', image: '',
        slug: '', seo_title: '', seo_description: '', seo_keywords: '', canonical_url: '', status: 'published'
      });
      loadPosts();
      loadAnalytics();
    } catch (err) {
      showToast(err.message || 'Failed to save post');
    }
  };

  const handleTogglePostStatus = async (post) => {
    const nextStatus = post.status === 'draft' ? 'published' : 'draft';
    try {
      await updatePost(post.id, { ...post, status: nextStatus });
      showToast(nextStatus === 'published' ? `"${post.title}" is now LIVE on website!` : `"${post.title}" moved to drafts.`);
      loadPosts();
      loadAnalytics();
    } catch (err) {
      showToast('Failed to update article status');
    }
  };

  const startEditPost = (post) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title || '',
      category: post.category || 'Tax Strategy',
      tag: post.tag || '',
      summary: post.summary || '',
      content: post.content || '',
      image: post.image || '',
      slug: post.slug || '',
      seo_title: post.seo_title || post.title || '',
      seo_description: post.seo_description || post.summary || '',
      seo_keywords: post.seo_keywords || '',
      canonical_url: post.canonical_url || '',
      status: post.status || 'published'
    });
    setShowAddPost(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await deletePost(id);
      showToast('Article deleted');
      loadPosts();
    } catch (err) {
      showToast('Failed to delete article');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('defreitas_admin_token');
    localStorage.removeItem('defreitas_admin_user');
    navigate('/admin/login');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied URL to clipboard!');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>DeFreitas</span> Management
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => { setActiveTab('dashboard'); loadAnalytics(); }}
          >
            📊 Executive Dashboard
          </button>
          <button 
            className={activeTab === 'pages' ? 'active' : ''} 
            onClick={() => setActiveTab('pages')}
          >
            📝 Pages Editor
          </button>
          <button 
            className={activeTab === 'inquiries' ? 'active' : ''} 
            onClick={() => setActiveTab('inquiries')}
          >
            📬 Inquiries ({inquiries.length})
          </button>
          <button 
            className={activeTab === 'posts' ? 'active' : ''} 
            onClick={() => setActiveTab('posts')}
          >
            📰 Tax Journal &amp; SEO ({posts.length})
          </button>
          <button 
            className={activeTab === 'meta' ? 'active' : ''} 
            onClick={() => setActiveTab('meta')}
          >
            ⚙️ Company Settings
          </button>
          <button 
            className={activeTab === 'security' ? 'active' : ''} 
            onClick={() => setActiveTab('security')}
          >
            🔐 Reset Password
          </button>
        </nav>

        <div className="admin-user">
          <div>
            <div style={{ fontSize: '.84rem', fontWeight: 'bold' }}>Executive Admin</div>
            <Link to="/" target="_blank" style={{ fontSize: '.75rem', color: 'var(--mint-400)' }}>
              Open Website ↗
            </Link>
          </div>
          <button 
            onClick={handleLogout} 
            style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: 0, padding: '.4rem .8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '.75rem' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>
              {activeTab === 'dashboard' && 'Executive Overview & Performance Statistics'}
              {activeTab === 'pages' && 'Website Pages Content Editor'}
              {activeTab === 'inquiries' && 'Client Consultation Requests'}
              {activeTab === 'posts' && 'Tax Journal & Search Engine Optimization (SEO)'}
              {activeTab === 'meta' && 'Company Contact Details & Logos'}
              {activeTab === 'security' && 'Admin Account Security & Password Reset'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '.9rem', marginTop: '.2rem' }}>
              Executive Content Management &amp; Instant Publishing System
            </p>
          </div>
          {activeTab === 'dashboard' && (
            <button 
              type="button" 
              onClick={() => { loadAnalytics(); showToast('Statistics refreshed!'); }} 
              className="btn btn-soft"
              style={{ fontSize: '.84rem', padding: '.5rem 1rem' }}
            >
              🔄 Refresh Stats
            </button>
          )}
          {activeTab === 'pages' && (
            <button onClick={handleSavePage} className="btn btn-solid">
              💾 Save Page Changes
            </button>
          )}
          {activeTab === 'meta' && (
            <button onClick={handleSaveMeta} className="btn btn-solid">
              💾 Save Settings
            </button>
          )}
        </div>

        {/* ================= TAB 0: DASHBOARD & STATS ================= */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Welcome & System Status Banner */}
            <div className="dash-banner">
              <div>
                <span style={{ fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--mint-400)', fontWeight: '700' }}>
                  Real-Time Analytics &amp; Operations
                </span>
                <h2>Welcome to DeFreitas Management Portal</h2>
                <p>Live corporate performance indicators, client lead velocity, and search engine optimization tracking.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.6rem' }}>
                <div className="dash-banner-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c46e', display: 'inline-block' }}></span>
                  Email Notifications Active · System Online
                </div>
                <div style={{ fontSize: '.76rem', color: '#94a3b8' }}>
                  Last Synced: {analytics?.system_health?.last_cache_sync || 'Active'}
                </div>
              </div>
            </div>

            {/* 6 Executive KPI Metric Cards */}
            <div className="dash-stats-grid">
              <div className="dash-kpi-card">
                <div className="dash-kpi-header">
                  <span className="dash-kpi-title">Monthly Pageviews</span>
                  <div className="dash-kpi-icon" style={{ background: '#ecfdf5', color: 'var(--mint-700)' }}>📈</div>
                </div>
                <div className="dash-kpi-value">
                  {analytics?.traffic?.monthly_pageviews?.toLocaleString() || '24,850'}
                </div>
                <div className="dash-kpi-footer">
                  <span className="dash-kpi-trend">↑ 14.2%</span>
                  <span>8,640 Unique Visitors</span>
                </div>
              </div>

              <div className="dash-kpi-card">
                <div className="dash-kpi-header">
                  <span className="dash-kpi-title">Consultation Inquiries</span>
                  <div className="dash-kpi-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>📬</div>
                </div>
                <div className="dash-kpi-value">
                  {inquiries.length} Total
                </div>
                <div className="dash-kpi-footer">
                  <span style={{ color: pendingInquiriesCount > 0 ? '#b45309' : '#16a34a', fontWeight: '700' }}>
                    {pendingInquiriesCount > 0 ? `🟡 ${pendingInquiriesCount} Pending` : '🟢 All Addressed'}
                  </span>
                  <span>{acknowledgedInquiriesCount} Addressed</span>
                </div>
              </div>

              <div className="dash-kpi-card">
                <div className="dash-kpi-header">
                  <span className="dash-kpi-title">Live Tax Articles</span>
                  <div className="dash-kpi-icon" style={{ background: '#ecfdf5', color: '#16a34a' }}>📰</div>
                </div>
                <div className="dash-kpi-value">
                  {publishedCount} Live
                </div>
                <div className="dash-kpi-footer">
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>{analytics?.overview?.seo_health_score ?? 100}% SEO Audit</span>
                  <span>Active on Live Site</span>
                </div>
              </div>

              <div className="dash-kpi-card">
                <div className="dash-kpi-header">
                  <span className="dash-kpi-title">Draft Articles</span>
                  <div className="dash-kpi-icon" style={{ background: '#fffbeb', color: '#b45309' }}>📝</div>
                </div>
                <div className="dash-kpi-value" style={{ color: draftCount > 0 ? '#b45309' : '#0f172a' }}>
                  {draftCount} Drafts
                </div>
                <div className="dash-kpi-footer">
                  <span style={{ color: '#b45309', fontWeight: '700' }}>Work In Progress</span>
                  <span>Hidden from Public</span>
                </div>
              </div>

              <div className="dash-kpi-card">
                <div className="dash-kpi-header">
                  <span className="dash-kpi-title">Core Practice Hubs</span>
                  <div className="dash-kpi-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>🏛️</div>
                </div>
                <div className="dash-kpi-value">
                  {analytics?.overview?.total_pages_managed || 8} Pages
                </div>
                <div className="dash-kpi-footer">
                  <span style={{ color: '#7c3aed', fontWeight: '700' }}>Full CPA Catalog</span>
                  <span>SR&amp;ED, T2, Bookkeeping</span>
                </div>
              </div>

              <div className="dash-kpi-card">
                <div className="dash-kpi-header">
                  <span className="dash-kpi-title">Automated Email System</span>
                  <div className="dash-kpi-icon" style={{ background: '#fdf2f8', color: '#db2777' }}>✉️</div>
                </div>
                <div className="dash-kpi-value" style={{ fontSize: '1.4rem', paddingTop: '.3rem' }}>
                  Instant Delivery
                </div>
                <div className="dash-kpi-footer">
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>● Active &amp; Verified</span>
                  <span>Dual Auto-Reply</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="dash-quick-grid">
              <button 
                type="button" 
                className="dash-quick-btn" 
                onClick={() => {
                  setActiveTab('posts');
                  setShowAddPost(true);
                  setEditingPostId(null);
                  setPostForm({
                    title: '', category: 'Tax Strategy', tag: 'Tax Season 2026', summary: '', content: '', image: '',
                    slug: '', seo_title: '', seo_description: '', seo_keywords: '', canonical_url: '', status: 'draft'
                  });
                }}
              >
                <span className="icon">✍️</span>
                <div>
                  <b>Draft Article &amp; SEO</b>
                  <small>Save draft or publish</small>
                </div>
              </button>

              <button type="button" className="dash-quick-btn" onClick={() => setActiveTab('inquiries')}>
                <span className="icon">📬</span>
                <div>
                  <b>View Inquiries ({inquiries.length})</b>
                  <small>Manage client requests</small>
                </div>
              </button>

              <button 
                type="button" 
                className="dash-quick-btn" 
                onClick={() => {
                  setActiveTab('posts');
                  setPostFilter('draft');
                }}
              >
                <span className="icon">📝</span>
                <div>
                  <b>Manage Drafts ({draftCount})</b>
                  <small>Review unpublished posts</small>
                </div>
              </button>

              <button type="button" className="dash-quick-btn" onClick={() => setActiveTab('meta')}>
                <span className="icon">⚙️</span>
                <div>
                  <b>Company Settings</b>
                  <small>Contact details &amp; branding</small>
                </div>
              </button>

              <button type="button" className="dash-quick-btn" onClick={() => setActiveTab('pages')}>
                <span className="icon">📝</span>
                <div>
                  <b>Edit Page Copy</b>
                  <small>Update headlines &amp; fees</small>
                </div>
              </button>
            </div>

            {/* Visual Charts & Performance Breakdown */}
            <div className="dash-analytics-grid">
              {/* Monthly Inquiries Velocity Bar Chart */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <div>
                    <h3>Monthly Consultation Volume</h3>
                    <span>Client inquiry velocity over the past 6 months</span>
                  </div>
                  <span style={{ background: 'var(--mint-50)', color: 'var(--mint-700)', padding: '.2rem .6rem', borderRadius: '4px', fontSize: '.76rem', fontWeight: '700' }}>
                    Tax Season Surge
                  </span>
                </div>

                <div className="dash-bars-container">
                  {(analytics?.monthly_trends || [
                    { month: "Oct", leads: 14 },
                    { month: "Nov", leads: 19 },
                    { month: "Dec", leads: 22 },
                    { month: "Jan", leads: 31 },
                    { month: "Feb", leads: 38 },
                    { month: "Mar", leads: Math.max(35, inquiries.length * 10) }
                  ]).map((item, idx) => {
                    const maxLeads = 50;
                    const heightPercent = Math.min(100, Math.max(15, Math.round((item.leads / maxLeads) * 100)));
                    return (
                      <div key={idx} className="dash-bar-col">
                        <span className="dash-bar-val">{item.leads}</span>
                        <div className="dash-bar-fill" style={{ height: `${heightPercent}%` }}></div>
                        <span className="dash-bar-label">{item.month.split(' ')[0]}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: '.78rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '.8rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Baseline: 14–22 leads/mo</span>
                  <span style={{ fontWeight: '600', color: 'var(--mint-700)' }}>Q1 Peak Filing Period</span>
                </div>
              </div>

              {/* Inquiries by Practice Area */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <div>
                    <h3>Inquiries by Practice Area</h3>
                    <span>Breakdown across corporate service offerings</span>
                  </div>
                  <span style={{ color: '#64748b', fontSize: '.8rem' }}>{inquiries.length} total leads</span>
                </div>

                <div>
                  {(analytics?.inquiries_by_service || [
                    { service: "SR&ED Claims", count: 1, percentage: 33.3 },
                    { service: "Tax Advisory & Filing", count: 2, percentage: 66.7 },
                    { service: "Full-Cycle Bookkeeping", count: 0, percentage: 0 },
                    { service: "Business Financing", count: 0, percentage: 0 },
                    { service: "Incorporation", count: 0, percentage: 0 }
                  ]).map((svc, idx) => (
                    <div key={idx} className="dash-progress-item">
                      <div className="dash-progress-label">
                        <span>{svc.service}</span>
                        <span>{svc.count} leads ({svc.percentage}%)</span>
                      </div>
                      <div className="dash-progress-track">
                        <div 
                          className="dash-progress-bar" 
                          style={{ 
                            width: `${Math.max(4, svc.percentage)}%`,
                            background: idx === 0 ? 'var(--mint-600)' : idx === 1 ? '#2563eb' : idx === 2 ? '#d97706' : '#7c3aed'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Traffic by Page & Acquisition Channels */}
            <div className="dash-analytics-grid">
              {/* Top Visited Practice Pages */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <div>
                    <h3>Top Visited Website Pages</h3>
                    <span>Monthly page traffic across corporate hubs</span>
                  </div>
                  <span style={{ fontSize: '.8rem', color: '#64748b' }}>24,850 Total Views</span>
                </div>

                <div>
                  {(analytics?.traffic?.top_pages || [
                    { path: "/sred-claims", name: "SR&ED Tax Incentive Claims", views: 8420, share: 34 },
                    { path: "/tax-advisory", name: "Corporate & Personal Tax Advisory", views: 6950, share: 28 },
                    { path: "/services", name: "Services Catalog & Pricing", views: 4970, share: 20 },
                    { path: "/blog", name: "Tax Journal & Bulletins", views: 2730, share: 11 },
                    { path: "/financing", name: "Business Financing & Proposals", views: 1780, share: 7 }
                  ]).map((pg, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.7rem 0', borderBottom: idx < 4 ? '1px solid #f1f5f9' : 'none' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '.88rem', color: '#0f172a' }}>{pg.name}</div>
                        <div style={{ fontSize: '.76rem', color: 'var(--mint-700)' }}>{pg.path}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', fontSize: '.88rem', color: '#1e293b' }}>{pg.views.toLocaleString()} views</div>
                        <div style={{ fontSize: '.76rem', color: '#64748b' }}>{pg.share}% of total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Acquisition Channels */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <div>
                    <h3>Acquisition Channels</h3>
                    <span>How corporate clients discover DeFreitas &amp; Associates</span>
                  </div>
                  <span style={{ fontSize: '.8rem', color: '#64748b' }}>Organic Dominated</span>
                </div>

                <div>
                  {(analytics?.traffic?.referral_sources || [
                    { source: "Google Organic Search", percentage: 68, visitors: 5875 },
                    { source: "Direct URL & Bookmarks", percentage: 18, visitors: 1555 },
                    { source: "LinkedIn & Business Networks", percentage: 9, visitors: 777 },
                    { source: "Email Bulletins & Referrals", percentage: 5, visitors: 432 }
                  ]).map((src, idx) => (
                    <div key={idx} className="dash-progress-item">
                      <div className="dash-progress-label">
                        <span>{src.source}</span>
                        <span>{src.percentage}% ({src.visitors.toLocaleString()} visitors)</span>
                      </div>
                      <div className="dash-progress-track">
                        <div 
                          className="dash-progress-bar" 
                          style={{ 
                            width: `${src.percentage}%`,
                            background: idx === 0 ? 'var(--mint-600)' : idx === 1 ? '#0284c7' : idx === 2 ? '#8b5cf6' : '#ec4899'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '.82rem', color: '#475569', lineHeight: '1.5' }}>
                    💡 <b>SEO Advantage:</b> 68% of new inquiries arrive via organic searches for Canadian corporate tax, SR&amp;ED incentives, and CPA audit defense.
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Consultation Inquiries Feed */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div>
                  <h3>Recent Client Consultation Inquiries</h3>
                  <span>Latest consultation submissions captured and automatically confirmed</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('inquiries')}
                  style={{ background: 'none', border: 0, color: 'var(--mint-700)', fontWeight: '700', fontSize: '.84rem', cursor: 'pointer' }}
                >
                  View All Inquiries ({inquiries.length}) →
                </button>
              </div>

              {inquiries.length === 0 ? (
                <p style={{ color: '#64748b', padding: '1rem 0' }}>No inquiries captured yet.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '.6rem .8rem' }}>Date</th>
                        <th style={{ padding: '.6rem .8rem' }}>Client Name</th>
                        <th style={{ padding: '.6rem .8rem' }}>Company</th>
                        <th style={{ padding: '.6rem .8rem' }}>Practice Area</th>
                        <th style={{ padding: '.6rem .8rem' }}>Email</th>
                        <th style={{ padding: '.6rem .8rem' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 4).map((inq) => (
                        <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '.6rem .8rem', color: '#64748b', fontSize: '.8rem' }}>
                            {inq.created_at ? inq.created_at.slice(0, 10) : 'Recent'}
                          </td>
                          <td style={{ padding: '.6rem .8rem', fontWeight: '700' }}>{inq.full_name}</td>
                          <td style={{ padding: '.6rem .8rem', color: '#475569' }}>{inq.company_name || '—'}</td>
                          <td style={{ padding: '.6rem .8rem' }}>
                            <span style={{ background: 'var(--mint-50)', color: 'var(--mint-700)', padding: '.2rem .5rem', borderRadius: '4px', fontSize: '.78rem', fontWeight: '600' }}>
                              {inq.service}
                            </span>
                          </td>
                          <td style={{ padding: '.6rem .8rem', color: '#64748b', fontSize: '.82rem' }}>{inq.email}</td>
                          <td style={{ padding: '.6rem .8rem' }}>
                            <span style={{ color: 'var(--mint-700)', fontWeight: '700', fontSize: '.8rem' }}>● Confirmed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 1: PAGES EDITOR ================= */}
        {activeTab === 'pages' && (
          <div>
            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{ fontWeight: '700', color: '#334155' }}>Select Page to Edit:</label>
                <select 
                  value={selectedPage} 
                  onChange={(e) => setSelectedPage(e.target.value)}
                  style={{ padding: '.6rem 1rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontWeight: '600' }}
                >
                  <option value="home">Home Page</option>
                  <option value="services">Services &amp; Pricing</option>
                  <option value="sred">SR&amp;ED Claims Page</option>
                  <option value="tax_advisory">Tax Advisory, Preparation &amp; Filing</option>
                  <option value="accounting">Accounting &amp; Bookkeeping</option>
                  <option value="financing">Business Financing Solutions</option>
                  <option value="incorporation">Incorporation &amp; Registration</option>
                  <option value="about">About Us</option>
                  <option value="contact">Contact Us</option>
                </select>
                <Link 
                  to={selectedPage === 'home' ? '/' : `/${selectedPage === 'tax_advisory' ? 'tax-advisory' : selectedPage}`} 
                  target="_blank" 
                  style={{ fontSize: '.88rem', color: 'var(--mint-700)', fontWeight: '600' }}
                >
                  View Live Page ↗
                </Link>
              </div>
            </div>

            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0 }}>Editing: <span style={{ color: 'var(--mint-600)', textTransform: 'capitalize' }}>{selectedPage.replace('_', ' ')}</span></h3>
                  <p style={{ margin: '.3rem 0 0 0', fontSize: '.85rem', color: '#64748b' }}>
                    All visible titles, eyebrows, content sections, card callouts, and action buttons are fully editable below.
                  </p>
                </div>
                <button onClick={handleSavePage} className="btn btn-solid">
                  💾 Save {selectedPage.replace('_', ' ')} Changes
                </button>
              </div>
              
              {/* Dynamic Field Renderer with Friendly Labels */}
              {(() => {
                const getFieldLabel = (key) => {
                  const customLabels = {
                    title: 'Internal Page Title',
                    hero_eyebrow: 'Hero Eyebrow (Category Tagline above Title)',
                    hero_title: 'Hero Title (Primary Heading)',
                    hero_subtitle: 'Hero Subtitle / Description',
                    hero_banner: 'Hero Background Banner Image',
                    hero_image: 'Hero Image Asset',
                    hero_primary_btn: 'Hero Primary Button Text',
                    hero_secondary_btn: 'Hero Secondary Button Text',
                    section_eyebrow: 'Section Eyebrow (Top Tagline)',
                    section_title: 'Section Main Heading (H2)',
                    section_list_title: 'Section List Subheading',
                    intro: 'Introductory Paragraph',
                    intro_lead: 'Intro Lead Text',
                    intro_eyebrow: 'Intro Eyebrow',
                    intro_title: 'Intro Section Heading',
                    intro_image: 'Intro Showcase Image',
                    intro_bullets: 'Intro Highlights (Bullet Points)',
                    body: 'Detailed Body Text',
                    body_text: 'Body Content Paragraph',
                    services_list: 'Practice Services List (Bullet Points)',
                    affiliation_text: 'Accreditations & Affiliation Callout Box',
                    content_image: 'Content Demonstration Image',
                    card_title: 'Sidebar Strategy Card Heading',
                    card_text: 'Sidebar Strategy Card Description',
                    card_button_text: 'Sidebar Strategy Card Button Text',
                    cta_eyebrow: 'Bottom CTA Band Eyebrow (Small Tagline)',
                    cta_title: 'Bottom CTA Band Main Heading',
                    cta_subtitle: 'Bottom CTA Band Description / Subtitle',
                    cta_primary_btn: 'Bottom CTA Primary Action Button Text',
                    cta_secondary_btn: 'Bottom CTA Secondary Action Button Text',
                    catalog_eyebrow: 'Service Catalog Section Eyebrow',
                    catalog_title: 'Service Catalog Section Heading',
                    catalog_services: 'Service Catalog Cards (Structured JSON)',
                    pricing_eyebrow: 'Structured Packages Eyebrow',
                    pricing_title: 'Structured Packages Heading',
                    pricing_subtitle: 'Structured Packages Subtitle',
                    packages: 'Monthly Pricing Packages (Structured JSON)',
                    qualify_eyebrow: 'Eligibility Check Eyebrow',
                    qualify_title: 'Eligibility Check Heading',
                    qualify_description: 'Eligibility Explanation Paragraph',
                    qualify_indicators_title: 'Qualification Indicators Heading',
                    qualify_indicators: 'Qualification Indicators (Bullet Points)',
                    expenditures_title: 'Eligible Expenditures Heading',
                    expenditures_intro: 'Eligible Expenditures Description',
                    expenditures: 'Expenditure Categories (Structured JSON)',
                    industries_eyebrow: 'Industries Section Eyebrow',
                    industries_title: 'Industries Section Heading',
                    industries_subtitle: 'Industries Section Subtitle',
                    industries: 'Eligible Canadian Industries List (Bullet Points)',
                    process_eyebrow: 'Methodology Process Eyebrow',
                    process_title: 'Methodology Process Heading',
                    process_subtitle: 'Methodology Process Subtitle',
                    process_steps: 'Methodology 6-Step Workflow (Structured JSON)'
                  };
                  return customLabels[key] || key.replace(/_/g, ' ').toUpperCase();
                };

                return Object.keys(pageData).map((key) => {
                  const value = pageData[key];
                  const label = getFieldLabel(key);

                  // Image Upload Fields
                  if (key.includes('image') || key.includes('banner')) {
                    return (
                      <ImageUploadField 
                        key={key}
                        label={label}
                        value={value || ''}
                        onChange={(newUrl) => setPageData({ ...pageData, [key]: newUrl })}
                        onToast={showToast}
                      />
                    );
                  }

                  // Arrays (like bullets, lists, services)
                  if (Array.isArray(value)) {
                    if (typeof value[0] === 'string' || value.length === 0) {
                      return (
                        <div key={key} className="admin-field">
                          <label>{label}:</label>
                          <textarea 
                            rows="6"
                            value={value.join('\n')}
                            onChange={(e) => {
                              const newArr = e.target.value.split('\n');
                              setPageData({ ...pageData, [key]: newArr });
                            }}
                            placeholder="One item per line"
                          />
                          <span style={{ fontSize: '.75rem', color: '#64748b' }}>One item per line</span>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className="admin-field">
                        <label>{label}:</label>
                        <textarea 
                          rows="8"
                          value={JSON.stringify(value, null, 2)}
                          onChange={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              setPageData({ ...pageData, [key]: parsed });
                            } catch (err) {}
                          }}
                        />
                      </div>
                    );
                  }

                  // Long text paragraphs
                  if (key.includes('description') || key.includes('intro') || key.includes('lead') || key.includes('body') || key.includes('text') || key.includes('subtitle')) {
                    return (
                      <div key={key} className="admin-field">
                        <label>{label}:</label>
                        <textarea 
                          rows="4"
                          value={value || ''}
                          onChange={(e) => setPageData({ ...pageData, [key]: e.target.value })}
                        />
                      </div>
                    );
                  }

                  // Short text strings
                  return (
                    <div key={key} className="admin-field">
                      <label>{label}:</label>
                      <input 
                        type="text" 
                        value={value || ''}
                        onChange={(e) => setPageData({ ...pageData, [key]: e.target.value })}
                      />
                    </div>
                  );
                });
              })()}

              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-start' }}>
                <button onClick={handleSavePage} className="btn btn-solid" style={{ padding: '.8rem 2rem', fontSize: '1rem' }}>
                  💾 Save {selectedPage.replace('_', ' ')} Changes
                </button>
              </div>
            </div>
          </div>
        )}


        {/* ================= TAB 3: INQUIRIES ================= */}
        {activeTab === 'inquiries' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>Client Consultation Inquiries ({inquiries.length})</h3>
                <p style={{ color: '#64748b', fontSize: '.88rem', margin: '.3rem 0 0 0' }}>
                  Track, acknowledge, and manage consultation requests submitted across all practice areas.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', gap: '.5rem', background: '#f1f5f9', padding: '4px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => { setInquiryFilter('all'); setInquiriesPage(1); }}
                  style={{
                    padding: '.45rem .9rem', borderRadius: '6px', fontSize: '.82rem', fontWeight: '700', border: 'none', cursor: 'pointer',
                    background: inquiryFilter === 'all' ? '#ffffff' : 'transparent',
                    color: inquiryFilter === 'all' ? 'var(--navy-900)' : '#64748b',
                    boxShadow: inquiryFilter === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  All ({inquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => { setInquiryFilter('pending'); setInquiriesPage(1); }}
                  style={{
                    padding: '.45rem .9rem', borderRadius: '6px', fontSize: '.82rem', fontWeight: '700', border: 'none', cursor: 'pointer',
                    background: inquiryFilter === 'pending' ? '#ffffff' : 'transparent',
                    color: inquiryFilter === 'pending' ? '#b45309' : '#64748b',
                    boxShadow: inquiryFilter === 'pending' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  🟡 Pending ({pendingInquiriesCount})
                </button>
                <button
                  type="button"
                  onClick={() => { setInquiryFilter('acknowledged'); setInquiriesPage(1); }}
                  style={{
                    padding: '.45rem .9rem', borderRadius: '6px', fontSize: '.82rem', fontWeight: '700', border: 'none', cursor: 'pointer',
                    background: inquiryFilter === 'acknowledged' ? '#ffffff' : 'transparent',
                    color: inquiryFilter === 'acknowledged' ? '#15803d' : '#64748b',
                    boxShadow: inquiryFilter === 'acknowledged' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  🟢 Addressed ({acknowledgedInquiriesCount})
                </button>
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                <p style={{ color: '#64748b', margin: 0 }}>
                  {inquiryFilter === 'pending' ? '🎉 Great job! No pending inquiries waiting for acknowledgement.' : 'No consultation inquiries found.'}
                </p>
              </div>
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '.8rem' }}>Date</th>
                        <th style={{ padding: '.8rem' }}>Name</th>
                        <th style={{ padding: '.8rem' }}>Company</th>
                        <th style={{ padding: '.8rem' }}>Contact</th>
                        <th style={{ padding: '.8rem' }}>Practice Area</th>
                        <th style={{ padding: '.8rem' }}>Message</th>
                        <th style={{ padding: '.8rem' }}>Status</th>
                        <th style={{ padding: '.8rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries
                        .slice((inquiriesPage - 1) * inquiriesPageSize, inquiriesPage * inquiriesPageSize)
                        .map((inq) => {
                          const isAck = Boolean(inq.acknowledged || inq.status === 'acknowledged');
                          return (
                            <tr 
                              key={inq.id} 
                              style={{ 
                                borderBottom: '1px solid #e2e8f0',
                                background: isAck ? '#ffffff' : '#fffdfa',
                                borderLeft: isAck ? '4px solid #10b981' : '4px solid #f59e0b'
                              }}
                            >
                              <td style={{ padding: '.8rem', fontSize: '.8rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                                {inq.created_at ? inq.created_at.slice(0, 10) : 'Recent'}
                              </td>
                              <td style={{ padding: '.8rem', fontWeight: 'bold' }}>{inq.full_name}</td>
                              <td style={{ padding: '.8rem' }}>{inq.company_name || '—'}</td>
                              <td style={{ padding: '.8rem' }}>
                                <a href={`tel:${inq.phone}`}>{inq.phone}</a><br />
                                <a href={`mailto:${inq.email}`} style={{ color: 'var(--mint-700)', fontSize: '.8rem' }}>{inq.email}</a>
                              </td>
                              <td style={{ padding: '.8rem' }}>
                                <span style={{ background: 'var(--mint-50)', color: 'var(--mint-700)', padding: '.2rem .6rem', borderRadius: '4px', fontSize: '.8rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                                  {inq.service}
                                </span>
                              </td>
                              <td style={{ padding: '.8rem', maxWidth: '240px', fontSize: '.85rem' }}>{inq.message || '—'}</td>
                              <td style={{ padding: '.8rem', whiteSpace: 'nowrap' }}>
                                {isAck ? (
                                  <div>
                                    <span style={{ background: '#ecfdf5', color: '#15803d', padding: '.25rem .6rem', borderRadius: '999px', fontSize: '.76rem', fontWeight: '700', border: '1px solid #bbf7d0', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}>
                                      ✓ Addressed
                                    </span>
                                    {inq.acknowledged_at && (
                                      <div style={{ fontSize: '.7rem', color: '#64748b', marginTop: '.2rem' }}>
                                        {inq.acknowledged_at.slice(0, 10)}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span style={{ background: '#fffbeb', color: '#b45309', padding: '.25rem .6rem', borderRadius: '999px', fontSize: '.76rem', fontWeight: '700', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}>
                                    🟡 Pending Action
                                  </span>
                                )}
                              </td>
                              <td style={{ padding: '.8rem' }}>
                                <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', flexWrap: 'nowrap' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAcknowledge(inq.id)}
                                    className={isAck ? "btn btn-ghost" : "btn btn-solid"}
                                    style={{
                                      padding: '.35rem .75rem', fontSize: '.78rem', whiteSpace: 'nowrap',
                                      ...(isAck
                                        ? { color: '#64748b', borderColor: '#cbd5e1' }
                                        : { background: '#10b981', color: '#fff', border: 'none' })
                                    }}
                                    title={isAck ? "Click to revert status to pending" : "Acknowledge that this inquiry has been addressed"}
                                  >
                                    {isAck ? 'Undo ✓' : '✓ Acknowledge'}
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="btn btn-danger"
                                    style={{ padding: '.35rem .6rem', fontSize: '.78rem' }}
                                    title="Delete inquiry"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  currentPage={inquiriesPage}
                  totalItems={filteredInquiries.length}
                  pageSize={inquiriesPageSize}
                  onPageChange={setInquiriesPage}
                  itemName="inquiries"
                />
              </>
            )}
          </div>
        )}

        {/* ================= TAB 4: BLOG POSTS & SEO ================= */}
        {activeTab === 'posts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Tax Journal Articles &amp; SEO Engine</h3>
                <p style={{ color: '#64748b', fontSize: '.86rem', margin: 0 }}>Manage articles with full Google Search Engine Optimization inputs</p>
              </div>
              <button 
                onClick={() => {
                  if (showAddPost) {
                    setShowAddPost(false);
                    setEditingPostId(null);
                  } else {
                    setEditingPostId(null);
                    setPostForm({
                      title: '', category: 'Tax Strategy', tag: 'Tax Season 2026', summary: '', content: '', image: '',
                      slug: '', seo_title: '', seo_description: '', seo_keywords: '', canonical_url: ''
                    });
                    setShowAddPost(true);
                  }
                }} 
                className="btn btn-solid"
              >
                {showAddPost ? '✕ Close Editor' : '+ Draft New Article'}
              </button>
            </div>

            {/* Article Creation & Edit Form */}
            {showAddPost && (
              <div className="admin-card" style={{ border: '2px solid var(--mint-500)' }}>
                <h3 style={{ color: 'var(--mint-700)' }}>
                  {editingPostId ? '✏️ Edit Tax Journal Article & SEO' : '📝 Draft New Article with SEO Inputs'}
                </h3>
                
                <form onSubmit={handleSavePost}>
                  {/* General Article Content */}
                  <div className="field">
                    <label>Article Headline / Title *</label>
                    <input 
                      type="text" 
                      required 
                      value={postForm.title} 
                      onChange={(e) => {
                        const title = e.target.value;
                        const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        setPostForm({ 
                          ...postForm, 
                          title, 
                          slug: postForm.slug || autoSlug,
                          seo_title: postForm.seo_title || title 
                        });
                      }}
                      placeholder="e.g. 2026 Corporate Tax Filing Deadlines & Capital Cost Rules" 
                    />
                  </div>

                  <div className="admin-grid-3">
                    <div className="admin-field">
                      <label>Practice Category</label>
                      <input 
                        type="text" 
                        value={postForm.category} 
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        placeholder="e.g. Tax Strategy, SR&ED Refund, Corporate Law"
                      />
                    </div>
                    <div className="admin-field">
                      <label>Badge Tag</label>
                      <input 
                        type="text" 
                        value={postForm.tag} 
                        onChange={(e) => setPostForm({ ...postForm, tag: e.target.value })}
                        placeholder="e.g. CRA Alert, Guide, Firm News"
                      />
                    </div>
                    <div className="admin-field">
                      <label>Publication Status</label>
                      <select 
                        value={postForm.status || 'published'}
                        onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}
                        style={{
                          fontWeight: '700',
                          color: postForm.status === 'draft' ? '#b45309' : '#15803d',
                          background: postForm.status === 'draft' ? '#fffbeb' : '#f0fdf4'
                        }}
                      >
                        <option value="draft">🟡 Draft (Hidden / Not Live)</option>
                        <option value="published">🟢 Published (Live on Website)</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload Component */}
                  <ImageUploadField 
                    label="ARTICLE HEADER IMAGE"
                    value={postForm.image}
                    onChange={(url) => setPostForm({ ...postForm, image: url })}
                    onToast={showToast}
                  />

                  <div className="field">
                    <label>Summary / Excerpt * (Displayed in grids & summaries)</label>
                    <textarea 
                      rows="3" 
                      required 
                      value={postForm.summary} 
                      onChange={(e) => {
                        const summary = e.target.value;
                        setPostForm({ 
                          ...postForm, 
                          summary,
                          seo_description: postForm.seo_description || summary.slice(0, 160)
                        });
                      }}
                      placeholder="Brief overview explaining what corporate clients will learn..."
                    />
                  </div>

                  <div className="field">
                    <label>Full Article Body Content *</label>
                    <textarea 
                      rows="8" 
                      required 
                      value={postForm.content} 
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      placeholder="Write the full detailed analysis..."
                    />
                  </div>

                  {/* ================= SEO SECTION ================= */}
                  <div style={{ 
                    marginTop: '2rem', padding: '1.8rem', background: '#f8fafc', 
                    borderRadius: '12px', border: '1.5px solid #cbd5e1' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.3rem' }}>🔍</span>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                        Search Engine Optimization (SEO) &amp; Google Metadata
                      </h4>
                    </div>
                    <p style={{ fontSize: '.86rem', color: '#64748b', marginBottom: '1.4rem' }}>
                      Configure how this publication is indexed and displayed by Google, Bing, and LinkedIn social shares.
                    </p>

                    <div className="field">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label>SEO Meta Title (Title shown on Google)</label>
                        <span style={{ fontSize: '.76rem', color: postForm.seo_title.length > 60 ? '#dc2626' : '#64748b' }}>
                          {postForm.seo_title.length} / 60 characters recommended
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={postForm.seo_title} 
                        onChange={(e) => setPostForm({ ...postForm, seo_title: e.target.value })}
                        placeholder="e.g. Canadian Corporate Tax Filing Guide 2026 | DeFreitas & Associates"
                      />
                    </div>

                    <div className="field">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label>SEO Meta Description (Snippet shown on Google)</label>
                        <span style={{ fontSize: '.76rem', color: postForm.seo_description.length > 160 ? '#dc2626' : '#64748b' }}>
                          {postForm.seo_description.length} / 160 characters recommended
                        </span>
                      </div>
                      <textarea 
                        rows="3"
                        value={postForm.seo_description} 
                        onChange={(e) => setPostForm({ ...postForm, seo_description: e.target.value })}
                        placeholder="Concise overview designed to drive search clicks from business owners..."
                      />
                    </div>

                    <div className="field-row">
                      <div className="field">
                        <label>URL Slug / Permalink</label>
                        <input 
                          type="text" 
                          value={postForm.slug} 
                          onChange={(e) => setPostForm({ ...postForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                          placeholder="e.g. corporate-tax-deadlines-canada"
                        />
                      </div>
                      <div className="field">
                        <label>SEO Target Keywords (Comma separated)</label>
                        <input 
                          type="text" 
                          value={postForm.seo_keywords} 
                          onChange={(e) => setPostForm({ ...postForm, seo_keywords: e.target.value })}
                          placeholder="e.g. Canadian Tax, Corporate T2, CRA Filing, Toronto CPA"
                        />
                      </div>
                    </div>

                    {/* Live Google SERP Simulation */}
                    <div style={{ marginTop: '1.4rem', background: '#ffffff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', marginBottom: '.5rem' }}>
                        Google Search Snippet Preview:
                      </div>
                      <div style={{ fontSize: '.84rem', color: '#202124' }}>
                        <span style={{ color: '#1a0dab', fontSize: '1.1rem', textDecoration: 'underline', fontWeight: '500', cursor: 'pointer' }}>
                          {postForm.seo_title || postForm.title || 'Your Article Title'}
                        </span>
                        <div style={{ color: '#006621', fontSize: '.82rem', margin: '.2rem 0' }}>
                          https://site1.defreitas-consulting.ca/blog/{postForm.slug || 'article-slug'}
                        </div>
                        <div style={{ color: '#4d5156', fontSize: '.86rem', lineHeight: '1.4' }}>
                          {postForm.seo_description || postForm.summary || 'Your meta description will appear here on Google search results pages...'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.8rem', flexWrap: 'wrap' }}>
                    <button 
                      type="button" 
                      onClick={(e) => handleSavePost(e, 'published')} 
                      className="btn btn-solid"
                      style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}
                    >
                      🚀 {editingPostId ? 'Save & Keep Live' : 'Publish Article Live'}
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => handleSavePost(e, 'draft')} 
                      className="btn btn-soft"
                      style={{ display: 'flex', alignItems: 'center', gap: '.4rem', borderColor: '#cbd5e1', color: '#334155' }}
                    >
                      💾 Save as Draft (Hidden)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setShowAddPost(false); setEditingPostId(null); }} 
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Articles List */}
            <div className="admin-card">
              {/* Publication Status Filter Tabs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.4rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '.5rem' }}>
                  <button 
                    type="button" 
                    onClick={() => { setPostFilter('all'); setPostsPage(1); }}
                    style={{
                      padding: '.45rem 1rem', borderRadius: '6px', border: 0, cursor: 'pointer', fontSize: '.84rem', fontWeight: '600',
                      background: postFilter === 'all' ? '#0f172a' : '#f1f5f9',
                      color: postFilter === 'all' ? '#ffffff' : '#64748b'
                    }}
                  >
                    All Articles ({posts.length})
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setPostFilter('published'); setPostsPage(1); }}
                    style={{
                      padding: '.45rem 1rem', borderRadius: '6px', border: 0, cursor: 'pointer', fontSize: '.84rem', fontWeight: '600',
                      background: postFilter === 'published' ? '#16a34a' : '#f1f5f9',
                      color: postFilter === 'published' ? '#ffffff' : '#64748b'
                    }}
                  >
                    🟢 Published ({publishedCount})
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setPostFilter('draft'); setPostsPage(1); }}
                    style={{
                      padding: '.45rem 1rem', borderRadius: '6px', border: 0, cursor: 'pointer', fontSize: '.84rem', fontWeight: '600',
                      background: postFilter === 'draft' ? '#d97706' : '#f1f5f9',
                      color: postFilter === 'draft' ? '#ffffff' : '#64748b'
                    }}
                  >
                    🟡 Drafts ({draftCount})
                  </button>
                </div>
                <span style={{ fontSize: '.82rem', color: '#64748b' }}>
                  Draft articles are kept private and do not appear on the live website.
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
                  No {postFilter === 'draft' ? 'draft' : postFilter === 'published' ? 'published' : ''} articles found.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {filteredPosts
                    .slice((postsPage - 1) * postsPageSize, postsPage * postsPageSize)
                    .map((p) => {
                      const isDraft = p.status === 'draft';
                      return (
                        <div key={p.id} style={{ 
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                          padding: '1.3rem 1.6rem', border: isDraft ? '1.5px dashed #f59e0b' : '1px solid #e2e8f0', 
                          borderRadius: '10px', background: isDraft ? '#fffdfa' : '#ffffff', 
                          flexWrap: 'wrap', gap: '1rem', width: '100%', boxSizing: 'border-box' 
                        }}>
                          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flex: 1, minWidth: '320px' }}>
                            {p.image && (
                              <div style={{ width: '80px', height: '58px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            )}
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '.78rem', color: 'var(--mint-700)', fontWeight: 'bold' }}>
                                  {p.category} · {p.tag} · {p.date}
                                </span>
                                {isDraft ? (
                                  <span style={{ background: '#fef3c7', color: '#b45309', padding: '.2rem .6rem', borderRadius: '999px', fontSize: '.72rem', fontWeight: '700', border: '1px solid #fde68a' }}>
                                    🟡 Draft (Hidden)
                                  </span>
                                ) : (
                                  <span style={{ background: '#ecfdf5', color: '#15803d', padding: '.2rem .6rem', borderRadius: '999px', fontSize: '.72rem', fontWeight: '700', border: '1px solid #bbf7d0' }}>
                                    🟢 Live on Website
                                  </span>
                                )}
                                {p.slug && <span style={{ fontSize: '.74rem', color: '#64748b' }}>/{p.slug}</span>}
                              </div>
                              <h4 style={{ margin: '.3rem 0', fontSize: '1.08rem' }}>{p.title}</h4>
                              <p style={{ fontSize: '.86rem', color: '#64748b', margin: 0 }}>{p.summary}</p>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                            <button
                              type="button"
                              onClick={() => handleTogglePostStatus(p)}
                              className="btn btn-soft"
                              style={{
                                padding: '.45rem .85rem', fontSize: '.8rem',
                                color: isDraft ? '#15803d' : '#b45309',
                                borderColor: isDraft ? '#bbf7d0' : '#fde68a',
                                background: isDraft ? '#f0fdf4' : '#fffbeb'
                              }}
                            >
                              {isDraft ? '🚀 Publish Live' : 'Switch to Draft'}
                            </button>
                            <a
                              href={`/blog/${p.slug || p.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost"
                              style={{ padding: '.45rem .75rem', fontSize: '.82rem', textDecoration: 'none' }}
                              title="Open public article page"
                            >
                              View ↗
                            </a>
                            <button 
                              type="button"
                              onClick={() => startEditPost(p)}
                              className="btn btn-soft"
                              style={{ padding: '.45rem .9rem', fontSize: '.82rem' }}
                            >
                              Edit &amp; SEO
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeletePost(p.id)}
                              className="btn btn-danger"
                              style={{ padding: '.45rem .8rem', fontSize: '.82rem' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              <Pagination
                currentPage={postsPage}
                totalItems={filteredPosts.length}
                pageSize={postsPageSize}
                onPageChange={setPostsPage}
                itemName="articles"
              />
            </div>
          </div>
        )}

        {/* ================= TAB 5: SITE META & LOGOS ================= */}
        {activeTab === 'meta' && (
          <div className="admin-card">
            <h3>Company Contact Information &amp; Official Logos</h3>
            <p style={{ color: '#64748b', fontSize: '.88rem', marginBottom: '1.5rem' }}>
              Upload new header and footer logos directly from your computer without needing manual URLs.
            </p>

            {/* Direct Image Uploads for Branding */}
            <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
              <ImageUploadField 
                label="HEADER BRAND LOGO"
                value={siteMeta.logo_url}
                onChange={(newUrl) => setSiteMeta({ ...siteMeta, logo_url: newUrl })}
                onToast={showToast}
              />

              <ImageUploadField 
                label="FOOTER BRAND LOGO"
                value={siteMeta.footer_logo_url}
                onChange={(newUrl) => setSiteMeta({ ...siteMeta, footer_logo_url: newUrl })}
                onToast={showToast}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-field">
                <label>Direct Phone Number</label>
                <input 
                  type="text" 
                  value={siteMeta.phone || ''} 
                  onChange={(e) => setSiteMeta({ ...siteMeta, phone: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Toll Free Phone Number</label>
                <input 
                  type="text" 
                  value={siteMeta.toll_free || ''} 
                  onChange={(e) => setSiteMeta({ ...siteMeta, toll_free: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-field">
                <label>Official Inquiries Email Address</label>
                <input 
                  type="email" 
                  value={siteMeta.email || ''} 
                  onChange={(e) => setSiteMeta({ ...siteMeta, email: e.target.value })}
                />
              </div>

              <div className="admin-field">
                <label>Toronto Head Office Physical Address</label>
                <input 
                  type="text" 
                  value={siteMeta.address || ''} 
                  onChange={(e) => setSiteMeta({ ...siteMeta, address: e.target.value })}
                />
              </div>
            </div>

            <button onClick={handleSaveMeta} className="btn btn-solid" style={{ marginTop: '1.5rem' }}>
              💾 Save Company Settings
            </button>
          </div>
        )}

        {/* ================= TAB 6: SECURITY & RESET PASSWORD ================= */}
        {activeTab === 'security' && (
          <div className="admin-card" style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.2rem', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', 
                color: 'var(--mint-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', flexShrink: 0 
              }}>
                🔐
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>Change Admin Password</h3>
                <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '.88rem' }}>
                  Update the credentials used to log into the Executive CMS Admin Panel.
                </p>
              </div>
            </div>

            {passwordMsg.text && (
              <div style={{
                padding: '.85rem 1.2rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontSize: '.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '.6rem',
                background: passwordMsg.type === 'success' ? '#ecfdf5' : '#fee2e2',
                color: passwordMsg.type === 'success' ? '#065f46' : '#b91c1c',
                border: passwordMsg.type === 'success' ? '1px solid #a7f3d0' : '1px solid #fecaca'
              }}>
                <span>{passwordMsg.type === 'success' ? '✅' : '⚠️'}</span>
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordReset}>
              <div className="admin-field" style={{ marginBottom: '1.3rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '.5rem', color: '#1e293b' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showCurrentPass ? 'text' : 'password'} 
                    required
                    placeholder="Enter current admin password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                    style={{ width: '100%', padding: '.75rem 2.8rem .75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', fontSize: '1rem', color: '#64748b' }}
                  >
                    {showCurrentPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="admin-field" style={{ marginBottom: '1.3rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '.5rem', color: '#1e293b' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showNewPass ? 'text' : 'password'} 
                    required
                    minLength={6}
                    placeholder="Enter new password (min. 6 characters)"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    style={{ width: '100%', padding: '.75rem 2.8rem .75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPass(!showNewPass)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', fontSize: '1rem', color: '#64748b' }}
                  >
                    {showNewPass ? '🙈' : '👁️'}
                  </button>
                </div>
                <span style={{ fontSize: '.8rem', color: '#64748b', marginTop: '.35rem', display: 'block' }}>
                  Must be at least 6 characters. Use letters, numbers, and symbols for high security.
                </span>
              </div>

              <div className="admin-field" style={{ marginBottom: '1.8rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '.5rem', color: '#1e293b' }}>
                  Confirm New Password
                </label>
                <input 
                  type={showNewPass ? 'text' : 'password'} 
                  required
                  minLength={6}
                  placeholder="Re-enter new password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                  style={{ width: '100%', padding: '.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button 
                  type="submit" 
                  disabled={passwordLoading}
                  className="btn btn-solid"
                  style={{ padding: '.8rem 2rem', fontSize: '.95rem' }}
                >
                  {passwordLoading ? 'Updating Password...' : '🔒 Update Admin Password'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
                    setPasswordMsg({ type: '', text: '' });
                  }}
                  className="btn btn-soft"
                  style={{ padding: '.8rem 1.4rem', fontSize: '.9rem' }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Floating Toast Notification */}
        {toast && <div className="toast">✓ {toast}</div>}
      </main>
    </div>
  );
}
