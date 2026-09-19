import React from 'react';
import {Grid, Typography } from '@mui/material';
import TeamMemberCard from './OurTeamCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import './OurTeam.css';
import { Member } from 'src/models/Team';

interface OurTeamProps {
  header: string;
  scroll: boolean;
  team: Member[];
  larger?: boolean;
}

const OurTeam: React.FC<OurTeamProps> = ({ header, team, larger }) => {
  return (
    <>
      <Grid xs={12} mb={5}>
        <SectionHeader
          title={header}
          fontWeight={false}
          margin="auto"
          alignment="left"
        />
      </Grid>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="ky-team-wrapper"
      >
        {team.length === 0 && (
          <Grid item key={header}>
            <Typography textAlign="center" variant="h6" color="textSecondary">
              No data available at the moment
            </Typography>
          </Grid>
        )}
        {team.map((member, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={larger ? 2.4 : 2}
            xl={larger ? 2.4 : 2}
            key={index}
            mx={0}
            className="ky-team-member-card"
          >
            <TeamMemberCard {...member} larger={larger} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OurTeam;
