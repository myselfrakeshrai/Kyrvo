import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import { Call, Email, LocationOn } from '@mui/icons-material';
import { useAppStore } from 'src/stores';

const ContactUs: React.FC = () => {
  const {getVariable} = useAppStore();
  const themeInstance = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    const emailContent = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `;
    console.log(emailContent);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h2"
            sx={{ fontSize: 30, color: themeInstance.palette.primary.main }}
          >
            Do you have any question?
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  id="name"
                  name="name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="email"
                  name="email"
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Your Phone"
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  name="message"
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: themeInstance.palette.primary.main,
                  }}
                >
                  Send message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={4} mt={5}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Sydney Office
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ color: themeInstance.palette.primary.main, mr: 1 }}>
                  <LocationOn />
                </Box>
                <Typography variant="body2">
                {getVariable('CompanyLocation')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ color: themeInstance.palette.primary.main, mr: 1 }}>
                  <Call />
                </Box>
                <Typography variant="body2">{getVariable('CompanyNo')}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ color: themeInstance.palette.primary.main, mr: 1 }}>
                  <Email />
                </Box>
                <Typography variant="body2">{getVariable('CompanyMail')}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
