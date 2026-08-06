import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import { useToast } from '@/hooks/use-toast';

export default function CoAdminLayout() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    if (!token) {
      toast({
        title: 'Error',
        description: 'Please login to access admin panel',
        variant: 'destructive',
      });
      navigate('/admin/login');
    }
  }, [navigate, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-muted/50">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <AdminFooter />
    </div>
  );
}
