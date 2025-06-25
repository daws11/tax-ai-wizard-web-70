import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link as RouterLink } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  content: string;
  metaInfo: string;
  keywords: string;
  images: string[];
  createdAt: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [blog, setBlog] = useState<Blog | null>(location.state?.blog || null);
  const [loading, setLoading] = useState(!blog);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blog) return;
    fetch("https://ai-auto-blogger.onrender.com/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((blogs: Blog[]) => {
        const found = blogs.find((b) => slugify(b.title) === slug);
        if (!found) throw new Error("Blog not found");
        setBlog(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, blog]);

  useEffect(() => {
    if (!blog) return;
    document.title = `${blog.title} | Blog TaxAI`;
    // Description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', blog.metaInfo || 'Artikel blog TaxAI');

    // Keywords
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', blog.keywords || 'tax, ai, finance, blog');

    // Open Graph
    const setOg = (property, content) => {
      let el = document.querySelector(`meta[property='${property}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setOg('og:title', blog.title);
    setOg('og:description', blog.metaInfo || 'Artikel blog TaxAI');
    setOg('og:type', 'article');
    setOg('og:url', window.location.href);
    if (blog.images && blog.images.length > 0) {
      setOg('og:image', blog.images[0]);
    }

    // Twitter Card
    const setTwitter = (name, content) => {
      let el = document.querySelector(`meta[name='${name}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setTwitter('twitter:card', blog.images && blog.images.length > 0 ? 'summary_large_image' : 'summary');
    setTwitter('twitter:title', blog.title);
    setTwitter('twitter:description', blog.metaInfo || 'TaxAi Blog');
    if (blog.images && blog.images.length > 0) {
      setTwitter('twitter:image', blog.images[0]);
    }
  }, [blog]);

  if (loading) return <div className="text-center py-10">Loading blog...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!blog) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300" dir={document.documentElement.dir}>
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto py-10 px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center" aria-label="Breadcrumb">
            <RouterLink to="/blogs" className="hover:text-primary underline">Blog</RouterLink>
            <span className="mx-1">/</span>
            <span className="text-gray-400 dark:text-gray-500 line-clamp-1">{blog.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary drop-shadow-lg leading-tight">{blog.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-2">
              <span>🗓️ {new Date(blog.createdAt).toLocaleString()}</span>
              <span>🏷️ {blog.keywords}</span>
            </div>
          </header>

          {/* Main Image */}
          {/* Main Image */}

          {/* Content */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Content</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none bg-white/90 dark:bg-gray-900/90 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <div 
                style={{ textAlign: 'justify' }}
                className="[&>p]:mb-6 [&>p]:text-justify [&>p]:leading-relaxed [&>p]:text-base md:[&>p]:text-lg [&>p]:text-gray-700 dark:[&>p]:text-gray-200"
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
            </div>
          </section>

          <RouterLink to="/blogs" className="inline-block mt-4 text-primary underline hover:text-primary/80 text-sm">← Back To Blog</RouterLink>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage; 