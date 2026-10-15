const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Category = require('./models/Category');
const Course = require('./models/Course');
const Portfolio = require('./models/Portfolio');
const Blog = require('./models/Blog');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Clearing existing database collections...');
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Portfolio.deleteMany({});
    await Blog.deleteMany({});

    console.log('[Seeder] Seeding Super Admin user...');
    const admin = await Admin.create({
      name: 'XentroX Admin',
      email: 'admin@xentroxlabs.com',
      password: 'Admin@123456',
      role: 'superadmin'
    });

    console.log(`[Seeder] Created default admin: admin@xentroxlabs.com / Admin@123456`);

    console.log('[Seeder] Seeding Categories...');
    const categoriesData = [
      {
        title: 'Software Development',
        categoryId: 'software-dev',
        iconName: 'Code2',
        theme: 'dark',
        badge: 'High Demand',
        description: 'Master full stack web development, modern frameworks, and robust back-end engineering.'
      },
      {
        title: 'Programming & Computer Science',
        categoryId: 'prog-cs',
        iconName: 'Laptop',
        theme: 'dark',
        badge: 'Core Foundations',
        description: 'Build strong foundational logic, core programming, and algorithms mastery.'
      },
      {
        title: 'Digital Marketing',
        categoryId: 'digital-marketing',
        iconName: 'TrendingUp',
        theme: 'dark',
        badge: 'Career Booster',
        description: 'Drive targeted growth, master ad campaigns, and dominate search & social media channels.'
      },
      {
        title: 'Creative & Media',
        categoryId: 'creative-media',
        iconName: 'PenTool',
        theme: 'dark',
        badge: 'Design & Edit',
        description: 'Design stunning visual assets, edit viral reels, motion graphics, and master UI/UX.'
      },
      {
        title: 'AI & Modern Technologies',
        categoryId: 'ai-modern-tech',
        iconName: 'Cpu',
        theme: 'dark',
        badge: 'Future Ready',
        description: 'Harness cutting-edge AI tools, Generative AI, Cloud infrastructure, and DevOps.'
      },
      {
        title: 'Career & Industry Skills',
        categoryId: 'career-skills',
        iconName: 'BarChart3',
        theme: 'dark',
        badge: 'Job Ready',
        description: 'Transform technical skills into high-paying client contracts, jobs, and startup success.'
      }
    ];

    const insertedCategories = await Category.insertMany(categoriesData);

    console.log('[Seeder] Seeding Courses...');
    const coursesData = [
      // Software Development
      { name: 'Full Stack Web Development', categorySlug: 'software-dev', duration: '6 Months', level: 'Beginner to Advanced', tag: 'Popular' },
      { name: 'MERN Stack Development', categorySlug: 'software-dev', duration: '4 Months', level: 'Intermediate', tag: 'Hot' },
      { name: 'Python Full Stack Development', categorySlug: 'software-dev', duration: '5 Months', level: 'Beginner to Pro' },
      { name: 'React.js Development', categorySlug: 'software-dev', duration: '2 Months', level: 'Intermediate', tag: 'Trending' },
      // Programming & CS
      { name: 'Python Programming', categorySlug: 'prog-cs', duration: '2 Months', level: 'Beginner', tag: 'Top Rated' },
      { name: 'Java Programming', categorySlug: 'prog-cs', duration: '2.5 Months', level: 'Beginner' },
      { name: 'Data Structures & Algorithms', categorySlug: 'prog-cs', duration: '3 Months', level: 'Intermediate', tag: 'Interview Ready' },
      // Digital Marketing
      { name: 'Complete Digital Marketing', categorySlug: 'digital-marketing', duration: '4 Months', level: 'Beginner to Expert', tag: 'All-in-One' },
      { name: 'Search Engine Optimization (SEO)', categorySlug: 'digital-marketing', duration: '2 Months', level: 'Intermediate', tag: 'High ROI' },
      // Creative & Media
      { name: 'UI/UX Design', categorySlug: 'creative-media', duration: '3 Months', level: 'Beginner to Pro', tag: 'High Paying' },
      { name: 'Video Editing & Premiere Pro', categorySlug: 'creative-media', duration: '2.5 Months', level: 'Beginner', tag: 'In Demand' },
      // AI & Modern Tech
      { name: 'Generative AI & Prompt Engineering', categorySlug: 'ai-modern-tech', duration: '2 Months', level: 'Intermediate', tag: 'Next-Gen' },
      { name: 'Cloud Basics (AWS / GCP)', categorySlug: 'ai-modern-tech', duration: '2 Months', level: 'Intermediate', tag: 'High Demand' }
    ];

    // Link category ObjectId references
    const enrichedCourses = coursesData.map((course) => {
      const catObj = insertedCategories.find(c => c.categoryId === course.categorySlug);
      return {
        ...course,
        category: catObj ? catObj._id : null
      };
    });

    await Course.insertMany(enrichedCourses);

    console.log('[Seeder] Seeding Portfolio projects...');
    await Portfolio.create({
      title: 'E-Commerce Platform for Global Brand',
      category: 'Full Stack Development',
      client: 'Retail Tech Corp',
      description: 'High performance React & Node.js shopping platform handling 50k daily active users.',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind']
    });

    console.log('[Seeder] Seeding Blog post...');
    await Blog.create({
      title: 'Top 5 Full Stack Trends in 2026',
      slug: 'top-5-full-stack-trends-2026',
      content: 'Exploring AI integration in modern MERN stack development and cloud microservices.',
      excerpt: 'Discover the latest web development trends shaping tech careers in 2026.'
    });

    console.log('✅ [Seeder] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ [Seeder Error] ${error.message}`);
    process.exit(1);
  }
};

seedData();
