import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Clock,
  Zap,
  Plus,
  ExternalLink,
  Users,
  Building2,
  TrendingUp,
  ListChecks,
  BarChart2,
} from "lucide-react";

const apps = [
  {
    name: "Leads",
    icon: TrendingUp,
    description: "Manage potential customers",
    count: 7,
    status: "active",
    color: "bg-blue-600",
  },
  {
    name: "Deals",
    icon: BarChart2,
    description: "Track sales opportunities",
    count: 4,
    status: "active",
    color: "bg-green-600",
  },
  {
    name: "Tasks",
    icon: ListChecks,
    description: "Organize your to-dos",
    count: 10,
    status: "active",
    color: "bg-yellow-600",
  },
  {
    name: "Reports",
    icon: BarChart2,
    description: "View analytics & insights",
    count: 2,
    status: "active",
    color: "bg-purple-600",
  },
  {
    name: "Pipelines",
    icon: ListChecks,
    description: "Visualize sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
  },
  {
    name: "Contacts",
    icon: Users,
    description: "All your contacts",
    count: 12,
    status: "active",
    color: "bg-indigo-600",
  },
  {
    name: "Companies",
    icon: Building2,
    description: "Manage organizations",
    count: 5,
    status: "active",
    color: "bg-cyan-600",
  },
  // Existing tools
  {
    name: "Email",
    icon: Mail,
    description: "Unified inbox",
    count: 12,
    status: "active",
    color: "bg-blue-500",
  },
  {
    name: "Chat",
    icon: MessageSquare,
    description: "Team messaging",
    count: 3,
    status: "active",
    color: "bg-green-500",
  },
  {
    name: "VoIP",
    icon: Phone,
    description: "Business calls",
    count: 2,
    status: "busy",
    color: "bg-orange-500",
  },
  {
    name: "Calendar",
    icon: Calendar,
    description: "Schedule events",
    count: 5,
    status: "active",
    color: "bg-purple-500",
  },
  {
    name: "Automation",
    icon: Zap,
    description: "Workflow engine",
    count: 8,
    status: "active",
    color: "bg-yellow-500",
  },
];

const recentActivities = [
  {
    action: "Meeting scheduled",
    target: "Acme Corp Demo",
    time: "2 mins ago",
    icon: Calendar,
  },
  {
    action: "Email sent",
    target: "Follow-up: Q4 Proposal",
    time: "5 mins ago",
    icon: Mail,
  },
  {
    action: "Call logged",
    target: "Sarah Johnson",
    time: "12 mins ago",
    icon: Phone,
  },
  {
    action: "Deal updated",
    target: "Enterprise License",
    time: "25 mins ago",
    icon: Zap,
  },
];

interface RightAppsPanelProps {
  apps: Array<any>;
  onAddApp: (app: any) => void;
}

export default function RightAppsPanel({ apps, onAddApp }: RightAppsPanelProps) {
  // Only show apps that are not in the left navbar
  const filteredApps = apps;
  return (
    <div className="w-80 bg-card border-l border-border flex flex-col -ml-1 h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-foreground">Apps & Tools</h2>
          <Button variant="outline" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Apps Grid */}
        <div className="p-4 border-b border-border">
          <div className="grid grid-cols-2 gap-3">
            {filteredApps.map((app) => (
              <Card
                key={app.name}
                className="cursor-pointer hover:shadow-md transition-shadow border border-border/50 h-full flex flex-col justify-between"
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        app.color,
                      )}
                    >
                      <app.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {app.name}
                        </p>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        <button
                          className="ml-1 p-1 rounded hover:bg-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddApp(app);
                          }}
                          title="Add to Navbar"
                        >
                          <Plus className="w-3 h-3 text-primary" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {app.description}
                      </p>
                    </div>
                  </div>
                  {app.count > 0 && (
                    <div className="mt-2 flex items-center justify-between">
                      <Badge
                        variant={
                          app.status === "active" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {app.count} {app.status === "busy" ? "active" : "new"}
                      </Badge>
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          app.status === "active"
                            ? "bg-green-500"
                            : "bg-orange-500",
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.target}
                  </p>
                  <div className="flex items-center mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
