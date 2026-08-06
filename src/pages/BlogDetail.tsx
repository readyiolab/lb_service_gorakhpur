import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { blogApi } from '@/lib/api/forms';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogPost {
  blog_id: number;
  blog_title: string;
  blog_slug: string;
  blog_excerpt: string;
  blog_description: string;
  blog_content: string;
  blog_tags: string;
  blog_author: string;
  blog_status: string;
  blog_image?: string;
  blog_views: number;
  created_at: string;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }
    
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await blogApi.getBySlug(slug!, 'lb_services');

      if (data.success && data.blog) {
        setBlog(data.blog);
      } else {
        toast({
          title: 'Error',
          description: 'Blog post not found',
          variant: 'destructive',
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load blog post',
        variant: 'destructive',
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              Go back home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.blog_title} | LB Services</title>
        <meta name="description" content={blog.blog_excerpt} />
        <meta name="keywords" content={blog.blog_tags} />
        <meta property="og:title" content={blog.blog_title} />
        <meta property="og:description" content={blog.blog_excerpt} />
        {blog.blog_image && <meta property="og:image" content={blog.blog_image} />}
      </Helmet>

      <Layout>
        {/* Header Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {blog.blog_title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.blog_author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              <span className="text-sm">{blog.blog_views} views</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {blog.blog_image && (
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <img
                src={blog.blog_image}
                alt={blog.blog_title}
                className="w-full h-auto max-h-96 object-cover rounded-lg"
              />
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Excerpt */}
            <div className="mb-8 p-6 bg-card rounded-lg border border-border">
              <p className="text-lg text-muted-foreground italic">
                {blog.blog_excerpt}
              </p>
            </div>

            {/* Description */}
            {blog.blog_description && (
              <div className="mb-8">
                <p className="text-foreground leading-relaxed">
                  {blog.blog_description}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div
              className="prose prose-sm md:prose-base max-w-none mb-8 [&>*]:mb-4 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:text-foreground [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-foreground [&>li]:mb-2 [&>strong]:font-bold [&>strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: blog.blog_content }}
            />

            {/* Tags */}
            {blog.blog_tags && (
              <div className="pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.blog_tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
