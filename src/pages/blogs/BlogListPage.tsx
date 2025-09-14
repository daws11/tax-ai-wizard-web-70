import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogPosts, BlogPost } from "@/data/blogs";

const BlogListPage = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const allBlogs = getAllBlogPosts();
    setBlogs(allBlogs);
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = `${t('blog.title')} | TaxAI`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', t('blog.subtitle'));
  }, [t]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === "" || 
      blog.title[i18n.language as 'en' | 'ar'].toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt[i18n.language as 'en' | 'ar'].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      blog.category[i18n.language as 'en' | 'ar'].toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(blogs.map(blog => blog.category[i18n.language as 'en' | 'ar'])));

  if (loading) return <div className="text-center py-10">{t('blog.loading')}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto py-12 px-4">
          <header className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold mb-3 text-primary drop-shadow-lg">{t('blog.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
          </header>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">{t('blog.allCategories')}</option>
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
          </div>

          {/* Blog Posts Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t('blog.noPostsFound')}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="group block rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 hover:border-primary transition-all duration-200 hover:shadow-2xl"
                >
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {blog.category[i18n.language as 'en' | 'ar']}
                      </span>
                      <span>•</span>
                      <span>{blog.readTime[i18n.language as 'en' | 'ar']}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title[i18n.language as 'en' | 'ar']}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                      {blog.excerpt[i18n.language as 'en' | 'ar']}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>🗓️ {new Date(blog.publishedAt).toLocaleDateString()}</span>
                      <span className="text-primary font-semibold group-hover:underline">
                        {t('blog.readMore')} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage; 