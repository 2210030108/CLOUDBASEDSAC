import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
// Import other page components as needed

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "courses",
        element: <Courses />
      },
      {
        path: "students",
        element: <Students />
      },
      {
        path: "calendar",
        element: <Calendar />
      },
      {
        path: "messages",
        element: <Messages />
      }
      // Add other routes for remaining pages
    ]
  }
]);

export default router;