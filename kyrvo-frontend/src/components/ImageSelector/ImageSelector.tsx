import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  LinearProgress,
  ImageList,
  Paper,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { MediaServices } from 'src/services/mediaServices';
import ImageUploader from './ImageUploader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Media } from 'src/models';
import './ImageSelector.css';
import ImageSelectorCard from './ImageSelectorCard';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
};

interface ImageSelectionModalProps {
  initial?: string[];
  onSubmit: (imageIds: string[]) => void;
  displaySize?: number;
  selectionSize?: number;
  singleSelect?: boolean;
  label: string;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({
  onSubmit,
  singleSelect,
  displaySize = 150,
  selectionSize = 90,
  initial = [],
  label,
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set([]));
  useEffect(() => {
    if (initial) setSelected(new Set(initial));
  }, [initial]);

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
  const toggleSelection = (image: Media) => {
    if (singleSelect) {
      const id = image?.Id as string;
      if (selected.has(id)) {
        setSelected(new Set([]));
      } else {
        setSelected(new Set([image?.Id as string]));
      }
    } else {
      const id = image?.Id as string;
      if (selected.has(id)) {
        selected.delete(image?.Id as string);
      } else {
        selected.add(image?.Id as string);
      }
      setSelected(new Set(selected));
    }
  };
  const acceptChanges = () => {
    onSubmit([...selected]);
    setOpen(false);
  };
  const onCancel = () => {
    setSelected(new Set(initial));
    setOpen(false);
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
  const selectedImagesList = (addNew: boolean = true) => {
    return (
      <Grid
        container
        spacing={2}
        sx={{
          height: 120,
          padding: 1,
          my: 2,
          borderTop: '1px solid #eee',
        }}
      >
        <Grid item xs={12}>
          <Typography>
            Selected {singleSelect ? 'Image' : 'Images'} for {label}
          </Typography>
        </Grid>
        <ImageList
          sx={{
            marginLeft: 3,
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: `repeat(auto-fill,minmax(${selectionSize}px,1fr)) !important'`,
            gridAutoColumns: `minmax(${selectionSize}px, 1fr)`,
          }}
        >
          {data ? (
            data
              .filter((x: Media) => selected.has(x.Id as string))
              ?.map((image: Media) => (
                <Grid item key={image.Id}>
                  <ImageSelectorCard
                    displaySize={selectionSize}
                    selected={selected.has(image.Id as string)}
                    image={image}
                    toggleSelection={toggleSelection}
                    noActions={addNew}
                  />
                </Grid>
              ))
          ) : (
            <></>
          )}

          {addNew && (
            <Grid
              item
              sx={{
                px: 1,
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              {addNew && (
                <Button
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 1)',
                  }}
                  onClick={() => setOpen(true)}
                  startIcon={<Edit color="info" />}
                >
                  Update
                </Button>
              )}
            </Grid>
          )}
        </ImageList>
      </Grid>
    );
  };
  return (
    <div>
      <Box sx={{ p: 2 }}>{selectedImagesList(true)}</Box>
      <Modal open={open} onClose={onCancel} title={'Media Library'}>
        <Card sx={style}>
          <Box
            color={'primary'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              px: 4,
              py: 2,
            }}
          >
            <Typography variant="h5" color={'#fff'}>
              Image Selector
            </Typography>
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
                    displaySize={displaySize}
                    selected={selected.has(image.Id as string)}
                    image={image}
                    onDelete={onDelete}
                    toggleSelection={toggleSelection}
                  />
                ))}
              </Grid>
            </Paper>
          </Box>
          <Box sx={{ p: 2 }}>{selectedImagesList(false)}</Box>

          <Box
            color={'primary'}
            sx={{
              height: 70,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              p: 2,
            }}
            alignContent={'flex-end'}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={acceptChanges}
            >
              Submit Changes
            </Button>
            <Button size="small" onClick={onCancel}>
              Cacnel
            </Button>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

export default ImageSelectionModal;
