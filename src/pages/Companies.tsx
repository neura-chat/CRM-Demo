import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Upload,
  Trash,
} from "lucide-react";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import CompanyContactTable from "@/components/CompanyContactTable";
import CompanyContactDialog from "@/components/CompanyContactDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  Dialog as ViewDialog,
  DialogContent as ViewDialogContent,
  DialogHeader as ViewDialogHeader,
  DialogTitle as ViewDialogTitle,
  DialogDescription as ViewDialogDescription,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

const companies = [
  {
    id: "C-001",
    name: "Acme Corporation",
    industry: "Technology",
    size: "500-1000",
    location: "San Francisco, CA",
    website: "acme.com",
    contacts: 12,
    revenue: "$2.5M",
    status: "active",
    lastContact: "2 days ago",
  },
  {
    id: "C-002",
    name: "TechFlow Inc",
    industry: "Software",
    size: "50-200",
    location: "Austin, TX",
    website: "techflow.com",
    contacts: 8,
    revenue: "$1.2M",
    status: "prospect",
    lastContact: "1 week ago",
  },
  {
    id: "C-003",
    name: "Global Solutions",
    industry: "Consulting",
    size: "1000+",
    location: "New York, NY",
    website: "globalsolutions.com",
    contacts: 25,
    revenue: "$5.8M",
    status: "active",
    lastContact: "Today",
  },
];

const contacts = [
  {
    id: "CT-001",
    name: "John Smith",
    title: "CEO",
    company: "Acme Corporation",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    lastContact: "Yesterday",
  },
  {
    id: "CT-002",
    name: "Sarah Johnson",
    title: "CTO",
    company: "TechFlow Inc",
    email: "sarah@techflow.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    lastContact: "3 days ago",
  },
];

