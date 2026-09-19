import { Grid, Card, CardMedia, Box, useTheme } from '@mui/material';
import React from 'react';
import { SectionHeader } from 'src/components';
import Jumbotron from 'src/components/Jumbotron/Jumbotron';
import './chefs.css';
import SlideShow from 'src/components/SlideShow/SlideShow';
import { useAppStore } from 'src/stores';
import { tryParseJSON } from 'src/utils/helpers';

interface MasterChefProps {
  ChefName: string;
  Subtitle: string;
  SubtitleColor: string;
  ChefColor: string;
  Image: string;
}

const Chefs: React.FC = () => {
  const { getVariable } = useAppStore();
  const themeInstance = useTheme();

  const MasterChefDataString = getVariable('MasterChef');
  const MasterChefData = tryParseJSON(MasterChefDataString);
  return (
    <Grid xs={12} className="ky-chefs-contents">
      <SectionHeader
        alignment="center"
        title="MEET OUR"
        subtitle="AWESOME CHEFS"
      />
      <SlideShow
        arrows
        autoplaySpeed={500}
        fade={false}
        slideShow={2}
        infinite
        slidesToScroll={1}
        speed={3000}
        swipe
      >
        {MasterChefData?.MasterChef?.map((MasterChef: MasterChefProps) => (
          <Grid key={MasterChef.ChefName} className="ky-chef-style">
            <Box
              className="ky-chef-circle"
              sx={{
                background: themeInstance.palette.primary.main,
              }}
            ></Box>
            <Card
              elevation={0}
              className="card"
              sx={{ background: 'transparent' }}
            >
              <CardMedia
                component="img"
                sx={{ zIndex: '2', padding: '40px' }}
                alt={MasterChef.ChefName}
                image={MasterChef.Image}
                className="ky-chef-style-image"
              />
            </Card>
            <Grid>
              <Jumbotron
                title={MasterChef.ChefName}
                contentAlignment="center"
                subtitle={MasterChef.Subtitle}
                titleColor={MasterChef.ChefColor}
                subtitleColor={MasterChef.SubtitleColor}
              />
            </Grid>
          </Grid>
        ))}
      </SlideShow>
    </Grid>
  );
};

export default Chefs;
