import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Typography, 
  Container,
  Alert
} from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";

const AdminSignup = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigate = useNavigate();

  // Default admin password (should be set by owner)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

// Get admin password from environment variables
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin@123";

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === DEFAULT_ADMIN_PASSWORD) {
      setShowSignupForm(true);
      setError("");
    } else {
      setError("Incorrect admin password");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/adminLogin');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  if (!showSignupForm) {
    return (
      <Container maxWidth="sm" className="min-h-screen flex items-center justify-center">
        <div className="w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <AdminPanelSettings sx={{ fontSize: 60 }} color="primary" />
            <Typography variant="h4" className="mt-4">
              Admin Signup
            </Typography>
            <Typography variant="body1" className="mt-2">
              Enter admin password to continue
            </Typography>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <TextField
              fullWidth
              type="password"
              label="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            
            {error && <Alert severity="error" className="mb-4">{error}</Alert>}

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
            >
              Continue
            </Button>
          </form>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <AdminPanelSettings sx={{ fontSize: 60 }} color="primary" />
          <Typography variant="h4" className="mt-4">
            Create Admin Account
          </Typography>
        </div>

        <form onSubmit={handleSignupSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mb-4"
            required
          />
          
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mb-4"
            required
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mb-4"
            required
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
          >
            Create Admin Account
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AdminSignup;
