import { Paper } from '@mui/material';
import React from 'react';
interface RowImageProps {
  Url: string;
}
const RowImage: React.FC<RowImageProps> = ({ Url }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundImage: `URL(${Url})`,
        width: 40,
        height: 40,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
      }}
    ></Paper>
  );
};

export default RowImage;
