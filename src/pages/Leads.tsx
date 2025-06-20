import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Filter, Plus, Search, Eye, Edit, Phone, Mail, Calendar } from "lucide-react";
import { useLeads } from "@/context/LeadsContext";

export default function Leads() {
  const { leads, addLead } = useLeads();
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

  const handleLeadInput = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    addLead(newLead);
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

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            Leads
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your leads and track their progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={() => setShowLeadForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>
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
                <Input placeholder="Search leads..." className="w-64 pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="p-2 text-left">Company</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Value</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Owner</th>
                  <th className="p-2 text-left">Tags</th>
                  <th className="p-2 text-left">Last Contact</th>
                  <th className="p-2 text-left">Actions</th>
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
    </div>
  );
} 