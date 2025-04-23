import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-x-hidden">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b bg-background px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex items-center space-x-2">
              {/* Notification dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="font-medium">Assignment Graded</div>
                      <div className="text-sm text-muted-foreground">Your CS101 assignment has been graded: 92%</div>
                      <div className="text-xs text-muted-foreground mt-1">Today, 10:45 AM</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="font-medium">Class Reminder</div>
                      <div className="text-sm text-muted-foreground">MATH202 class starts in 30 minutes</div>
                      <div className="text-xs text-muted-foreground mt-1">Today, 1:30 PM</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="font-medium">Course Update</div>
                      <div className="text-sm text-muted-foreground">New materials uploaded to HIST105</div>
                      <div className="text-xs text-muted-foreground mt-1">Yesterday, 8:15 PM</div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-center font-medium cursor-pointer">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Alex Johnson</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        alex.johnson@email.edu
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help & Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;