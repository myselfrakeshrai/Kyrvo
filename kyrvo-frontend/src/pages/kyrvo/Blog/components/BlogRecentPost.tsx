import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BlogPost } from 'src/models';
import { BlogService } from 'src/services';
import { useAppStore } from 'src/stores';
import { getFormattedDate } from 'src/utils/helpers';

const BlogRecentPost: React.FC = () => {
  const { setBlogPost } = useAppStore();
  const { data: BlogPostData } = useQuery({
    queryKey: ['blog_post'],
    queryFn: () =>
      BlogService.getAll().then((res) => {
        setBlogPost(res);
        return res;
      }),
  });
  return (
    <Box mt={1}>
      <Typography variant="h5">Recent Post</Typography>
      {BlogPostData?.map((blogPost: BlogPost) => (
        <Card sx={{ display: 'flex', my: 1}}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`${import.meta.env.VITE_STATIC_URL}${blogPost.FeaturedImage}`}
            alt={blogPost.Title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div">{blogPost.Title}</Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Typography component="div">{getFormattedDate(blogPost.CreatedOn as number)}</Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default BlogRecentPost;
