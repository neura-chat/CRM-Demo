import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Building2,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const mockContacts = [
  {
    name: "Michael Chen",
    email: "michael.chen@innovatelab.com",
    phone: "+1-555-0102",
    company: "InnovateLab Inc",
    title: "CTO",
    source: "referral",
    score: 92,
    status: "qualified",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Referred by existing client.",
    lastContact: "Yesterday",
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@startupx.com",
    phone: "+1-555-0103",
    company: "StartupX",
    title: "CEO",
    source: "social",
    score: 78,
    status: "qualified",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Connected via LinkedIn.",
    lastContact: "3 days ago",
  },
  {
    name: "David Thompson",
    email: "david.thompson@globalcorp.com",
    phone: "+1-555-0104",
    company: "Global Corp",
    title: "Director of Sales",
    source: "email",
    score: 65,
    status: "new",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Downloaded whitepaper.",
    lastContact: "Yesterday",
  },
  {
    name: "Jessica Williams",
    email: "jessica.williams@healthtech.com",
    phone: "+1-555-0105",
    company: "HealthTech Solutions",
    title: "Product Manager",
    source: "event",
    score: 88,
    status: "hot",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Met at conference, urgent need.",
    lastContact: "Yesterday",
  },
  {
    name: "Robert Davis",
    email: "robert.davis@financeplus.com",
    phone: "+1-555-0106",
    company: "FinancePlus",
    title: "VP of Technology",
    source: "cold-call",
    score: 45,
    status: "cold",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Initial contact made, follow-up required.",
    lastContact: "Yesterday",
  },
  {
    name: "Lisa Anderson",
    email: "lisa.anderson@retailmax.com",
    phone: "+1-555-0107",
    company: "RetailMax",
    title: "Digital Marketing Lead",
    source: "website",
    score: 72,
    status: "qualified",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Completed demo request.",
    lastContact: "Yesterday",
  },
  {
    name: "James Wilson",
    email: "james.wilson@manufacturing.com",
    phone: "+1-555-0108",
    company: "ManufacturingPro",
    title: "IT Director",
    source: "referral",
    score: 81,
    status: "qualified",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Needs integration with ERP.",
    lastContact: "Yesterday",
  },
  {
    name: "Amanda Brown",
    email: "amanda.brown@consultco.com",
    phone: "+1-555-0109",
    company: "ConsultCo",
    title: "Senior Consultant",
    source: "social",
    score: 58,
    status: "new",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Early stage inquiry, exploring options.",
    lastContact: "Yesterday",
  },
  {
    name: "Christopher Miller",
    email: "chris.miller@techstart.com",
    phone: "+1-555-0110",
    company: "TechStart Ventures",
    title: "Founder",
    source: "website",
    score: 95,
    status: "hot",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Ready to purchase, just needs approval.",
    lastContact: "Yesterday",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1-555-0101",
    company: "TechCorp Solutions",
    title: "VP of Marketing",
    source: "website",
    score: 85,
    status: "hot",
    created: "06/26/25",
    updated: "06/26/25",
    notes: "Interested in enterprise plan.",
    lastContact: "Yesterday",
  },
];

