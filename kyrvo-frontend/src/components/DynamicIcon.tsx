import { Icon } from '@mui/material';
import React from 'react';
interface DynamicIconProps {
  name: string;
}
const DynamicIcon: React.FC<DynamicIconProps> = ({ name }) => {
  return <Icon>{name}</Icon>;
};

export default DynamicIcon;
