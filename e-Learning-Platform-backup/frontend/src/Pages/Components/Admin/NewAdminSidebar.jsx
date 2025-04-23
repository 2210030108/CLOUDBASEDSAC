import React from 'react';
import PropTypes from 'prop-types';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Collapse 
} from '@mui/material';
import { 
  Dashboard, 
  People, 
  School,
  MonetizationOn,
  Assessment,
  Email,
  Settings,
  Psychology,
  SupportAgent,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NewAdminSidebar = ({ adminId }) => {
  const [openSections, setOpenSections] = React.useState({
    user: false,
    course: false,
    payments: false,
    analytics: false,
    comms: false,
    settings: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div style={{ 
      width: 280, 
      backgroundColor: '#1a237e', 
      color: 'white', 
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to={`/admin/dashboard/${adminId}`}>
          <ListItemIcon style={{ color: 'white' }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* User Management */}
        <ListItem button onClick={() => toggleSection('user')}>
          <ListItemIcon style={{ color: 'white' }}><People /></ListItemIcon>
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
            <ListItem button component={Link} to={`/admin/roles/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Role Management" />
            </ListItem>
          </List>
        </Collapse>

        {/* Course Management */}
        <ListItem button onClick={() => toggleSection('course')}>
          <ListItemIcon style={{ color: 'white' }}><School /></ListItemIcon>
          <ListItemText primary="Course Management" />
          {openSections.course ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.course} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/courses/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="All Courses" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/course-approvals/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Course Approvals" />
            </ListItem>
          </List>
        </Collapse>

        {/* Payments & Subscriptions */}
        <ListItem button onClick={() => toggleSection('payments')}>
          <ListItemIcon style={{ color: 'white' }}><MonetizationOn /></ListItemIcon>
          <ListItemText primary="Payments" />
          {openSections.payments ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.payments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/revenue/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Revenue Tracking" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/subscriptions/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Subscriptions" />
            </ListItem>
          </List>
        </Collapse>

        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* System Settings */}
        <ListItem button onClick={() => toggleSection('settings')}>
          <ListItemIcon style={{ color: 'white' }}><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
          {openSections.settings ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.settings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/security/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Security" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/integrations/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Integrations" />
            </ListItem>
          </List>
        </Collapse>

        {/* Support */}
        <ListItem button component={Link} to={`/admin/support/${adminId}`}>
          <ListItemIcon style={{ color: 'white' }}><SupportAgent /></ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
      </List>
    </div>
  );
};

NewAdminSidebar.propTypes = {
  adminId: PropTypes.string.isRequired
};

export default NewAdminSidebar;