export default function Companies() {
  const [activeSubTab, setActiveSubTab] = useState("accounts");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Move companies and contacts to state
  const [companiesState, setCompaniesState] = useState([...companies]);
  const [contactsState, setContactsState] = useState([...contacts]);

  // Form state for new company
  const [newCompany, setNewCompany] = useState({
    id: "",
    name: "",
    industry: "",
    size: "",
    location: "",
    website: "",
    contacts: 0,
    revenue: "",
    status: "active",
    lastContact: "",
  });

  // Form state for new contact
  const [newContact, setNewContact] = useState({
    id: "",
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    status: "active",
    lastContact: "",
  });

  // Pagination and search state
  const [accountPage, setAccountPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [viewPerPage] = useState(10);
  const [accountSearch, setAccountSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [contactStatusFilter, setContactStatusFilter] = useState('all');

  // Filtered and paginated data
  const filteredAccounts = companiesState.filter(c => c.name.toLowerCase().includes(accountSearch.toLowerCase()));
  const paginatedAccounts = filteredAccounts.slice((accountPage-1)*viewPerPage, accountPage*viewPerPage);
  const filteredContacts = contactsState.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) &&
    (contactStatusFilter === 'all' || c.status === contactStatusFilter)
  );
  const paginatedContacts = filteredContacts.slice((contactPage-1)*viewPerPage, contactPage*viewPerPage);

  // Handlers for form changes
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  };
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  // Add new company
  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setCompaniesState((prev) => [
      ...prev,
      {
        ...newCompany,
        id: `C-${(prev.length + 1).toString().padStart(3, "0")}`,
        contacts: Number(newCompany.contacts),
      },
    ]);
    setNewCompany({
      id: "",
      name: "",
      industry: "",
      size: "",
      location: "",
      website: "",
      contacts: 0,
      revenue: "",
      status: "active",
      lastContact: "",
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Account added",
      description: `The company '${newCompany.name}' was added successfully.`,
    });
  };

  // Add new contact
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactsState((prev) => [
      ...prev,
      {
        ...newContact,
        id: `CT-${(prev.length + 1).toString().padStart(3, "0")}`,
      },
    ]);
    setNewContact({
      id: "",
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      status: "active",
      lastContact: "",
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Contact added",
      description: `The contact '${newContact.name}' was added successfully.`,
    });
  };

  // Define columns for accounts and contacts
  const accountColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "industry", label: "Industry" },
    { key: "size", label: "Size" },
    { key: "location", label: "Location" },
    { key: "website", label: "Website" },
    { key: "contacts", label: "Contacts" },
    { key: "revenue", label: "Revenue" },
    { key: "status", label: "Status", render: (row: any) => (
      <span className={`px-2 py-1 rounded text-xs ${row.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{row.status}</span>
    ) },
    { key: "lastContact", label: "Last Contact" },
  ];
  const contactColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "title", label: "Title" },
    { key: "company", label: "Company" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status", render: (row: any) => (
      <span className={`px-2 py-1 rounded text-xs ${row.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{row.status}</span>
    ) },
    { key: "lastContact", label: "Last Contact" },
  ];
  // Define fields for dialogs
  const accountFields = [
    { name: "name", label: "Name", required: true },
    { name: "industry", label: "Industry", required: true },
    { name: "size", label: "Size", required: true },
    { name: "location", label: "Location", required: true },
    { name: "website", label: "Website", required: true },
    { name: "contacts", label: "Contacts", type: "number", required: true },
    { name: "revenue", label: "Revenue", required: true },
    { name: "status", label: "Status", as: "select" as const, options: [
      { value: "active", label: "Active" },
      { value: "prospect", label: "Prospect" },
    ], required: true },
    { name: "lastContact", label: "Last Contact", required: true },
  ];
  const contactFields = [
    { name: "name", label: "Name", required: true },
    { name: "title", label: "Title", required: true },
    { name: "company", label: "Company", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Phone", required: true },
    { name: "status", label: "Status", as: "select" as const, options: [
      { value: "active", label: "Active" },
      { value: "prospect", label: "Prospect" },
    ], required: true },
    { name: "lastContact", label: "Last Contact", required: true },
  ];
  // Actions for table rows (view/edit only for now)
  const accountActions = [
    { icon: <Eye className="w-4 h-4" />, onClick: () => {}, label: "View" },
    { icon: <Edit className="w-4 h-4" />, onClick: () => {}, label: "Edit" },
  ];
  const contactActions = [
    { icon: <Eye className="w-4 h-4" />, onClick: () => {}, label: "View" },
    { icon: <Edit className="w-4 h-4" />, onClick: () => {}, label: "Edit" },
  ];

  // State for view, edit, and delete dialogs
  const [viewContact, setViewContact] = useState<any | null>(null);
  const [editContact, setEditContact] = useState<any | null>(null);
  const [deleteContact, setDeleteContact] = useState<any | null>(null);

  // Handler for editing contact
  const handleEditContact = (contact: any) => {
    setEditContact(contact);
    setNewContact(contact);
    setIsCreateDialogOpen(true);
  };
  // Handler for saving edited contact
  const handleSaveEditContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactsState(prev => prev.map(c => c.id === newContact.id ? { ...newContact } : c));
    setEditContact(null);
    setIsCreateDialogOpen(false);
    setNewContact({
      id: "",
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      status: "active",
      lastContact: "",
    });
    toast({ title: "Contact updated", description: `The contact '${newContact.name}' was updated successfully.` });
  };
  // Handler for deleting contact
  const handleDeleteContact = () => {
    if (deleteContact) {
      setContactsState(prev => prev.filter(c => c.id !== deleteContact.id));
      setDeleteContact(null);
      toast({ title: "Contact deleted", description: `The contact was deleted successfully.` });
    }
  };

  // Render actions dropdown
  const renderActions = (row: any, type: 'account' | 'contact') => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost"><MoreVertical className="w-4 h-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => type === 'contact' ? setViewContact(row) : null}>
          <Eye className="w-4 h-4 mr-2" /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => type === 'contact' ? handleEditContact(row) : null}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-600" onClick={() => type === 'contact' ? setDeleteContact(row) : null}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Contact</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to delete {row.name}?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteContact(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteContact}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Row link for name
  const accountRowLink = (row: any) => undefined; // Set to a URL if needed
  const contactRowLink = (row: any) => undefined; // Set to a URL if needed

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-primary" />
            <span>Companies</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your accounts and contacts
          </p>
        </div>
      </div>

      {/* Sub-tabs for Accounts and Contacts */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search accounts..." className="w-64 pl-10" value={accountSearch} onChange={e => setAccountSearch(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Accounts</DialogTitle>
                    <DialogDescription>Upload a CSV or Excel file to import accounts.</DialogDescription>
                  </DialogHeader>
                  <Input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                  <DialogFooter>
                    <Button onClick={() => setIsImportDialogOpen(false)}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Add Account Dialog */}
              <CompanyContactDialog
                open={isCreateDialogOpen && activeSubTab === "accounts"}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={handleAddCompany}
                fields={accountFields}
                values={newCompany}
                onChange={handleCompanyChange}
                title="Add Account"
                submitLabel="Add"
              />
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <span>View </span>
              <select value={viewPerPage} disabled className="border rounded px-2 py-1">
                <option value={10}>10</option>
              </select>
              <span> per page</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled={accountPage === 1} onClick={() => setAccountPage(p => Math.max(1, p-1))}>{"<"}</Button>
              <span>Page {accountPage} of {Math.ceil(filteredAccounts.length/viewPerPage) || 1}</span>
              <Button variant="outline" size="icon" disabled={accountPage >= Math.ceil(filteredAccounts.length/viewPerPage)} onClick={() => setAccountPage(p => p+1)}>{">"}</Button>
            </div>
          </div>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Company Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <CompanyContactTable
                  columns={accountColumns}
                  data={paginatedAccounts}
                  showCheckbox
                  showRowNumber
                  rowLink={accountRowLink}
                  renderActions={row => renderActions(row, 'account')}
                  onSelectionChange={setSelectedAccounts}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="w-64 pl-10" value={contactSearch} onChange={e => setContactSearch(e.target.value)} />
              </div>
              <select
                className="border rounded px-2 py-1 ml-2"
                value={contactStatusFilter}
                onChange={e => setContactStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="qualified">Qualified</option>
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="cold">Cold</option>
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="prospect">Prospect</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Contacts</DialogTitle>
                    <DialogDescription>Upload a CSV or Excel file to import contacts.</DialogDescription>
                  </DialogHeader>
                  <Input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                  <DialogFooter>
                    <Button onClick={() => setIsImportDialogOpen(false)}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Add Contact Dialog (for both add and edit) */}
              <CompanyContactDialog
                open={isCreateDialogOpen && activeSubTab === "contacts"}
                onOpenChange={open => {
                  setIsCreateDialogOpen(open);
                  if (!open) setEditContact(null);
                }}
                onSubmit={editContact ? handleSaveEditContact : handleAddContact}
                fields={contactFields}
                values={newContact}
                onChange={handleContactChange}
                title={editContact ? "Edit Contact" : "Add Contact"}
                submitLabel={editContact ? "Save" : "Add"}
              />
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <span>View </span>
              <select value={viewPerPage} disabled className="border rounded px-2 py-1">
                <option value={10}>10</option>
              </select>
              <span> per page</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled={contactPage === 1} onClick={() => setContactPage(p => Math.max(1, p-1))}>{"<"}</Button>
              <span>Page {contactPage} of {Math.ceil(filteredContacts.length/viewPerPage) || 1}</span>
              <Button variant="outline" size="icon" disabled={contactPage >= Math.ceil(filteredContacts.length/viewPerPage)} onClick={() => setContactPage(p => p+1)}>{">"}</Button>
            </div>
          </div>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Contact Directory</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <CompanyContactTable
                  columns={contactColumns}
                  data={paginatedContacts}
                  showCheckbox
                  showRowNumber
                  rowLink={contactRowLink}
                  renderActions={row => renderActions(row, 'contact')}
                  onSelectionChange={setSelectedContacts}
                />
              </div>
            </CardContent>
          </Card>
          {/* View Contact Dialog */}
          <ViewDialog open={!!viewContact} onOpenChange={open => { if (!open) setViewContact(null); }}>
            <ViewDialogContent>
              <ViewDialogHeader>
                <ViewDialogTitle>Contact Details</ViewDialogTitle>
              </ViewDialogHeader>
              {viewContact && (
                <div className="space-y-2">
                  <div><b>Name:</b> {viewContact.name}</div>
                  <div><b>Title:</b> {viewContact.title}</div>
                  <div><b>Company:</b> {viewContact.company}</div>
                  <div><b>Email:</b> {viewContact.email}</div>
                  <div><b>Phone:</b> {viewContact.phone}</div>
                  <div><b>Status:</b> {viewContact.status}</div>
                  <div><b>Last Contact:</b> {viewContact.lastContact}</div>
                </div>
              )}
            </ViewDialogContent>
          </ViewDialog>
        </TabsContent>
      </Tabs>
      {/* Scaffolded dialogs for CRUD (to be implemented) */}
      {/* Create, Edit, Delete dialogs for both Accounts and Contacts */}
    </div>
  );
}
