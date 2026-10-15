const API_BASE_URL = 'http://localhost:5000/api';

// Helper for making authenticated/unauthenticated API calls
const fetchAPI = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const authToken = token || localStorage.getItem('xentrox_admin_token');
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = new Error(data.message || `Request failed with status ${response.status}`);
      err.status = response.status;
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.toLowerCase().includes('fetch')) {
      const netErr = new Error('Cannot connect to server. Please verify backend server is running on http://localhost:5000');
      netErr.isNetworkError = true;
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
