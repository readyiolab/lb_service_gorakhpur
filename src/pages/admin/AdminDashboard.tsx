import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard</p>
      </div>

     

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to manage your content</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/blog/services"
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-1">Manage LB Services Blog</h3>
            <p className="text-sm text-muted-foreground">Create and edit blog posts</p>
          </a>
          <a
            href="/admin/blog/interiors"
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-1">Manage LB Interiors Blog</h3>
            <p className="text-sm text-muted-foreground">Create and edit blog posts</p>
          </a>
          <a
            href="/admin/contact/services"
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-1">View LB Services Contacts</h3>
            <p className="text-sm text-muted-foreground">Manage contact submissions</p>
          </a>
          <a
            href="/admin/contact/interiors"
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-1">View LB Interiors Contacts</h3>
            <p className="text-sm text-muted-foreground">Manage contact submissions</p>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
