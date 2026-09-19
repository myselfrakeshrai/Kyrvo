// UserInfoPage.tsx
import { Avatar, Box, Card, Grid, Typography, useTheme } from '@mui/material';
import { useAppStore } from 'src/stores';

const UserInfoPage: React.FC = () => {
  const { user } = useAppStore();
  const themeInstance = useTheme();

  return (
    <Grid xs={12}>
      <Card
        elevation={3}
        sx={{
          background: themeInstance.palette.tertiary?.main,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          mb: 1,
          alignItems: 'center',
          borderRadius: '10px',
        }}
      >
        {user ? (
          <>
            <Box
              sx={{
                mr: -20,
                position: 'absolute',
                width: '100px',
                height: '100px',
                zIndex: '0',
                backgroundImage:
                  'url(../src/assets/Img/earth-white-bk.gif)',
                backgroundSize: 'contain', // or 'contain', depending on your preference
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
            </Box>
            <Box
              sx={{
                color: themeInstance.palette.tertiary?.main,
                p: '10px',
                zIndex: '1',
                borderRadius: '50%',
                background: themeInstance.palette.primary.main,
              }}
            ><Avatar
            alt={user.FirstName}
            sx={{
              height: 30,
              width: 30,
              fontSize: 14,
              fontWeight: 600,
              background: '#fff',
              color: themeInstance.palette.primary.main,
            }}
          >
            {user.FirstName?.charAt(0)}
            {user.LastName?.charAt(0)}
          </Avatar>
            </Box>
            <Typography sx={{ zIndex: '1', color: themeInstance.palette.primary.main }}>
              Hi! 👋 {user.FirstName} {user.LastName}🎉
            </Typography>
            <Typography sx={{ fontSize:'10px', zIndex: '1', color: themeInstance.palette.primary.main }}>
              You are {user.RoleId}
            </Typography>
            <Typography sx={{ fontSize:'10px' , zIndex: '1', color: themeInstance.palette.primary.main }}>
              {user.Email}
            </Typography>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </Card>
    </Grid>
  );
};

export default UserInfoPage;
