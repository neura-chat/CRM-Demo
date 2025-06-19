import { useState } from "react";
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
} from "lucide-react";

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

const leads = [
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

const opportunities = [
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

const products = [
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

export default function Sales() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span>Sales</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your sales pipeline and track performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Button>
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
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground">
                          {lead.name}
                        </h3>
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
                        <Badge variant="outline">{lead.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Contact</p>
                        <p className="font-medium">{lead.contact}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Value</p>
                        <p className="font-medium">{lead.value}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Owner</p>
                        <p className="font-medium">{lead.owner}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Contact</p>
                        <p className="font-medium">{lead.lastContact}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        {lead.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Contact Management</CardTitle>
              <CardDescription>
                Editable contact views with interaction history
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Contact Management</h3>
              <p className="text-muted-foreground mb-4">
                Advanced contact management with interaction history and
                editable views
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Pipeline */}
        <TabsContent value="opportunities" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>
                Kanban-style opportunity management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["Prospect", "Qualified", "Proposal", "Negotiation"].map(
                  (stage) => (
                    <div key={stage} className="space-y-3">
                      <h3 className="font-semibold text-foreground">{stage}</h3>
                      <div className="space-y-2">
                        {opportunities
                          .filter((opp) => opp.stage === stage.toLowerCase())
                          .map((opp) => (
                            <Card
                              key={opp.id}
                              className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                            >
                              <h4 className="font-medium text-sm">
                                {opp.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {opp.company}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm font-medium">
                                  {opp.value}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {opp.probability}%
                                </span>
                              </div>
                              <Progress
                                value={opp.probability}
                                className="h-1 mt-1"
                              />
                            </Card>
                          ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quotes */}
        <TabsContent value="quotes" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Estimate Builder & Quotes</CardTitle>
              <CardDescription>
                Create and manage quotes and estimates
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quote Management</h3>
              <p className="text-muted-foreground mb-4">
                Build estimates and manage quotes with approval workflows
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Quote
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Catalog */}
        <TabsContent value="products" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Products Catalog</CardTitle>
              <CardDescription>
                Manage your product inventory and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="h-32 bg-muted/50 flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-primary">
                          {product.price}
                        </span>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Stock: {product.stock}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Quote
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Orders List</CardTitle>
                <CardDescription>
                  Track orders with status and payment indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Order Management</h3>
                <p className="text-muted-foreground">
                  Comprehensive order tracking with payment status
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Invoices & Shipments</CardTitle>
                <CardDescription>
                  PDF preview, send/download options, shipment tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="flex justify-center space-x-8 mb-4">
                  <Receipt className="w-12 h-12 text-primary" />
                  <Truck className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Invoices & Shipping
                </h3>
                <p className="text-muted-foreground">
                  Generate invoices and track shipments with courier integration
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
