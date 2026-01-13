import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  ChevronDown,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  LogOut,
  Settings,
} from 'lucide-react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      label: 'Contact',
      icon: MessageSquare,
      subMenu: [
        {
          label: 'LB Services Contact',
          href: '/admin/contact/services',
        },
        {
          label: 'LB Interiors Contact',
          href: '/admin/contact/interiors',
        },
      ],
    },
    {
      label: 'Blog',
      icon: BookOpen,
      subMenu: [
        {
          label: 'LB Services Blog',
          href: '/admin/blog/services',
        },
        {
          label: 'LB Interiors Blog',
          href: '/admin/blog/interiors',
        },
      ],
    },
  ];

  const SidebarContent = () => (
    <div className="space-y-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>

      <nav className="space-y-2 px-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.subMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {item.subMenu.map((subItem) => (
                    <Link key={subItem.href} to={subItem.href} onClick={() => setOpen(false)}>
                      <DropdownMenuItem
                        className={cn(
                          'cursor-pointer',
                          isActive(subItem.href) && 'bg-accent'
                        )}
                      >
                        {subItem.label}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={item.href} onClick={() => setOpen(false)}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-2 space-y-2">
        <Link to="/admin/settings" onClick={() => setOpen(false)}>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border h-screen sticky top-0 overflow-y-auto bg-background">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
