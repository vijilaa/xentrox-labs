// Resolve the Backend API URL dynamically based on environment and access point
const resolveApiBaseUrl = () => {
  // 1. Explicit Vite environment variable (Highest Priority - used for Vercel/Netlify/production)
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    const trimmed = envUrl.trim().replace(/\/+$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  }

  // 2. Browser runtime detection
  if (typeof window !== 'undefined' && window.location) {
    const { hostname, protocol } = window.location;

    // A. Desktop Localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }

    // B. Mobile testing over Local Area Network (Wi-Fi IP e.g. 192.168.x.x, 10.x.x.x)
    const isLocalNetworkIp = /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);
    if (isLocalNetworkIp) {
      return `${protocol}//${hostname}:5000/api`;
    }

    // C. Production Deployed Domain (e.g. *.vercel.app, *.netlify.app, or custom domain)
    // Default to relative /api for platforms using rewrites/proxies
    return '/api';
  }

  return 'http://localhost:5000/api';
};

export const API_BASE_URL = resolveApiBaseUrl();

// Log current API endpoint in development for easy debugging
if (import.meta.env.DEV) {
  console.log(`[XentroX API] Endpoint configured: ${API_BASE_URL}`);
}

// Helper for making authenticated/unauthenticated API calls
const fetchAPI = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  const authToken = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('xentrox_admin_token') : null);
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    // Prevent accidental duplicate /api/api prefixes
    const cleanEndpoint = endpoint.replace(/^\/api(?=\/|$)/, '');
    const normalizedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : `/${cleanEndpoint}`;
    const url = `${API_BASE_URL}${normalizedEndpoint}`;
    const response = await fetch(url, options);

    // Parse JSON safely with fallback for non-JSON responses
    const rawText = await response.text();
    let data = {};
    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { message: rawText };
      }
    }

    if (!response.ok) {
      let errorText = data.message;
      if (!errorText) {
        if (response.status === 405) {
          errorText = '405 Method Not Allowed: API request was received by static frontend instead of backend. Check Vercel API routing or VITE_API_URL.';
        } else if (response.status === 404) {
          errorText = '404 Not Found: API endpoint could not be found.';
        } else {
          errorText = `Request failed with status ${response.status}`;
        }
      }
      const err = new Error(errorText);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    // Human-friendly network failure detection (e.g. offline, DNS failure, CORS block)
    if (error.name === 'TypeError' && error.message.toLowerCase().includes('fetch')) {
      const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const networkErrorMessage = isLocalHost
        ? 'Cannot connect to backend server on port 5000. Please ensure the backend server is running.'
        : 'Cannot connect to server. Please check your internet connection or verify the deployed backend service is active.';

      const netErr = new Error(networkErrorMessage);
      netErr.isNetworkError = true;
      netErr.originalError = error;
      throw netErr;
    }
    throw error;
  }
};

// Admin Auth APIs
export const adminLogin = (email, password) =>
  fetchAPI('/admin/login', 'POST', { email, password });

export const getAdminProfile = () =>
  fetchAPI('/admin/me', 'GET');

// Category APIs
export const getCategories = () =>
  fetchAPI('/categories', 'GET');

export const createCategory = (data) =>
  fetchAPI('/categories', 'POST', data);

export const updateCategory = (id, data) =>
  fetchAPI(`/categories/${id}`, 'PUT', data);

export const deleteCategory = (id) =>
  fetchAPI(`/categories/${id}`, 'DELETE');

// Course APIs
export const getCourses = (category = '', search = '') => {
  const query = new URLSearchParams();
  if (category) query.append('category', category);
  if (search) query.append('search', search);
  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchAPI(`/courses${queryString}`, 'GET');
};

export const createCourse = (data) =>
  fetchAPI('/courses', 'POST', data);

export const updateCourse = (id, data) =>
  fetchAPI(`/courses/${id}`, 'PUT', data);

export const deleteCourse = (id) =>
  fetchAPI(`/courses/${id}`, 'DELETE');

// Portfolio APIs
export const getPortfolioItems = () =>
  fetchAPI('/portfolio', 'GET');

export const createPortfolioItem = (data) =>
  fetchAPI('/portfolio', 'POST', data);

export const updatePortfolioItem = (id, data) =>
  fetchAPI(`/portfolio/${id}`, 'PUT', data);

export const deletePortfolioItem = (id) =>
  fetchAPI(`/portfolio/${id}`, 'DELETE');

// Blog APIs
export const getBlogs = () =>
  fetchAPI('/blogs', 'GET');

export const getBlogBySlug = (slug) =>
  fetchAPI(`/blogs/${slug}`, 'GET');

export const createBlog = (data) =>
  fetchAPI('/blogs', 'POST', data);

export const updateBlog = (id, data) =>
  fetchAPI(`/blogs/${id}`, 'PUT', data);

export const deleteBlog = (id) =>
  fetchAPI(`/blogs/${id}`, 'DELETE');

// Enquiry APIs
export const createEnquiry = (data) =>
  fetchAPI('/enquiries', 'POST', data);

export const getEnquiries = (status = '') => {
  const query = status ? `?status=${status}` : '';
  return fetchAPI(`/enquiries${query}`, 'GET');
};

export const updateEnquiryStatus = (id, status) =>
  fetchAPI(`/enquiries/${id}`, 'PUT', { status });

export const deleteEnquiry = (id) =>
  fetchAPI(`/enquiries/${id}`, 'DELETE');

// System Health API Check
export const checkServerHealth = () =>
  fetchAPI('/health', 'GET').catch(() => fetchAPI('/', 'GET'));
