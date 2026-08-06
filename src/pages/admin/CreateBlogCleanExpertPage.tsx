import { useNavigate } from 'react-router-dom';
import BlogEditor from '@/components/admin/BlogEditor';

export default function CreateBlogCleanExpertPage() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate('/admin/blog/clean-expert');
  };

  return (
    <BlogEditor
      site="clean_expert"
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
