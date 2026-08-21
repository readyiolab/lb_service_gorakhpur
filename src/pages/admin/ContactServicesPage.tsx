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
import { Loader2, Eye, Trash2 } from 'lucide-react';
import { contactApi } from '@/lib/api/forms';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface Contact {
  contact_id: number;
  contact_name: string;
  contact_email?: string;
  contact_phone: string;
  contact_service?: string;
  contact_location?: string;
  contact_message?: string;
  contact_status: string;
  created_at: string;
}

export default function ContactServicesPage() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contactApi.getAll('lb_services');

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
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewClick = (contact: Contact) => {
    setSelectedContact(contact);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (contactId: number) => {
    setContactToDelete(contactId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;

    setDeleting(true);
    try {
      const result = await contactApi.delete(contactToDelete, 'lb_services');
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Contact deleted successfully',
        });
        // Remove the deleted contact from the state
        setContacts(contacts.filter(c => c.contact_id !== contactToDelete));
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to delete contact',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete contact',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setContactToDelete(null);
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
          <h1 className="text-3xl font-bold tracking-tight">LB Services Contacts</h1>
          <p className="text-muted-foreground">Manage contact submissions from LB Services</p>
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
                  <TableHead>Email</TableHead>
                  <TableHead>Service</TableHead>
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
                    <TableCell>{contact.contact_email || '-'}</TableCell>
                    <TableCell>{contact.contact_service || '-'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.contact_status)}>
                        {contact.contact_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(contact.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewClick(contact)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteClick(contact.contact_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedContact ? new Date(selectedContact.created_at).toLocaleString() : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold text-muted-foreground">Name:</span>
                  <p className="font-medium text-foreground">{selectedContact.contact_name}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Phone:</span>
                  <p className="font-medium text-foreground">
                    <a href={`tel:${selectedContact.contact_phone}`} className="text-primary hover:underline">
                      {selectedContact.contact_phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold text-muted-foreground">Service:</span>
                  <p className="font-medium text-foreground">{selectedContact.contact_service || '-'}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Email:</span>
                  <p className="font-medium text-foreground">{selectedContact.contact_email || '-'}</p>
                </div>
              </div>

              {selectedContact.contact_location && (
                <div>
                  <span className="font-semibold text-muted-foreground">Location:</span>
                  <p className="font-medium text-foreground">{selectedContact.contact_location}</p>
                </div>
              )}

              <div>
                <span className="font-semibold text-muted-foreground">Status:</span>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedContact.contact_status)}>
                    {selectedContact.contact_status}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="font-semibold text-muted-foreground">Inquiry Message / Details:</span>
                <div className="mt-1.5 max-h-60 overflow-y-auto rounded-md border bg-muted/50 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedContact.contact_message || selectedContact.contact_service || 'No additional message.'}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact submission.
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

