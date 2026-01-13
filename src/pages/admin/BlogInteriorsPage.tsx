import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus } from 'lucide-react';
import { blogApi } from '@/lib/api/forms';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Blog {
  blog_id: number;
  blog_title: string;
  blog_slug: string;
  blog_author: string;
  blog_status: string;
  blog_views: number;
  created_at: string;
}

export default function BlogInteriorsPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogApi.getAll('lb_interiors');

      if (data.success) {
        setBlogs(data.blogs || []);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to fetch blogs',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect to server',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditClick = (blogId: number) => {
    navigate(`/admin/blog/interiors/edit/${blogId}`);
  };

  const handleDeleteClick = (blogId: number) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    setDeleting(true);
    try {
      // Ensure blog_id is a number
      const blogId = typeof blogToDelete === 'string' ? parseInt(blogToDelete, 10) : blogToDelete;
      
      // Verify blog exists in current list before deleting
      const blogToDeleteObj = blogs.find(b => b.blog_id === blogToDelete);
      if (!blogToDeleteObj) {
        toast({
          title: 'Error',
          description: 'Blog post not found in current list. Please refresh the page.',
          variant: 'destructive',
        });
        await fetchBlogs();
        return;
      }
      
      console.log('Attempting to delete blog:', {
        blogToDelete,
        blogId,
        blogToDeleteObj,
        site: 'lb_interiors'
      });
      
      const result = await blogApi.delete(blogId, 'lb_interiors');
      
      console.log('Delete result:', result);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Blog post deleted successfully',
        });
        // Remove the deleted blog from the state
        setBlogs(blogs.filter(b => b.blog_id !== blogToDelete));
        // Refresh the list to ensure consistency
        await fetchBlogs();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to delete blog post',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LB Interiors Blog</h1>
          <p className="text-muted-foreground">Manage blog posts for LB Interiors</p>
        </div>
        <Button onClick={() => navigate('/admin/blog/interiors/create')}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>
            Total: {blogs.length} posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blog posts found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.blog_id}>
                    <TableCell className="font-medium">{blog.blog_title}</TableCell>
                    <TableCell>{blog.blog_author}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(blog.blog_status)}>
                        {blog.blog_status}
                      </Badge>
                    </TableCell>
                    <TableCell>{blog.blog_views}</TableCell>
                    <TableCell>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(Number(blog.blog_id))}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => handleDeleteClick(Number(blog.blog_id))}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
