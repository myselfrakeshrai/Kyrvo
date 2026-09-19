import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppStore } from 'src/stores';

interface PopularDishObject {
  Title: string;
  Description: string;
  Price: number;
  Image: string;
}

const PopularDish: React.FC = () => {
  const { getVariable } = useAppStore();

  const PopularDishData = getVariable('PopularDish');
  const PopularDishes = JSON.parse(PopularDishData);

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        padding: '50px',
        marginBottom: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items in the center vertically
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          flexBasis: '70%',
          marginRight: '20px',
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: 'start', mb: 2, color: 'red', ml: 10 }}
        >
          Popular Dishes
        </Typography>
        {PopularDishes.PopularDish.map(
          (popular: PopularDishObject, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <img
                src={popular.Image}
                alt={popular.Title}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginRight: '20px',
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                  {popular.Title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: 'white' }}>
                  {popular.Description}
                </Typography>
                <Typography variant="body1" sx={{ color: 'red' }}>
                  Price: ${popular.Price}
                </Typography>
              </Box>
            </Box>
          ),
        )}
      </Box>
      <img
        src="https://www.deputy.com/uploads/2018/10/The-Most-Popular-Menu-Items-That-You-should-Consider-Adding-to-Your-Restaurant_Content-image1-min-1024x569.png"
        alt="Popular Menu Items"
        style={{ width: '40%', marginRight: '200px' }}
      />
    </Box>
  );
};

export default PopularDish;
