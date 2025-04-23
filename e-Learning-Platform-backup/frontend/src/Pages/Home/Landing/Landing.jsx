/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Material UI imports
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Container, 
  Grid, 
  Box, 
  IconButton, 
  Chip, 
  Alert, 
  Snackbar,
  CircularProgress,
  Divider
} from "@mui/material";

// Material UI Icons
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import BusinessIcon from "@mui/icons-material/Business";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Components
import Header from "../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx";
import About from "../About/About.jsx";
import Contact from "../Contact/Contact.jsx";
import Courses from "../Courses/Courses.jsx";

// Import classroom image
import ClassroomImg from "../../Images/Classroom.svg";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        sx={{ 
          background: 'white',
          borderRadius: "1.5rem",
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          minHeight: "300px"
        }}
      >
        <CardContent className="flex flex-col items-center text-center p-8">
          <Avatar 
            sx={{ 
              bgcolor: "rgba(99,102,241,0.1)", 
              width: 80, 
              height: 80,
              mb: 3
            }}
          >
            {icon}
          </Avatar>
          <Typography 
            variant="h5" 
            component="h3" 
            className="mb-4 font-bold text-gray-800"
          >
            {title}
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600"
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MentorCard = ({ name, university, degree, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-hidden h-full" sx={{ borderRadius: "1.5rem" }}>
        <Box className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden"
          >
            <Avatar 
              src={image} 
              alt={name}
              sx={{ 
                width: 120, 
                height: 120, 
                margin: "0 auto",
                mt: 4,
                mb: 2,
                border: "4px solid white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            />
          </motion.div>
          <Box className="text-center mb-4">
            <Typography variant="h6" className="font-bold text-indigo-800">
              {name}
            </Typography>
            <Typography variant="body2" className="text-indigo-600">
              {degree}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <div className="flex items-center mb-2">
            <PersonIcon className="mr-2" />
            <Typography variant="body1" className="text-indigo-100">
              Expert in Advanced Mathematics
            </Typography>
          </div>
          <div className="flex items-center mb-2">
            <BusinessIcon className="mr-2" />
            <Typography variant="body2" className="text-indigo-100">
              {university}
            </Typography>
          </div>
          <div className="flex items-center justify-between">
            <Box className="flex items-center">
              <SchoolIcon className="mr-2" />
              <Typography variant="body2" className="text-indigo-100">
                10+ Years Experience
              </Typography>
            </Box>
            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              <FavoriteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function Landing() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [subject, setSubject] = useState("");
  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  
  // const navigate = useNavigate();

  // Use effect to load popular teachers on mount
  useEffect(() => {
    const fetchPopularSubjects = async () => {
      try {
        setLoading(true);
        // You would normally fetch from API, using a default popular subject
        await teachersList("mathematics");
      } catch (error) {
        console.error("Error fetching popular teachers:", error);
        showAlert("Could not load popular teachers", "error");
      }
    };

    fetchPopularSubjects();
  }, []);

  const handleSearch = () => {
    if (!subject.trim()) {
      showAlert("Please enter a subject to search", "warning");
      return;
    }
    teachersList(subject);
    showAlert(`Searching for ${subject} teachers`, "info");
  };

  const showAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const teachersList = async (sub) => {
    try {
      setLoading(true);
      showAlert(`Finding experts in ${sub}...`, "info");
      
      // Simulate API call with delay
      setTimeout(async () => {
        try {
          const response = await fetch(`/api/course/${sub}`, {
            method: 'GET',
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch teachers");
          }
  
          const data = await response.json();
          setFacList(data.data || []);
          setLoading(false);
          showAlert(`Found ${data.data?.length || 0} experts in ${sub}`, "success");
        } catch (error) {
          console.error("Error fetching teachers:", error);
          
          // Fallback data in case API fails
          const fallbackData = [
            {
              name: "Dr. Anand Mishra",
              university: "National Institute of Education",
              degree: "Ph.D. in Mathematics",
              image: "https://media.istockphoto.com/id/1324558913/photo/confident-young-man-in-casual-green-shirt-looking-away-standing-with-crossed-arms-isolated-on.jpg?s=612x612&w=0&k=20&c=NOrKRrUuxvePKijL9sFBHlDwHESv7Van68-hoS-_4hQ="
            },
            {
              name: "Prof. Dina Sharma", 
              university: "Central University",
              degree: "Ph.D. in Physics",
              image: "https://media.istockphoto.com/id/1310210662/photo/portrait-of-indian-woman-as-a-teacher-in-sari-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=EMI42nCFpak1c4JSFvwfN0Qllyxt19dlihYEXAdnCXY="
            }
          ];
          
          setFacList(fallbackData);
          setLoading(false);
          showAlert("Using sample data - couldn't connect to server", "warning");
        }
      }, 1500);
      
    } catch (error) {
      console.error("Error in teacher list function:", error);
      setLoading(false);
      showAlert("An unexpected error occurred", "error");
    }
  };

  const handleRefresh = () => {
    if (subject) {
      teachersList(subject);
    } else {
      teachersList("mathematics");
    }
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className=" p-10 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} className="py-16 items-center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Typography variant="h2" className="mb-6 font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200">
                    Transform Your Learning Journey
                  </span>
                </Typography>
                <Typography variant="h4" className="mb-8 text-indigo-100">
                  Your Gateway to Excellence with{" "}
                  <span className="font-semibold text-amber-300 font-serif">
                    Adhyayan Kendra
                  </span>
                </Typography>
                
                {/* Search Bar */}
                <Box className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 mb-8">
                  <SearchIcon className="ml-4 text-amber-300" />
                  <TextField
                    variant="standard"
                    placeholder="Search for subjects or courses..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    className="flex-grow mx-2"
                    sx={{ 
                      input: { color: 'white', paddingLeft: '0.5rem' }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    className="px-6 py-2 rounded-full"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      background: 'linear-gradient(90deg, #f472b6, #ec4899)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #db2777, #be185d)'
                      },
                      borderRadius: '9999px'
                    }}
                  >
                    Find Expert
                  </Button>
                </Box>
                
                {/* Stats */}
                <Box className="flex justify-between">
                  <Box className="text-center">
                    <Typography variant="h4" className="font-bold text-amber-300">
                      10,000+
                    </Typography>
                    <Typography variant="body1" className="text-indigo-100">
                      Active Learners
                    </Typography>
                  </Box>
                  <Box className="text-center">
                    <Typography variant="h4" className="font-bold text-amber-300">
                      500+
                    </Typography>
                    <Typography variant="body1" className="text-indigo-100">
                      Expert Mentors
                    </Typography>
                  </Box>
                  <Box className="text-center">
                    <Typography variant="h4" className="font-bold text-amber-300">
                      100+
                    </Typography>
                    <Typography variant="body1" className="text-indigo-100">
                      Premium Courses
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex justify-center"
              >
                <img 
                  src={ClassroomImg} 
                  alt="Virtual Classroom" 
                  className="max-w-full  filter drop-shadow-2xl h-36 w-36"
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
      
      {/* Features Section */}
      <Box className="py-16 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
        <Container maxWidth="xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography 
              variant="h3" 
              component="h2" 
              className="mb-4 font-bold"
              sx={{
                background: "-webkit-linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 10px 20px rgba(99,102,241,0.15)"
              }}
            >
              Why Choose Adhyayan Kendra
            </Typography>
            <Typography 
              variant="subtitle1" 
              className="text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              Experience the revolution in online education with our unique features
            </Typography>
            <Box className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto rounded-full shadow-lg"></Box>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background decorative elements */}
            <Box 
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl"
              sx={{ transform: 'skew(-12deg)' }}
            />
            
            <Grid 
              container 
              spacing={4}
              className="relative z-10"
              sx={{
                overflowX: 'auto',
                flexWrap: 'nowrap',
                pb: 4,
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(99,102,241,0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  borderRadius: '4px',
                }
              }}
            >
              <Grid item xs={12} md={4} sx={{ minWidth: '350px' }}>
                <FeatureCard
                  icon={<PersonIcon sx={{ fontSize: 40, color: '#6366f1' }} />}
                  title="Expert Mentors"
                  description="Learn from India's top educators with decades of experience in their fields. Our mentors are passionate about helping you succeed."
                />
              </Grid>
              <Grid item xs={12} md={4} sx={{ minWidth: '350px' }}>
                <FeatureCard
                  icon={<MenuBookIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />}
                  title="Interactive Live Classes"
                  description="Experience immersive learning with high-definition video, real-time doubt solving, and interactive quizzes that make learning enjoyable."
                />
              </Grid>
              <Grid item xs={12} md={4} sx={{ minWidth: '350px' }}>
                <FeatureCard
                  icon={<SupportAgentIcon sx={{ fontSize: 40, color: '#d946ef' }} />}
                  title="24/7 Learning Support"
                  description="Our dedicated support team is available around the clock to assist with any questions or technical issues you may encounter."
                />
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Courses Section - Modified */}
      <Box className="py-16 bg-white">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h2" className="text-center mb-2 font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Our Premium Courses
              </span>
            </Typography>
            <Typography variant="subtitle1" className="text-center text-gray-600 mb-6">
              Curated curriculum designed by India&apos;s top educators
            </Typography>
            <Box className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full mb-12"></Box>
            
            <Courses />
          </motion.div>
        </Container>
      </Box>
      
      {/* About Us Section */}
      <Box className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h2" className="text-center mb-2 font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                About Adhyayan Kendra
              </span>
            </Typography>
            <Typography variant="subtitle1" className="text-center text-gray-600 mb-6">
              Our journey towards revolutionizing education in India
            </Typography>
            <Box className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full mb-12"></Box>
            
            <About />
          </motion.div>
        </Container>
      </Box>
      
      {/* Contact Us Section */}
      <Box className="py-16 bg-white">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h2" className="text-center mb-2 font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Get In Touch
              </span>
            </Typography>
            <Typography variant="subtitle1" className="text-center text-gray-600 mb-6">
              Have questions? We&lsquo;re here to help you on your learning journey
            </Typography>
            <Box className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full mb-12"></Box>
            
            <Contact />
          </motion.div>
        </Container>
      </Box>
      
      {/* Footer */}
      <Footer />
      
      {/* Alert */}
      <Snackbar 
        open={alertOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alertSeverity} 
          sx={{ width: '100%', 
            background: alertSeverity === 'success' ? 'linear-gradient(to right, #4ade80, #22c55e)' : 
                       alertSeverity === 'error' ? 'linear-gradient(to right, #f87171, #ef4444)' :
                       alertSeverity === 'warning' ? 'linear-gradient(to right, #fbbf24, #f59e0b)' :
                       'linear-gradient(to right, #60a5fa, #3b82f6)'
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Landing;