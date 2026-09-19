import React, { useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { EventCategoryService } from 'src/services/eventcategoryService';
import { EventCategory } from 'src/models/EventCategory';

interface MenuTitleProps {
  onCategorySelect: (category: EventCategory) => void;
  selectedCategory: EventCategory | undefined;
}

const MenuTitle: React.FC<MenuTitleProps> = ({
  onCategorySelect,
  selectedCategory,
}) => {
  const categoriesQuery = useQuery({
    queryKey: ['category'],
    queryFn: () => EventCategoryService.getAll().then((res) => res),
  });

  const categories = useMemo(
    () => categoriesQuery.data || [],
    [categoriesQuery.data],
  );

  const defaultCategory = categories[0];

  React.useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      onCategorySelect(defaultCategory);
    }
  }, [categories, defaultCategory, onCategorySelect, selectedCategory]);

  return (
    <>
      <Typography
        variant="h4"
        style={{
          fontSize: '24px',
          textAlign: 'center',
          marginTop: '100px',
          marginBottom: '40px',
          position: 'relative',
        }}
      >
        Hot Menu Today
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {categories.map((option, index) => (
          <Typography
            key={index}
            variant="h6"
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'color 0.3s',
              padding: '5px 10px',
              marginRight: index !== categories.length - 1 ? '20px' : '0',
              textDecoration: 'underline',
              textDecorationColor:
                option === selectedCategory ? '#FF5733' : 'transparent',
              textDecorationThickness: '2px',
            }}
            onClick={() => onCategorySelect(option)}
          >
            {option.Name}
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default MenuTitle;
