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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  Mail,
  BarChart3,
  Plus,
  Play,
  Pause,
  Edit,
  Eye,
  TrendingUp,
  Target,
  MessageSquare,
  Send,
} from "lucide-react";

const campaigns = [
  {
    id: "C-001",
    name: "Q1 Product Launch",
    type: "Email",
    status: "active",
    sent: 15420,
    opened: 8934,
    clicked: 2145,
    scheduled: "2025-01-15",
    budget: "$5,000",
  },
  {
    id: "C-002",
    name: "Customer Retention",
    type: "Email",
    status: "draft",
    sent: 0,
    opened: 0,
    clicked: 0,
    scheduled: "2025-01-20",
    budget: "$3,500",
  },
];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            <span>Marketing</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage marketing campaigns
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Marketing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Active Campaigns", value: "12", icon: Target },
          { title: "Total Reach", value: "45.2K", icon: Users },
          { title: "Engagement Rate", value: "18.7%", icon: TrendingUp },
          { title: "Conversion Rate", value: "4.2%", icon: BarChart3 },
        ].map((metric) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Marketing Modules */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="builder">Campaign Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Campaign List */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Marketing Campaigns</CardTitle>
              <CardDescription>
                Manage your marketing campaigns and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground">
                          {campaign.name}
                        </h3>
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {campaign.status === "active" ? (
                          <Button variant="ghost" size="sm">
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">
                          {campaign.sent.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Opened</p>
                        <p className="font-medium">
                          {campaign.opened.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicked</p>
                        <p className="font-medium">
                          {campaign.clicked.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Scheduled</p>
                        <p className="font-medium">{campaign.scheduled}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">{campaign.budget}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaign Builder */}
        <TabsContent value="builder" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Campaign Builder</CardTitle>
              <CardDescription>
                Create new marketing campaigns with content editor and
                scheduling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      placeholder="Enter campaign name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="campaignType">Campaign Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="sms">SMS Campaign</SelectItem>
                        <SelectItem value="push">Push Notifications</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Contacts</SelectItem>
                        <SelectItem value="customers">
                          Existing Customers
                        </SelectItem>
                        <SelectItem value="prospects">Prospects</SelectItem>
                        <SelectItem value="inactive">Inactive Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="scheduleDate">Schedule Date</Label>
                    <Input id="scheduleDate" type="datetime-local" />
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget</Label>
                    <Input id="budget" placeholder="$0.00" type="number" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input id="subject" placeholder="Enter email subject" />
                  </div>

                  <div>
                    <Label htmlFor="content">Content Editor</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your campaign content here..."
                      rows={8}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tracking" />
                    <Label htmlFor="tracking">Enable click tracking</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="analytics" />
                    <Label htmlFor="analytics">Enable detailed analytics</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button variant="outline">Save Draft</Button>
                <Button variant="outline">Preview</Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Schedule Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Track campaign effectiveness over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Line Chart: Campaign Performance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Audience Engagement</CardTitle>
                <CardDescription>
                  Breakdown of user interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Donut Chart: Engagement Metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
