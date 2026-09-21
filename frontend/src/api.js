const API_BASE = '/api';

export function getAuthHeader() {
  const token = localStorage.getItem('defreitas_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginAdmin(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(err.detail || 'Login failed');
  }
  return res.json();
}

export async function checkAuth() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function changeAdminPassword(currentPassword, newPassword) {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to update password' }));
    throw new Error(err.detail || 'Failed to update password');
  }
  return res.json();
}

export async function fetchAllContent() {
  const res = await fetch(`${API_BASE}/content/all`);
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function fetchPageContent(pageId) {
  const res = await fetch(`${API_BASE}/content/page/${pageId}`);
  if (!res.ok) throw new Error(`Failed to fetch ${pageId} content`);
  return res.json();
}

export async function savePageContent(pageId, data) {
  const res = await fetch(`${API_BASE}/content/page/${pageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Failed to update ${pageId}`);
  return res.json();
}

export async function saveSiteMeta(meta) {
  const res = await fetch(`${API_BASE}/content/site-meta`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(meta)
  });
  if (!res.ok) throw new Error('Failed to update site meta');
  return res.json();
}

export async function uploadMedia(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Upload failed' }));
    throw new Error(err.detail || 'Upload failed');
  }
  return res.json();
}

export async function fetchMediaList() {
  const res = await fetch(`${API_BASE}/upload/list`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to load media list');
  return res.json();
}

export async function deleteMedia(filename) {
  const res = await fetch(`${API_BASE}/upload/${filename}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to delete media');
  return res.json();
}

export async function submitInquiry(data) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit inquiry');
  return res.json();
}

export async function fetchInquiries() {
  const res = await fetch(`${API_BASE}/inquiries`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to fetch inquiries');
  return res.json();
}

export async function deleteInquiry(id) {
  const res = await fetch(`${API_BASE}/inquiries/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to delete inquiry');
  return res.json();
}

export async function acknowledgeInquiry(id) {
  const res = await fetch(`${API_BASE}/inquiries/${id}/acknowledge`, {
    method: 'PATCH',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to acknowledge inquiry');
  return res.json();
}

export async function fetchPosts(status) {
  const url = status ? `${API_BASE}/posts?status=${encodeURIComponent(status)}` : `${API_BASE}/posts`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPostById(idOrSlug) {
  const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(idOrSlug)}`);
  if (!res.ok) throw new Error('Failed to fetch article');
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(post)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(id, post) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(post)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}

export async function fetchAnalyticsStats() {
  const res = await fetch(`${API_BASE}/analytics/stats`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to fetch analytics stats');
  return res.json();
}

