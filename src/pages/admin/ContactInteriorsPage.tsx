import { useEffect, useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { contactApi } from '@/lib/api/forms';

interface Contact {
  contact_id: number;
  contact_name: string;
  contact_phone: string;
  contact_project_details: string;
  contact_status: string;
  created_at: string;
}

export default function ContactInteriorsPage() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contactApi.getAll('lb_interiors');

      if (data.success) {
        setContacts(data.contacts || []);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to fetch contacts',
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
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-3xl font-bold tracking-tight">LB Interiors Contacts</h1>
          <p className="text-muted-foreground">Manage consultation requests from LB Interiors</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contacts</CardTitle>
          <CardDescription>
            Total: {contacts.length} submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No contacts found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Project Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.contact_id}>
                    <TableCell className="font-medium">{contact.contact_name}</TableCell>
                    <TableCell>{contact.contact_phone}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {contact.contact_project_details}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.contact_status)}>
                        {contact.contact_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(contact.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
