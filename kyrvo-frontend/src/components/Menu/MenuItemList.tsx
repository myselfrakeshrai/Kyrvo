import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Box, Container } from '@mui/material';
import { MenuItems } from 'src/models/MenuItems';
import { EventCategory } from 'src/models/EventCategory';
import CustomTabs from '../CustomTab';

interface MenuItemTypeProps {
  menuItems: MenuItems[];
  header: string;
  categories: EventCategory[];
}

const MenuItemList: React.FC<MenuItemTypeProps> = ({
  menuItems,
  header,
  categories,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const defaultCategoryId = categories[0]?.Id ?? '';

  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      handleCategorySelect(defaultCategoryId);
    }
  }, [categories, defaultCategoryId, selectedCategoryId, handleCategorySelect]);

  const filteredMenuItems = (
    selectedCategoryId
      ? menuItems.filter(
          (item: MenuItems) => item.Category === selectedCategoryId,
        )
      : menuItems
  )?.sort((a, b) => b.Price - a.Price);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: '24px',
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          {header}
        </Typography>

        <Box
          sx={{
            maxWidth: '100vw',
          }}
        >
          <CustomTabs
            tabs={categories.map((category) => ({
              id: category.Id,
              name: category.Name,
            }))}
            selectedTab={selectedCategoryId}
            onSelectTab={handleCategorySelect}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '20px',
            gap: '50px',
          }}
        >
          <Box
            sx={{
              flex: 1,
              minHeight: '300px',
              maxHeight: { xs: '500px', sm: '2000px' },
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#1976d2',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            {filteredMenuItems.length === 0 && (
              <Typography
                sx={{ color: 'red', textAlign: 'center', marginTop: '50px' }}
              >
                No items found in this category.
              </Typography>
            )}

            {filteredMenuItems.map((menuItem, index) => (
              <Box
                key={index}
                sx={{
                  margin: { sm: '0px 0px 25px 0px', xs: '0px 25px 25px 0px' },
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '16px', md: '16px', lg: '20px' },
                      fontWeight: 900,
                    }}
                  >
                    {menuItem.Name}
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      borderBottom: '1px dashed #aaa',
                      marginLeft: { xs: '0px', sm: '10px' },
                    }}
                  />
                  <Typography variant="body1">${menuItem.Price}</Typography>
                </div>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: menuItem?.Description || '',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MenuItemList;
