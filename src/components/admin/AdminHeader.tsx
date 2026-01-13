import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, User } from 'lucide-react';

interface AdminUser {
  admin_id: number;
  admin_name: string;
  admin_email: string;
  admin_role: string;
}

export default function AdminHeader() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const adminData = localStorage.getItem('admin_user');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">LB Services Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {admin ? getInitials(admin.admin_name) : 'AD'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-2 p-2">
                <p className="text-sm font-medium">{admin?.admin_name}</p>
                <p className="text-xs text-muted-foreground">{admin?.admin_email}</p>
                <p className="text-xs text-muted-foreground">
                  Role: {admin?.admin_role?.replace('_', ' ').toUpperCase()}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
