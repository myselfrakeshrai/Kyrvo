import { Box, Grid, LinearProgress, Paper, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import ImageSelectorCard from 'src/components/ImageSelector/ImageSelectorCard';
import ImageUploader from 'src/components/ImageSelector/ImageUploader';
import { Media } from 'src/models';
import { MediaServices } from 'src/services/mediaServices';

const MediaPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [copySnackbarOpen, setCopySnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data } = useQuery({
    queryKey: ['media_loading'],
    queryFn: () => MediaServices.getAll().then((res) => res),
  });

  const mutation = useMutation<Media[], Error>({
    mutationFn: () => MediaServices.getAll().then((res) => res),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media_loading'] });
    },
  });

  const onImageUpload = () => {
    mutation.mutate();
    alert('Uploaded');
  };

  const onImageUploadError = () => {
    alert('Something went wrong');
  };

  const onDelete = (id: string) => {
    const c = confirm('Do you want to permanently delete this file?');
    if (c) {
      MediaServices.delete(id)
        .then(() => {
          mutation.mutate();
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopySnackbarOpen(true);
    setSnackbarMessage('Image URL copied to clipboard');
  };

  const handleCloseSnackbar = () => {
    setCopySnackbarOpen(false);
  };

  return (
    <Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: 4,
          py: 2,
        }}
      >
        <ImageUploader
          success={onImageUpload}
          error={onImageUploadError}
          sx={{ marginLeft: 'auto' }}
        />
      </Box>
      {mutation.isPending && <LinearProgress />}
      <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 1 }}>
        <Paper elevation={0}>
          <Grid
            container
            spacing={1}
            padding={2}
            sx={{ borderLeft: '1px dotted #aaa', height: '100%' }}
          >
            {data?.map((image: Media) => (
              <ImageSelectorCard
                key={image.Id}
                displaySize={200}
                image={image}
                onDelete={onDelete}
                onCopyUrl={handleCopyUrl}
              />
            ))}
          </Grid>
        </Paper>
      </Box>
      <Snackbar
        open={copySnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default MediaPage;
