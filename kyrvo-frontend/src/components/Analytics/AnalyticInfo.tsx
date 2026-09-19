import { Commute, DirectionsCar, Person } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  UserServices,
  VehicleServices,
  VehicleTypesServices,
} from 'src/services';
import './anlayticInfo.css';

const AnalyticInfo = () => {
  const [userNo, setUserNo] = useState<number>(0);
  const [vehNo, setVehNo] = useState<number>(0);
  const [vehtyNo, setVehtyNo] = useState<number>(0);
  const theme = useTheme();
  useEffect(() => {
    UserServices.getAll().then((res) => {
      setUserNo(res.length);
    });

    VehicleServices.getAll().then((res) => {
      setVehNo(res.length);
    });

    VehicleTypesServices.getAll().then((res) => {
      setVehtyNo(res.length);
    });
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4} sx={{ mb: 2 }}>
        <Card
          elevation={3}
          sx={{
            borderRadius: '10px',
            color: theme.palette.primary.main,
          }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid
                item
                className='ky-anlaytic-card'
                sx={{
                  background: `${theme.palette.primary.main}99`,
                }}
              >
                <Person fontSize="large" />
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '25px',
                  }}
                >
                  {userNo}
                </Typography>
                <Typography variant="body1">Users Count</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ mb: 2 }}>
        <Card
          elevation={3}
          sx={{
            borderRadius: '10px',
            background: theme.palette.tertiary?.main,
            color: theme.palette.primary.main,
          }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid
                item
                className='ky-anlaytic-card'
                sx={{
                  background: `${theme.palette.secondary.main}99`,
                }}
              >
                <Commute fontSize="large" />
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '25px',
                  }}
                >
                  {vehtyNo}
                </Typography>
                <Typography variant="body1">Vehicles Types</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ mb: 2 }}>
        <Card
          elevation={3}
          sx={{
            borderRadius: '10px',
            background: theme.palette.tertiary?.main,
            color: theme.palette.primary.main,
          }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid
                item
                className='ky-anlaytic-card'
                sx={{
                  background: `${theme.palette.primary.main}99`,
                }}
              >
                <DirectionsCar fontSize="large" />
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '25px',
                  }}
                >
                  {vehNo}
                </Typography>
                <Typography variant="body1">Vehicles</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticInfo;
