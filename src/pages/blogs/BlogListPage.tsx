import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ai-auto-blogger.onrender.com/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then(setBlogs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.title = "Blog & News | TaxAI";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Find the latest articles, news, and insights about tax, finance, and AI technology on the TaxAI blog.');
  }, []);

  if (loading) return <div className="text-center py-10">Loading blogs...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300" dir={document.documentElement.dir}>
      <Navbar />
      <main className="flex-grow">
        <section className="max-w-5xl mx-auto py-12 px-4">
          <header className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold mb-3 text-primary drop-shadow-lg">Blog & News</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Find the latest articles, news, and insights about tax, finance, and AI technology here.</p>
          </header>
          <div className="grid gap-8 md:grid-cols-2">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${slugify(blog.title)}`}
                state={{ blog }}
                className="group block rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 hover:border-primary transition-all duration-200 hover:shadow-2xl"
              >
                <div className="p-6 flex flex-col gap-2">
                  <h2 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{blog.title}</h2>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-1 flex gap-4 flex-wrap">
                    <span>🗓️ {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>🏷️ {blog.keywords}</span>
                  </div>
                  <span className="text-primary text-sm font-semibold mt-auto">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage; 