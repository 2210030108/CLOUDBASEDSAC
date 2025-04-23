// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Typography, 
  Container, 
  Box, 
  Button, 
  Alert, 
  Snackbar, 
  Paper, 
  IconButton,
  Tooltip,
  Grow
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const About = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [activeSection, setActiveSection] = useState('story');
  const [hovered, setHovered] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        duration: 0.8 
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        duration: 0.7 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const tabVariants = {
    inactive: { opacity: 0.7, scale: 0.95 },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      rotate: 15,
      scale: 1.2,
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };

  const leafVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1 + 0.2, 
        duration: 0.5, 
        ease: "easeOut" 
      }
    })
  };

  const handleTabChange = (section) => {
    setActiveSection(section);
  };

  const handleContactClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderTabContent = () => {
    switch (activeSection) {
      case 'story':
        return (
          <motion.div
            key="story"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="p-8"
          >
            <Box className="flex items-center mb-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <HistoryIcon className="text-indigo-500 text-4xl mr-4" />
              </motion.div>
              <Typography variant="h4" className="text-indigo-700 font-semibold">
                Our Story
              </Typography>
            </Box>
            
            <Box className="ml-12 border-l-4 border-indigo-200 pl-6 py-4">
              <Typography variant="body1" className="mb-4 text-gray-700 leading-relaxed">
                Adhyayan Kendra was envisioned as a space to inspire, educate, and empower. Founded in 2015 by a team of passionate educators led by Mr. Sai venkatesh, we began as a small study center in the heart of the city.
              </Typography>
              
              <Typography variant="body1" className="mb-4 text-gray-700 leading-relaxed">
                What started as a humble beginning has now transformed into a comprehensive educational hub with over 5,000 successful alumni across various disciplines. Our journey reflects our commitment to evolution and excellence in education.
              </Typography>
              
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                Throughout our journey, we&apos;ve remained true to our founding principle: learning is a lifelong adventure that should be accessible, engaging, and transformative for everyone.
              </Typography>
            </Box>
          </motion.div>
        );
        
      case 'mission':
        return (
          <motion.div
            key="mission"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="p-8"
          >
            <Box className="flex items-center mb-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <LightbulbIcon className="text-amber-500 text-4xl mr-4" />
              </motion.div>
              <Typography variant="h4" className="text-amber-700 font-semibold">
                Our Mission
              </Typography>
            </Box>
            
            <Box className="ml-12 border-l-4 border-amber-200 pl-6 py-4">
              <Typography variant="body1" className="mb-4 text-gray-700 leading-relaxed">
                Our mission is to cultivate a dynamic learning ecosystem that encourages skill development, critical thinking, and real-world problem-solving. We believe in education that transcends traditional boundaries and prepares learners for the challenges of tomorrow.
              </Typography>
              
              <Typography variant="body1" className="mb-4 text-gray-700 leading-relaxed">
                We&apos;re committed to delivering quality education that adapts to evolving industry needs while fostering creativity, innovation, and ethical decision-making among our students.
              </Typography>
              
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                By 2030, we aim to empower over 100,000 learners with the skills and knowledge needed to make meaningful contributions to society and thrive in their chosen paths.
              </Typography>
            </Box>
          </motion.div>
        );
        
      case 'values':
        return (
          <motion.div
            key="values"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="p-8"
          >
            <Box className="flex items-center mb-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <FavoriteIcon className="text-rose-500 text-4xl mr-4" />
              </motion.div>
              <Typography variant="h4" className="text-rose-700 font-semibold">
                Our Values
              </Typography>
            </Box>
            
            <Box className="ml-12 border-l-4 border-rose-200 pl-6 py-4">
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <SchoolIcon />, title: "Growth Mindset", desc: "Embracing challenges as opportunities and viewing failures as stepping stones to success.", color: "emerald" },
                  { icon: <GroupsIcon />, title: "Collaboration", desc: "Fostering a community where knowledge is shared and teamwork is celebrated.", color: "blue" },
                  { icon: <AutoAwesomeIcon />, title: "Innovation", desc: "Encouraging creative thinking and pioneering new approaches to learning.", color: "purple" },
                  { icon: <DirectionsRunIcon />, title: "Excellence", desc: "Striving for the highest standards in everything we do.", color: "amber" },
                ].map((value, i) => (
                  <motion.div 
                    key={value.title}
                    custom={i}
                    variants={leafVariants}
                    className={`bg-${value.color}-50 p-4 rounded-lg border border-${value.color}-100 flex items-start`}
                  >
                    <Box className={`text-${value.color}-500 mr-3 mt-1`}>
                      {value.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" className={`text-${value.color}-700 font-medium mb-1`}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {value.desc}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        );
        
      case 'team':
        return (
          <motion.div
            key="team"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="p-8"
          >
            <Box className="flex items-center mb-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <GroupsIcon className="text-emerald-500 text-4xl mr-4" />
              </motion.div>
              <Typography variant="h4" className="text-emerald-700 font-semibold">
                Our Team
              </Typography>
            </Box>
            
            <Box className="ml-12 border-l-4 border-emerald-200 pl-6 py-4">
              <Typography variant="body1" className="mb-6 text-gray-700 leading-relaxed">
                Behind Adhyayan Kendra&apos;s success is a dedicated team of educators, researchers, and industry experts who bring diverse perspectives and specialized knowledge to our learning environment.
              </Typography>
              
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Sai venkatesh", role: "Founder & Academic Director", desc: "Ph.D. in Education with 20+ years of teaching experience" },
                  { name: "Rohith", role: "Chief Learning Officer", desc: "Expert in pedagogical innovation and curriculum design" },
                  { name: "Girish", role: "Technology Head", desc: "Specializes in educational technology integration" },
                ].map((member, i) => (
                  <motion.div 
                    key={member.name}
                    custom={i}
                    variants={leafVariants}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <Box className="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg mb-4 flex items-center justify-center text-white text-4xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Box>
                    <Typography variant="h6" className="font-medium mb-1">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" className="text-emerald-600 mb-2">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {member.desc}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" className="py-20">
      <motion.div  
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="overflow-hidden"
      >
        {/* Hero Section */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <Typography
            variant="h2"
            component="h1"
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-100 font-bold mb-6"
            sx={{ fontWeight: 800, letterSpacing: 1 }}
          >
            About Adhyayan Kendra
          </Typography>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-teal-300 mx-auto mb-8"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="h6" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Where curiosity meets opportunity. We are dedicated to creating a dynamic learning 
              hub that connects learners with knowledge, innovation, and success.
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Tab Section */}
        <motion.div variants={sectionVariants} className="mb-16">
          <Paper 
            elevation={3} 
            className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50"
          >
            {/* Navigation Tabs */}
            <Box className="flex flex-wrap justify-center gap-2 p-4 bg-white border-b">
              {[
                { id: 'story', label: 'Our Story', icon: <HistoryIcon />, color: 'indigo' },
                { id: 'mission', label: 'Our Mission', icon: <LightbulbIcon />, color: 'amber' },
                { id: 'values', label: 'Our Values', icon: <FavoriteIcon />, color: 'rose' },
                { id: 'team', label: 'Our Team', icon: <GroupsIcon />, color: 'emerald' },
              ].map((tab) => (
                <motion.div
                  key={tab.id}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeSection === tab.id ? "active" : "inactive"}
                  whileHover="hover"
                  onClick={() => handleTabChange(tab.id)}
                  className={`cursor-pointer px-6 py-3 rounded-full flex items-center ${
                    activeSection === tab.id 
                      ? `bg-${tab.color}-100 text-${tab.color}-700` 
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <Box className="mr-2">{tab.icon}</Box>
                  <Typography variant="button" className="font-medium">
                    {tab.label}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          
            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </Paper>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div 
          variants={sectionVariants}
          whileHover="hover"
          className="relative overflow-hidden"
        >
          <Paper elevation={4} className="rounded-2xl overflow-hidden">
            {/* Background Gradient */}
            <Box className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
            
            {/* Content */}
            <Box className="relative p-10">
              <Typography 
                variant="h4" 
                className="text-center font-medium mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"
              >
                Contact Information
              </Typography>
              
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { 
                    icon: <EmailIcon />, 
                    title: "Email Us", 
                    content: "connect@adhyayankendra.com",
                    color: "teal",
                    onClick: () => handleContactClick()
                  },
                  { 
                    icon: <PhoneIcon />, 
                    title: "Call Us", 
                    content: "+91 9876543210",
                    color: "cyan",
                    onClick: () => handleContactClick()
                  },
                  { 
                    icon: <LocationOnIcon />, 
                    title: "Visit Us", 
                    content: "456 Knowledge Avenue, Wisdom City, India",
                    color: "blue",
                    onClick: () => handleContactClick()
                  },
                ].map((contact, i) => (
                  <motion.div
                    key={contact.title}
                    custom={i}
                    variants={leafVariants}
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                    className={`bg-white rounded-xl p-6 shadow-lg border-b-4 border-${contact.color}-500 flex items-start`}
                    onClick={contact.onClick}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(contact.title)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <motion.div 
                      className={`mr-4 p-3 rounded-full bg-${contact.color}-100 text-${contact.color}-500`}
                      animate={hovered === contact.title ? { rotate: [0, -10, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <Box>
                      <Typography variant="h6" className="font-medium mb-1">
                        {contact.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {contact.content}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
              
              <Box className="text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="contained" 
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    onClick={handleContactClick}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                    sx={{ 
                      borderRadius: 28, 
                      px: 5, 
                      py: 1.5,
                      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Connect With Us
                  </Button>
                </motion.div>
                
                <Typography variant="body2" className="mt-4 text-gray-500">
                  We&apos;d love to hear from you and answer any questions about our programs
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </motion.div>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Grow}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
          action={
            <Tooltip title="Close">
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                ×
              </IconButton>
            </Tooltip>
          }
        >
          <Typography variant="body2">
            <strong>Thank you for your interest!</strong> We&apos;ll get back to you shortly.
          </Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
};

About.propTypes = {
  backgroundC: PropTypes.string,
};

export default About;