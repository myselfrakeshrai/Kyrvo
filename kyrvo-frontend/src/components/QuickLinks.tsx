import React from 'react';

import {DirectionsCar as DirectionsCarIcon, PeopleAlt as PeopleAltIcon, Commute as CommuteIcon} from '@mui/icons-material';

import LinkCard, { LinkCardProps } from 'src/components/LinkCard';

const QuickLinks: React.FC = () => {
  const links: LinkCardProps[] = [
    {
      title: 'Add Vehicle',
      uri: '/manage/vehicles/create',
      description: 'Add new vehicle',
      icon: <DirectionsCarIcon fontSize="large" />,
    },
    {
      title: 'Add Vehicle Type',
      uri: '/manage/vehicletypes/create',
      description: 'Add new vehicle type',
      icon: <CommuteIcon fontSize="large" />,
    },
    {
      title: 'Add User',
      uri: '/manage/users/create',
      description: 'Add new users',
      icon: <PeopleAltIcon fontSize="large" />,
    },
  ];
  return (
    <>
      {links.map((x) => (
        <LinkCard {...x} key={x.title} />
      ))}
    </>
  );
};

export default QuickLinks;