export default function Contacts() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string[]>([]);
  const [contacts, setContacts] = useState(mockContacts);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);
  const [viewContact, setViewContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteContact, setDeleteContact] = useState(null);

  const statusOptions = ["qualified", "hot", "cold", "new"];
  const sourceOptions = ["referral", "social", "email", "event", "cold-call", "website"];

  const filteredContacts = contacts.filter((contact) => {
    const statusMatch = statusFilter.length === 0 || statusFilter.includes(contact.status);
    const sourceMatch = sourceFilter.length === 0 || sourceFilter.includes(contact.source);
    return statusMatch && sourceMatch;
  });
  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / contactsPerPage));
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * contactsPerPage, currentPage * contactsPerPage);

  // Handler for changing contacts per page
  const handleContactsPerPageChange = (e) => {
    setContactsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Handler for page navigation
  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleDelete = (email) => {
    setContacts((prev) => prev.filter((c) => c.email !== email));
    setDeleteContact(null);
  };
  const handleEdit = (updated) => {
    setContacts((prev) => prev.map((c) => c.email === updated.email ? updated : c));
    setEditContact(null);
  };
  const handleAdd = (newContact) => {
    setContacts((prev) => [
      { ...newContact, lastContact: newContact.lastContact || 'Today', status: newContact.status || 'active' },
      ...prev,
    ]);
    setAddOpen(false);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm">View</span>
            <select
              className="border rounded px-2 py-1 text-sm focus:outline-none"
              value={contactsPerPage}
              onChange={handleContactsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button className="border rounded px-2 py-1 text-sm" onClick={handlePrevPage} disabled={currentPage === 1}>{'<'}</button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button className="border rounded px-2 py-1 text-sm" onClick={handleNextPage} disabled={currentPage === totalPages}>{'>'}</button>
          <input
            className="border rounded px-2 py-1 text-sm ml-2"
            placeholder="Search contacts..."
            style={{ minWidth: 180 }}
          />
          <Button variant="outline">Import</Button>
          <Button variant="outline">Actions</Button>
          <Button className="bg-primary text-white" onClick={() => setAddOpen(true)}>+ Add Contact</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-3 py-2 text-left text-sm font-bold">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-2 text-left text-sm font-bold">#</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Name</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Title</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Company</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Email</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Phone</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Status</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Last Contact</th>
              <th className="px-3 py-2 text-left text-sm font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map((contact, idx) => (
              <tr key={contact.email} className="border-b hover:bg-muted/30">
                <td className="px-3 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-3 py-2 text-sm">{idx + 1}</td>
                <td className="px-3 py-2 text-sm">
                  <span className="text-primary underline cursor-pointer">{contact.name}</span>
                </td>
                <td className="px-3 py-2 text-sm">{contact.title}</td>
                <td className="px-3 py-2 text-sm">{contact.company}</td>
                <td className="px-3 py-2 text-sm">{contact.email}</td>
                <td className="px-3 py-2 text-sm">{contact.phone}</td>
                <td className="px-3 py-2 text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{contact.status}</span>
                </td>
                <td className="px-3 py-2 text-sm">{contact.lastContact}</td>
                <td className="px-3 py-2 text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost"><MoreVertical className="w-4 h-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setViewContact(contact)}>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditContact(contact)}>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to delete {contact.name}?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(contact.email)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Contact Sheet */}
      <Sheet open={!!viewContact} onOpenChange={() => setViewContact(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Contact Details</SheetTitle>
            <SheetDescription>
              {viewContact && (
                <div className="space-y-2 mt-4">
                  <div><b>Name:</b> {viewContact.name}</div>
                  <div><b>Email:</b> {viewContact.email}</div>
                  <div><b>Phone:</b> {viewContact.phone}</div>
                  <div><b>Company:</b> {viewContact.company}</div>
                  <div><b>Title:</b> {viewContact.title}</div>
                  <div><b>Source:</b> {viewContact.source}</div>
                  <div><b>Score:</b> {viewContact.score}</div>
                  <div><b>Status:</b> {viewContact.status}</div>
                  <div><b>Created:</b> {viewContact.created}</div>
                  <div><b>Updated:</b> {viewContact.updated}</div>
                  <div><b>Notes:</b> {viewContact.notes}</div>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Contact Sheet */}
      <Sheet open={!!editContact} onOpenChange={() => setEditContact(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Contact</SheetTitle>
          </SheetHeader>
          {editContact && (
            <EditContactForm contact={editContact} onSave={handleEdit} onCancel={() => setEditContact(null)} />
          )}
        </SheetContent>
      </Sheet>

      {/* Add Contact Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
            <DialogDescription>Enter details for a new contact.</DialogDescription>
          </DialogHeader>
          <AddContactForm onAdd={handleAdd} onCancel={() => setAddOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditContactForm({ contact, onSave, onCancel }) {
  const [form, setForm] = useState({ ...contact });
  return (
    <form
      className="space-y-4 mt-4"
      onSubmit={e => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" required />
      <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" required />
      <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone" required />
      <Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company" required />
      <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" />
      <Input value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} placeholder="Source" />
      <Input value={form.score} onChange={e => setForm(f => ({ ...f, score: Number(e.target.value) }))} placeholder="Score" type="number" />
      <Input value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} placeholder="Status" />
      <Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Notes" />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

function AddContactForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    status: "active",
    lastContact: "Today",
  });
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onAdd(form);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border rounded px-2 py-2 text-sm"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Last Contact</label>
          <Input value={form.lastContact} onChange={e => setForm(f => ({ ...f, lastContact: e.target.value }))} placeholder="Last Contact" required />
        </div>
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" className="bg-primary text-white">Add Contact</Button>
      </DialogFooter>
    </form>
  );
}
