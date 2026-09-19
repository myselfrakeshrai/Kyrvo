import React from 'react';
import Typography from '@mui/material/Typography';

interface RedirectTypographyProps {
  text?: string;
  url?: string;
}
const RedirectTypography: React.FC<RedirectTypographyProps> = ({ text, url }) => {
  return (
    <a href={url}>
      <Typography variant="body1" component="span" color="primary">
        {text}
      </Typography>
    </a>
  );
};

export default RedirectTypography;
