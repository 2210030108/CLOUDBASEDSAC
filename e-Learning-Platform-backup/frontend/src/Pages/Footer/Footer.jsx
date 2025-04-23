/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  IconButton, 
  Tooltip, 
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
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

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, color: '#4f46e5' },
    tap: { scale: 0.9 },
  };

  const linkVariants = {
    initial: { color: '#6b7280' },
    hover: { 
      color: '#4f46e5',
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && email.includes('@')) {
      setSubscribed(true);
      setOpenSnackbar(true);
      setEmail('');
    }
  };

  // Footer sections
  const aboutLinks = [
    'About Us', 'Our Vision', 'Team', 'Careers', 'Blog', 'Partners', 'Investors'
  ];

  const resourceLinks = [
    'Knowledge Hub', 'Free Resources', 'Courses', 'Workshops', 'Webinars', 'Case Studies'
  ];

  const supportLinks = [
    'Help Center', 'FAQs', 'Contact Us', 'Feedback', 'Technical Support'
  ];

  const legalLinks = [
    'Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Sitemap'
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com' },
    { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com' },
    { icon: <YouTubeIcon />, name: 'YouTube', url: 'https://youtube.com' },
  ];

  return (
    <Box className="bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white pt-16 pb-6">
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Section with Logo and Newsletter */}
          <Grid container spacing={6} className="mb-12">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" className="font-bold mb-4 flex items-center">
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: 0 }}
                    className="inline-block mr-2 text-yellow-400"
                  >
                    ✦
                  </motion.span>
                  Adhyayan Kendra
                </Typography>
                <Typography variant="body1" className="text-gray-300 mb-6 max-w-md">
                  Empowering minds through innovative learning experiences. We believe in the power of education to transform lives and communities.
                </Typography>
                <Typography variant="subtitle2" className="italic text-yellow-400 font-medium">
                  Small Change. Big Impact.
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Typography variant="h6" className="mb-4 font-semibold">
                  Stay Updated
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-4">
                  Subscribe to our newsletter for the latest updates, courses, and educational insights.
                </Typography>
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-md bg-white/10 border border-white/30 focus:border-indigo-400 outline-none flex-grow text-white placeholder-gray-300"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-2 rounded-md font-medium transition-all"
                  >
                    Subscribe
                  </motion.button>
                </form>
              </motion.div>
            </Grid>
          </Grid>

          {/* Main Links Section */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={4} className="mb-12">
              <Grid item xs={6} sm={6} md={3}>
                <Typography variant="h6" className="font-semibold mb-4 text-yellow-300">
                  About
                </Typography>
                <ul className="space-y-2">
                  {aboutLinks.map((link, index) => (
                    <motion.li key={index} whileHover="hover" initial="initial">
                      <motion.a 
                        href="#" 
                        variants={linkVariants}
                        className="text-gray-300 hover:text-white inline-block transition-all"
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </Grid>

              <Grid item xs={6} sm={6} md={3}>
                <Typography variant="h6" className="font-semibold mb-4 text-yellow-300">
                  Resources
                </Typography>
                <ul className="space-y-2">
                  {resourceLinks.map((link, index) => (
                    <motion.li key={index} whileHover="hover" initial="initial">
                      <motion.a 
                        href="#" 
                        variants={linkVariants}
                        className="text-gray-300 hover:text-white inline-block transition-all"
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </Grid>

              <Grid item xs={6} sm={6} md={3}>
                <Typography variant="h6" className="font-semibold mb-4 text-yellow-300">
                  Support
                </Typography>
                <ul className="space-y-2">
                  {supportLinks.map((link, index) => (
                    <motion.li key={index} whileHover="hover" initial="initial">
                      <motion.a 
                        href="#" 
                        variants={linkVariants}
                        className="text-gray-300 hover:text-white inline-block transition-all"
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </Grid>

              <Grid item xs={6} sm={6} md={3}>
                <Typography variant="h6" className="font-semibold mb-4 text-yellow-300">
                  Legal
                </Typography>
                <ul className="space-y-2">
                  {legalLinks.map((link, index) => (
                    <motion.li key={index} whileHover="hover" initial="initial">
                      <motion.a 
                        href="#" 
                        variants={linkVariants}
                        className="text-gray-300 hover:text-white inline-block transition-all"
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </motion.div>

          {/* Social Media Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <Divider className="mb-8 opacity-30" />
            <Box className="flex flex-col items-center">
              <Typography variant="h6" className="font-semibold mb-6 text-center text-yellow-300">
                Connect With Us
              </Typography>
              <Box className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.name} arrow placement="top">
                    <motion.div
                      whileHover="hover"
                      whileTap="tap"
                      initial="initial"
                      variants={iconVariants}
                    >
                      <IconButton 
                        aria-label={social.name}
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-white/10 hover:bg-white/20 transition-all"
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Bottom Section with Copyright */}
          <motion.div variants={itemVariants}>
            <Divider className="mb-6 opacity-30" />
            <Grid container className="text-center sm:text-left">
              <Grid item xs={12} sm={6} className="mb-4 sm:mb-0">
                <Typography variant="body2" className="text-gray-400">
                  © {new Date().getFullYear()} Adhyayan Kendra. All Rights Reserved.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className="flex justify-center sm:justify-end">
                <motion.button 
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-all"
                >
                  <ArrowUpwardIcon fontSize="small" />
                  <span>Back to top</span>
                </motion.button>
              </Grid>
            </Grid>
          </motion.div>
        </motion.div>
      </Container>

      {/* Notification for subscription */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
          elevation={6}
        >
          Thanks for subscribing to our newsletter!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;