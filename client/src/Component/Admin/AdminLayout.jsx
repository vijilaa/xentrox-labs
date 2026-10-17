import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import AdminDashboard from './AdminDashboard';
import CategoryManagement from './CategoryManagement';
import CourseManagement from './CourseManagement';
import PortfolioManagement from './PortfolioManagement';
import BlogManagement from './BlogManagement';
import EnquiryManagement from './EnquiryManagement';

import {
  getAdminProfile,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from '../../services/api';

export default function AdminLayout({ onBackToSite, theme = 'dark', toggleTheme }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // Verify auth on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Listen for public enrollment submission events to update count immediately
  useEffect(() => {
    const handleEnquiryEvent = () => {
      fetchAllData();
    };
    window.addEventListener('enquiry_submitted', handleEnquiryEvent);
    return () => window.removeEventListener('enquiry_submitted', handleEnquiryEvent);
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('xentrox_admin_token');
    const savedUser = localStorage.getItem('xentrox_admin_user');

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Fallback
      }
    }

    try {
      const res = await getAdminProfile();
      if (res.success && res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Auth verification failed:', err.message);
      if (err.status === 401) {
        handleLogout();
      } else if (savedUser) {
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const [catRes, courseRes, portRes, blogRes, enqRes] = await Promise.all([
        getCategories().catch(() => ({ data: [] })),
        getCourses().catch(() => ({ data: [] })),
        getPortfolioItems().catch(() => ({ data: [] })),
        getBlogs().catch(() => ({ data: [] })),
        getEnquiries().catch(() => ({ data: [] }))
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (courseRes.data) setCourses(courseRes.data);
      if (portRes.data) setPortfolioItems(portRes.data);
      if (blogRes.data) setBlogs(blogRes.data);
      if (enqRes.data) setEnquiries(enqRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    fetchAllData();
  };

  const handleLogout = () => {
    localStorage.removeItem('xentrox_admin_token');
    localStorage.removeItem('xentrox_admin_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Category Actions
  const handleCreateCategory = async (data) => {
    await createCategory(data);
    await fetchAllData();
  };
  const handleUpdateCategory = async (id, data) => {
    await updateCategory(id, data);
    await fetchAllData();
  };
  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    await fetchAllData();
  };

  // Course Actions
  const handleCreateCourse = async (data) => {
    await createCourse(data);
    await fetchAllData();
  };
  const handleUpdateCourse = async (id, data) => {
    await updateCourse(id, data);
    await fetchAllData();
  };
  const handleDeleteCourse = async (id) => {
    await deleteCourse(id);
    await fetchAllData();
  };

  // Portfolio Actions
  const handleCreatePortfolio = async (data) => {
    await createPortfolioItem(data);
    await fetchAllData();
    window.dispatchEvent(new Event('portfolio_updated'));
  };
  const handleUpdatePortfolio = async (id, data) => {
    await updatePortfolioItem(id, data);
    await fetchAllData();
    window.dispatchEvent(new Event('portfolio_updated'));
  };
  const handleDeletePortfolio = async (id) => {
    await deletePortfolioItem(id);
    await fetchAllData();
    window.dispatchEvent(new Event('portfolio_updated'));
  };

  // Blog Actions
  const handleCreateBlog = async (data) => {
    await createBlog(data);
    await fetchAllData();
  };
  const handleUpdateBlog = async (id, data) => {
    await updateBlog(id, data);
    await fetchAllData();
  };
  const handleDeleteBlog = async (id) => {
    await deleteBlog(id);
    await fetchAllData();
  };

  // Enquiry Actions
  const handleUpdateEnquiryStatus = async (id, status) => {
    await updateEnquiryStatus(id, status);
    await fetchAllData();
  };
  const handleDeleteEnquiry = async (id) => {
    await deleteEnquiry(id);
    await fetchAllData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Loading XentroX Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onBackToSite={onBackToSite} />;
  }

  // Dynamic enquiry counter calculation from active database/API state
  const totalEnquiriesCount = enquiries.length;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'pending').length;

  const stats = {
    categoriesCount: categories.length,
    coursesCount: courses.length,
    portfolioCount: portfolioItems.length,
    blogsCount: blogs.length,
    enquiriesCount: totalEnquiriesCount,
    pendingEnquiriesCount
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex relative font-sans transition-colors duration-300">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSearchQuery('');
          }}
          onLogout={handleLogout}
          onBackToSite={onBackToSite}
          enquiriesCount={totalEnquiriesCount}
          pendingCount={pendingEnquiriesCount}
        />
      </div>

      {/* Sidebar Mobile Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative z-50">
            <AdminSidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setSearchQuery('');
                setMobileSidebarOpen(false);
              }}
              onLogout={handleLogout}
              onBackToSite={onBackToSite}
              enquiriesCount={totalEnquiriesCount}
              pendingCount={pendingEnquiriesCount}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminNavbar
          title={activeTab}
          user={user}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1550px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              stats={stats}
              recentEnquiries={enquiries}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setSearchQuery('');
              }}
              onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryManagement
              categories={categories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCreateCategory={handleCreateCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'courses' && (
            <CourseManagement
              courses={courses}
              categories={categories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCreateCourse={handleCreateCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioManagement
              portfolioItems={portfolioItems}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCreatePortfolio={handleCreatePortfolio}
              onUpdatePortfolio={handleUpdatePortfolio}
              onDeletePortfolio={handleDeletePortfolio}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogManagement
              blogs={blogs}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCreateBlog={handleCreateBlog}
              onUpdateBlog={handleUpdateBlog}
              onDeleteBlog={handleDeleteBlog}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiryManagement
              enquiries={enquiries}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onUpdateStatus={handleUpdateEnquiryStatus}
              onDeleteEnquiry={handleDeleteEnquiry}
            />
          )}
        </main>
      </div>
    </div>
  );
}
