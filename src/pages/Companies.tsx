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
                <Input placeholder="Search accounts..." className="w-64 pl-10" />
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
              <Dialog open={isCreateDialogOpen && activeSubTab === "accounts"} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Account</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddCompany} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Name</Label>
                        <Input name="name" value={newCompany.name} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Industry</Label>
                        <Input name="industry" value={newCompany.industry} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Size</Label>
                        <Input name="size" value={newCompany.size} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input name="location" value={newCompany.location} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Website</Label>
                        <Input name="website" value={newCompany.website} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Contacts</Label>
                        <Input name="contacts" type="number" value={newCompany.contacts} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Revenue</Label>
                        <Input name="revenue" value={newCompany.revenue} onChange={handleCompanyChange} required />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <select name="status" value={newCompany.status} onChange={handleCompanyChange} className="w-full border rounded px-2 py-1">
                          <option value="active">Active</option>
                          <option value="prospect">Prospect</option>
                        </select>
                      </div>
                      <div>
                        <Label>Last Contact</Label>
                        <Input name="lastContact" value={newCompany.lastContact} onChange={handleCompanyChange} required />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                <Table className="text-xs">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Contacts</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companiesState.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.id}</TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>{company.size}</TableCell>
                        <TableCell>{company.location}</TableCell>
                        <TableCell>{company.website}</TableCell>
                        <TableCell>{company.contacts}</TableCell>
                        <TableCell>{company.revenue}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${company.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{company.status}</span>
                        </TableCell>
                        <TableCell>{company.lastContact}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0"><Edit className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="w-64 pl-10" />
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
                    <DialogTitle>Import Contacts</DialogTitle>
                    <DialogDescription>Upload a CSV or Excel file to import contacts.</DialogDescription>
                  </DialogHeader>
                  <Input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                  <DialogFooter>
                    <Button onClick={() => setIsImportDialogOpen(false)}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Add Contact Dialog */}
              <Dialog open={isCreateDialogOpen && activeSubTab === "contacts"} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddContact} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Name</Label>
                        <Input name="name" value={newContact.name} onChange={handleContactChange} required />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input name="title" value={newContact.title} onChange={handleContactChange} required />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input name="company" value={newContact.company} onChange={handleContactChange} required />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input name="email" value={newContact.email} onChange={handleContactChange} required />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input name="phone" value={newContact.phone} onChange={handleContactChange} required />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <select name="status" value={newContact.status} onChange={handleContactChange} className="w-full border rounded px-2 py-1">
                          <option value="active">Active</option>
                          <option value="prospect">Prospect</option>
                        </select>
                      </div>
                      <div>
                        <Label>Last Contact</Label>
                        <Input name="lastContact" value={newContact.lastContact} onChange={handleContactChange} required />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                <Table className="text-xs">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactsState.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.id}</TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.title}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${contact.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{contact.status}</span>
                        </TableCell>
                        <TableCell>{contact.lastContact}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0"><Edit className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Scaffolded dialogs for CRUD (to be implemented) */}
      {/* Create, Edit, Delete dialogs for both Accounts and Contacts */}
    </div>
  );
}
