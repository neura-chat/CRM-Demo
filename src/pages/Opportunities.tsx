import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, Target } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const stages = ["prospect", "qualified", "proposal", "negotiation"];

export default function Opportunities() {
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
    } else {
      setOpportunities((prev) => [
        {
          ...newOpportunity,
          id: `O-${(prev.length + 1).toString().padStart(3, "0")}`,
          probability: Number(newOpportunity.probability),
        },
        ...prev,
      ]);
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
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Target className="w-8 h-8 text-primary" />
            <span>Opportunities</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Visualize and manage your sales pipeline
          </p>
        </div>
        <Button onClick={() => { setShowOpportunityForm(true); setEditingOpportunity(null); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Opportunity
        </Button>
      </div>
      <Dialog open={showOpportunityForm} onOpenChange={setShowOpportunityForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingOpportunity ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
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
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
                  ))}
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
              <Button type="submit">{editingOpportunity ? "Update" : "Add"} Opportunity</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <span className="text-muted-foreground">Kanban-style opportunity management (drag and drop to move between stages)</span>
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
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stages.map((stage) => (
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
    </div>
  );
} 