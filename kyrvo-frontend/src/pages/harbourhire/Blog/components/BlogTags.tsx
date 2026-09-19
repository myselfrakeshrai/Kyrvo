import { Box, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BlogTag } from 'src/models/BlogTag';
import { BlogTagService } from 'src/services/blogtagService';
import { useAppStore } from 'src/stores';

interface SearchTagProps
{
  onSelectTag:(Tag:string)=>void;
}
const BlogTags: React.FC<SearchTagProps> = ({onSelectTag}) => {

    const { setBlogTag } = useAppStore();
  const { data: BlogTagData } = useQuery({
    queryKey: ['blog_tag'],
    queryFn: () =>
    BlogTagService.getAll().then((res) => {
        setBlogTag(res);
        return res;
      }),
  });
  return (
    <Box>
      <Typography variant="h5">Blog Tags</Typography>
      {BlogTagData?.map((blogTag: BlogTag) => (
        <Button key={blogTag.Id} variant='contained'
         data-value={blogTag.Name}
            onClick={(event)=>onSelectTag(event.currentTarget.dataset.value || '')}
        sx={{margin: '1px',}}>
            {blogTag.Name}
        </Button>
      ))}
    </Box>
  );
};

export default BlogTags;
