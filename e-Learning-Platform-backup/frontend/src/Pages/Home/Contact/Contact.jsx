import  { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Card, CardContent, Typography, Snackbar, Alert } from '@mui/material';
import { Mail as MailIcon } from 'lucide-react';


function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      return setSnackbar({ open: true, message: 'All fields are required!', severity: 'warning' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setSnackbar({ open: true, message: 'Enter a valid email!', severity: 'error' });
    }

    try {
      const res = await fetch('/api/admin/contact-us', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg })
      });
      const response = await res.json();
      setSnackbar({ open: true, message: response.message, severity: 'success' });
      setName('');
      setEmail('');
      setMsg('');
    } catch (err) {
      setSnackbar({ open: true, message: 'Something went wrong!', severity: 'error' });
    }
  };

  return (
    <>
     
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-indigo-100 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card 
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '4xl',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.15), 0 8px 32px -8px rgba(147, 51, 234, 0.2)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 0 50px rgba(99, 102, 241, 0.2), 0 10px 40px -10px rgba(147, 51, 234, 0.3)',
            }
          }}
          className="backdrop-blur-sm"
        >
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center justify-center"
            >
              <MailIcon size={140} className="text-indigo-700 mb-4 animate-bounce" />
              <Typography variant="h5" className="text-indigo-800 font-semibold text-center">
                We’d love to hear from you!
              </Typography>
              <Typography variant="body2" className="text-gray-600 text-center mt-2">
                Whether you have a question, suggestion, or just want to say hello,
                feel free to drop us a message.
              </Typography>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Typography variant="h6" className="text-indigo-700">Send a Message</Typography>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: '9999px', // This creates the rounded-full effect
                  background: 'linear-gradient(to right, #9333ea, #6366f1, #f9a8d4)',
                  height: '40px',
                  '&:hover': {
                    background: 'linear-gradient(to right, #7e22ce, #4f46e5, #f472b6)',
                  }
                }}
                className="w-auto transition duration-300"
              >
                Send Message
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Contact;