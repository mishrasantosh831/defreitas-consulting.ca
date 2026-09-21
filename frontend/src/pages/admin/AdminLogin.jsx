import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../../api';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginAdmin(username, password);
      localStorage.setItem('defreitas_admin_token', res.access_token);
      localStorage.setItem('defreitas_admin_user', res.username);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: 'radial-gradient(circle at top, #0f271d 0%, #06120d 100%)', padding: '20px' 
    }}>
      <div style={{ 
        background: '#ffffff', borderRadius: '16px', maxWidth: '440px', width: '100%', 
        padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/images/logo.png" 
            alt="DeFreitas & Associates" 
            style={{ height: '42px', margin: '0 auto 1.2rem', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/logo.png';
            }}
          />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--ink)' }}>Executive CMS Admin Panel</h2>
          <p style={{ fontSize: '.86rem', color: 'var(--ink-faint)', marginTop: '.4rem' }}>
            Manage website content, page copy, and media assets
          </p>
        </div>

        {error && (
          <div style={{ 
            background: '#fee2e2', color: '#b91c1c', padding: '.75rem', 
            borderRadius: '8px', marginBottom: '1.2rem', fontSize: '.85rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="field">
            <label>Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-solid" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid var(--line)', 
          textAlign: 'center', fontSize: '.82rem'
        }}>
          <Link to="/" style={{ color: 'var(--mint-700)', fontWeight: '600' }}>← Back to Public Website</Link>
        </div>
      </div>
    </div>
  );
}
