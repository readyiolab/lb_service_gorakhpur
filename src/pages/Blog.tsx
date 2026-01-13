import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, User, ArrowRight } from "lucide-react";
import { blogApi } from "@/lib/api/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

interface Blog {
  blog_id: number;
  blog_title: string;
  blog_slug: string;
  blog_description: string;
  blog_image: string;
  blog_content: string;
  blog_author: string;
  created_at: string;
  updated_at: string;
  blog_tags?: string;
  blog_status: string;
  blog_views: number;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogApi.getAll("lb_services");
        setBlogs(response.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date unavailable";
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getExcerpt = (content: string, length = 150) => {
    const text = stripHtml(content);
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <>
      <Helmet>
        <title>Blog - LB Services Gorakhpur</title>
        <meta name="description" content="Read our latest blog posts about business services, insights, and industry trends." />
      </Helmet>

      <Layout>
        <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-orange-100 max-w-2xl">
              Insights, tips, and industry trends to help your business grow
            </p>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-lg text-muted-foreground">Loading blog posts...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-96">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-96">
              <p className="text-lg text-muted-foreground mb-4">No blog posts yet.</p>
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card
                  key={blog.blog_id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group"
                >
                  {/* Featured Image */}
                  {blog.blog_image && (
                    <Link to={`/blog/${blog.blog_slug}`} className="relative w-full h-48 overflow-hidden bg-muted block">
                      <img
                        src={blog.blog_image}
                        alt={blog.blog_title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </Link>
                  )}

                  <CardContent className="pt-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      <Link to={`/blog/${blog.blog_slug}`}>{blog.blog_title}</Link>
                    </h2>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.created_at)}
                      </div>
                      {blog.blog_author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {blog.blog_author}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                      {getExcerpt(blog.blog_description || blog.blog_content, 120)}
                    </p>

                    {/* Tags */}
                    {blog.blog_tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.blog_tags.split(",").slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  {/* Footer */}
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full group/btn">
                      <Link to={`/blog/${blog.blog_slug}`} className="flex items-center justify-center gap-2">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
        </main>
      </Layout>
    </>
  );
};

export default Blog;
