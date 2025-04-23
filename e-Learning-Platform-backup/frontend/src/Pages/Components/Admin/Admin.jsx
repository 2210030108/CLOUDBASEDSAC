/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from '../../Images/logo.svg'
import Course from "./Course";
import axios from "axios";

const Admin = () => {
  const { data } = useParams();
  const navigator = useNavigate();


  const [StudentData, setStudentData] = useState([]);
  const [TeacherData, setTeacherData] = useState([]);
  const [adminID, setAdminID] = useState(null);
  const [error, setErrors] = useState("");
  const [allmsg, setAllMsg] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(()=>{
    const getAllMsg = async () => {
      try {
        const response = await fetch(`/api/admin/messages/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setAllMsg(data.data)

      } catch (err) {
        console.log(err.message);
      }
    };
    getAllMsg();
  },[])

  const Approval = async(ID, type, approve)=>{
    try {
      const data = {
        Isapproved : approve
      }

      const response = await fetch(`/api/admin/${adminID}/approve/${type}/${ID}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

   
      if(type == "student"){
        setStudentData(pre => pre.filter((pre) => pre._id !== ID));

      }else if(type == "teacher"){
        setTeacherData(pre => pre.filter((pre) => pre._id !== ID));

      }

    } catch (error) {
      setErrors(error.message);
    }
  }

  const docDetails = async (type, ID) =>{
    navigator(`/VarifyDoc/${type}/${adminID}/${ID}`);
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/admin/${data}/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        } else {
          const result = await response.json();
         
          setStudentData(result.data.studentsforApproval);
          setTeacherData(result.data.teachersforApproval);
          setAdminID(result.data.admin._id);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);



  









  return (
    <div className="h-[100vh]">
      {/* Navbar */}
      <nav className="h-16 sm:h-20 md:h-24 lg:h-24  w-full bg-[#042439] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <NavLink to='/'>
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-14 sm:h-12 md:h-14 lg:h-16 xl:h-18"
          />
          <h1 className="text-2xl text-[#4E84C1] font-bold">
            Shiksharthee
          </h1>
        </div>
        </NavLink>
        <div className="flex items-center">
          <div className="relative mr-4">
            <IoIosNotificationsOutline className="h-8 w-8 text-white" />
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </div>
          <button onClick={() => navigator('/')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="p-4 sm:p-8 md:p-12 lg:p-10">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-2xl border-b-2 font-semibold text-white border-white">
          All New Request
        </h1>

        <div onClick={()=> setOpen(prev => !prev)} className=" absolute right-10 top-[6.5rem] text-center cursor-pointer">
            <h4 className="text-white bg-green-800 p-4 w-32">Messages</h4>
        </div>
        
        <div onClick={()=>navigator(`/admin/course/${data}`)} className=" absolute right-52 top-[6.5rem] text-center cursor-pointer">
            <h4 className="text-white bg-blue-800 p-4 w-44">Course Requests</h4>
        </div>

        {open && (
          <div className="mt-3 w-[30rem] absolute right-10 bg-gray-700 text-gray-100 p-5">
            {allmsg.map((msg,index) => (
              <div key={index} className="bg-gray-600 mb-5 rounded-sm p-2">
                <p className="text-black">Name : <span className="text-white">{msg.name}</span></p>
                <p className=" text-light-blue-600"><span className="text-black">Email : </span>{msg.email}</p>
                <p><span className="text-black">Message : </span>{msg.message}</p>
              </div>
            ))}

          </div>
        )}
</div>
       
      
      <div className="flex items-start justify-center gap-20">
        <div className="rounded-md">
          <h4 className="text-white bg-blue-gray-900 p-4 w-40">Student Request</h4>
          {
            StudentData.length > 0 ? StudentData.map((student) => (
              student.Isapproved === "pending" && (
                <div
                  key={student._id}
                  onClick={() => docDetails("student", student._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {student.Firstname + " " + student.Lastname}
                  </h1>
                  <p>Status: <span>{student.Isapproved}</span></p>
                </div>
              )
            )) : null
          }
        </div>

        <div className="rounded-md">
        <h4 className="text-white bg-blue-gray-900 p-4 w-40">Teacher Request</h4>
        {
            TeacherData.length > 0 ? TeacherData.map((teacher) => (
              teacher.Isapproved === "pending" && (
                <div
                  key={teacher._id}
                  onClick={() => docDetails("teacher", teacher._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {teacher.Firstname + " " + teacher.Lastname}
                  </h1>
                  <p>Status: <span>{teacher.Isapproved}</span></p>
                </div>
              )
            )) : null
          }
        </div>
        
        <div className="rounded-md">
        <h4 className="text-white bg-red-500 p-4 w-40">Rejected Request</h4>
          {
            TeacherData.length > 0 ? TeacherData.map((teacher) => (
              teacher.Isapproved === "rejected" && (
                <div
                  key={teacher._id}
                  onClick={() => docDetails("teacher", teacher._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {teacher.Firstname + " " + teacher.Lastname}
                  </h1>
                  <p>Msg: <span>{teacher.Remarks}</span></p>
                </div>
              )
            )) : null
          }
          {
            StudentData.length > 0 ? StudentData.map((student) => (
              student.Isapproved === "rejected" && (
                <div
                  key={student._id}
                  onClick={() => docDetails("student", student._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {student.Firstname + " " + student.Lastname}
                  </h1>
                  <p>Msg: <span>{student.Remarks}</span></p>
                </div>
              )
            )) : null
          }
        </div>
        
      </div>

    </div>
  );
};

export default Admin;
// import  { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { 
//   NotificationsOutlined, 
//   LogoutOutlined,
//   Dashboard, 
//   Person, 
//   School,
//   Email,
//   Settings,
//   Analytics,
//   CreditCard,
//   Feedback,
//   // ExpandMore,
//   Check,
//   Close,
//   ChevronRight,
//   Search
// } from "@mui/icons-material";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { 
//   Avatar,
//   Badge,
//   Button,
//   // Card,
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Drawer,
//   IconButton,
//   LinearProgress,
//   Menu,
//   MenuItem,
//   Paper,
//   Snackbar,
//   Tab,
//   Tabs,
//   Tooltip,
//   Alert
// } from "@mui/material";

// // Assume logo is imported or use an emoji as placeholder
// const logoPlaceholder = "🎓";

// const Admin = () => {
//   const { data } = useParams();
//   const navigate = useNavigate();

//   // State management
//   const [studentData, setStudentData] = useState([]);
//   const [teacherData, setTeacherData] = useState([]);
//   const [adminID, setAdminID] = useState(null);
//   const [error, setError] = useState("");
//   const [allMessages, setAllMessages] = useState([]);
//   const [isMessagesOpen, setIsMessagesOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState(0);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success"
//   });
//   const [confirmDialog, setConfirmDialog] = useState({
//     open: false,
//     title: "",
//     message: "",
//     onConfirm: null
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Navigation items for sidebar
//   const navItems = [
//     { icon: <Dashboard />, label: "Dashboard", path: `/admin/dashboard/${data}` },
//     { icon: <Person />, label: "User Management", path: `/admin/users/${data}` },
//     { icon: <School />, label: "Course Management", path: `/admin/course/${data}` },
//     { icon: <CreditCard />, label: "Payments", path: `/admin/payments/${data}` },
//     { icon: <Analytics />, label: "Analytics", path: `/admin/analytics/${data}` },
//     { icon: <Email />, label: "Communication", path: `/admin/communication/${data}` },
//     { icon: <Feedback />, label: "Feedback", path: `/admin/feedback/${data}` },
//     { icon: <Settings />, label: "Settings", path: `/admin/settings/${data}` }
//   ];

//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } }
//   };

//   const slideIn = {
//     hidden: { x: -100, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
//   };

//   const cardHover = {
//     rest: { scale: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
//     hover: { scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }
//   };
  
//   // Load messages
//   useEffect(() => {
//     const getAllMessages = async () => {
//       try {
//         const response = await fetch(`/api/admin/messages/all`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch messages");
//         }

//         const data = await response.json();
//         setAllMessages(data.data);
//       } catch (err) {
//         setError(err.message);
//         showSnackbar(err.message, "error");
//       }
//     };
//     getAllMessages();
//   }, []);

//   // Load admin data
//   useEffect(() => {
//     const getData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`/api/admin/${data}/approve`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
        
//         const result = await response.json();
//         setStudentData(result.data.studentsforApproval);
//         setTeacherData(result.data.teachersforApproval);
//         setAdminID(result.data.admin._id);
        
//       } catch (err) {
//         setError(err.message);
//         showSnackbar(err.message, "error");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [data]);

//   // Approval handler
//   const handleApproval = async (id, type, approve) => {
//     setConfirmDialog({
//       open: true,
//       title: `Confirm ${approve} Request`,
//       message: `Are you sure you want to ${approve} this ${type}?`,
//       onConfirm: async () => {
//         try {
//           setIsLoading(true);
//           const data = { Isapproved: approve };
          
//           const response = await fetch(`/api/admin/${adminID}/approve/${type}/${id}`, {
//             method: 'POST',
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           });

//           if (!response.ok) {
//             throw new Error(`Failed to ${approve} ${type}`);
//           }

//           // Update state based on response
//           if (type === "student") {
//             setStudentData(prev => prev.map(item => 
//               item._id === id ? {...item, Isapproved: approve} : item
//             ));
//           } else if (type === "teacher") {
//             setTeacherData(prev => prev.map(item => 
//               item._id === id ? {...item, Isapproved: approve} : item
//             ));
//           }

//           showSnackbar(`${type.charAt(0).toUpperCase() + type.slice(1)} ${approve} successfully`, "success");
//         } catch (err) {
//           setError(err.message);
//           showSnackbar(err.message, "error");
//         } finally {
//           setIsLoading(false);
//           setConfirmDialog({ ...confirmDialog, open: false });
//         }
//       }
//     });
//   };

//   // Navigate to document details
//   const viewDocDetails = (type, id) => {
//     navigate(`/VarifyDoc/${type}/${adminID}/${id}`);
//   };

//   // Show snackbar
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setConfirmDialog({
//       open: true,
//       title: "Confirm Logout",
//       message: "Are you sure you want to logout?",
//       onConfirm: () => {
//         navigate('/');
//         setConfirmDialog({ ...confirmDialog, open: false });
//       }
//     });
//   };

//   // Filter data based on search
//   const filteredStudents = studentData.filter(student => 
//     `${student.Firstname} ${student.Lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );
  
//   const filteredTeachers = teacherData.filter(teacher => 
//     `${teacher.Firstname} ${teacher.Lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Get pending counts
//   const pendingStudents = studentData.filter(s => s.Isapproved === "pending").length;
//   const pendingTeachers = teacherData.filter(t => t.Isapproved === "pending").length;
//   const rejectedUsers = [
//     ...studentData.filter(s => s.Isapproved === "rejected"),
//     ...teacherData.filter(t => t.Isapproved === "rejected")
//   ].length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
//       {/* Sidebar */}
//       <motion.div 
//         initial="hidden"
//         animate="visible"
//         variants={slideIn}
//         className={`fixed top-0 left-0 h-full bg-slate-800 text-white z-20 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}
//       >
//         <div className="flex items-center p-5 border-b border-slate-700">
//           <div className="flex items-center gap-3">
//             <motion.div 
//               className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold"
//               whileHover={{ rotate: 10, scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               {logoPlaceholder}
//             </motion.div>
//             {sidebarOpen && (
//               <motion.h1 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
//               >
//                 Shiksharthee
//               </motion.h1>
//             )}
//           </div>
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="ml-auto text-slate-400 hover:text-white"
//           >
//             <ChevronRight className={`transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
//           </button>
//         </div>
        
//         <div className="py-5">
//           {navItems.map((item, index) => (
//             <NavLink 
//               key={index}
//               to={item.path}
//               className={({ isActive }) => 
//                 `flex items-center py-3 px-5 transition-all duration-200 ${
//                   isActive 
//                     ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white' 
//                     : 'text-slate-300 hover:bg-slate-700'
//                 } ${!sidebarOpen && 'justify-center'}`
//               }
//             >
//               <motion.div 
//                 whileHover={{ scale: 1.1 }} 
//                 className="text-xl"
//               >
//                 {item.icon}
//               </motion.div>
              
//               {sidebarOpen && (
//                 <span className="ml-3 font-medium">
//                   {item.label}
//                 </span>
//               )}
//             </NavLink>
//           ))}
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
//         {/* Navbar */}
//         <motion.nav 
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           className="bg-slate-800 shadow-lg p-4 flex justify-between items-center sticky top-0 z-10"
//         >
//           <div className="flex items-center">
//             <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
//               />
//               <Search className="absolute right-3 top-2 text-slate-400" />
//             </div>
            
//             <Tooltip title="Messages">
//               <IconButton 
//                 onClick={() => setIsMessagesOpen(!isMessagesOpen)}
//                 className="text-white relative"
//               >
//                 <Badge badgeContent={allMessages.length} color="error">
//                   <Email className="text-slate-200" />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
            
//             <Tooltip title="Notifications">
//               <IconButton 
//                 onClick={(e) => setNotificationAnchor(e.currentTarget)}
//                 className="text-white"
//               >
//                 <Badge badgeContent={pendingStudents + pendingTeachers} color="error">
//                   <NotificationsOutlined className="text-slate-200" />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
            
//             <Menu
//               anchorEl={notificationAnchor}
//               open={Boolean(notificationAnchor)}
//               onClose={() => setNotificationAnchor(null)}
//               PaperProps={{
//                 className: "bg-slate-800 text-white mt-2"
//               }}
//             >
//               <div className="p-2">
//                 <h3 className="font-medium text-blue-400 border-b border-slate-700 pb-2">Notifications</h3>
//                 {pendingStudents > 0 && (
//                   <MenuItem onClick={() => setNotificationAnchor(null)}>
//                     {pendingStudents} student request{pendingStudents > 1 ? 's' : ''} pending
//                   </MenuItem>
//                 )}
//                 {pendingTeachers > 0 && (
//                   <MenuItem onClick={() => setNotificationAnchor(null)}>
//                     {pendingTeachers} teacher request{pendingTeachers > 1 ? 's' : ''} pending
//                   </MenuItem>
//                 )}
//                 {pendingStudents === 0 && pendingTeachers === 0 && (
//                   <MenuItem disabled>No new notifications</MenuItem>
//                 )}
//               </div>
//             </Menu>
            
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Button
//                 variant="contained"
//                 startIcon={<LogoutOutlined />}
//                 onClick={handleLogout}
//                 className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
//               >
//                 Logout
//               </Button>
//             </motion.div>
//           </div>
//         </motion.nav>

//         {/* Main Section */}
//         <div className="p-6">
//           {isLoading && <LinearProgress color="primary" className="mb-4" />}
          
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={fadeIn}
//             className="mb-6"
//           >
//             <h1 className="text-3xl font-bold text-white mb-2">Request Management</h1>
//             <p className="text-slate-300">Manage and approve user registration requests</p>
//           </motion.div>
          
//           {/* Dashboard Stats */}
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={fadeIn}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
//           >
//             <motion.div 
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-blue-100">Pending Students</p>
//                   <h3 className="text-3xl font-bold text-white">{pendingStudents}</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                   <School className="text-white" />
//                 </div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-purple-100">Pending Teachers</p>
//                   <h3 className="text-3xl font-bold text-white">{pendingTeachers}</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
//                   <Person className="text-white" />
//                 </div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-red-100">Rejected Requests</p>
//                   <h3 className="text-3xl font-bold text-white">{rejectedUsers}</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
//                   <Close className="text-white" />
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
          
//           {/* Tabs for request types */}
//           <Paper elevation={0} className="bg-slate-800 mb-6 rounded-xl overflow-hidden">
//             <Tabs 
//               value={activeTab} 
//               onChange={(_, newValue) => setActiveTab(newValue)}
//               variant="fullWidth"
//               textColor="inherit"
//               className="bg-slate-700 text-white"
//               TabIndicatorProps={{ className: "bg-blue-500" }}
//             >
//               <Tab label="Student Requests" icon={<School />} iconPosition="start" />
//               <Tab label="Teacher Requests" icon={<Person />} iconPosition="start" />
//               <Tab label="Rejected Requests" icon={<Close />} iconPosition="start" />
//             </Tabs>
//           </Paper>
          
//           {/* Tab Panels */}
//           <div className="mb-8">
//             {/* Student Requests */}
//             {activeTab === 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {filteredStudents.length > 0 ? (
//                   filteredStudents
//                     .filter(student => student.Isapproved === "pending")
//                     .map((student) => (
//                       <motion.div
//                         key={student._id}
//                         whileHover="hover"
//                         initial="rest"
//                         variants={cardHover}
//                         className="bg-slate-700 rounded-xl overflow-hidden shadow-lg"
//                       >
//                         <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800">
//                           <div className="flex items-center gap-4">
//                             <Avatar className="bg-blue-300 text-blue-800">
//                               {student.Firstname[0]}{student.Lastname[0]}
//                             </Avatar>
//                             <div>
//                               <h3 className="text-xl font-semibold text-white">{student.Firstname} {student.Lastname}</h3>
//                               <Chip size="small" label="Student" className="bg-blue-500 text-white" />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="p-4">
//                           <div className="flex items-center justify-between mb-3">
//                             <p className="text-slate-300">Status:</p>
//                             <Chip 
//                               label={student.Isapproved} 
//                               color={student.Isapproved === "pending" ? "warning" : "success"}
//                               size="small"
//                             />
//                           </div>
                          
//                           <div className="flex items-center justify-between mb-3">
//                             <p className="text-slate-300">Email:</p>
//                             <p className="text-white">{student.Email || "N/A"}</p>
//                           </div>
                          
//                           <div className="flex gap-2 mt-4">
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               fullWidth
//                               startIcon={<Check />}
//                               onClick={() => handleApproval(student._id, "student", "approved")}
//                               className="bg-gradient-to-r from-green-500 to-green-700"
//                             >
//                               Approve
//                             </Button>
                            
//                             <Button
//                               variant="contained"
//                               color="error"
//                               fullWidth
//                               startIcon={<Close />}
//                               onClick={() => handleApproval(student._id, "student", "rejected")}
//                               className="bg-gradient-to-r from-red-500 to-red-700"
//                             >
//                               Reject
//                             </Button>
//                           </div>
                          
//                           <Button
//                             variant="outlined"
//                             fullWidth
//                             onClick={() => viewDocDetails("student", student._id)}
//                             className="mt-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:bg-opacity-10"
//                           >
//                             View Documents
//                           </Button>
//                         </div>
//                       </motion.div>
//                     ))
//                 ) : (
//                   <div className="col-span-3 text-center py-8">
//                     <p className="text-slate-400 text-lg">No pending student requests found</p>
//                   </div>
//                 )}
//               </motion.div>
//             )}
            
//             {/* Teacher Requests */}
//             {activeTab === 1 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {filteredTeachers.length > 0 ? (
//                   filteredTeachers
//                     .filter(teacher => teacher.Isapproved === "pending")
//                     .map((teacher) => (
//                       <motion.div
//                         key={teacher._id}
//                         whileHover="hover"
//                         initial="rest"
//                         variants={cardHover}
//                         className="bg-slate-700 rounded-xl overflow-hidden shadow-lg"
//                       >
//                         <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-800">
//                           <div className="flex items-center gap-4">
//                             <Avatar className="bg-purple-300 text-purple-800">
//                               {teacher.Firstname[0]}{teacher.Lastname[0]}
//                             </Avatar>
//                             <div>
//                               <h3 className="text-xl font-semibold text-white">{teacher.Firstname} {teacher.Lastname}</h3>
//                               <Chip size="small" label="Teacher" className="bg-purple-500 text-white" />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="p-4">
//                           <div className="flex items-center justify-between mb-3">
//                             <p className="text-slate-300">Status:</p>
//                             <Chip 
//                               label={teacher.Isapproved} 
//                               color={teacher.Isapproved === "pending" ? "warning" : "success"}
//                               size="small"
//                             />
//                           </div>
                          
//                           <div className="flex items-center justify-between mb-3">
//                             <p className="text-slate-300">Email:</p>
//                             <p className="text-white">{teacher.Email || "N/A"}</p>
//                           </div>
                          
//                           <div className="flex items-center justify-between mb-3">
//                             <p className="text-slate-300">Experience:</p>
//                             <p className="text-white">{teacher.Experience || "N/A"} years</p>
//                           </div>
                          
//                           <div className="flex gap-2 mt-4">
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               fullWidth
//                               startIcon={<Check />}
//                               onClick={() => handleApproval(teacher._id, "teacher", "approved")}
//                               className="bg-gradient-to-r from-green-500 to-green-700"
//                             >
//                               Approve
//                             </Button>
                            
//                             <Button
//                               variant="contained"
//                               color="error"
//                               fullWidth
//                               startIcon={<Close />}
//                               onClick={() => handleApproval(teacher._id, "teacher", "rejected")}
//                               className="bg-gradient-to-r from-red-500 to-red-700"
//                             >
//                               Reject
//                             </Button>
//                           </div>
                          
//                           <Button
//                             variant="outlined"
//                             fullWidth
//                             onClick={() => viewDocDetails("teacher", teacher._id)}
//                             className="mt-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:bg-opacity-10"
//                           >
//                             View Documents
//                           </Button>
//                         </div>
//                       </motion.div>
//                     ))
//                 ) : (
//                   <div className="col-span-3 text-center py-8">
//                     <p className="text-slate-400 text-lg">No pending teacher requests found</p>
//                   </div>
//                 )}
//               </motion.div>
//             )}
            
//             {/* Rejected Requests */}
//             {activeTab === 2 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {/* Students */}
//                 {filteredStudents
//                   .filter(student => student.Isapproved === "rejected")
//                   .map((student) => (
//                     <motion.div
//                       key={student._id}
//                       whileHover="hover"
//                       initial="rest"
//                       variants={cardHover}
//                       className="bg-slate-700 rounded-xl overflow-hidden shadow-lg"
//                     >
//                       <div className="p-4 bg-gradient-to-r from-red-600 to-red-800">
//                         <div className="flex items-center gap-4">
//                           <Avatar className="bg-red-300 text-red-800">
//                             {student.Firstname[0]}{student.Lastname[0]}
//                           </Avatar>
//                           <div>
//                             <h3 className="text-xl font-semibold text-white">{student.Firstname} {student.Lastname}</h3>
//                             <Chip size="small" label="Student" className="bg-blue-500 text-white" />
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="p-4">
//                         <div className="flex items-center justify-between mb-3">
//                           <p className="text-slate-300">Status:</p>
//                           <Chip label="Rejected" color="error" size="small" />
//                         </div>
                        
//                         <div className="flex items-center justify-between mb-3">
//                           <p className="text-slate-300">Email:</p>
//                           <p className="text-white">{student.Email || "N/A"}</p>
//                         </div>
                        
//                         <div className="mb-3">
//                           <p className="text-slate-300 mb-1">Rejection Reason:</p>
//                           <p className="text-white bg-slate-800 p-2 rounded">{student.Remarks || "No reason provided"}</p>
//                         </div>
                        
//                         <Button
//                           variant="outlined"
//                           fullWidth
//                           onClick={() => viewDocDetails("student", student._id)}
//                           className="mt-2 border-slate-500 text-slate-300 hover:bg-slate-500 hover:bg-opacity-10"
//                         >
//                           View Documents
//                         </Button>
//                       </div>
//                     </motion.div>
//                   ))}
                
//                 {/* Teachers */}
//                 {filteredTeachers
//                   .filter(teacher => teacher.Isapproved === "rejected")
//                   .map((teacher) => (
//                     <motion.div
//                       key={teacher._id}
//                       whileHover="hover"
//                       initial="rest"
//                       variants={cardHover}
//                       className="bg-slate-700 rounded-xl overflow-hidden shadow-lg"
//                     >
//                       <div className="p-4 bg-gradient-to-r from-red-600 to-red-800">
//                         <div className="flex items-center gap-4">
//                           <Avatar className="bg-red-300 text-red-800">
//                             {teacher.Firstname[0]}{teacher.Lastname[0]}
//                           </Avatar>
//                           <div>
//                             <h3 className="text-xl font-semibold text-white">{teacher.Firstname} {teacher.Lastname}</h3>
//                             <Chip size="small" label="Teacher" className="bg-purple-500 text-white" />
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="p-4">
//                         <div className="flex items-center justify-between mb-3">
//                           <p className="text-slate-300">Status:</p>
//                           <Chip label="Rejected" color="error" size="small" />
//                         </div>
                        
//                         <div className="flex items-center justify-between mb-3">
//                           <p className="text-slate-300">Email:</p>
//                           <p className="text-white">{teacher.Email || "N/A"}</p>
//                         </div>
                        
//                         <div className="mb-3">
//                           <p className="text-slate-300 mb-1">Rejection Reason:</p>
//                           <p className="text-white bg-slate-800 p-2 rounded">{teacher.Remarks || "No reason provided"}</p>
//                         </div>
                        
//                         <Button
//                           variant="outlined"
//                           fullWidth
//                           onClick={() => viewDocDetails("teacher", teacher._id)}
//                           className="mt-2 border-slate-500 text-slate-300 hover:bg-slate-500 hover:bg-opacity-10"
//                         >
//                           View Documents
//                         </Button>
//                       </div>
//                     </motion.div>
//                   ))}
                  
//                 {filteredStudents.filter(s => s.Isapproved === "rejected").length === 0 && 
//                  filteredTeachers.filter(t => t.Isapproved === "rejected").length === 0 && (
//                   <div className="col-span-3 text-center py-8">
//                     <p className="text-slate-400 text-lg">No rejected requests found</p>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Messages Drawer */}
//       <Drawer
//         anchor="right"
//         open={isMessagesOpen}
//         onClose={() => setIsMessagesOpen(false)}
//         PaperProps={{
//           className: "w-full sm:w-96 bg-slate-800 text-white"
//         }}
//       >
//         <div className="p-4">
//           <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
//             <h3 className="text-xl font-semibold text-blue-400">Messages</h3>
//             <IconButton onClick={() => setIsMessagesOpen(false)} className="text-white">
//               <Close />
//             </IconButton>
//           </div>
          
//           <div className="space-y-4 overflow-auto max-h-[calc(100vh-100px)]">
//             {allMessages && allMessages.length > 0 ? (
//               allMessages.map((msg, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="bg-slate-700 rounded-lg p-4 shadow-md"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h4 className="font-medium text-white">{msg.name}</h4>
//                     <Chip
//                       label="New"
//                       size="small"
//                       color="primary"
//                       className="bg-blue-600"
//                     />
//                   </div>
//                   <p className="text-blue-300 text-sm mb-2">{msg.email}</p>
//                   <p className="text-slate-300 border-t border-slate-600 pt-2 mt-2">{msg.message}</p>
//                   <div className="flex gap-2 mt-3">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       className="border-green-500 text-green-500 hover:bg-green-500 hover:bg-opacity-10"
//                     >
//                       Reply
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       className="border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10"
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-slate-400">No messages found</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </Drawer>
      
//       {/* Confirmation Dialog */}
//       <Dialog
//         open={confirmDialog.open}
//         onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
//         PaperProps={{
//           className: "bg-slate-800 text-white rounded-xl"
//         }}
//       >
//         <DialogTitle className="border-b border-slate-700">
//           {confirmDialog.title}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText className="text-slate-300 pt-4">
//             {confirmDialog.message}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions className="border-t border-slate-700">
//           <Button 
//             onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
//             className="text-slate-300"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={confirmDialog.onConfirm}
//             autoFocus
//             className="bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
      
//       {/* Snackbar Alerts */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={() => setSnackbar({ ...snackbar, open: false })} 
//           severity={snackbar.severity} 
//           variant="filled"
//           className="w-full"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
      
//       {/* Quick Action Buttons */}
//       <motion.div 
//         className="fixed bottom-6 right-6 z-30 flex flex-col space-y-2"
//         initial={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <Tooltip title="Go to Course Management">
//           <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <IconButton 
//               onClick={() => navigate(`/admin/course/${data}`)}
//               className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 p-3"
//             >
//               <School />
//             </IconButton>
//           </motion.div>
//         </Tooltip>
        
//         <Tooltip title="System Settings">
//           <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <IconButton 
//               onClick={() => navigate(`/admin/settings/${data}`)}
//               className="bg-purple-600 text-white shadow-lg hover:bg-purple-700 p-3"
//             >
//               <Settings />
//             </IconButton>
//           </motion.div>
//         </Tooltip>
//       </motion.div>
      
//       {/* Dashboard Features Section */}
//       <div className={`p-6 bg-slate-900 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="mb-8"
//         >
//           <h2 className="text-2xl font-bold text-white mb-4">Dashboard Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* User Management */}
//             <motion.div
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-blue-600 rounded-full p-3">
//                   <Person className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white">User Management</h3>
//               </div>
//               <ul className="list-disc list-inside text-slate-300 space-y-1">
//                 <li>View, edit, delete users</li>
//                 <li>Role-based permissions</li>
//                 <li>Approve/verify accounts</li>
//                 <li>Bulk user operations</li>
//               </ul>
//               <div className="mt-4">
//                 <Button 
//                   variant="contained" 
//                   fullWidth
//                   onClick={() => navigate(`/admin/users/${data}`)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Manage Users
//                 </Button>
//               </div>
//             </motion.div>
            
//             {/* Course Management */}
//             <motion.div
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-green-600 rounded-full p-3">
//                   <School className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white">Course Management</h3>
//               </div>
//               <ul className="list-disc list-inside text-slate-300 space-y-1">
//                 <li>Create/edit/delete courses</li>
//                 <li>Assign instructors</li>
//                 <li>Manage categories/tags</li>
//                 <li>Set pricing options</li>
//               </ul>
//               <div className="mt-4">
//                 <Button 
//                   variant="contained" 
//                   fullWidth
//                   onClick={() => navigate(`/admin/course/${data}`)}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Manage Courses
//                 </Button>
//               </div>
//             </motion.div>
            
//             {/* Revenue Management */}
//             <motion.div
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-yellow-600 rounded-full p-3">
//                   <CreditCard className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white">Revenue Management</h3>
//               </div>
//               <ul className="list-disc list-inside text-slate-300 space-y-1">
//                 <li>Track daily/weekly income</li>
//                 <li>View top-selling courses</li>
//                 <li>Manage subscriptions</li>
//                 <li>Handle coupon codes</li>
//               </ul>
//               <div className="mt-4">
//                 <Button 
//                   variant="contained" 
//                   fullWidth
//                   onClick={() => navigate(`/admin/payments/${data}`)}
//                   className="bg-yellow-600 hover:bg-yellow-700"
//                 >
//                   View Revenue
//                 </Button>
//               </div>
//             </motion.div>
            
//             {/* Analytics */}
//             <motion.div
//               whileHover="hover"
//               initial="rest"
//               variants={cardHover}
//               className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 shadow-lg"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-purple-600 rounded-full p-3">
//                   <Analytics className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white">Analytics & Reports</h3>
//               </div>
//               <ul className="list-disc list-inside text-slate-300 space-y-1">
//                 <li>User engagement metrics</li>
//                 <li>Course analytics</li>
//                 <li>Export detailed reports</li>
//                 <li>Performance insights</li>
//               </ul>
//               <div className="mt-4">
//                 <Button 
//                   variant="contained" 
//                   fullWidth
//                   onClick={() => navigate(`/admin/analytics/${data}`)}
//                   className="bg-purple-600 hover:bg-purple-700"
//                 >
//                   View Analytics
//                 </Button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Admin;