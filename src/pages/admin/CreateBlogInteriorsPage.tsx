import { useNavigate } from 'react-router-dom';
import BlogEditor from '@/components/admin/BlogEditor';

export default function CreateBlogInteriorsPage() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate('/admin/blog/interiors');
  };

  return (
    <BlogEditor
      site="lb_interiors"
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
