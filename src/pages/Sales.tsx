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
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLeads } from "@/context/LeadsContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
  const { leads, addLead, setLeads } = useLeads();
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
    company: "",
    title: "",
    source: "",
    score: "",
    created: "",
    updated: "",
    notes: "",
  });
  const [leadFilter, setLeadFilter] = useState("All Open Leads");
  const [leadSearch, setLeadSearch] = useState("");
  const leadFilterOptions = ["All Open Leads", "My Leads", "Qualified", "Hot", "Cold"];
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.company?.toLowerCase().includes(leadSearch.toLowerCase())
  );
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
  const [contactSearch, setContactSearch] = useState("");
  const [quoteSearch, setQuoteSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [leadsView, setLeadsView] = useState(10);
  const [leadsPage, setLeadsPage] = useState(1);
  const [contactsView, setContactsView] = useState(10);
  const [contactsPage, setContactsPage] = useState(1);
  const [quotesView, setQuotesView] = useState(10);
  const [quotesPage, setQuotesPage] = useState(1);
  const [ordersView, setOrdersView] = useState(10);
  const [ordersPage, setOrdersPage] = useState(1);
  const [productsView, setProductsView] = useState(10);
  const [productsPage, setProductsPage] = useState(1);
  const [viewLead, setViewLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [viewContact, setViewContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [viewQuote, setViewQuote] = useState(null);
  const [editQuote, setEditQuote] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  // Add delete functions for contacts, quotes, and orders
  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast({ title: 'Contact deleted', description: 'Contact deleted successfully!' });
  };
  const handleDeleteQuote = (id) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    toast({ title: 'Quote deleted', description: 'Quote deleted successfully!' });
  };
  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    toast({ title: 'Order deleted', description: 'Order deleted successfully!' });
  };
  // Add selection state for bulk actions
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const filteredContacts = (contacts || []).filter(c => !contactSearch || c.name.toLowerCase().includes(contactSearch.toLowerCase()) || c.email.toLowerCase().includes(contactSearch.toLowerCase()) || c.company.toLowerCase().includes(contactSearch.toLowerCase()));
  const filteredQuotes = (quotes || []).filter(q => !quoteSearch || q.customer.toLowerCase().includes(quoteSearch.toLowerCase()));
  const filteredOrders = (orders || []).filter(o => !orderSearch || o.customer.toLowerCase().includes(orderSearch.toLowerCase()));
  const filteredProducts = (products || []).filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()));

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleLeadInput = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (editLead) {
      // Update existing lead and preserve id
      setLeads((prev) => prev.map((l) => l.id === editLead.id ? { ...l, ...newLead, id: l.id } : l));
      toast({
        title: "Lead Updated",
        description: `Lead '${newLead.name}' was updated successfully!`,
      });
    } else {
      // Add new lead
      addLead(newLead);
      toast({
        title: "Lead Added",
        description: `Lead '${newLead.name}' was added successfully!`,
      });
    }
    setShowLeadForm(false);
    setEditLead(null);
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
      company: "",
      title: "",
      source: "",
      score: "",
      created: "",
      updated: "",
      notes: "",
    });
  };

  const handleContactInput = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (editContact) {
      setContacts((prev) => prev.map((c) => c.id === editContact.id ? { ...editContact, ...newContact } : c));
      toast({
        title: "Contact updated",
        description: `Contact '${newContact.name}' was updated successfully!`,
      });
    } else {
      setContacts((prev) => [
        {
          ...newContact,
          id: `CT-${(prev.length + 1).toString().padStart(3, "0")}`,
        },
        ...prev,
      ]);
      toast({
        title: "Contact added",
        description: `The contact '${newContact.name}' was added successfully!`,
      });
    }
    setShowContactForm(false);
    setEditContact(null);
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
    if (editQuote) {
      setQuotes((prev) => prev.map((q) => q.id === editQuote.id ? { ...editQuote, ...newQuote } : q));
      toast({
        title: "Quote updated",
        description: `Quote for '${newQuote.customer}' was updated successfully!`,
      });
    } else {
      setQuotes((prev) => [
        {
          ...newQuote,
          id: `Q-${(prev.length + 1).toString().padStart(3, "0")}`,
          created: newQuote.created || new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      toast({
        title: "Quote created",
        description: `Quote for '${newQuote.customer}' was created successfully!`,
      });
    }
    setShowQuoteForm(false);
    setEditQuote(null);
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
    if (editOrder) {
      setOrders((prev) => prev.map((o) => o.id === editOrder.id ? { ...editOrder, ...newOrder } : o));
      toast({
        title: "Order updated",
        description: `Order for '${newOrder.customer}' was updated successfully!`,
      });
    } else {
      setOrders((prev) => [
        {
          ...newOrder,
          id: `O-${(prev.length + 1).toString().padStart(3, "0")}`,
          created: newOrder.created || new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      toast({
        title: "Order created",
        description: `Order for '${newOrder.customer}' was created successfully!`,
      });
    }
    setShowOrderForm(false);
    setEditOrder(null);
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

  const handleDeleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast({ title: 'Lead deleted', description: 'Lead deleted successfully!' });
  };

  // Utility to close all modals
  const resetAllModals = () => {
    setViewLead(null);
    setEditLead(null);
    setShowLeadForm(false);
    setViewContact(null);
    setEditContact(null);
    setShowContactForm(false);
    setViewQuote(null);
    setEditQuote(null);
    setShowQuoteForm(false);
    setViewOrder(null);
    setEditOrder(null);
    setShowOrderForm(false);
    setViewProduct(null);
    setEditingProduct(null);
    setShowProductForm(false);
    setShowConvertModal(false);
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            Sales
          </h1>
          
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
        </div>
      </div>

      {/* Sales Metrics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div> */}

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
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Leads</h1>
              <select
                className="border rounded px-2 py-1 text-sm bg-background"
                value={leadFilter}
                onChange={(e) => setLeadFilter(e.target.value)}
              >
                {leadFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={leadsView} onChange={e => { setLeadsView(Number(e.target.value)); setLeadsPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={leadsPage === 1} onClick={() => setLeadsPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {leadsPage} of {Math.max(1, Math.ceil(filteredLeads.length / leadsView))}</span>
              <Button variant="outline" size="sm" disabled={leadsPage === Math.ceil(filteredLeads.length / leadsView) || filteredLeads.length === 0} onClick={() => setLeadsPage(p => Math.min(Math.ceil(filteredLeads.length / leadsView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="w-56 pl-10"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setContacts(prev => prev.filter(c => !selectedContacts.includes(c.id)));
                    setSelectedContacts([]);
                    toast({ title: 'Contacts deleted', description: 'Selected contacts deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowLeadForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
          {/* New Lead Modal */}
          <Dialog open={showLeadForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowLeadForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter details for a new lead.
                </DialogDescription>
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
          {/* Leads Table */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="p-2 text-left"><input type="checkbox" checked={selectedLeads.length === filteredLeads.slice((leadsPage-1)*leadsView, leadsPage*leadsView).length && filteredLeads.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedLeads(filteredLeads.slice((leadsPage-1)*leadsView, leadsPage*leadsView).map(l => l.id));
                    } else {
                      setSelectedLeads([]);
                    }
                  }} /></th>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Company</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Source</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2 text-left">Updated</th>
                  <th className="p-2 text-left">Notes</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.slice((leadsPage-1)*leadsView, leadsPage*leadsView).map((lead, idx) => {
                  // Mock/placeholder data for missing fields
                  const company = lead.name || "-";
                  const title = lead.title || [
                    "CTO", "CEO", "Director of Marketing", "Product Manager", "VP of Technology", "Digital Marketing", "IT Director", "Senior Consultant", "Founder", "VP of Marketing"
                  ][idx % 10];
                  const source = lead.source || [
                    "referral", "social", "email", "event", "cold-call", "website", "referral", "social", "website", "website"
                  ][idx % 10];
                  const score = lead.score || [92, 78, 65, 88, 45, 72, 81, 58, 90, 85][idx % 10];
                  const status = lead.status || [
                    "qualified", "qualified", "new", "hot", "cold", "qualified", "qualified", "new", "hot", "hot"
                  ][idx % 10];
                  const created = lead.created || "06/26/25";
                  const updated = lead.updated || "06/26/25";
                  const notes = lead.notes || [
                    "Referred by existing customer", "Connected via LinkedIn", "Downloaded whitepaper", "Met at conference, urgent follow-up", "Initial contact made, awaiting reply", "Completed demo recently", "Needs integration with ERP", "Early stage inquiry, exploring options", "Ready to purchase, just needs approval", "Interested in enterprise plan"
                  ][idx % 10];
                  // Score badge color
                  let scoreColor: 'default' | 'destructive' | 'outline' | 'secondary' = 'secondary';
                  if (score >= 85) scoreColor = 'default';
                  else if (score >= 70) scoreColor = 'secondary';
                  else scoreColor = 'destructive';
                  // Status badge color
                  let statusVariant: 'default' | 'destructive' | 'outline' | 'secondary' = 'outline';
                  if (status === 'qualified') statusVariant = 'default';
                  else if (status === 'hot') statusVariant = 'secondary';
                  else if (status === 'cold') statusVariant = 'destructive';
                  else if (status === 'new') statusVariant = 'outline';
                  return (
                    <tr key={lead.id || idx} className="border-b hover:bg-muted/30">
                      <td className="p-2"><input type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={e => {
                        if (e.target.checked) setSelectedLeads([...selectedLeads, lead.id]);
                        else setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                      }} /></td>
                      <td className="p-2">{(leadsPage-1)*leadsView + idx + 1}</td>
                      <td className="p-2 font-medium">
                        <a href="#" className="text-blue-600 hover:underline">{lead.contact || lead.name}</a>
                      </td>
                      <td className="p-2">{lead.email}</td>
                      <td className="p-2">{lead.phone}</td>
                      <td className="p-2 font-bold">{company}</td>
                      <td className="p-2">{title}</td>
                      <td className="p-2">{source}</td>
                      <td className="p-2">
                        <Badge variant={scoreColor}>{score}</Badge>
                      </td>
                      <td className="p-2">
                        <Badge variant={statusVariant}>{status}</Badge>
                      </td>
                      <td className="p-2">{created}</td>
                      <td className="p-2">{updated}</td>
                      <td className="p-2 max-w-xs truncate" title={notes}>{notes}</td>
                      <td className="p-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { resetAllModals(); setViewLead({ ...lead }); }}>
                              <Eye className="w-4 h-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              resetAllModals();
                              setEditLead({ ...lead });
                              setShowLeadForm(true);
                              setNewLead({ ...lead, tags: Array.isArray(lead.tags) ? lead.tags.join(', ') : lead.tags });
                            }}>
                              <Edit className="w-4 h-4 mr-2" /> Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { resetAllModals(); setLeadToConvert(lead); setShowConvertModal(true); }}>
                              <ArrowUpRight className="w-4 h-4 mr-2" /> Convert to Opportunity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteLead(lead.id)}>
                              <Trash className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="space-y-6">
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Contacts</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={contactsView} onChange={e => { setContactsView(Number(e.target.value)); setContactsPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={contactsPage === 1} onClick={() => setContactsPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {contactsPage} of {Math.max(1, Math.ceil(filteredContacts.length / contactsView))}</span>
              <Button variant="outline" size="sm" disabled={contactsPage === Math.ceil(filteredContacts.length / contactsView) || filteredContacts.length === 0} onClick={() => setContactsPage(p => Math.min(Math.ceil(filteredContacts.length / contactsView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="w-56 pl-10"
                  value={contactSearch || ''}
                  onChange={e => setContactSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setContacts(prev => prev.filter(c => !selectedContacts.includes(c.id)));
                    setSelectedContacts([]);
                    toast({ title: 'Contacts deleted', description: 'Selected contacts deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowContactForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>
          {/* Add Contact Modal */}
          <Dialog open={showContactForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowContactForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogDescription>
                  Enter details for a new contact.
                </DialogDescription>
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
          {/* Contacts Table */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="p-2 text-left"><input type="checkbox" checked={selectedContacts.length === filteredContacts.slice((contactsPage-1)*contactsView, contactsPage*contactsView).length && filteredContacts.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedContacts(filteredContacts.slice((contactsPage-1)*contactsView, contactsPage*contactsView).map(c => c.id));
                    } else {
                      setSelectedContacts([]);
                    }
                  }} /></th>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Company</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Last Contact</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(contacts || []).filter(c => !contactSearch || c.name.toLowerCase().includes(contactSearch.toLowerCase()) || c.email.toLowerCase().includes(contactSearch.toLowerCase()) || c.company.toLowerCase().includes(contactSearch.toLowerCase())).slice((contactsPage-1)*contactsView, contactsPage*contactsView).map((contact, idx) => (
                  <tr key={contact.id || idx} className="border-b hover:bg-muted/30">
                    <td className="p-2"><input type="checkbox" checked={selectedContacts.includes(contact.id)} onChange={e => {
                      if (e.target.checked) setSelectedContacts([...selectedContacts, contact.id]);
                      else setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                    }} /></td>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2 font-medium">
                      <a href="#" className="text-blue-600 hover:underline">{contact.name}</a>
                    </td>
                    <td className="p-2">{contact.title}</td>
                    <td className="p-2">{contact.company}</td>
                    <td className="p-2">{contact.email}</td>
                    <td className="p-2">{contact.phone}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${contact.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{contact.status}</span>
                    </td>
                    <td className="p-2">{contact.lastContact}</td>
                    <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewContact({ ...contact }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditContact({ ...contact }); setShowContactForm(true); setNewContact({ ...contact }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteContact(contact.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Opportunities Pipeline */}
        <TabsContent value="opportunities" className="space-y-6">
          {/* Add/Edit Opportunity Modal */}
          <Dialog open={showOpportunityForm} onOpenChange={setShowOpportunityForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Opportunity</DialogTitle>
                <DialogDescription>
                  Enter details for a new opportunity.
                </DialogDescription>
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
                  <Button type="submit">Add Opportunity</Button>
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
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Quotes</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={quotesView} onChange={e => { setQuotesView(Number(e.target.value)); setQuotesPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={quotesPage === 1} onClick={() => setQuotesPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {quotesPage} of {Math.max(1, Math.ceil(filteredQuotes.length / quotesView))}</span>
              <Button variant="outline" size="sm" disabled={quotesPage === Math.ceil(filteredQuotes.length / quotesView) || filteredQuotes.length === 0} onClick={() => setQuotesPage(p => Math.min(Math.ceil(filteredQuotes.length / quotesView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search quotes..."
                  className="w-56 pl-10"
                  value={quoteSearch || ''}
                  onChange={e => setQuoteSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setQuotes(prev => prev.filter(q => !selectedQuotes.includes(q.id)));
                    setSelectedQuotes([]);
                    toast({ title: 'Quotes deleted', description: 'Selected quotes deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowQuoteForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Quote
              </Button>
            </div>
          </div>
          {/* Add Quote Modal */}
          <Dialog open={showQuoteForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowQuoteForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Quote</DialogTitle>
                <DialogDescription>
                  Enter details for a new quote.
                </DialogDescription>
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
          {/* Quotes Table */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="p-2 text-left"><input type="checkbox" checked={selectedQuotes.length === filteredQuotes.slice((quotesPage-1)*quotesView, quotesPage*quotesView).length && filteredQuotes.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedQuotes(filteredQuotes.slice((quotesPage-1)*quotesView, quotesPage*quotesView).map(q => q.id));
                    } else {
                      setSelectedQuotes([]);
                    }
                  }} /></th>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2 text-left">Owner</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(quotes || []).filter(q => !quoteSearch || q.customer.toLowerCase().includes(quoteSearch.toLowerCase())).slice((quotesPage-1)*quotesView, quotesPage*quotesView).map((quote, idx) => (
                  <tr key={quote.id || idx} className="border-b hover:bg-muted/30">
                    <td className="p-2"><input type="checkbox" checked={selectedQuotes.includes(quote.id)} onChange={e => {
                      if (e.target.checked) setSelectedQuotes([...selectedQuotes, quote.id]);
                      else setSelectedQuotes(selectedQuotes.filter(id => id !== quote.id));
                    }} /></td>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2 font-medium">
                      <a href="#" className="text-blue-600 hover:underline">{quote.customer}</a>
                    </td>
                    <td className="p-2">{quote.amount}</td>
                    <td className="p-2">
                      <Badge variant={quote.status === "approved" ? "default" : quote.status === "rejected" ? "destructive" : "secondary"}>{quote.status}</Badge>
                    </td>
                    <td className="p-2">{quote.created}</td>
                    <td className="p-2">{quote.owner}</td>
                    <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewQuote({ ...quote }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditQuote({ ...quote }); setShowQuoteForm(true); setNewQuote({ ...quote }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Quote
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteQuote(quote.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="space-y-6">
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Orders</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={ordersView} onChange={e => { setOrdersView(Number(e.target.value)); setOrdersPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={ordersPage === 1} onClick={() => setOrdersPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {ordersPage} of {Math.max(1, Math.ceil(filteredOrders.length / ordersView))}</span>
              <Button variant="outline" size="sm" disabled={ordersPage === Math.ceil(filteredOrders.length / ordersView) || filteredOrders.length === 0} onClick={() => setOrdersPage(p => Math.min(Math.ceil(filteredOrders.length / ordersView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="w-56 pl-10"
                  value={orderSearch || ''}
                  onChange={e => setOrderSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setOrders(prev => prev.filter(o => !selectedOrders.includes(o.id)));
                    setSelectedOrders([]);
                    toast({ title: 'Orders deleted', description: 'Selected orders deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowOrderForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>
          {/* Add Order Modal */}
          <Dialog open={showOrderForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowOrderForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Order</DialogTitle>
                <DialogDescription>
                  Enter details for a new order.
                </DialogDescription>
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
          {/* Orders Table */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="p-2 text-left"><input type="checkbox" checked={selectedOrders.length === filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).length && filteredOrders.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedOrders(filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).map(o => o.id));
                    } else {
                      setSelectedOrders([]);
                    }
                  }} /></th>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Total</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Payment</th>
                  <th className="p-2 text-left">Shipment</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(orders || []).filter(o => !orderSearch || o.customer.toLowerCase().includes(orderSearch.toLowerCase())).slice((ordersPage-1)*ordersView, ordersPage*ordersView).map((order, idx) => (
                  <tr key={order.id || idx} className="border-b hover:bg-muted/30">
                    <td className="p-2"><input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={e => {
                      if (e.target.checked) setSelectedOrders([...selectedOrders, order.id]);
                      else setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                    }} /></td>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2 font-medium">
                      <a href="#" className="text-blue-600 hover:underline">{order.customer}</a>
                    </td>
                    <td className="p-2">{order.total}</td>
                    <td className="p-2">
                      <Badge variant={order.status === "completed" ? "default" : order.status === "cancelled" ? "destructive" : "secondary"}>{order.status}</Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant={order.payment === "paid" ? "default" : order.payment === "refunded" ? "destructive" : "secondary"}>{order.payment}</Badge>
                    </td>
                    <td className="p-2">{order.shipment}</td>
                    <td className="p-2">{order.created}</td>
                    <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewOrder({ ...order }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditOrder({ ...order }); setShowOrderForm(true); setNewOrder({ ...order }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteOrder(order.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Products Catalog */}
        <TabsContent value="products" className="space-y-6">
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Products</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={productsView} onChange={e => { setProductsView(Number(e.target.value)); setProductsPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={productsPage === 1} onClick={() => setProductsPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {productsPage} of {Math.max(1, Math.ceil(filteredProducts.length / productsView))}</span>
              <Button variant="outline" size="sm" disabled={productsPage === Math.ceil(filteredProducts.length / productsView) || filteredProducts.length === 0} onClick={() => setProductsPage(p => Math.min(Math.ceil(filteredProducts.length / productsView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="w-56 pl-10"
                  value={productSearch || ''}
                  onChange={e => setProductSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
                    setSelectedProducts([]);
                    toast({ title: 'Products deleted', description: 'Selected products deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => { setShowProductForm(true); setEditingProduct(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
          {/* Add/Edit Product Modal */}
          <Dialog open={showProductForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowProductForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Enter details for a new product.
                </DialogDescription>
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
                  <Button type="submit">Add Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Products Table */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="p-2 text-left"><input type="checkbox" checked={selectedProducts.length === filteredProducts.slice((productsPage-1)*productsView, productsPage*productsView).length && filteredProducts.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedProducts(filteredProducts.slice((productsPage-1)*productsView, productsPage*productsView).map(p => p.id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }} /></th>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Stock</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(products || []).filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase())).slice((productsPage-1)*productsView, productsPage*productsView).map((product, idx) => (
                  <tr key={product.id || idx} className="border-b hover:bg-muted/30">
                    <td className="p-2"><input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={e => {
                      if (e.target.checked) setSelectedProducts([...selectedProducts, product.id]);
                      else setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                    }} /></td>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2"><img src={product.image} alt={product.name} className="h-8 w-8 object-contain" /></td>
                    <td className="p-2 font-medium">
                      <a href="#" className="text-blue-600 hover:underline">{product.name}</a>
                    </td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewProduct({ ...product, stock: String(product.stock) }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditingProduct({ ...product }); setShowProductForm(true); setNewProduct({ ...product, stock: String(product.stock) }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Lead Details Modal */}
      <Dialog open={!!viewLead} onOpenChange={open => { if (!open) resetAllModals(); else setViewLead(viewLead); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected lead.
            </DialogDescription>
          </DialogHeader>
          {viewLead && (
            <div className="space-y-2">
              <div><b>Name:</b> {viewLead.name}</div>
              <div><b>Contact:</b> {viewLead.contact}</div>
              <div><b>Email:</b> {viewLead.email}</div>
              <div><b>Phone:</b> {viewLead.phone}</div>
              <div><b>Company:</b> {viewLead.company}</div>
              <div><b>Title:</b> {viewLead.title}</div>
              <div><b>Status:</b> {viewLead.status}</div>
              <div><b>Priority:</b> {viewLead.priority}</div>
              <div><b>Owner:</b> {viewLead.owner}</div>
              <div><b>Tags:</b> {Array.isArray(viewLead.tags) ? viewLead.tags.join(', ') : viewLead.tags}</div>
              <div><b>Notes:</b> {viewLead.notes}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Convert to Opportunity Modal */}
      <Dialog open={showConvertModal} onOpenChange={open => { if (!open) resetAllModals(); else setShowConvertModal(true); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert Lead to Opportunity</DialogTitle>
            <DialogDescription>
              Are you sure you want to convert this lead to an opportunity?
            </DialogDescription>
          </DialogHeader>
          <div>Are you sure you want to convert <b>{leadToConvert?.name}</b> to an opportunity?</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConvertModal(false)}>Cancel</Button>
            <Button onClick={() => {
              if (leadToConvert) {
                setOpportunities(prev => [
                  {
                    id: `O-${(prev.length + 1).toString().padStart(3, "0")}`,
                    title: leadToConvert.name,
                    company: leadToConvert.company,
                    value: leadToConvert.value,
                    stage: "prospect",
                    probability: 0,
                    closeDate: "",
                    owner: leadToConvert.owner,
                  },
                  ...prev,
                ]);
                setShowConvertModal(false);
                toast({ title: 'Converted', description: 'Lead converted to opportunity!' });
              }
            }}>Convert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Contact Details Modal */}
      <Dialog open={!!viewContact} onOpenChange={open => { if (!open) resetAllModals(); else setViewContact(viewContact); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected contact.
            </DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>

      {/* View Quote Details Modal */}
      <Dialog open={!!viewQuote} onOpenChange={open => { if (!open) resetAllModals(); else setViewQuote(viewQuote); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected quote.
            </DialogDescription>
          </DialogHeader>
          {viewQuote && (
            <div className="space-y-2">
              <div><b>Customer:</b> {viewQuote.customer}</div>
              <div><b>Amount:</b> {viewQuote.amount}</div>
              <div><b>Status:</b> {viewQuote.status}</div>
              <div><b>Created:</b> {viewQuote.created}</div>
              <div><b>Owner:</b> {viewQuote.owner}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Order Details Modal */}
      <Dialog open={!!viewOrder} onOpenChange={open => { if (!open) resetAllModals(); else setViewOrder(viewOrder); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected order.
            </DialogDescription>
          </DialogHeader>
          {viewOrder && (
            <div className="space-y-2">
              <div><b>Customer:</b> {viewOrder.customer}</div>
              <div><b>Total:</b> {viewOrder.total}</div>
              <div><b>Status:</b> {viewOrder.status}</div>
              <div><b>Payment:</b> {viewOrder.payment}</div>
              <div><b>Shipment:</b> {viewOrder.shipment}</div>
              <div><b>Created:</b> {viewOrder.created}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Product Details Modal */}
      <Dialog open={!!viewProduct} onOpenChange={open => { if (!open) resetAllModals(); else setViewProduct(viewProduct); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected product.
            </DialogDescription>
          </DialogHeader>
          {viewProduct && (
            <div className="space-y-2">
              <div><b>Name:</b> {viewProduct.name}</div>
              <div><b>Image:</b> {viewProduct.image}</div>
              <div><b>Price:</b> {viewProduct.price}</div>
              <div><b>Stock:</b> {viewProduct.stock}</div>
              <div><b>Category:</b> {viewProduct.category}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
