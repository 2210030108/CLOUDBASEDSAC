import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Home/Header/Header";

// Material UI imports
import { 
  TextField, 
  Button, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Alert, 
  Typography, 
  Card, 
  CardContent,
  CircularProgress,
  Box
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AlertCircle, LockOpen, Mail, Star } from "lucide-react";
import PropTypes from "prop-types";

// Create a vibrant Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6d28d9', // Purple
    },
    secondary: {
      main: '#db2777', // Pink
    },
    error: {
      main: '#ef4444', // Red
    },
    background: {
      default: '#0f172a', // Dark slate
      paper: 'rgba(30, 41, 59, 0.5)', // Translucent slate
    },
    text: {
      primary: '#f8fafc', // Light slate
      secondary: '#cbd5e1', // Slate
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", sans-serif',
    h3: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 600,
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            '& fieldset': {
              borderColor: 'rgba(203, 213, 225, 0.3)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(203, 213, 225, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8b5cf6',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cbd5e1',
          },
          '& .MuiOutlinedInput-input': {
            color: '#f8fafc',
            padding: '16px 14px',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          '&.Mui-checked': {
            color: '#8b5cf6',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '9999px',
          padding: '12px 24px',
          fontSize: '1.125rem',
          fontWeight: 600,
        }
      }
    }
  }
});

// Custom animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-violet-800 to-fuchsia-900"></div>
      
      {/* Floating blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/30 to-teal-500/30 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Light streaks */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-64 h-2 rounded-full bg-pink-400/30 blur-md rotate-45"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-2 rounded-full bg-blue-400/30 blur-md -rotate-45"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
// Animated decorator component
const Decorator = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-8 h-8"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
    >
      <Star className="text-yellow-300/50" fill="rgba(253, 224, 71, 0.3)" />
    </motion.div>
  );
};

Decorator.propTypes = {
  delay: PropTypes.number
};

