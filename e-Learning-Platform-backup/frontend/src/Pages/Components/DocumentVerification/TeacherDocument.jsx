/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Snackbar,
  Container,
  Divider,
  AppBar,
  Toolbar,
  Card,
  Avatar,
  Tooltip
} from "@mui/material";

// Fixed Material UI icon imports
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BadgeIcon from "@mui/icons-material/Badge";
import FlagIcon from "@mui/icons-material/Flag";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import logo from "../../Images/logo.svg";

// Custom file upload component with animation
const AnimatedFileUpload = ({ label, onChange, value, icon }) => {
  const [focus, setFocus] = useState(false);
  const [fileName, setFileName] = useState("");
  
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      onChange(e);
    }
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full mb-4"
    >
      <Typography variant="body2" className="mb-1 text-gray-700 font-medium flex items-center gap-1">
        {label} {label.includes("Aadhaar") && "🆔"}
        {label.includes("Certificate") && "📄"}
      </Typography>
      <Paper 
        elevation={focus ? 3 : 1}
        className={`border-2 border-dashed p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          focus ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        component="label"
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {icon || <CloudUploadIcon className="text-blue-600 text-4xl mb-2" />}
          {fileName ? (
            <Typography variant="body2" className="text-green-600 flex items-center gap-1">
              <CheckCircleIcon fontSize="small" /> {fileName}
            </Typography>
          ) : (
            <Box className="flex flex-col items-center">
              <Typography variant="body2" className="text-gray-500">
                Click to upload
              </Typography>
              <img 
                src="/api/placeholder/80/60" 
                alt="upload document" 
                className="mt-2 rounded opacity-50"
              />
            </Box>
          )}
        </motion.div>
      </Paper>
    </motion.div>
  );
};

// Custom text field with animation
const AnimatedTextField = ({ label, value, onChange, placeholder, readOnly, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="w-full mb-6"
    >
      <Box className="flex items-center mb-1">
        {icon && <Box className="mr-2 text-blue-700">{icon}</Box>}
        <Typography variant="body1" className="text-gray-700 font-medium flex items-center gap-2">
          {label}
          {label.includes("Phone") && "📱"}
          {label.includes("Address") && "🏠"}
          {label.includes("Experience") && "⏳"}
          {label.includes("First Name") && "👤"}
          {label.includes("Last Name") && "👤"}
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{
          readOnly: readOnly,
          className: readOnly ? "bg-gray-100" : "",
        }}
        className="shadow-sm"
      />
    </motion.div>
  );
};

// Education section component
const EducationSection = ({ title, schoolValue, schoolChange, marksValue, marksChange, fileValue, fileChange, icon }) => {
  // Set emoji based on education level
  const getEmoji = () => {
    switch(title) {
      case "Secondary": return "🎓";
      case "Higher Secondary": return "📚";
      case "Graduation": return "🎓";
      case "Post Graduation": return "🔬";
      default: return "📝";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b pb-6 mb-6"
    >
      <Box className="flex items-center mb-4">
        <Paper elevation={2} className="p-3 bg-blue-700 mr-4 flex items-center gap-2">
          <Typography className="text-white font-medium">
            {title} {getEmoji()}
          </Typography>
        </Paper>
        <Divider className="flex-grow" />
      </Box>
      
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedTextField
          label={`${title} Institution Name`}
          value={schoolValue}
          onChange={schoolChange}
          placeholder={`Enter ${title} institution name`}
          icon={<SchoolIcon fontSize="small" />}
        />
        
        <AnimatedTextField
          label="Percentage/CGPA"
          value={marksValue}
          onChange={marksChange}
          placeholder="Enter marks percentage or CGPA"
          icon={<SchoolIcon fontSize="small" />}
        />
        
        <AnimatedFileUpload
          label={`Upload ${title} Certificate`}
          onChange={fileChange}
          value={fileValue}
          icon={<SchoolIcon className="text-blue-600 text-4xl mb-2" />}
        />
      </Box>
    </motion.div>
  );
};

const TeacherDocument = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    Phone: "",
    Address: "",
    Experience: "",
    SecondarySchool: "",
    SecondaryMarks: "",
    HigherSchool: "",
    HigherMarks: "",
    UGcollege: "",
    UGmarks: "",
    PGcollege: "",
    PGmarks: "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
    UG: null,
    PG: null,
  });

  // Added validation state
  const [validation, setValidation] = useState({
    Phone: true,
    Address: true,
    Experience: true
  });

  // Basic form validation
  const validateForm = () => {
    const newValidation = {
      Phone: formData.Phone.length >= 10,
      Address: formData.Address.length >= 5,
      Experience: formData.Experience !== ""
    };
    
    setValidation(newValidation);
    return Object.values(newValidation).every(v => v);
  };

  // Load user data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/teacher/TeacherDocument/${Data}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setData(user.data);
        
        // Populate form with existing data
        setFormData(prevState => ({
          ...prevState,
          Phone: user.data.Phone || "",
          Address: user.data.Address || "",
          Experience: user.data.Experience || "",
          SecondarySchool: user.data.SecondarySchool || "",
          SecondaryMarks: user.data.SecondaryMarks || "",
          HigherSchool: user.data.HigherSchool || "",
          HigherMarks: user.data.HigherMarks || "",
          UGcollege: user.data.UGcollege || "",
          UGmarks: user.data.UGmarks || "",
          PGcollege: user.data.PGcollege || "",
          PGmarks: user.data.PGmarks || "",
        }));
        
        setPageLoading(false);
      } catch (error) {
        setError(error.message);
        setPageLoading(false);
      }
    };

    getData();
  }, [Data]);

  // Handle file upload
  const handleFileChange = (fileType, e) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  // Handle text input change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Reset validation for this field
    if (validation[field] === false) {
      setValidation({
        ...validation,
        [field]: true
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setError("Please fill all required fields correctly");
      return;
    }
    
    setLoading(true);
    setError("");

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(`/api/teacher/verification/${Data}`, {
        method: "POST",
        body: formDataObj,
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        setError(responseData.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/pending");
        }, 2000);
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (pageLoading) {
    return (
      <Box className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CircularProgress size={60} className="text-blue-700" />
          <Typography variant="h6" className="mt-4 text-blue-800">Loading your profile... ⏳</Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      {/* Header */}
      <AppBar position="static" className="bg-gradient-to-r from-blue-800 to-indigo-900 shadow-md">
        <Toolbar className="flex justify-between px-6 py-2">
          <Box className="flex items-center gap-3">
            <motion.img 
              src={logo} 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="w-10 h-10" 
              alt="Adhyayan Kendra Logo" 
            />
            <Typography variant="h5" className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
              Adhyayan Kendra ✨
            </Typography>
          </Box>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h6" className="text-white font-medium flex items-center gap-2">
              <VerifiedUserIcon /> Teacher Document Verification
            </Typography>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" className="mt-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Paper elevation={3} className="p-8 rounded-xl bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm">
            {/* Teacher Info Summary */}
            <Box className="flex items-center mb-8 gap-4">
              <Avatar 
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
                sx={{ width: 64, height: 64 }}
              >
                {data.Firstname && data.Firstname.charAt(0)}
                {data.Lastname && data.Lastname.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5" className="font-medium">
                  {data.Firstname} {data.Lastname}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Teacher Verification Portal
                </Typography>
              </Box>
              <Tooltip title="Document verification in progress">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="ml-auto"
                >
                  <BadgeIcon className="text-amber-500 text-4xl" />
                </motion.div>
              </Tooltip>
            </Box>
            
            {/* Stepper */}
            <Box className="mb-8">
              <Stepper activeStep={1} alternativeLabel>
                <Step>
                  <StepLabel>Registration ✓</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Document Verification 📝</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Profile Approval ⏳</StepLabel>
                </Step>
              </Stepper>
            </Box>

            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <Card elevation={2} className="mb-8 overflow-hidden">
                <Box className="bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-3">
                  <Typography variant="h6" className="text-white flex items-center gap-2">
                    <PersonIcon /> Personal Information 👤
                  </Typography>
                </Box>
                
                <Box className="p-6">
                  <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AnimatedTextField
                      label="First Name"
                      value={data.Firstname}
                      readOnly
                      placeholder="First Name"
                      icon={<PersonIcon fontSize="small" />}
                    />
                    
                    <AnimatedTextField
                      label="Last Name"
                      value={data.Lastname}
                      readOnly
                      placeholder="Last Name"
                      icon={<PersonIcon fontSize="small" />}
                    />
                    
                    <AnimatedTextField
                      label="Phone Number"
                      value={formData.Phone}
                      onChange={(e) => handleInputChange("Phone", e.target.value)}
                      placeholder="Enter your phone number"
                      icon={<PersonIcon fontSize="small" />}
                    />
                    
                    <AnimatedTextField
                      label="Home Address"
                      value={formData.Address}
                      onChange={(e) => handleInputChange("Address", e.target.value)}
                      placeholder="Enter your complete address"
                      icon={<HomeWorkIcon fontSize="small" />}
                    />
                    
                    <AnimatedTextField
                      label="Teaching Experience (Years)"
                      value={formData.Experience}
                      onChange={(e) => handleInputChange("Experience", e.target.value)}
                      placeholder="Years of experience in teaching"
                      icon={<WorkIcon fontSize="small" />}
                    />
                    
                    <AnimatedFileUpload
                      label="Upload Aadhaar Card"
                      onChange={(e) => handleFileChange("Aadhaar", e)}
                      value={formData.Aadhaar}
                    />
                  </Box>
                </Box>
              </Card>

              {/* Educational Information Section */}
              <Card elevation={2} className="mb-8 overflow-hidden">
                <Box className="bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-3">
                  <Typography variant="h6" className="text-white flex items-center gap-2">
                    <SchoolIcon /> Educational Information 📚
                  </Typography>
                </Box>
                
                <Box className="p-6">
                  {/* Secondary Education */}
                  <EducationSection
                    title="Secondary"
                    schoolValue={formData.SecondarySchool}
                    schoolChange={(e) => handleInputChange("SecondarySchool", e.target.value)}
                    marksValue={formData.SecondaryMarks}
                    marksChange={(e) => handleInputChange("SecondaryMarks", e.target.value)}
                    fileValue={formData.Secondary}
                    fileChange={(e) => handleFileChange("Secondary", e)}
                  />
                  
                  {/* Higher Secondary Education */}
                  <EducationSection
                    title="Higher Secondary"
                    schoolValue={formData.HigherSchool}
                    schoolChange={(e) => handleInputChange("HigherSchool", e.target.value)}
                    marksValue={formData.HigherMarks}
                    marksChange={(e) => handleInputChange("HigherMarks", e.target.value)}
                    fileValue={formData.Higher}
                    fileChange={(e) => handleFileChange("Higher", e)}
                  />
                  
                  {/* Graduation */}
                  <EducationSection
                    title="Graduation"
                    schoolValue={formData.UGcollege}
                    schoolChange={(e) => handleInputChange("UGcollege", e.target.value)}
                    marksValue={formData.UGmarks}
                    marksChange={(e) => handleInputChange("UGmarks", e.target.value)}
                    fileValue={formData.UG}
                    fileChange={(e) => handleFileChange("UG", e)}
                  />
                  
                  {/* Post Graduation */}
                  <EducationSection
                    title="Post Graduation"
                    schoolValue={formData.PGcollege}
                    schoolChange={(e) => handleInputChange("PGcollege", e.target.value)}
                    marksValue={formData.PGmarks}
                    marksChange={(e) => handleInputChange("PGmarks", e.target.value)}
                    fileValue={formData.PG}
                    fileChange={(e) => handleFileChange("PG", e)}
                  />
                </Box>
              </Card>

              {/* Information Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert severity="info" icon={<SecurityIcon />}>
                  All documents will be verified by our team. Please ensure all information is accurate and documents are clearly legible.
                </Alert>
              </motion.div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Alert severity="error" variant="filled">
                    {error}
                  </Alert>
                </motion.div>
              )}

              {/* Submit Button */}
              <Box className="flex justify-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 px-6 py-3"
                  >
                    {loading ? "Submitting..." : "Submit Documents ✅"}
                  </Button>
                </motion.div>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" icon={<CheckCircleIcon />}>
          Documents submitted successfully! ✅ Redirecting to pending verification page...
        </Alert>
      </Snackbar>

      {/* Loading Overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <Box className="bg-white p-8 rounded-xl flex flex-col items-center">
            <CircularProgress size={60} className="text-blue-700 mb-4" />
            <Typography variant="h6">Uploading Documents... 📤</Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              Please wait while we process your information
            </Typography>
            <img 
              src="/api/placeholder/200/100" 
              alt="uploading documents" 
              className="mt-4 rounded-lg opacity-70" 
            />
          </Box>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeacherDocument;