import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { blogEditorSchema, BlogEditorFormValues, blogApi, createFormData, authApi } from '@/lib/api/forms';

interface BlogEditorProps {
  site: 'lb_services' | 'lb_interiors';
  mode: 'create' | 'edit';
  initialData?: BlogEditorFormValues & { blog_id?: number; blog_image?: string };
  onSubmit?: (data: BlogEditorFormValues & { blog_image?: File }) => Promise<void>;
}

export default function BlogEditor({
  site,
  mode,
  initialData,
  onSubmit,
}: BlogEditorProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.blog_image || '');

  const form = useForm<BlogEditorFormValues>({
    resolver: zodResolver(blogEditorSchema),
    defaultValues: initialData || {
      blog_title: '',
      blog_excerpt: '',
      blog_description: '',
      blog_content: '',
      blog_tags: '',
      blog_author: '',
      blog_status: 'draft',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: BlogEditorFormValues) => {
    setLoading(true);
    try {
      const formData = createFormData(values, imageFile || undefined);

      let data;
      if (mode === 'create') {
        data = await blogApi.create(formData, site);
      } else {
        data = await blogApi.update(initialData?.blog_id || 0, formData, site);
      }

      if (data.success) {
        toast({
          title: 'Success',
          description: `Blog ${mode === 'create' ? 'created' : 'updated'} successfully`,
        });

        if (onSubmit) {
          await onSubmit(values);
        }
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to save blog',
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

 const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
  ],
};


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
        </h1>
        <p className="text-muted-foreground">
          {site === 'lb_services' ? 'LB Services' : 'LB Interiors'} - {mode === 'create' ? 'Create a new blog post' : 'Edit existing blog post'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Upload a featured image for your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-input"
                  className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    id="image-input"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="blog_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter blog title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blog_excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the blog (max 200 characters)"
                        maxLength={200}
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/200 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blog_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the blog post"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blog_author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Author name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blog_tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Separate tags with commas (e.g., tag1, tag2, tag3)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add relevant tags separated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Content</CardTitle>
              <CardDescription>Write your blog content using the rich text editor</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="blog_content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border rounded-lg overflow-hidden">
                        <ReactQuill
                          value={field.value}
                          onChange={field.onChange}
                          modules={modules}
                          theme="snow"
                          placeholder="Write your blog content here..."
                          style={{ height: '400px', marginBottom: '40px' }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Status and Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="blog_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Draft posts are not visible to the public
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    `${mode === 'create' ? 'Create' : 'Update'} Blog Post`
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      <style>{`
        .ql-toolbar {
          border-top: none !important;
          border-right: none !important;
          border-left: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background-color: #f9fafb !important;
        }
        .ql-container {
          border: none !important;
          font-family: inherit;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
