import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  Target,
  ShoppingCart,
  Receipt,
  Truck,
  Trash,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const salesMetrics = [
  {
    title: "Total Revenue",
    value: "$847,239",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Leads",
    value: "342",
    change: "+8.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Win Rate",
    value: "67%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
  },
  {
    title: "Deals Closed",
    value: "89",
    change: "+15.4%",
    trend: "up",
    icon: TrendingUp,
  },
];

const initialLeads = [
  {
    id: "L-001",
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    status: "qualified",
    priority: "high",
    value: "$45,000",
    owner: "Sarah Johnson",
    tags: ["Enterprise", "Hot Lead"],
    lastContact: "2 days ago",
  },
  {
    id: "L-002",
    name: "TechFlow Inc",
    contact: "Emily Davis",
    email: "emily@techflow.com",
    phone: "+1 (555) 987-6543",
    status: "contacted",
    priority: "medium",
    value: "$28,000",
    owner: "Mike Chen",
    tags: ["SMB", "Follow-up"],
    lastContact: "1 week ago",
  },
];

const initialOpportunities = [
  {
    id: "O-001",
    title: "Enterprise Software License",
    company: "Global Corp",
    value: "$125,000",
    stage: "negotiation",
    probability: 85,
    closeDate: "2025-02-15",
    owner: "Sarah Johnson",
  },
  {
    id: "O-002",
    title: "CRM Implementation",
    company: "StartupX",
    value: "$45,000",
    stage: "proposal",
    probability: 60,
    closeDate: "2025-03-01",
    owner: "Mike Chen",
  },
];

const initialProducts = [
  {
    id: "P-001",
    name: "NeuraCRM Enterprise",
    image: "https://via.placeholder.com/150",
    price: "$299/month",
    stock: 50,
    category: "Software",
  },
  {
    id: "P-002",
    name: "Professional Services",
    image: "https://via.placeholder.com/150",
    price: "$150/hour",
    stock: "Unlimited",
    category: "Services",
  },
];

