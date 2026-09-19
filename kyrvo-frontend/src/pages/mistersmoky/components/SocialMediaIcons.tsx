import React from 'react';
import { IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const SocialMediaIcons: React.FC = () => {
  return (
    <>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="Facebook"
        sx={{ mr: '1px', ml: '1px' }}
      >
        <Facebook />
      </IconButton>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="Twitter"
        sx={{ mr: '1px', ml: '1px' }}
      >
        <Twitter />
      </IconButton>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="Instagram"
        sx={{ mr: '1px', ml: '1px' }}
      >
        <Instagram />
      </IconButton>
    </>
  );
};

export default SocialMediaIcons;
