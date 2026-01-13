import { useNavigate } from 'react-router-dom';
import BlogEditor from '@/components/admin/BlogEditor';

export default function CreateBlogServicesPage() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate('/admin/blog/services');
  };

  return (
    <BlogEditor
      site="lb_services"
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
