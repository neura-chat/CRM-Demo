import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import LeftNavbar from "./LeftNavbar";
import RightAppsPanel from "./RightAppsPanel";
import AIAssistantPanel from "./AIAssistantPanel";
import { Bot, Menu, X, Grid3X3 } from "lucide-react";

interface CrmLayoutProps {
  children: ReactNode;
}

export default function CrmLayout({ children }: CrmLayoutProps) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <LeftNavbar />
          </div>
        </div>
      )}

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <LeftNavbar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar for Mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">NeuraCRM</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAppsOpen(!isAppsOpen)}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAIOpen(!isAIOpen)}
            >
              <Bot className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* AI Assistant Panel */}
          <AIAssistantPanel
            isOpen={isAIOpen}
            onClose={() => setIsAIOpen(false)}
          />
        </div>
      </main>

      {/* Right Apps Panel - Hidden on tablets and mobile */}
      {isAppsOpen && (
        <div className="hidden xl:block">
          <RightAppsPanel />
        </div>
      )}

      {/* Toggle Buttons for Desktop */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <Button
            onClick={() => setIsAppsOpen(!isAppsOpen)}
            className="rounded-full w-12 h-12 shadow-lg"
            size="icon"
            variant={isAppsOpen ? "default" : "outline"}
          >
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setIsAIOpen(!isAIOpen)}
            className="rounded-full w-12 h-12 shadow-lg"
            size="icon"
            variant={isAIOpen ? "default" : "outline"}
          >
            <Bot className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
