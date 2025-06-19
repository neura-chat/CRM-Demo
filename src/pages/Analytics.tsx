import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  PieChart,
  LineChart,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Gain insights into your sales performance and customer behavior.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Content Placeholder */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Sales Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Advanced Analytics Dashboard Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get deep insights into your sales performance, customer behavior,
            and revenue trends with powerful analytics and reporting tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-muted/50">
              <PieChart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Revenue Breakdown</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <LineChart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Performance Trends</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Growth Metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
