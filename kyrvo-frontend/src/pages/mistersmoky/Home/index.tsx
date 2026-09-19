import React, { useEffect, useMemo, useState } from 'react';
import { Grid, LinearProgress } from '@mui/material';
import Slider from 'src/pages/shared/Slider/Slider';
import Discover from '../components/Discover/Discover';
import MenuItemList from 'src/components/Menu/MenuItemList';
import { MenuItemService } from 'src/services/menuItemService';
import { useQuery } from '@tanstack/react-query';
import { EventCategory } from 'src/models/EventCategory';
import { EventCategoryService } from 'src/services/eventcategoryService';
import './Home.css';
const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>();

  const { isLoading, data } = useQuery({
    queryKey: ['menuitem'],
    queryFn: () => MenuItemService.getAll(),
    staleTime: 100,
  });

  const handleCategorySelect = (category: EventCategory | undefined) => {
    if (category) {
      setSelectedCategory(category);
    }
  };

  const categoriesQuery = useQuery({
    queryKey: ['category'],
    queryFn: () => EventCategoryService.getAll().then((res) => res),
  });

  const categories = useMemo(() => {
    if (categoriesQuery.data) {
      return categoriesQuery.data.sort(
        (a, b) => (a.DisplayOrder || 0) - (b.DisplayOrder || 0),
      );
    } else {
      return [];
    }
  }, [categoriesQuery.data]);

  useEffect(() => {
    handleCategorySelect(selectedCategory);
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!data) {
    return <div>Data not available</div>;
  }

  return (
    <>
      <Grid sx={{ maxWidth: 'calc(100vw - 7px)', overflowX: 'hidden' }}>
        <Slider />
      </Grid>
      <section id="about-us">
        <Discover />
      </section>
      <section id="our-menu">
        <MenuItemList
          key="menuitems"
          menuItems={data}
          header="Our Menu"
          categories={categories}
        />
      </section>
    </>
  );
};

export default HomePage;
