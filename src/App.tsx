import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrmLayout from "./components/layout/CrmLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Sales from "./pages/Sales";
import Marketing from "./pages/Marketing";
import Companies from "./pages/Companies";
import Settings from "./pages/Settings";
import Workflow from "./pages/Workflow";
import Intake from "./pages/workflow/Intake";
import Assessment from "./pages/workflow/Assessment";
import Repair from "./pages/workflow/Repair";
import Returns from "./pages/workflow/Returns";
import Warehouse from "./pages/workflow/Warehouse";
import Recycling from "./pages/workflow/Recycling";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import Tasks from "./pages/Tasks";
import Pipelines from "./pages/Pipelines";
import Reports from "./pages/Reports";
import Email from "./pages/Email";
import Chat from "./pages/Chat";
import VoIP from "./pages/VoIP";
import Automation from "./pages/Automation";
import { LeadsProvider } from "./context/LeadsContext";
import Pricing from "./pages/Pricing";
import Opportunities from "./pages/Opportunities";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LeadsProvider>
        <BrowserRouter>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard pages with layout (protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Index />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />

            {/* Core CRM Modules */}
            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Sales />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketing"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Marketing />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Companies />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Settings />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />

            {/* Workflow pages */}
            <Route
              path="/workflow"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Workflow />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow/intake"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Intake />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow/assessment"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Assessment />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow/repair"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Repair />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow/returns"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Returns />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow/warehouse"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Warehouse />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow/recycling"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Recycling />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />

            {/* Legacy pages */}
            <Route
              path="/contacts"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Contacts />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/deals"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Deals />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Analytics />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Analytics />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Analytics />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />

            {/* New route */}
            <Route
              path="/leads"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Leads />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />

            {/* App-specific routes for initialApps */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Tasks />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pipelines"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Pipelines />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Reports />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/email"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Email />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Chat />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/voip"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <VoIP />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/automation"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Automation />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/opportunities"
              element={
                <ProtectedRoute>
                  <CrmLayout>
                    <Opportunities />
                  </CrmLayout>
                </ProtectedRoute>
              }
            />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LeadsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
