import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

export default function Contacts() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your customer relationships and contact information.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="w-full pl-10" />
          </div>
        </div>
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold text-foreground">3,842</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Placeholder */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Contact Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Contact Management Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            This powerful contact management system will help you organize,
            track, and nurture all your customer relationships in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-muted/50">
              <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Email Integration</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Call Tracking</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Company Profiles</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
