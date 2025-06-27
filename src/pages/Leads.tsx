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
import { Filter, Plus, Search, Eye, Edit, Phone, Mail, Calendar, MoreHorizontal, ArrowUpRight, Trash } from "lucide-react";
import { useLeads } from "@/context/LeadsContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
    company: "",
    title: "",
    source: "",
    score: "",
    created: "",
    updated: "",
    notes: "",
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
      company: "",
      title: "",
      source: "",
      score: "",
      created: "",
      updated: "",
      notes: "",
    });
    toast({
      title: "Lead Added",
      description: `Lead '${newLead.name}' was added successfully!`,
    });
  };

  // Tab navigation and filter state
  const [activeTab, setActiveTab] = useState("Leads");
  const [activeSubTab, setActiveSubTab] = useState("Leads");
  const [filter, setFilter] = useState("All Open Leads");
  const [search, setSearch] = useState("");

  // Placeholder for filter dropdown options
  const filterOptions = ["All Open Leads", "My Leads", "Qualified", "Hot", "Cold"];

  // Filtered and searched leads
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-0 bg-background min-h-screen">
      {/* Top Tab Navigation */}
      <div className="flex items-center border-b bg-white px-8 pt-4">
        {["Leads", "Accounts", "Contacts"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-base border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="ml-2 flex items-center space-x-1">
          <Button variant="outline" size="icon" className="h-7 w-7">+</Button>
        </div>
      </div>
      {/* Secondary Tab Bar */}
      <div className="flex items-center border-b bg-muted px-8">
        {["Leads", "Accounts", "Contacts"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 text-sm font-medium border-b-2 transition-colors ${activeSubTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="ml-2 flex items-center space-x-1">
          <Button variant="outline" size="icon" className="h-6 w-6">+</Button>
        </div>
      </div>
      {/* Page Title and Filter Bar */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Leads</h1>
          <select
            className="border rounded px-2 py-1 text-sm bg-background"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="w-56 pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">Import</Button>
          <Button variant="outline">Actions</Button>
          <Button onClick={() => setShowLeadForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New
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
      {/* Leads Table */}
      <div className="px-8 pb-8">
        <div className="overflow-x-auto rounded border border-border/50 bg-white">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="p-2 text-left"><input type="checkbox" /></th>
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
              {filteredLeads.map((lead, idx) => {
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
                    <td className="p-2"><input type="checkbox" /></td>
                    <td className="p-2">{idx + 1}</td>
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
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" /> Edit Lead
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowUpRight className="w-4 h-4 mr-2" /> Convert to Opportunity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
      </div>
    </div>
  );
} 