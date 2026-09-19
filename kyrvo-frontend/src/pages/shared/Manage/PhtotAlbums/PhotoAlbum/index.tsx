import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  FormActions,
  ImageSelector,
} from 'src/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { PhotoAlbum } from 'src/models/PhotoAlbum';
import { PhotoAlbumService } from 'src/services/photoAlbumService';

const PhotoAlbumchema: z.ZodType<PhotoAlbum> = z.object({
  Name: z.string().min(3, 'Title must be at least three characters long'),
  Description: z.string(),
  Images: z.string(),
  Type: z.number(),
});

const PhotoAlbumPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;
 
  
  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { defaultValues, errors, isDirty },
  } = useForm<PhotoAlbum>({
    resolver: zodResolver(PhotoAlbumchema),
    defaultValues: async () => (id ? PhotoAlbumService.get(id) : ({} as PhotoAlbum)),
  });
  

  const onSubmit: SubmitHandler<PhotoAlbum> = (formData: PhotoAlbum) => {
    if (id) {
      const confirm = window.confirm(
        `This will update blog entry in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        PhotoAlbumService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('photoalbum');
          });
      }
    } else {
      setLoading(true);
      PhotoAlbumService.addNew(formData)
        .then((res) => {
          goto('photoalbum');
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
 
  const onCancel = () => {
    goto('photoalbum');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove blog post in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      PhotoAlbumService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('event');
        });
    }
  };
  if (!defaultValues) {
    return <LinearProgress />;
  }

  return (
    <Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ textTransform: 'uppercase' }}
          >
            {action} Photo Album
          </Typography>
        </Grid>
      </Grid>
      {loading && <LinearProgress />}
      {error && (
        <Alert variant="standard" severity="error" sx={{ width: '80%', m: 1 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} marginTop={1}>
          <Grid item sm={8}>
            <TextField
              id="Name"
              label="Album Name"
              variant="outlined"
              fullWidth
              error={errors.Name ? true : undefined}
              helperText={errors.Name?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Name')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Description"
              label="Album Description"
              variant="outlined"
              fullWidth
              error={errors.Description ? true : undefined}
              helperText={errors.Description?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Description')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="Type">Type</InputLabel>
              <Select
                labelId="Type"
                label="Type"
                defaultValue={defaultValues?.Type || 0}
                error={errors.Type ? true : undefined}
                {...register('Type', { valueAsNumber: true })}
              >
                <MenuItem value={0}>Image</MenuItem>
                {/* <MenuItem value={1}>Published</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              label="Featured Image"
              initial={
                (getValues('Images')
                  ? getValues('Images')?.split('|')
                  : defaultValues.Images?.split('|')) || []
              }
              onSubmit={(ids: string[]) => {
                setValue('Images', ids.join('|'), {
                  shouldDirty: true,
                });
              }}
            />
          </Grid>
          <Grid item sm={8}>
            <FormActions
              pageAction={action}
              isDirty={isDirty}
              submitText={id ? 'Update' : 'Create'}
              onCancel={onCancel}
              onDelete={onDelete}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default PhotoAlbumPage;
