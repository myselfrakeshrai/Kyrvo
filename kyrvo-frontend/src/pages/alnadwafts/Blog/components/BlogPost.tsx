import { Box, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BlogService } from 'src/services';
import { getFormattedDate } from 'src/utils/helpers';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ['blogpost'],
    queryFn: () =>
      BlogService.get(id as string).then((res) => {
        return res;
      }),
    staleTime: 100,
  });

  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <Box m={0} ml={3}>
      <div className="post-container">
        <h2 className="post-title m-3">{data?.Title}</h2>
        {data?.FeaturedImage && (
          <div className="image-container">
            <img
              src={data.FeaturedImage}
              alt="Post Image"
              className="post-image"
            />
          </div>
        )}
        <div className="post-details">
          <div className="page-header">
            <span className="post-category">
              Author: {data?.AuthorId} | On{' '}
              {getFormattedDate(data?.CreatedOn as number)} |{' '}
              <span className="post-category"> {data?.Category}</span>
            </span>
          </div>
          <p
            className="post-body"
            dangerouslySetInnerHTML={{ __html: data?.Body || '' }}
          ></p>
        </div>
      </div>
    </Box>
  );
};

export default BlogPost;
