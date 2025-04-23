import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 

  InputAdornment,
  IconButton,
  Alert
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  AccountCircle, 
  LockOutlined,
  AdminPanelSettings
} from "@mui/icons-material";

const AdminLogin = () => {
  // State management
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    setServerError("");
    
    // Validate inputs
    const newErrors = {};
    if (!credentials.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    try {
      // Send data to backend
      const response = await fetch(`/api/admin/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        // Success animation before navigation
        setTimeout(() => {
          navigate(`/admin/${responseData.data.admin._id}`);
        }, 500);
      } else if (response.status === 401) {
        setErrors({ password: responseData.message || "Incorrect password" });
      } else if (response.status === 403) {
        setServerError(responseData.message || "Login failed");
      } else if (response.status === 400) {
        setServerError(responseData.message || "Admin does not exist");
      } else {
        setServerError("An unexpected error occurred");
      }
    } catch (error) {
      setServerError(error.message || "Connection error");
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
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <Container maxWidth="lg" className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left side - Decorative */}
        <motion.div 
          className="bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 w-full md:w-5/12 p-8 flex flex-col justify-center items-center text-white"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-8"
            variants={logoVariants}
          >
            <AdminPanelSettings className="text-white" sx={{ fontSize: 100 }} />
          </motion.div>
          
          <motion.div className="text-center" variants={itemVariants}>
            <Typography variant="h4" className="font-bold mb-4">
              Admin Portal
            </Typography>
            <Typography variant="body1" className="opacity-80">
              Access your administration dashboard to manage your platform, users, and content.
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Right side - Form */}
        <motion.div 
          className="w-full md:w-7/12 p-8"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h4" className="text-gray-800 font-bold mb-1">
              Welcome Back!
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-8">
              Please log into your administrator account
            </Typography>
          </motion.div>
          
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle className="text-indigo-600" />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
            
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined className="text-indigo-600" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
            
            {serverError && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error">{serverError}</Alert>
              </motion.div>
            )}
            
            <motion.div
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-3"
                  sx={{ 
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 14px 0 rgba(94, 63, 154, 0.39)'
                  }}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </motion.div>
            
          </form>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AdminLogin;