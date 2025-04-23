import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Box, 
  AppBar, 
  Toolbar, 
  LinearProgress, 
  Alert, 
  Snackbar,
  Divider,
  Card,
  CardContent,
 
  Avatar,

  Chip
} from "@mui/material";
import { 
  CloudUpload, 
  School, 
  Person, 
  Phone, 
  Home, 
  MenuBook, 
  Send, 
  FilePresent,
  CheckCircleOutline,
  Warning
} from "@mui/icons-material";
import logo from "../../Images/logo.svg";

const StudentDocument = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { Data: studentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    Phone: "",
    Address: "",
    Highesteducation: "",
    SecondarySchool: "",
    HigherSchool: "",
    SecondaryMarks: "",
    HigherMarks: "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
  });

  // File names for display
  const [fileNames, setFileNames] = useState({
    Aadhaar: "",
    Secondary: "",
    Higher: ""
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
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

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/student/StudentDocument/${studentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const result = await response.json();
        setData(result.data);
        
        // Pre-fill form with existing data
        setFormData(prev => ({
          ...prev,
          Phone: result.data.Phone || "",
          Address: result.data.Address || "",
          Highesteducation: result.data.Highesteducation || "",
          SecondarySchool: result.data.SecondarySchool || "",
          HigherSchool: result.data.HigherSchool || "",
          SecondaryMarks: result.data.SecondaryMarks || "",
          HigherMarks: result.data.HigherMarks || "",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [studentId]);

  const handleFileChange = (fileType, e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fileType]: file,
      }));
      
      setFileNames(prev => ({
        ...prev,
        [fileType]: file.name
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return interval;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Validate required fields
    const requiredFields = ["Phone", "Address", "Highesteducation", "SecondarySchool", "HigherSchool"];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please complete the following fields: ${missingFields.join(", ")}`);
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });

    const progressInterval = simulateUploadProgress();

    try {
      const response = await fetch(`/api/student/verification/${studentId}`, {
        method: "POST",
        body: formDataObj,
      });

      const responseData = await response.json();
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit form");
      }
      
      setSuccess("Documents submitted successfully! Redirecting...");
      setOpenSnackbar(true);
      
      // Delay navigation to show success message
      setTimeout(() => {
        navigate("/pending");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred while submitting your documents");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && uploadProgress > 0 && (
        <Box className="fixed top-0 left-0 w-full z-50">
          <LinearProgress 
            variant="determinate" 
            value={uploadProgress} 
            className="h-1"
            color="primary"
          />
          {uploadProgress === 100 && (
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full bg-green-500 text-white text-center py-1"
            >
              Upload complete! Processing your submission...
            </motion.div>
          )}
        </Box>
      )}

      <AppBar position="sticky" className="bg-indigo-900">
        <Toolbar className="px-4 sm:px-8">
          <motion.div 
            className="flex items-center gap-3" 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar src={logo} className="bg-white p-1 w-12 h-12" alt="Adhyayan Kendra" />
            <Typography variant="h5" className="font-bold text-blue-300">
              Adhyayan Kendra
            </Typography>
          </motion.div>
          <Box className="flex-grow" />
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" className="text-white flex items-center">
              <School className="mr-2" /> Document Verification Portal
            </Typography>
          </motion.div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Paper elevation={3} className="p-6 rounded-lg mb-8 border-l-4 border-indigo-600">
              <Typography variant="h5" className="text-indigo-800 flex items-center mb-4">
                <Person className="mr-2" /> Student Information
                <Box className="flex-grow" />
                <Chip 
                  icon={<Person />} 
                  label={`${data.Firstname || ''} ${data.Lastname || ''}`}
                  className="bg-indigo-100 text-indigo-800" 
                />
              </Typography>
              
              <Box className="bg-blue-50 p-4 rounded-md mb-6">
                <Typography variant="body1" className="text-blue-800 mb-2">
                  📋 Please fill in all required information and upload necessary documents.
                  The verification team will review your submission within 2-3 business days.
                </Typography>
              </Box>
              
              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                  <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent>
                      <Typography variant="h6" className="text-indigo-700 mb-4 flex items-center">
                        <Person className="mr-2" /> Personal Information
                      </Typography>
                      <Divider className="mb-6" />
                      
                      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TextField
                          label="First Name"
                          variant="outlined"
                          value={data.Firstname || ""}
                          InputProps={{ readOnly: true }}
                          fullWidth
                          className="bg-gray-50"
                        />
                        
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          value={data.Lastname || ""}
                          InputProps={{ readOnly: true }}
                          fullWidth
                          className="bg-gray-50"
                        />
                        
                        <TextField
                          label="Phone Number"
                          variant="outlined"
                          value={formData.Phone}
                          onChange={(e) => handleInputChange("Phone", e.target.value)}
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <Phone className="mr-2 text-gray-400" />,
                          }}
                        />
                        
                        <TextField
                          label="Home Address"
                          variant="outlined"
                          value={formData.Address}
                          onChange={(e) => handleInputChange("Address", e.target.value)}
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <Home className="mr-2 text-gray-400" />,
                          }}
                        />
                        
                        <TextField
                          label="Highest Education"
                          variant="outlined"
                          value={formData.Highesteducation}
                          onChange={(e) => handleInputChange("Highesteducation", e.target.value)}
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <MenuBook className="mr-2 text-gray-400" />,
                          }}
                        />
                        
                        <Box className="relative">
                          <Button
                            variant="contained"
                            component="label"
                            className="bg-indigo-600 hover:bg-indigo-700 w-full py-3 normal-case"
                            startIcon={<CloudUpload />}
                          >
                            Upload Aadhaar Card
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileChange("Aadhaar", e)}
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </Button>
                          {fileNames.Aadhaar && (
                            <Box className="mt-2 text-sm flex items-center text-gray-700">
                              <FilePresent className="mr-1 text-green-500" /> 
                              {fileNames.Aadhaar}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent>
                      <Typography variant="h6" className="text-indigo-700 mb-4 flex items-center">
                        <School className="mr-2" /> Educational Information
                      </Typography>
                      <Divider className="mb-6" />
                      
                      <Box className="mb-6 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-300">
                        <Typography variant="subtitle1" className="text-indigo-800 mb-4 flex items-center">
                          <School className="mr-2" /> Secondary Education (10th)
                        </Typography>
                        
                        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <TextField
                            label="10th Board Name"
                            variant="outlined"
                            value={formData.SecondarySchool}
                            onChange={(e) => handleInputChange("SecondarySchool", e.target.value)}
                            fullWidth
                            required
                          />
                          
                          <TextField
                            label="Total Marks (%)"
                            variant="outlined"
                            value={formData.SecondaryMarks}
                            onChange={(e) => handleInputChange("SecondaryMarks", e.target.value)}
                            fullWidth
                            type="number"
                            InputProps={{
                              endAdornment: <Typography variant="body2">%</Typography>,
                            }}
                          />
                          
                          <Box className="relative">
                            <Button
                              variant="outlined"
                              component="label"
                              className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 w-full py-2 normal-case"
                              startIcon={<CloudUpload />}
                            >
                              Upload 10th Result
                              <input
                                type="file"
                                hidden
                                onChange={(e) => handleFileChange("Secondary", e)}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </Button>
                            {fileNames.Secondary && (
                              <Box className="mt-2 text-sm flex items-center text-gray-700">
                                <FilePresent className="mr-1 text-green-500" /> 
                                {fileNames.Secondary}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      
                      <Box className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-300">
                        <Typography variant="subtitle1" className="text-indigo-800 mb-4 flex items-center">
                          <School className="mr-2" /> Higher Secondary Education (12th)  
                        </Typography>
                        
                        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <TextField
                            label="12th Board Name"
                            variant="outlined"
                            value={formData.HigherSchool}
                            onChange={(e) => handleInputChange("HigherSchool", e.target.value)}
                            fullWidth
                            required
                          />
                          
                          <TextField
                            label="Total Marks (%)"
                            variant="outlined"
                            value={formData.HigherMarks}
                            onChange={(e) => handleInputChange("HigherMarks", e.target.value)}
                            fullWidth
                            type="number"
                            InputProps={{
                              endAdornment: <Typography variant="body2">%</Typography>,
                            }}
                          />
                          
                          <Box className="relative">
                            <Button
                              variant="outlined"
                              component="label"
                              className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 w-full py-2 normal-case"
                              startIcon={<CloudUpload />}
                            >
                              Upload 12th Result
                              <input
                                type="file"
                                hidden
                                onChange={(e) => handleFileChange("Higher", e)}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </Button>
                            {fileNames.Higher && (
                              <Box className="mt-2 text-sm flex items-center text-gray-700">
                                <FilePresent className="mr-1 text-green-500" /> 
                                {fileNames.Higher}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  className="flex justify-end"
                  variants={itemVariants}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-800 px-8 py-3 text-lg"
                    endIcon={<Send />}
                  >
                    {loading ? "Submitting..." : "Submit Documents"}
                  </Button>
                </motion.div>
              </form>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? "error" : "success"}
          variant="filled"
          icon={error ? <Warning /> : <CheckCircleOutline />}
        >
          {error || success}
        </Alert>
      </Snackbar>
      
      <Box component="footer" className="bg-indigo-900 text-white p-4 text-center mt-8">
        <Typography variant="body2">
          © 2025 Adhyayan Kendra. All rights reserved. 📚
        </Typography>
      </Box>
    </motion.div>
  );
};

export default StudentDocument;