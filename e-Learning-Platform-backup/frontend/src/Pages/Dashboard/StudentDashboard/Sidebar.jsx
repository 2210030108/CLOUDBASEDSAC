import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Award, 
  FileText, 
  Clock,
  Settings,
  Home,
  User,
  Bell,
  Bookmark,
  PenTool,
  GraduationCap,
  BarChart4
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  variant: "default" | "ghost";
  active?: boolean;
  path: string;
}

interface SidebarProps {
  studentName?: string;
  studentAvatar?: string;
}

const Sidebar = ({ studentName = "Alex Johnson", studentAvatar = "" }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || "dashboard";
  
  // Define main navigation items
  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      variant: currentPath === "dashboard" ? "default" : "ghost",
      active: currentPath === "dashboard",
      path: "/dashboard"
    },
    {
      title: "My Courses",
      icon: <BookOpen className="h-5 w-5" />,
      variant: currentPath === "courses" ? "default" : "ghost",
      active: currentPath === "courses",
      path: "/courses"
    },
    {
      title: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      variant: currentPath === "calendar" ? "default" : "ghost",
      active: currentPath === "calendar",
      path: "/calendar"
    },
    {
      title: "Grades",
      icon: <FileText className="h-5 w-5" />,
      variant: currentPath === "grades" ? "default" : "ghost",
      active: currentPath === "grades",
      path: "/grades"
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      variant: currentPath === "messages" ? "default" : "ghost",
      active: currentPath === "messages",
      path: "/messages"
    }
  ];
  
  // Learning tools navigation items
  const learningToolsItems: NavItem[] = [
    {
      title: "Study Timer",
      icon: <Clock className="h-5 w-5" />,
      variant: currentPath === "study-timer" ? "default" : "ghost",
      active: currentPath === "study-timer",
      path: "/study-timer"
    },
    {
      title: "Notes",
      icon: <PenTool className="h-5 w-5" />,
      variant: currentPath === "notes" ? "default" : "ghost",
      active: currentPath === "notes",
      path: "/notes"
    },
    {
      title: "Bookmarks",
      icon: <Bookmark className="h-5 w-5" />,
      variant: currentPath === "bookmarks" ? "default" : "ghost",
      active: currentPath === "bookmarks",
      path: "/bookmarks"
    }
  ];
  
  // Progress & achievements items
  const progressItems: NavItem[] = [
    {
      title: "Certificates",
      icon: <Award className="h-5 w-5" />,
      variant: currentPath === "certificates" ? "default" : "ghost",
      active: currentPath === "certificates",
      path: "/certificates"
    },
    {
      title: "Learning Analytics",
      icon: <BarChart4 className="h-5 w-5" />,
      variant: currentPath === "analytics" ? "default" : "ghost",
      active: currentPath === "analytics",
      path: "/analytics"
    }
  ];

  // Account settings items
  const accountItems: NavItem[] = [
    {
      title: "Profile Settings",
      icon: <User className="h-5 w-5" />,
      variant: currentPath === "profile" ? "default" : "ghost",
      active: currentPath === "profile",
      path: "/profile"
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      variant: currentPath === "notifications" ? "default" : "ghost",
      active: currentPath === "notifications",
      path: "/notifications"
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      variant: currentPath === "settings" ? "default" : "ghost",
      active: currentPath === "settings",
      path: "/settings"
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="group h-full flex flex-col bg-sidebar border-r">
      <div className="p-4 flex flex-col">
        <div className="h-12 mb-4 flex items-center justify-center">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="ml-2 font-semibold text-sidebar-foreground">EduPortal</span>
          </div>
        </div>

        {/* Student profile summary */}
        <div className="mb-6 px-2">
          <div className="flex items-center space-x-3 px-2 py-3 rounded-lg bg-sidebar-accent/20">
            {studentAvatar ? (
              <img 
                src={studentAvatar} 
                alt={studentName} 
                className="h-10 w-10 rounded-full border-2 border-blue-500"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {studentName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{studentName}</span>
              <span className="text-xs text-sidebar-foreground/70">Student ID: S12345</span>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 pb-4">
          <div className="px-2 space-y-1 mb-6">
            {/* Main navigation */}
            {mainNavItems.map((item) => (
              <Button
                key={item.title}
                variant={item.variant}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-6 px-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
              Learning Tools
            </h3>
            <div className="space-y-1">
              {learningToolsItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.variant}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 px-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
              Progress & Achievements
            </h3>
            <div className="space-y-1">
              {progressItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.variant}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 px-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
              Account
            </h3>
            <div className="space-y-1">
              {accountItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.variant}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="bg-sidebar-accent/50 rounded-lg p-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sidebar-foreground/80">Spring Semester 2025</span>
          </div>
          <div className="mt-2 text-sidebar-foreground/60">
            <div className="flex items-center justify-between text-xs">
              <span>Courses Active</span>
              <span className="font-medium text-green-400">5</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>Next Deadline</span>
              <span>Apr 12 - Assignment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;