import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from 'src/models';
import { getFormattedDate } from 'src/utils/helpers';

const BlogPostSnippet: React.FC<BlogPost> = (post) => {
  const navigate = useNavigate();
  const loadPost = () => {
    navigate(`/blog/${post.Id}`);
  };
  return (
    <Card style={{ width: '100%', maxWidth: '700px', margin: '10px' }}>
      <CardActionArea onClick={loadPost}>
        <CardMedia
          component="img"
          width="100"
          height="200"
          image={`${import.meta.env.VITE_STATIC_URL}${post.FeaturedImage}`}
          alt={post.Title}
        />
        <CardContent>
          <Typography variant="h6">{post.Title}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: post.Body.slice(0, 100) + '...',
            }}
          ></Typography>
          <Typography variant="body2" color="textSecondary">
            Author: {post.AuthorId}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category: {post.Category}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created Date: {getFormattedDate(post.CreatedOn as number)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogPostSnippet;
