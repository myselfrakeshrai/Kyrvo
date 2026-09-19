import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BlogCategory } from 'src/models/BlogCategory';
import { BlogCategoryService } from 'src/services/blogcategoryService';
import { useAppStore } from 'src/stores';
interface SearchCategoryProps
{
  onSelectCategory:(Category:string)=>void;
}
const BlogCategorySearch: React.FC<SearchCategoryProps> = ({onSelectCategory}) => {
  const themeInstance = useTheme();  
  const { setBlogCategory } = useAppStore();
  const { data: BlogPostData } = useQuery({
    queryKey: ['blog_category'],
    queryFn: () =>
      BlogCategoryService.getAll().then((res) => {
        setBlogCategory(res);
        return res;
      }),
  });

  return (
    <Box>
      <Typography variant="h5" mt={1}>Categories</Typography>
      {BlogPostData?.map((blogCategory: BlogCategory) => (
        <>
          <Button
            fullWidth
            key={blogCategory.Id}
            data-value={blogCategory.Name}
            onClick={(event)=>onSelectCategory(event.currentTarget.dataset.value || '')}
            sx={{
              fontWeight: 200,
              color: 'inherit',
              textTransform: 'capitalize',
              justifyContent: 'left',
              '&:hover':{
                ml: 1,
                fontWeight: 500,
                background: 'transparent',
                color: themeInstance.palette.primary.main
              }
            }}
          >
            {blogCategory.Name}
          </Button>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default BlogCategorySearch;
