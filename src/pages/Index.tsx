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
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Target,
  Calendar,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Leads",
    value: "342",
    change: "+23.5%",
    trend: "up",
    icon: Users,
    description: "28 new this week",
  },
  {
    title: "Revenue",
    value: "$847,239",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Win Rate",
    value: "67%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    description: "above target",
  },
  {
    title: "Deals Closed",
    value: "89",
    change: "+15.4%",
    trend: "up",
    icon: TrendingUp,
    description: "this month",
  },
];

const recentDeals = [
  {
    company: "Acme Corporation",
    amount: "$125,000",
    stage: "Negotiation",
    probability: 85,
    owner: "Sarah Johnson",
    daysInStage: 3,
    status: "hot",
  },
  {
    company: "TechFlow Inc",
    amount: "$89,500",
    stage: "Proposal",
    probability: 65,
    owner: "Mike Chen",
    daysInStage: 7,
    status: "warm",
  },
  {
    company: "Global Solutions",
    amount: "$245,000",
    stage: "Discovery",
    probability: 40,
    owner: "Emily Davis",
    daysInStage: 12,
    status: "cold",
  },
  {
    company: "StartupX",
    amount: "$45,000",
    stage: "Qualification",
    probability: 25,
    owner: "John Smith",
    daysInStage: 5,
    status: "warm",
  },
];

const upcomingTasks = [
  {
    task: "Follow up with Acme Corp",
    type: "Call",
    time: "2:00 PM",
    priority: "high",
    contact: "John Doe",
  },
  {
    task: "Send proposal to TechFlow",
    type: "Email",
    time: "3:30 PM",
    priority: "medium",
    contact: "Jane Smith",
  },
  {
    task: "Demo scheduled",
    type: "Meeting",
    time: "4:45 PM",
    priority: "high",
    contact: "Global Solutions",
  },
  {
    task: "Contract review",
    type: "Document",
    time: "Tomorrow",
    priority: "low",
    contact: "StartupX",
  },
];

export default function Index() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Welcome Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Good morning, John! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentDate} • {currentTime} • Here's what's happening with your
            business today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Deals */}
        <Card className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Pipeline Overview
              </CardTitle>
              <CardDescription>Your most active deals</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDeals.map((deal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">
                      {deal.company}
                    </h4>
                    <Badge
                      variant={
                        deal.status === "hot"
                          ? "destructive"
                          : deal.status === "warm"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {deal.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{deal.amount}</span>
                    <span>•</span>
                    <span>{deal.stage}</span>
                    <span>•</span>
                    <span>{deal.owner}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Probability</span>
                      <span>{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Today's Tasks
              </CardTitle>
              <CardDescription>Your upcoming activities</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {task.type === "Call" && (
                    <Phone className="w-4 h-4 text-primary" />
                  )}
                  {task.type === "Email" && (
                    <Mail className="w-4 h-4 text-primary" />
                  )}
                  {task.type === "Meeting" && (
                    <Calendar className="w-4 h-4 text-primary" />
                  )}
                  {task.type === "Document" && (
                    <TrendingUp className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{task.task}</h4>
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{task.contact}</span>
                    <span>•</span>
                    <span>{task.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities Log */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activities</CardTitle>
          <CardDescription>Latest updates across your CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New lead created",
                details: "Acme Corporation - Enterprise inquiry",
                time: "2 minutes ago",
                icon: Users,
                color: "text-blue-600",
              },
              {
                action: "Deal closed",
                details: "TechFlow Inc - $45,000 contract signed",
                time: "1 hour ago",
                icon: DollarSign,
                color: "text-green-600",
              },
              {
                action: "Meeting scheduled",
                details: "Demo call with Global Solutions",
                time: "3 hours ago",
                icon: Calendar,
                color: "text-purple-600",
              },
              {
                action: "Quote sent",
                details: "StartupX - Software licensing proposal",
                time: "5 hours ago",
                icon: FileText,
                color: "text-orange-600",
              },
              {
                action: "Contact updated",
                details: "Sarah Johnson profile information",
                time: "Yesterday",
                icon: Users,
                color: "text-gray-600",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}
                >
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CRM Features Showcase */}
      <Card className="border border-border/50 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Powerful CRM Features
          </CardTitle>
          <CardDescription className="text-lg">
            Everything you need to manage your customer relationships
            effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Contact Management
              </h3>
              <p className="text-muted-foreground">
                Organize and track all your customer interactions in one
                centralized location.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Sales Pipeline
              </h3>
              <p className="text-muted-foreground">
                Visual pipeline management to track deals from lead to close
                with customizable stages.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Analytics & Reports
              </h3>
              <p className="text-muted-foreground">
                Comprehensive reporting and analytics to measure performance and
                identify trends.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <Button asChild size="lg" className="px-8">
              <Link to="/workflow">Launch Workflow Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/signup">Get Started Free</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
