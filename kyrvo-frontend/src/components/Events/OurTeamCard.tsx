import React from 'react';
import { Card, CardMedia, Typography, Box, useTheme } from '@mui/material';
import './OurTeamCard.css';
import { getImageUrl } from 'src/utils/helpers';
import { Member } from 'src/models/Team';
interface OptionalProps {
  larger?: boolean;
}
const TeamMemberCard: React.FC<Member & OptionalProps> = ({
  Name,
  Designation,
  Image,
  larger,
}) => {
  const themeInstance = useTheme();
  return (
    <div className="ky-our-team">
      <Card className="ky-our-team-card">
        <CardMedia
          className="ky-our-team-card-media"
          component="img"
          alt={Name}
          image={getImageUrl(Image)}
          sx={{
            height: {
              xs: larger ? '150px' : '120px',
              md: larger ? '240px' : '200px',
              lg: larger ? '250px' : '200px',
            },
          }}
        />
        <Box
          sx={{
            background: themeInstance.palette.tertiary?.main,
            color: themeInstance.palette.primary.main,
          }}
          padding={2}
        >
          <Typography className="ky-our-team-card-name" variant="h6">
            {Name}
          </Typography>
          <Typography
            className="ky-our-team-card-designation"
            variant="body2"
            color="textSecondary"
          >
            {Designation}
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default TeamMemberCard;
