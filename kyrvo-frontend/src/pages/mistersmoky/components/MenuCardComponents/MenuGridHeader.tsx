import { Typography, Box } from '@mui/material';

const MenuGridHeader = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(https://i.pinimg.com/originals/3a/06/94/3a0694ed94296bfc5da8939622766a40.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
          display: 'inline-block',
        }}
      >
        <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
          Savor the Flavors
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'white' }}>
          The various dishes are waiting for your coming to enjoy its Flavours.
        </Typography>
      </Box>
    </Box>
  );
};

export default MenuGridHeader;
