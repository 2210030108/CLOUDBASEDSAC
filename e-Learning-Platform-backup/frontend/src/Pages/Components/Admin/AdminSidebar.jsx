import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import { 
  Dashboard, 
  People, 
  School,
  MonetizationOn,
  Assessment,
  Email,
  Settings,
  IntegrationInstructions,
  CardMembership,
  Psychology,
  SupportAgent,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ adminId }) => {
  const [openUser, setOpenUser] = React.useState(false);
  const [openCourse, setOpenCourse] = React.useState(false);
  const [openPayments, setOpenPayments] = React.useState(false);
  const [openAnalytics, setOpenAnalytics] = React.useState(false);
  const [openComms, setOpenComms] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  return (
    <div style={{ width: 280, backgroundColor: '#1a237e', color: 'white', height: '100vh' }}>
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to={`/admin/dashboard/${adminId}`}>
          <ListItemIcon style={{ color: 'white' }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* User Management */}
        <ListItem button onClick={() => setOpenUser(!openUser)}>
          <ListItemIcon style={{ color: 'white' }}><People /></ListItemIcon>
          <ListItemText primary="User Management" />
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
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
            <ListItem button component={Link} to={`/admin/import-export/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Bulk Operations" />
            </ListItem>
          </List>
        </Collapse>

        {/* Course Management */}
        <ListItem button onClick={() => setOpenCourse(!openCourse)}>
          <ListItemIcon style={{ color: 'white' }}><School /></ListItemIcon>
          <ListItemText primary="Course Management" />
          {openCourse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCourse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/courses/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="All Courses" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/course-approvals/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Course Approvals" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/categories/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Categories & Tags" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/pricing/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Pricing Models" />
            </ListItem>
          </List>
        </Collapse>

        {/* Payments & Subscriptions */}
        <ListItem button onClick={() => setOpenPayments(!openPayments)}>
          <ListItemIcon style={{ color: 'white' }}><MonetizationOn /></ListItemIcon>
          <ListItemText primary="Payments & Subscriptions" />
          {openPayments ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPayments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/revenue/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Revenue Tracking" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/subscriptions/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Subscription Plans" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/payment-gateways/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Payment Gateways" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/promotions/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Promotions & Coupons" />
            </ListItem>
          </List>
        </Collapse>

        {/* Analytics & Reports */}
        <ListItem button onClick={() => setOpenAnalytics(!openAnalytics)}>
          <ListItemIcon style={{ color: 'white' }}><Assessment /></ListItemIcon>
          <ListItemText primary="Analytics & Reports" />
          {openAnalytics ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/user-analytics/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="User Analytics" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/course-analytics/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Course Analytics" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/reports/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Generate Reports" />
            </ListItem>
          </List>
        </Collapse>

        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Communication */}
        <ListItem button onClick={() => setOpenComms(!openComms)}>
          <ListItemIcon style={{ color: 'white' }}><Email /></ListItemIcon>
          <ListItemText primary="Communication" />
          {openComms ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openComms} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/email-campaigns/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Email Campaigns" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/notifications/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/feedback/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Feedback & Reviews" />
            </ListItem>
          </List>
        </Collapse>

        {/* System Settings */}
        <ListItem button onClick={() => setOpenSettings(!openSettings)}>
          <ListItemIcon style={{ color: 'white' }}><Settings /></ListItemIcon>
          <ListItemText primary="System Settings" />
          {openSettings ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to={`/admin/platform-settings/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Platform Config" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/security/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Security & Roles" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/integrations/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Integrations" />
            </ListItem>
            <ListItem button component={Link} to={`/admin/certificates/${adminId}`} sx={{ pl: 4 }}>
              <ListItemText primary="Certifications" />
            </ListItem>
          </List>
        </Collapse>

        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* AI Tools */}
        <ListItem button component={Link} to={`/admin/ai-tools/${adminId}`}>
          <ListItemIcon style={{ color: 'white' }}><Psychology /></ListItemIcon>
          <ListItemText primary="AI Tools" />
        </ListItem>

        {/* Support */}
        <ListItem button component={Link} to={`/admin/support/${adminId}`}>
          <ListItemIcon style={{ color: 'white' }}><SupportAgent /></ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
      </List>
    </div>
  );
};

export default AdminSidebar;