const initialContacts = [
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

const initialQuotes = [
  {
    id: "Q-001",
    customer: "Acme Corporation",
    amount: "$12,500",
    status: "pending",
    created: "2024-06-01",
    owner: "Sarah Johnson",
  },
  {
    id: "Q-002",
    customer: "TechFlow Inc",
    amount: "$7,800",
    status: "approved",
    created: "2024-06-03",
    owner: "Mike Chen",
  },
];

const initialOrders = [
  {
    id: "O-001",
    customer: "Acme Corporation",
    total: "$12,500",
    status: "processing",
    payment: "paid",
    created: "2024-06-04",
    shipment: "in transit",
  },
  {
    id: "O-002",
    customer: "TechFlow Inc",
    total: "$7,800",
    status: "completed",
    payment: "paid",
    created: "2024-06-05",
    shipment: "delivered",
  },
];

export default function Sales({ defaultTab = "analytics" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [leads, setLeads] = useState(initialLeads);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    status: "qualified",
    priority: "medium",
    value: "",
    owner: "",
    tags: "",
    lastContact: "today",
  });
  const [contacts, setContacts] = useState(initialContacts);
  const [showContactForm, setShowContactForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    status: "active",
    lastContact: "",
  });
  const [quotes, setQuotes] = useState(initialQuotes);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [newQuote, setNewQuote] = useState({
    customer: "",
    amount: "",
    status: "pending",
    created: "",
    owner: "",
  });
  const [orders, setOrders] = useState(initialOrders);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    total: "",
    status: "processing",
    payment: "unpaid",
    created: "",
    shipment: "pending",
  });
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    company: "",
    value: "",
    stage: "prospect",
    probability: 0,
    closeDate: "",
    owner: "",
  });
  const [products, setProducts] = useState(initialProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "https://via.placeholder.com/150",
    price: "",
    stock: "",
    category: "Software",
  });

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleLeadInput = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    setLeads((prev) => [
      {
        ...newLead,
        id: `L-${(prev.length + 1).toString().padStart(3, "0")}`,
        tags: newLead.tags ? newLead.tags.split(",").map((t) => t.trim()) : [],
      },
      ...prev,
    ]);
    setShowLeadForm(false);
    setNewLead({
      name: "",
      contact: "",
      email: "",
      phone: "",
      status: "qualified",
      priority: "medium",
      value: "",
      owner: "",
      tags: "",
      lastContact: "today",
    });
    toast({
      title: "Lead Added",
      description: `Lead '${newLead.name}' was added successfully!`,
    });
  };

  const handleContactInput = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    setContacts((prev) => [
      {
        ...newContact,
        id: `CT-${(prev.length + 1).toString().padStart(3, "0")}`,
      },
      ...prev,
    ]);
    setShowContactForm(false);
    toast({
      title: "Contact added",
      description: `The contact '${newContact.name}' was added successfully!`,
    });
    setNewContact({
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      status: "active",
      lastContact: "",
    });
  };

  const handleQuoteInput = (e) => {
    const { name, value } = e.target;
    setNewQuote((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuote = (e) => {
    e.preventDefault();
    setQuotes((prev) => [
      {
        ...newQuote,
        id: `Q-${(prev.length + 1).toString().padStart(3, "0")}`,
        created: newQuote.created || new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setShowQuoteForm(false);
    toast({
      title: "Quote created",
      description: `Quote for '${newQuote.customer}' was created successfully!`,
    });
    setNewQuote({
      customer: "",
      amount: "",
      status: "pending",
      created: "",
      owner: "",
    });
  };

  const handleOrderInput = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    setOrders((prev) => [
      {
        ...newOrder,
        id: `O-${(prev.length + 1).toString().padStart(3, "0")}`,
        created: newOrder.created || new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setShowOrderForm(false);
    toast({
      title: "Order created",
      description: `Order for '${newOrder.customer}' was created successfully!`,
    });
    setNewOrder({
      customer: "",
      total: "",
      status: "processing",
      payment: "unpaid",
      created: "",
      shipment: "pending",
    });
  };

  const handleOpportunityInput = (e) => {
    const { name, value } = e.target;
    setNewOpportunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOpportunity = (e) => {
    e.preventDefault();
    if (editingOpportunity) {
      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === editingOpportunity.id
            ? { ...opp, ...newOpportunity, probability: Number(newOpportunity.probability) }
            : opp
        )
      );
      toast({ title: "Opportunity updated", description: `Opportunity '${newOpportunity.title}' updated successfully!` });
    } else {
      setOpportunities((prev) => [
        {
          ...newOpportunity,
          id: `O-${(prev.length + 1).toString().padStart(3, "0")}`,
          probability: Number(newOpportunity.probability),
        },
        ...prev,
      ]);
      toast({ title: "Opportunity added", description: `Opportunity '${newOpportunity.title}' added successfully!` });
    }
    setShowOpportunityForm(false);
    setEditingOpportunity(null);
    setNewOpportunity({
      title: "",
      company: "",
      value: "",
      stage: "prospect",
      probability: 0,
      closeDate: "",
      owner: "",
    });
  };

  const handleEditOpportunity = (opp) => {
    setEditingOpportunity(opp);
    setNewOpportunity({ ...opp });
    setShowOpportunityForm(true);
  };

  const handleDeleteOpportunity = (id) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
    toast({ title: "Opportunity deleted", description: `Opportunity deleted successfully!` });
  };

  const handleStageChange = (id, newStage) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, stage: newStage } : opp
      )
    );
    toast({ title: "Stage changed", description: `Opportunity moved to '${newStage.charAt(0).toUpperCase() + newStage.slice(1)}' stage.` });
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...newProduct } : p
        )
      );
      toast({ title: "Product updated", description: `Product '${newProduct.name}' updated successfully!` });
    } else {
      setProducts((prev) => [
        {
          ...newProduct,
          id: `P-${(prev.length + 1).toString().padStart(3, "0")}`,
        },
        ...prev,
      ]);
      toast({ title: "Product added", description: `Product '${newProduct.name}' added successfully!` });
    }
    setShowProductForm(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      image: "https://via.placeholder.com/150",
      price: "",
      stock: "",
      category: "Software",
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted", description: `Product deleted successfully!` });
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            Sales
          </h1>
          <div className="flex items-center space-x-2 mt-1">
            {activeTab === "leads" && <TrendingUp className="w-6 h-6 text-primary" />}
            {activeTab === "contacts" && <Users className="w-6 h-6 text-primary" />}
            {/* Add more icons for other tabs if desired */}
            <span className="text-xl font-semibold text-muted-foreground">
              {
                activeTab === "leads"
                  ? "Leads"
                  : activeTab === "contacts"
                  ? "Contacts"
                  : activeTab === "opportunities"
                  ? "Pipeline"
                  : activeTab === "quotes"
                  ? "Quotes"
                  : activeTab === "products"
                  ? "Products"
                  : activeTab === "orders"
                  ? "Orders"
                  : "Overview"
              }
            </span>
          </div>
          <p className="text-muted-foreground mt-1">
            {activeTab === "leads"
              ? "Manage your leads and track their progress"
              : activeTab === "contacts"
              ? "All your contacts in one place"
              : activeTab === "opportunities"
              ? "Visualize and manage your sales pipeline"
              : activeTab === "quotes"
              ? "Create and manage sales quotes"
              : activeTab === "products"
              ? "Manage your products and services"
              : activeTab === "orders"
              ? "Track and fulfill customer orders"
              : "Manage your sales pipeline and track performance"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {activeTab === "leads" && (
            <Button onClick={() => setShowLeadForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Lead
            </Button>
          )}
          {activeTab === "contacts" && (
            <Button onClick={() => setShowContactForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          )}
          {activeTab === "quotes" && (
            <Button onClick={() => setShowQuoteForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Quote
            </Button>
          )}
          {activeTab === "orders" && (
            <Button onClick={() => setShowOrderForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          )}
          {activeTab === "opportunities" && (
            <Button onClick={() => { setShowOpportunityForm(true); setEditingOpportunity(null); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Opportunity
            </Button>
          )}
          {activeTab === "products" && (
            <Button onClick={() => { setShowProductForm(true); setEditingProduct(null); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric) => (
          <Card key={metric.title} className="border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {metric.value}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{metric.change} vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Modules Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="opportunities">Pipeline</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Bar Chart: Revenue Trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Pipeline Distribution</CardTitle>
                <CardDescription>Opportunities by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Pie Chart: Pipeline Stages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leads Management */}
        <TabsContent value="leads" className="space-y-6">
          {/* New Lead Modal */}
          <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" name="name" value={newLead.name} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Name</Label>
                    <Input id="contact" name="contact" value={newLead.contact} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={newLead.email} onChange={handleLeadInput} required type="email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={newLead.phone} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="value">Deal Value</Label>
                    <Input id="value" name="value" value={newLead.value} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="owner">Owner</Label>
                    <Input id="owner" name="owner" value={newLead.owner} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select id="priority" name="priority" value={newLead.priority} onChange={handleLeadInput} className="w-full border rounded px-2 py-1">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select id="status" name="status" value={newLead.status} onChange={handleLeadInput} className="w-full border rounded px-2 py-1">
                      <option value="qualified">Qualified</option>
                      <option value="contacted">Contacted</option>
                      <option value="new">New</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" name="tags" value={newLead.tags} onChange={handleLeadInput} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Lead</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leads List</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search leads..."
                      className="w-64 pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs md:text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 font-semibold text-left">Company</th>
                      <th className="p-2 font-semibold text-left">Contact</th>
                      <th className="p-2 font-semibold text-left">Email</th>
                      <th className="p-2 font-semibold text-left">Phone</th>
                      <th className="p-2 font-semibold text-left">Value</th>
                      <th className="p-2 font-semibold text-left">Priority</th>
                      <th className="p-2 font-semibold text-left">Status</th>
                      <th className="p-2 font-semibold text-left">Owner</th>
                      <th className="p-2 font-semibold text-left">Tags</th>
                      <th className="p-2 font-semibold text-left">Last Contact</th>
                      <th className="p-2 font-semibold text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-muted/30">
                        <td className="p-2 font-medium">{lead.name}</td>
                        <td className="p-2">{lead.contact}</td>
                        <td className="p-2">{lead.email}</td>
                        <td className="p-2">{lead.phone}</td>
                        <td className="p-2">{lead.value}</td>
                        <td className="p-2">
                          <Badge
                            variant={
                              lead.priority === "high"
                                ? "destructive"
                                : lead.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {lead.priority}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">{lead.status}</Badge>
                        </td>
                        <td className="p-2">{lead.owner}</td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {lead.tags && lead.tags.length > 0 &&
                              lead.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                        </td>
                        <td className="p-2">{lead.lastContact}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Calendar className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="space-y-6">
          {/* Add Contact Modal */}
          <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddContact} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" name="name" value={newContact.name} onChange={handleContactInput} required />
                  </div>
                  <div>
                    <Label htmlFor="contact-title">Title</Label>
                    <Input id="contact-title" name="title" value={newContact.title} onChange={handleContactInput} required />
                  </div>
                  <div>
                    <Label htmlFor="contact-company">Company</Label>
                    <Input id="contact-company" name="company" value={newContact.company} onChange={handleContactInput} required />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" name="email" value={newContact.email} onChange={handleContactInput} required type="email" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input id="contact-phone" name="phone" value={newContact.phone} onChange={handleContactInput} required />
                  </div>
                  <div>
                    <Label htmlFor="contact-status">Status</Label>
                    <select id="contact-status" name="status" value={newContact.status} onChange={handleContactInput} className="w-full border rounded px-2 py-1">
                      <option value="active">Active</option>
                      <option value="prospect">Prospect</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="contact-lastContact">Last Contact</Label>
                    <Input id="contact-lastContact" name="lastContact" value={newContact.lastContact} onChange={handleContactInput} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Contact</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Contact Directory</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="text-xs md:text-sm">
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
                    {contacts.map((contact) => (
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

        {/* Opportunities Pipeline */}
        <TabsContent value="opportunities" className="space-y-6">
          {/* Add/Edit Opportunity Modal */}
          <Dialog open={showOpportunityForm} onOpenChange={setShowOpportunityForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingOpportunity ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddOpportunity} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="opp-title">Title</Label>
                    <Input id="opp-title" name="title" value={newOpportunity.title} onChange={handleOpportunityInput} required />
                  </div>
                  <div>
                    <Label htmlFor="opp-company">Company</Label>
                    <Input id="opp-company" name="company" value={newOpportunity.company} onChange={handleOpportunityInput} required />
                  </div>
                  <div>
                    <Label htmlFor="opp-value">Value</Label>
                    <Input id="opp-value" name="value" value={newOpportunity.value} onChange={handleOpportunityInput} required />
                  </div>
                  <div>
                    <Label htmlFor="opp-stage">Stage</Label>
                    <select id="opp-stage" name="stage" value={newOpportunity.stage} onChange={handleOpportunityInput} className="w-full border rounded px-2 py-1">
                      <option value="prospect">Prospect</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="opp-probability">Probability (%)</Label>
                    <Input id="opp-probability" name="probability" value={newOpportunity.probability} onChange={handleOpportunityInput} type="number" min="0" max="100" required />
                  </div>
                  <div>
                    <Label htmlFor="opp-closeDate">Close Date</Label>
                    <Input id="opp-closeDate" name="closeDate" value={newOpportunity.closeDate} onChange={handleOpportunityInput} type="date" />
                  </div>
                  <div>
                    <Label htmlFor="opp-owner">Owner</Label>
                    <Input id="opp-owner" name="owner" value={newOpportunity.owner} onChange={handleOpportunityInput} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingOpportunity ? "Update" : "Add"} Opportunity</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Kanban-style opportunity management (drag and drop to move between stages)</CardDescription>
            </CardHeader>
            <CardContent>
              <DragDropContext
                onDragEnd={(result) => {
                  const { source, destination, draggableId } = result;
                  if (!destination || source.droppableId === destination.droppableId) return;
                  setOpportunities((prev) =>
                    prev.map((opp) =>
                      opp.id === draggableId ? { ...opp, stage: destination.droppableId } : opp
                    )
                  );
                  const stageName = destination.droppableId.charAt(0).toUpperCase() + destination.droppableId.slice(1);
                  toast({ title: "Stage changed", description: `Opportunity moved to '${stageName}' stage.` });
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["prospect", "qualified", "proposal", "negotiation"].map((stage) => (
                    <Droppable droppableId={stage} key={stage}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-3 min-h-[100px] p-2 rounded border ${snapshot.isDraggingOver ? "bg-primary/10" : "bg-muted/50"}`}
                        >
                          <h3 className="font-semibold text-foreground capitalize mb-2">{stage}</h3>
                          {opportunities
                            .filter((opp) => opp.stage === stage)
                            .map((opp, idx) => (
                              <Draggable draggableId={opp.id} index={idx} key={opp.id}>
                                {(provided, snapshot) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 cursor-pointer hover:shadow-md transition-shadow bg-background ${snapshot.isDragging ? "ring-2 ring-primary" : ""}`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-medium text-sm">{opp.title}</h4>
                                        <p className="text-xs text-muted-foreground">{opp.company}</p>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditOpportunity(opp)}><Edit className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteOpportunity(opp.id)}><Trash className="w-4 h-4" /></Button>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-sm font-medium">{opp.value}</span>
                                      <span className="text-xs text-muted-foreground">{opp.probability}%</span>
                                    </div>
                                    <Progress value={opp.probability} className="h-1 mt-1" />
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-xs">Owner: {opp.owner}</span>
                                      <span className="text-xs">Close: {opp.closeDate}</span>
                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quotes */}
        <TabsContent value="quotes" className="space-y-6">
          {/* Add Quote Modal */}
          <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Quote</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddQuote} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quote-customer">Customer</Label>
                    <Input id="quote-customer" name="customer" value={newQuote.customer} onChange={handleQuoteInput} required />
                  </div>
                  <div>
                    <Label htmlFor="quote-amount">Amount</Label>
                    <Input id="quote-amount" name="amount" value={newQuote.amount} onChange={handleQuoteInput} required />
                  </div>
                  <div>
                    <Label htmlFor="quote-owner">Owner</Label>
                    <Input id="quote-owner" name="owner" value={newQuote.owner} onChange={handleQuoteInput} required />
                  </div>
                  <div>
                    <Label htmlFor="quote-status">Status</Label>
                    <select id="quote-status" name="status" value={newQuote.status} onChange={handleQuoteInput} className="w-full border rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="quote-created">Created Date</Label>
                    <Input id="quote-created" name="created" value={newQuote.created} onChange={handleQuoteInput} type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Quote</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quotes List</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="text-xs md:text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell>{quote.id}</TableCell>
                        <TableCell>{quote.customer}</TableCell>
                        <TableCell>{quote.amount}</TableCell>
                        <TableCell>
                          <Badge variant={quote.status === "approved" ? "default" : quote.status === "rejected" ? "destructive" : "secondary"}>{quote.status}</Badge>
                        </TableCell>
                        <TableCell>{quote.created}</TableCell>
                        <TableCell>{quote.owner}</TableCell>
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

        {/* Products Catalog */}
        <TabsContent value="products" className="space-y-6">
          {/* Add/Edit Product Modal */}
          <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product-name">Name</Label>
                    <Input id="product-name" name="name" value={newProduct.name} onChange={handleProductInput} required />
                  </div>
                  <div>
                    <Label htmlFor="product-image">Image URL</Label>
                    <Input id="product-image" name="image" value={newProduct.image} onChange={handleProductInput} required />
                  </div>
                  <div>
                    <Label htmlFor="product-price">Price</Label>
                    <Input id="product-price" name="price" value={newProduct.price} onChange={handleProductInput} required />
                  </div>
                  <div>
                    <Label htmlFor="product-stock">Stock</Label>
                    <Input id="product-stock" name="stock" value={newProduct.stock} onChange={handleProductInput} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Input id="product-category" name="category" value={newProduct.category} onChange={handleProductInput} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingProduct ? "Update" : "Add"} Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Products Catalog</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden p-2">
                    <div className="h-20 bg-muted/50 flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="h-12 object-contain" />
                    </div>
                    <CardContent className="p-2">
                      <h3 className="font-semibold mb-1 text-xs truncate">{product.name}</h3>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base font-bold text-primary">
                          {product.price}
                        </span>
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5">{product.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 truncate">
                        Stock: {product.stock}
                      </p>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" className="flex-1 px-1 py-1 text-xs h-7" onClick={() => handleEditProduct(product)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1 px-1 py-1 text-xs h-7" onClick={() => handleDeleteProduct(product.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="space-y-6">
          {/* Add Order Modal */}
          <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Order</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="order-customer">Customer</Label>
                    <Input id="order-customer" name="customer" value={newOrder.customer} onChange={handleOrderInput} required />
                  </div>
                  <div>
                    <Label htmlFor="order-total">Total</Label>
                    <Input id="order-total" name="total" value={newOrder.total} onChange={handleOrderInput} required />
                  </div>
                  <div>
                    <Label htmlFor="order-status">Status</Label>
                    <select id="order-status" name="status" value={newOrder.status} onChange={handleOrderInput} className="w-full border rounded px-2 py-1">
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="order-payment">Payment</Label>
                    <select id="order-payment" name="payment" value={newOrder.payment} onChange={handleOrderInput} className="w-full border rounded px-2 py-1">
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="order-shipment">Shipment</Label>
                    <Input id="order-shipment" name="shipment" value={newOrder.shipment} onChange={handleOrderInput} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="order-created">Created Date</Label>
                    <Input id="order-created" name="created" value={newOrder.created} onChange={handleOrderInput} type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Order</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="border border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Orders List</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="text-xs md:text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Shipment</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === "completed" ? "default" : order.status === "cancelled" ? "destructive" : "secondary"}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.payment === "paid" ? "default" : order.payment === "refunded" ? "destructive" : "secondary"}>{order.payment}</Badge>
                        </TableCell>
                        <TableCell>{order.shipment}</TableCell>
                        <TableCell>{order.created}</TableCell>
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
    </div>
  );
}