// Interactive floating illustration component
const FloatingIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Large center circle */}
      <motion.div
        className="w-64 h-64 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10"
        animate={{ 
          y: [0, -15, 0],
          boxShadow: [
            '0 0 0 rgba(139, 92, 246, 0.3)',
            '0 0 30px rgba(139, 92, 246, 0.5)',
            '0 0 0 rgba(139, 92, 246, 0.3)'
          ]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-7xl font-bold text-white/80">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full flex items-center justify-center"
          >
            E
          </motion.div>
        </div>
      </motion.div>
      
      {/* Orbiting circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-pink-500/50 to-blue-500/50 backdrop-blur-sm border border-white/10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "center center",
            left: "calc(50% - 20px)",
            top: "calc(50% - 20px)",
            transform: `rotate(${i * 120}deg) translateX(170px) rotate(${i * 120}deg)`,
          }}
        />
      ))}
      
      {/* Small decorative elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/60"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Login() {
  // State to hold user input and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!userType) {
      newErrors.userType = "Please select user type";
    }

    if (Object.keys(newErrors).length > 0) {
      // Update the errors state and prevent form submission
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Show success animation temporarily for demo
    setFormSubmitted(true);

    // Prepare data object to send to the backend
    const data = {
      Email: email,
      Password: password,
    };

    try {
      // Send data to backend
      const response = await fetch(`/api/${userType}/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if(responseData.message !== 'Logged in'){
        setErr(responseData.message);
        setFormSubmitted(false);
      }
      
      // Handle response
      if (response.ok) {
        const userid = responseData.data.user._id;
        console.log("Login successful");
        
        if(responseData.data.user.Isapproved === "pending"){
          if(responseData.data.user.Teacherdetails || responseData.data.user.Studentdetails){
            navigate('/pending');
          } else {
            if(userType === 'student'){
              navigate(`/StudentDocument/${userid}`);
            } else if(userType === 'teacher'){
              navigate(`/TeacherDocument/${userid}`);
            }
          }
        } else if(responseData.data.user.Isapproved === "approved"){
          if(userType === 'student'){
            navigate(`/Student/Dashboard/${userid}/Search`);
          } else if(userType === 'teacher'){
            navigate(`/Teacher/Dashboard/${userid}/Home`);
          }
        } else if(responseData.data.user.Isapproved === "reupload"){
          navigate(`/rejected/${userType}/${userid}`);
        } else {
          setErr('You are banned from our platform!');
          setFormSubmitted(false);
        }
      } else if (response.status === 401) {
        setErrors({ password: responseData.message || "Incorrect password" });
        setFormSubmitted(false);
      } else if (response.status === 403) {
        setErrors({ general: responseData.message || "Login failed" });
        setFormSubmitted(false);
      } else if (response.status === 400) {
        setErrors({ general: responseData.message || "User does not exist" });
        setFormSubmitted(false);
      } else if (response.status === 422) {
        setErrors({ general: responseData.message || '"Email" must be a valid email' });
        setFormSubmitted(false);
      } else {
        setErrors({ general: "An unexpected error occurred" });
        setFormSubmitted(false);
      }
    } catch (error) {
      setErrors({ general: error.message });
      setFormSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const formSubmittedVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-12 relative">
        <AnimatedBackground />
        
        {/* Content Container */}
        <motion.div 
          className="w-full max-w-6xl flex flex-col lg:flex-row rounded-3xl overflow-hidden relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Decorative elements */}
          <Decorator delay={0.8} style={{ top: "10%", left: "5%" }} />
          <Decorator delay={1.0} style={{ top: "80%", left: "10%" }} />
          <Decorator delay={1.2} style={{ top: "20%", right: "8%" }} />
          <Decorator delay={1.4} style={{ top: "70%", right: "5%" }} />
          
          {/* Form Section */}
          <motion.div 
            className="w-full lg:w-1/2 p-8 lg:p-12 backdrop-blur-lg bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-violet-900/40 rounded-3xl border border-white/10 shadow-2xl"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div 
                  key="success"
                  variants={formSubmittedVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full flex flex-col items-center justify-center py-12"
                >
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <motion.path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.div>
                  <Typography variant="h4" className="text-white font-bold mb-4 text-center">
                    Login Successful!
                  </Typography>
                  <Typography variant="body1" className="text-slate-200 text-center mb-6">
                    Redirecting to your dashboard...
                  </Typography>
                  <motion.div 
                    className="w-full max-w-xs h-2 bg-white/10 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  variants={formSubmittedVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                    <CardContent>
                      <motion.div variants={itemVariants} className="mb-8">
                        <Typography variant="h3" className="mb-2">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                            WELCOME BACK!
                          </span>
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                          Please log into your account
                        </Typography>
                      </motion.div>
  
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                              startAdornment: (
                                <motion.div
                                  whileHover={{ rotate: 15 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Mail className="mr-2 text-slate-400" size={20} />
                                </motion.div>
                              ),
                            }}
                            sx={{
                              "& .MuiFormHelperText-root": {
                                color: theme.palette.error.main
                              }
                            }}
                          />
                        </motion.div>
  
                        <motion.div variants={itemVariants}>
                          <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                              startAdornment: (
                                <motion.div
                                  whileHover={{ rotate: 15 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <LockOpen className="mr-2 text-slate-400" size={20} />
                                </motion.div>
                              ),
                            }}
                            sx={{
                              "& .MuiFormHelperText-root": {
                                color: theme.palette.error.main
                              }
                            }}
                          />
                        </motion.div>
  
                        <motion.div variants={itemVariants}>
                          <FormControl component="fieldset" error={!!errors.userType} className="w-full">
                            <Typography variant="body1" color="text.secondary" className="mb-2">
                              User Type
                            </Typography>
                            <RadioGroup 
                              row 
                              value={userType} 
                              onChange={(e) => setUserType(e.target.value)}
                              className="space-x-4"
                            >
                              <FormControlLabel 
                                value="student" 
                                control={<Radio />} 
                                label={
                                  <motion.span 
                                    whileHover={{ color: "#a78bfa" }}
                                    className="text-slate-300"
                                  >
                                    Student
                                  </motion.span>
                                } 
                              />
                              <FormControlLabel 
                                value="teacher" 
                                control={<Radio />} 
                                label={
                                  <motion.span 
                                    whileHover={{ color: "#a78bfa" }}
                                    className="text-slate-300"
                                  >
                                    Teacher
                                  </motion.span>
                                } 
                              />
                            </RadioGroup>
                            {errors.userType && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Typography variant="caption" color="error">
                                  {errors.userType}
                                </Typography>
                              </motion.div>
                            )}
                          </FormControl>
                        </motion.div>
  
                        {err && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Alert 
                              severity="error" 
                              icon={<AlertCircle className="h-5 w-5" />}
                              sx={{ 
                                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                                color: '#fca5a5',
                                borderLeft: '4px solid #ef4444',
                                borderRadius: '12px'
                              }}
                            >
                              {err}
                            </Alert>
                          </motion.div>
                        )}
  
                        <motion.div 
                          variants={itemVariants}
                          className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4"
                        >
                          <Typography variant="body2" color="text.secondary">
                            Don&apos;t have an account?{" "}
                            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                              <NavLink to="/signup" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
                                Sign up
                              </NavLink>
                            </motion.span>
                          </Typography>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/forgetpassword')}
                          >
                            <Typography 
                              variant="body2" 
                              className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer transition-colors"
                            >
                              Forgot Password?
                            </Typography>
                          </motion.div>
                        </motion.div>
  
                        <motion.div variants={itemVariants} className="pt-4">
                          <motion.div
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)",
                            }}
                          >
                            <Button 
                              type="submit" 
                              fullWidth
                              variant="contained"
                              disabled={isLoading}
                              className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"
                              sx={{ 
                                py: 1.5,
                                background: "linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #6366f1 100%)",
                                boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.2)"
                              }}
                            >
                              {isLoading ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                  Logging in...
                                </Box>
                              ) : "Log In"}
                            </Button>
                          </motion.div>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Illustration Section */}
          <motion.div 
            className="hidden lg:flex lg:w-1/2 relative overflow-hidden justify-center items-center p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full h-full relative">
              {/* Abstract Aesthetic Elements */}
              <motion.div
                className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/30 to-orange-500/30 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              
              {/* Animated glowing ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-white/10"
                animate={{
                  rotate: 360,
                  boxShadow: [
                    "0 0 20px rgba(167, 139, 250, 0.3)",
                    "0 0 40px rgba(167, 139, 250, 0.5)",
                    "0 0 20px rgba(167, 139, 250, 0.3)",
                  ],
                }}
                transition={{
                  rotate: { duration: 20, ease: "linear", repeat: Infinity },
                  boxShadow: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                }}
              />
              
              {/* Interactive Floating Illustration */}
              <FloatingIllustration />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}