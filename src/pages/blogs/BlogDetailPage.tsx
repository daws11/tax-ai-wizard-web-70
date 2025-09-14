import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, BlogPost } from "@/data/blogs";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Invalid blog post");
      setLoading(false);
      return;
    }

    const foundBlog = getBlogPostBySlug(slug);
    if (!foundBlog) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    setBlog(foundBlog);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (!blog) return;
    
    const currentLanguage = i18n.language as 'en' | 'ar';
    const blogTitle = blog.title[currentLanguage];
    const blogDescription = blog.metaDescription[currentLanguage];
    const blogKeywords = blog.keywords[currentLanguage];

    document.title = `${blogTitle} | TaxAI Blog`;
    
    // Description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', blogDescription);

    // Keywords
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', blogKeywords);

    // Open Graph
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property='${property}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setOg('og:title', blogTitle);
    setOg('og:description', blogDescription);
    setOg('og:type', 'article');
    setOg('og:url', window.location.href);
    if (blog.featuredImage) {
      setOg('og:image', blog.featuredImage);
    }

    // Twitter Card
    const setTwitter = (name: string, content: string) => {
      let el = document.querySelector(`meta[name='${name}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setTwitter('twitter:card', blog.featuredImage ? 'summary_large_image' : 'summary');
    setTwitter('twitter:title', blogTitle);
    setTwitter('twitter:description', blogDescription);
    if (blog.featuredImage) {
      setTwitter('twitter:image', blog.featuredImage);
    }
  }, [blog, i18n.language]);

  if (loading) return <div className="text-center py-10">{t('blog.loading')}</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!blog) return null;

  const currentLanguage = i18n.language as 'en' | 'ar';
  const isRTL = currentLanguage === 'ar';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-10 px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center" aria-label="Breadcrumb">
            <Link to="/blog" className="hover:text-primary underline">{t('blog.title')}</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-400 dark:text-gray-500 line-clamp-1">{blog.title[currentLanguage]}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {blog.category[currentLanguage]}
              </span>
              <span>•</span>
              <span>{blog.readTime[currentLanguage]}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary drop-shadow-lg leading-tight">
              {blog.title[currentLanguage]}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {blog.excerpt[currentLanguage]}
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>🗓️</span>
                <span>{t('blog.publishedOn')} {new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>{t('blog.author')}: {blog.author[currentLanguage]}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-8">
              <img 
                src={blog.featuredImage} 
                alt={blog.title[currentLanguage]}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <section className="mb-10">
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none bg-white/90 dark:bg-gray-900/90 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <div 
                className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-primary [&>h2]:first:mt-0 [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-gray-700 dark:[&>p]:text-gray-200 [&>ul]:mb-6 [&>ul]:pl-6 [&>li]:mb-2 [&>li]:text-gray-700 dark:[&>li]:text-gray-200"
                dangerouslySetInnerHTML={{ __html: blog.content[currentLanguage] }} 
              />
            </div>
          </section>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('blog.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blog */}
          <div className="text-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <span className={isRTL ? 'rotate-180' : ''}>←</span>
              {t('blog.backToBlog')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage; 