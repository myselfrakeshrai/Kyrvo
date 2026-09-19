import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';
//import './ContentBlock.css';

interface ContentBlockProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  link,
}) => {
  return (
    <Grid container alignItems="center" mx={0} width={'100%'} spacing={2}>
      <Grid item sm={12} md={4} textAlign={'center'} className="image-wrapper">
        <Box className="image-container">
          <img src={imageUrl} alt="Logo" className="image" />
        </Box>
      </Grid>
      <Grid item sm={12} md={8} className="text-container">
        <SectionHeader
          title={title}
          fontWeight={false}
          margin="auto"
          alignment="left"
        />
        <Typography variant="subtitle1" component="div" color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body1">
          <p
            className="description-body"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          ></p>
        </Typography>
        {link && (
          <Button
            variant="contained"
            color="primary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Us
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ContentBlock;
