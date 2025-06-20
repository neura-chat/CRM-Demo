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
  X,
} from "lucide-react";
import { useState } from "react";
import { StatsWidget } from "./widgets/StatsWidget";
import { DealsWidget } from "./widgets/DealsWidget";
import { TasksWidget } from "./widgets/TasksWidget";
import { ActivitiesWidget } from "./widgets/ActivitiesWidget";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

// Type definitions for widget data
import type { Stat } from "./widgets/StatsWidget";
import type { Deal } from "./widgets/DealsWidget";
import type { Task } from "./widgets/TasksWidget";
import type { Activity } from "./widgets/ActivitiesWidget";

const ALL_WIDGETS = [
  { id: "stats", title: "Key Metrics", component: StatsWidget, gridSize: 2 },
  { id: "deals", title: "Pipeline Overview", component: DealsWidget, gridSize: 1 },
  { id: "tasks", title: "Today's Tasks", component: TasksWidget, gridSize: 1 },
  { id: "activities", title: "Recent Activities", component: ActivitiesWidget, gridSize: 2 },
  // Add more widgets here
];

const stats: Stat[] = [
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

const recentDeals: Deal[] = [
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

const upcomingTasks: Task[] = [
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

const activities: Activity[] = [
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

  const [activeWidgets, setActiveWidgets] = useState(["stats", "deals", "tasks", "activities"]);
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const reordered = Array.from(activeWidgets);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setActiveWidgets(reordered);
  }

  function handleRemoveWidget(id: string) {
    setActiveWidgets((prev) => prev.filter((wid) => wid !== id));
  }

  function handleAddWidget(id: string) {
    setActiveWidgets((prev) => [...prev, id]);
    setShowAddDropdown(false);
  }

  const availableWidgets = ALL_WIDGETS.filter(w => !activeWidgets.includes(w.id));

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

      {/* Add Widget Button and Dropdown */}
      <div className="mb-4 relative">
        <Button
          variant="outline"
          onClick={() => setShowAddDropdown((v) => !v)}
          disabled={availableWidgets.length === 0}
        >
          + Add Widget
        </Button>
        {showAddDropdown && (
          <div className="absolute z-10 mt-2 bg-popover border border-border rounded shadow-lg min-w-[180px]">
            {availableWidgets.map((widget) => (
              <button
                key={widget.id}
                className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                onClick={() => handleAddWidget(widget.id)}
              >
                {widget.title}
              </button>
            ))}
            <button
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors border-t border-border"
              onClick={() => {
                // For now, just alert. You can replace this with a modal for custom widget creation.
                setShowAddDropdown(false);
                alert('Custom widget creation coming soon!');
              }}
            >
              + Custom Widget
            </button>
          </div>
        )}
      </div>

      {/* Render widgets in order with drag-and-drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-widgets" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {activeWidgets.map((widgetId, index) => {
                const widget = ALL_WIDGETS.find((w) => w.id === widgetId);
                if (!widget) return null;
                let WidgetComponent = null;
                if (widget.id === "stats")
                  WidgetComponent = <StatsWidget stats={stats} />;
                if (widget.id === "deals")
                  WidgetComponent = <DealsWidget recentDeals={recentDeals} />;
                if (widget.id === "tasks")
                  WidgetComponent = <TasksWidget upcomingTasks={upcomingTasks} />;
                if (widget.id === "activities")
                  WidgetComponent = <ActivitiesWidget activities={activities} />;
                // Responsive col-span for each widget
                const colSpan = widget.gridSize === 2 ? "col-span-1 lg:col-span-2" : "col-span-1";
                return (
                  <Draggable key={widget.id} draggableId={widget.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={colSpan}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.7 : 1,
                          position: "relative",
                        }}
                      >
                        {/* Remove button */}
                        <button
                          onClick={() => handleRemoveWidget(widget.id)}
                          className="absolute top-2 right-2 z-20 bg-background border border-border rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          title="Remove widget"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {WidgetComponent}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Recent Activities Log */}
      {/* <Card className="border border-border/50">
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
      </Card> */}

      {/* CRM Features Showcase */}
      {/* <Card className="border border-border/50 bg-gradient-to-br from-primary/5 via-background to-accent/5">
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
      </Card> */}
    </div>
  );
}
