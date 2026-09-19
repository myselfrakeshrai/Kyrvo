import React, { useState } from 'react';
import { Alert, Box, Grid, LinearProgress, Pagination } from '@mui/material';
import { BlogPost } from 'src/models';
import { BlogService } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import {
  BlogPostSnippet,
  BlogSearch,
  BlogCategory,
  BlogRecentPost,
  BlogTags,
} from './components';

const BlogPage: React.FC = () => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['blogposts'],
    queryFn: () =>
      BlogService.getAll().then((res) => {
        return res;
      }),
    staleTime: 10,
  });

  const [page, setPage] = useState(1);
  const postsPerPage = 3;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Alert severity="error">{error?.message}</Alert>;
  }

  if (!data) {
    return null;
  }

  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage;
  let visibleBlogs = data;
  visibleBlogs = selectedTitle
    ? data.filter((e) => e.Title === selectedTitle)
    : visibleBlogs;
  console.log('tit' + selectedTitle);
  console.log('cat' + selectedCategory);
  console.log('tag' + selectedTag);
  visibleBlogs = selectedCategory
    ? data.filter((e) => e.Category?.includes(selectedCategory))
    : visibleBlogs;
  visibleBlogs = selectedTag
    ? data.filter((e) => e.Tags?.includes(selectedTag))
    : visibleBlogs;
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          width: { xs: '100%', sm: '80%' },
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Grid xs={12} sm={7}>
          {visibleBlogs.slice(startIndex, endIndex).map((post: BlogPost) => (
            <Box
              key={post.Id}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <BlogPostSnippet {...post} />
            </Box>
          ))}
          <Box display="flex" justifyContent="center" m={2}>
            <Pagination
              count={Math.ceil(data.length / postsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={3} m={{ sm: 0, xs: 5 }} p={{ sm: 2, xs: 0 }}>
          <BlogSearch onChangeTitle={(Title) => setSelectedTitle(Title)} />
          <BlogCategory
            onSelectCategory={(Category) => setSelectedCategory(Category)}
          />
          <BlogRecentPost />
          <BlogTags onSelectTag={(Tag) => setSelectedTag(Tag)} />
        </Grid>
      </Grid>
    </>
  );
};

export default BlogPage;
