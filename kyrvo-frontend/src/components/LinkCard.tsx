import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface LinkCardProps {
  title: string;
  uri: string;
  description: string;
  icon: React.ReactNode;
}

const LinkCard: React.FC<LinkCardProps> = ({
  title,
  uri,
  description,
  icon,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sx={{ mb: 2 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: '10px',
          background: theme.palette.primary.main,
          color: theme.palette.tertiary?.main,
          '&:hover': {
            background: theme.palette.tertiary?.main,
            color: theme.palette.primary.main,
          },
        }}
      >
        <CardActionArea onClick={() => navigate(uri)}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid
                item
                sx={{
                  background: theme.palette.secondary.main,
                  padding: '0px',
                  margin: '10px 10px 0 10px',
                  borderRadius: '50px',
                }}
              >
                {icon}
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{fontSize: '15px'}}>{title}</Typography>
                <Typography variant="body1" sx={{fontSize: '10px'}}>{description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default LinkCard;
