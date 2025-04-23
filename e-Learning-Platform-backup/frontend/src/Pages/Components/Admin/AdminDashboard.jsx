import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Collapse,
  Paper,
  CircularProgress
} from '@mui/material';
import { 
  Dashboard, 
  People, 
  School,
  MonetizationOn,
  Settings,
  SupportAgent,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(false);
  const [openSections, setOpenSections] = useState({
    user: true,
    course: false,
    payments: false,
    settings: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Paper sx={{
        width: 280,
        backgroundColor: '#1a237e',
        color: 'white',
        position: 'fixed',
        height: '100vh'
      }}>
        <List>
          <ListItem button component={Link} to={`/admin/dashboard/${adminId}`}>
            <ListItemIcon sx={{ color: 'white' }}><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* User Management */}
          <ListItem button onClick={() => toggleSection('user')}>
            <ListItemIcon sx={{ color: 'white' }}><People /></ListItemIcon>
            <ListItemText primary="User Management" />
            {openSections.user ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.user} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to={`/admin/users/${adminId}`} sx={{ pl: 4 }}>
                <ListItemText primary="All Users" />
              </ListItem>
              <ListItem button component={Link} to={`/admin/approvals/${adminId}`} sx={{ pl: 4 }}>
                <ListItemText primary="Pending Approvals" />
              </ListItem>
            </List>
          </Collapse>

          {/* Course Management */}
          <ListItem button onClick={() => toggleSection('course')}>
            <ListItemIcon sx={{ color: 'white' }}><School /></ListItemIcon>
            <ListItemText primary="Course Management" />
            {openSections.course ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.course} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to={`/admin/courses/${adminId}`} sx={{ pl: 4 }}>
                <ListItemText primary="All Courses" />
              </ListItem>
            </List>
          </Collapse>

          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

          {/* Support */}
          <ListItem button component={Link} to={`/admin/support/${adminId}`}>
            <ListItemIcon sx={{ color: 'white' }}><SupportAgent /></ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
        </List>
      </Paper>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        ml: '280px', // Match sidebar width
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper sx={{ p: 2, flex: 1, display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography>5 Approved Users</Typography>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Warning color="warning" sx={{ mr: 1 }} />
                  <Typography>2 Pending Approvals</Typography>
                </Paper>
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography>
                No recent activity to display
              </Typography>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
