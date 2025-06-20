import React, { createContext, useContext, useState } from "react";

const initialLeads = [
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

const LeadsContext = createContext(null);

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = (lead) => {
    setLeads((prev) => [
      {
        ...lead,
        id: `L-${(prev.length + 1).toString().padStart(3, "0")}`,
        tags: lead.tags ? (Array.isArray(lead.tags) ? lead.tags : lead.tags.split(",").map((t) => t.trim())) : [],
      },
      ...prev,
    ]);
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) throw new Error("useLeads must be used within a LeadsProvider");
  return context;
} 