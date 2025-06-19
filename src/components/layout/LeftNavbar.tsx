import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Search,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: TrendingUp },
  { name: "Marketing", href: "/marketing", icon: FileText },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function LeftNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out h-screen",
        isHovered ? "w-48" : "w-16",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo and Brand */}
      <div className="flex items-center px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/assets/9f16d040d92d49b8a8434e2ea64b576d/lopo-bad227?format=webp&width=800"
              alt="NeuraCRM Logo"
              className="w-8 h-8 rounded-lg"
            />
          </div>
          {isHovered && (
            <div className="overflow-hidden">
              <h1 className="text-lg font-semibold text-sidebar-foreground whitespace-nowrap">
                NeuraCRM
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Search - Only show when expanded */}
      {isHovered && (
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/40" />
            <Input
              placeholder="Search..."
              className="w-full pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !isHovered && "justify-center",
              )}
              title={!isHovered ? item.name : ""}
            >
              <item.icon
                className={cn("w-5 h-5 flex-shrink-0", isHovered && "mr-3")}
              />
              {isHovered && (
                <span className="whitespace-nowrap overflow-hidden">
                  {item.name}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {!isHovered && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        {/* User Profile */}
        <div
          className={cn(
            "flex items-center mb-4",
            isHovered ? "space-x-3" : "justify-center",
          )}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-white">JD</span>
          </div>
          {isHovered && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  john@company.com
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-sidebar-foreground/60"
              >
                <Bell className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full transition-all group relative text-white hover:text-white hover:bg-white/10",
              isHovered ? "justify-start" : "justify-center px-2",
            )}
            title={!isHovered ? "Sign Out" : ""}
          >
            <LogOut className={cn("w-4 h-4 text-white", isHovered && "mr-2")} />
            {isHovered && <span className="text-white">Sign Out</span>}

            {/* Tooltip for collapsed state */}
            {!isHovered && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                Sign Out
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
