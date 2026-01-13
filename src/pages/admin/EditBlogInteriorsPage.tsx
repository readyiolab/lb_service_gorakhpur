import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from '@/components/admin/BlogEditor';
import { blogApi } from '@/lib/api/forms';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { BlogEditorFormValues } from '@/lib/api/forms';

export default function EditBlogInteriorsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState<(BlogEditorFormValues & { blog_id?: number; blog_image?: string }) | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  const fetchBlogData = async () => {
    try {
      const blogId = parseInt(id || '0', 10);
      if (isNaN(blogId)) {
        toast({
          title: 'Error',
          description: 'Invalid blog ID',
          variant: 'destructive',
        });
        navigate('/admin/blog/interiors');
        return;
      }

      const data = await blogApi.getById(blogId, 'lb_interiors');
      
      if (data.success && data.blog) {
        setBlogData({
          blog_id: data.blog.blog_id,
          blog_title: data.blog.blog_title || '',
          blog_excerpt: data.blog.blog_excerpt || '',
          blog_description: data.blog.blog_description || '',
          blog_content: data.blog.blog_content || '',
          blog_tags: data.blog.blog_tags || '',
          blog_author: data.blog.blog_author || '',
          blog_status: data.blog.blog_status || 'draft',
          blog_image: data.blog.blog_image || '',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to fetch blog post',
          variant: 'destructive',
        });
        navigate('/admin/blog/interiors');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect to server',
        variant: 'destructive',
      });
      navigate('/admin/blog/interiors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    navigate('/admin/blog/interiors');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!blogData) {
    return null;
  }

  return (
    <BlogEditor
      site="lb_interiors"
      mode="edit"
      initialData={blogData}
      onSubmit={handleSubmit}
    />
  );
}
