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
  Trash,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LeftNavbarProps {
  navigation: Array<{ name: string; href: string; icon: any }>;
  onDelete?: (name: string) => void;
}

export default function LeftNavbar({ navigation, onDelete }: LeftNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  // Separate settings from other navigation items
  const settingsItem = navigation.find((item) => item.name === "Settings");
  const mainNav = navigation.filter((item) => item.name !== "Settings");

  return (
    <div
      className={cn(
        "flex flex-col sidebar-bg border-r border-sidebar-border transition-all duration-300 ease-in-out h-screen",
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
        {mainNav.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <div key={item.name} className="relative group flex items-center">
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group relative flex-1",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !isHovered && "justify-center",
                )}
                title={!isHovered ? item.name : ""}
              >
                <item.icon
                  className={cn("w-5 h-5 flex-shrink-0 sidebar-icon-color", isHovered && "mr-3")}
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
              {/* Show delete button only in edit mode and when expanded, but not for Settings */}
              {isHovered && isEditMode && onDelete && item.name !== "Settings" && (
                <button
                  className="ml-2 p-1 rounded hover:bg-red-100 text-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.name);
                  }}
                  title={`Delete ${item.name}`}
                >
                  <Trash className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-sidebar-border">

        <Button  style={{ marginBottom: '20px'}}
            variant={isEditMode ? "default" : "ghost"}
            onClick={() => setIsEditMode((v) => !v)}
            className={cn(
              "w-full transition-all group relative",
              isHovered ? "justify-start" : "justify-center px-2 hover:bg-white/10",
              isEditMode ? "bg-blue-500 text-white" : "text-sidebar-foreground/60"
            )}
            title={!isHovered ? "Edit Navigation" : ""}
          >
            <Pencil className={cn("w-4 h-4", isHovered && "mr-2")} />
            {isHovered && <span>Edit</span>}
          </Button>

            {/* Settings Item */}
        {settingsItem && (
          <div className="mb-4">
            <Link
              to={settingsItem.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group relative",
                location.pathname === settingsItem.href
                  ? "text-sidebar-primary-foreground hover:bg-white/10"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
                isHovered ? "justify-start" : "justify-center",
              )}
              title={!isHovered ? settingsItem.name : ""}
            >
               <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-5 h-5 flex-shrink-0 sidebar-icon-color fill-current", isHovered && "mr-3")}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.983 13.94a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92Zm9.164-1.96a7.208 7.208 0 0 1-.12 1.29l2.012 1.574a.48.48 0 0 1 .11.61l-1.9 3.29a.48.48 0 0 1-.58.22l-2.368-.952a7.354 7.354 0 0 1-1.1.65l-.358 2.49a.48.48 0 0 1-.474.4h-3.8a.48.48 0 0 1-.474-.4l-.358-2.49a7.316 7.316 0 0 1-1.1-.65l-2.367.952a.48.48 0 0 1-.58-.22l-1.9-3.29a.48.48 0 0 1 .11-.61l2.012-1.574a7.208 7.208 0 0 1 0-2.58l-2.012-1.574a.48.48 0 0 1-.11-.61l1.9-3.29a.48.48 0 0 1 .58-.22l2.367.952c.35-.26.72-.48 1.1-.65l.358-2.49a.48.48 0 0 1 .474-.4h3.8c.24 0 .442.17.474.4l.358 2.49c.38.17.75.39 1.1.65l2.368-.952a.48.48 0 0 1 .58.22l1.9 3.29a.48.48 0 0 1-.11.61l-2.013 1.574c.08.42.12.85.12 1.29Zm-2.4 0a4.76 4.76 0 1 0-9.52 0 4.76 4.76 0 0 0 9.52 0Z"
          clipRule="evenodd"
        />
      </svg>

      {isHovered && (
        <span className="whitespace-nowrap overflow-hidden">
          {settingsItem.name}
        </span>
      )}
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 flex flex-col gap-2">
          <Button style={{ color:'red'}}
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full transition-all group relative text-red hover:text-white hover:bg-white/10",
              isHovered ? "justify-start" : "justify-center px-2",
            )}
            title={!isHovered ? "Sign Out" : ""}
          >
            <LogOut className={cn("w-4 h-4 sidebar-icon-color", isHovered && "mr-2")} />
            {isHovered && <span className="text-white">Sign Out</span>}

            {/* Tooltip for collapsed state */}
            {!isHovered && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                Sign Out
              </div>
            )}
          </Button>
          {/* Edit Mode Toggle Button */}
          
        </div>

      
      </div>

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
                <Bell className="w-4 h-4 sidebar-icon-color" />
              </Button>
            </>
          )}
        </div>

    </div>
  );
}
