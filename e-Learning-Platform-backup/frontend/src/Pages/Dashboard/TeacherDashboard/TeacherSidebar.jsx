import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings,
  Home,
  User,
  Bell,
  Users,
  CheckSquare,
  BarChart4,
  Layout,
  PlusCircle,
  BellRing,
  GraduationCap,
  Award
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  variant: "default" | "ghost";
  active?: boolean;
  path: string;
}

interface SidebarProps {
  teacherName?: string;
  teacherAvatar?: string;
}

const TeacherSidebar = ({ teacherName = "Prof. Sarah Martin", teacherAvatar = "" }: SidebarProps) => {
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
      title: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
      variant: currentPath === "courses" ? "default" : "ghost",
      active: currentPath === "courses",
      path: "/courses"
    },
    {
      title: "Students",
      icon: <Users className="h-5 w-5" />,
      variant: currentPath === "students" ? "default" : "ghost",
      active: currentPath === "students",
      path: "/students"
    },
    {
      title: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      variant: currentPath === "calendar" ? "default" : "ghost",
      active: currentPath === "calendar",
      path: "/calendar"
    }
  ];
  
  // Course management items
  const courseItems: NavItem[] = [
    {
      title: "Content Library",
      icon: <Layout className="h-5 w-5" />,
      variant: currentPath === "content" ? "default" : "ghost",
      active: currentPath === "content",
      path: "/content"
    },
    {
      title: "Assignments",
      icon: <CheckSquare className="h-5 w-5" />,
      variant: currentPath === "assignments" ? "default" : "ghost",
      active: currentPath === "assignments",
      path: "/assignments"
    },
    {
      title: "Quizzes & Tests",
      icon: <FileText className="h-5 w-5" />,
      variant: currentPath === "quizzes" ? "default" : "ghost",
      active: currentPath === "quizzes",
      path: "/quizzes"
    },
    {
      title: "Certificates",
      icon: <Award className="h-5 w-5" />,
      variant: currentPath === "certificates" ? "default" : "ghost",
      active: currentPath === "certificates",
      path: "/certificates"
    }
  ];
  
  // Communication items
  const communicationItems: NavItem[] = [
    {
      title: "Announcements",
      icon: <BellRing className="h-5 w-5" />,
      variant: currentPath === "announcements" ? "default" : "ghost",
      active: currentPath === "announcements",
      path: "/announcements"
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      variant: currentPath === "messages" ? "default" : "ghost",
      active: currentPath === "messages",
      path: "/messages"
    }
  ];

  // Analytics & settings items
  const analyticsItems: NavItem[] = [
    {
      title: "Analytics",
      icon: <BarChart4 className="h-5 w-5" />,
      variant: currentPath === "analytics" ? "default" : "ghost",
      active: currentPath === "analytics",
      path: "/analytics"
    },
    {
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      variant: currentPath === "profile" ? "default" : "ghost",
      active: currentPath === "profile",
      path: "/profile"
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
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="ml-2 font-semibold text-sidebar-foreground">EduPortal</span>
          </div>
        </div>

        {/* Teacher profile summary */}
        <div className="mb-6 px-2">
          <div className="flex items-center space-x-3 px-2 py-3 rounded-lg bg-sidebar-accent/20">
            {teacherAvatar ? (
              <img 
                src={teacherAvatar} 
                alt={teacherName} 
                className="h-10 w-10 rounded-full border-2 border-purple-500"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
                {teacherName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{teacherName}</span>
              <span className="text-xs text-sidebar-foreground/70">Faculty ID: F8542</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4 px-2">
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={() => handleNavigation("/courses/create")}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
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
              Course Tools
            </h3>
            <div className="space-y-1">
              {courseItems.map((item) => (
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
              Communication
            </h3>
            <div className="space-y-1">
              {communicationItems.map((item) => (
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
              Admin
            </h3>
            <div className="space-y-1">
              {analyticsItems.map((item) => (
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
              <span>Active Courses</span>
              <span className="font-medium text-green-400">4</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>Total Students</span>
              <span>87</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>Pending Reviews</span>
              <span>12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;