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
  ChipInput,
  FormActions,
  HtmlEditor,
  ImageSelector,
} from 'src/components';
import { useParams } from 'react-router-dom';
import { BlogService } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { BlogPost } from 'src/models';
import { useQuery } from '@tanstack/react-query';
import { BlogTagService } from 'src/services/blogtagService';
import { BlogCategoryService } from 'src/services/blogcategoryService';
import { useAppStore } from 'src/stores';

const BlogPostSchema: z.ZodType<BlogPost> = z.object({
  Title: z.string().min(3, 'Title must be at least three characters long'),
  Body: z.string().min(10, 'Body must be at least 10 characters long'),
  Category: z.string().nullable().optional(),
  Tags: z.string().nullable().optional(),
  FeaturedImage: z.string().nullable().optional(),
  Published: z.number(),
  IsFeatured: z.number(),
});

const BlogPostPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;
  const { user } = useAppStore();
  const tags = useQuery({
    queryKey: ['blogtag'],
    queryFn: () =>
      BlogTagService.getAll().then((res) => res.map((x) => x.Name)),
  });
  const categories = useQuery({
    queryKey: ['blogcategory'],
    queryFn: () =>
      BlogCategoryService.getAll().then((res) => res.map((x) => x.Name)),
  });
  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { defaultValues, errors, isDirty },
  } = useForm<BlogPost>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: async () => (id ? BlogService.get(id) : ({} as BlogPost)),
  });
  console.log(errors);

  const onSubmit: SubmitHandler<BlogPost> = (formData: BlogPost) => {
    if (id) {
      const confirm = window.confirm(
        `This will update blog entry in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        formData.AuthorId = user?.Id;
        BlogService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('blog');
          });
      }
    } else {
      setLoading(true);
      formData.AuthorId = user?.Id;
      BlogService.addNew(formData)
        .then((res) => {
          goto('blog');
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
    goto('blog');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove blog post in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      BlogService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('blog');
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
            {action} Blog Post
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
              id="Title"
              label="Post Title"
              variant="outlined"
              fullWidth
              error={errors.Title ? true : undefined}
              helperText={errors.Title?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Title')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <HtmlEditor
              label="Post Body"
              initialValue={defaultValues?.Body}
              onChange={(val: string) =>
                setValue('Body', val, { shouldDirty: true })
              }
              error={errors?.Body ? true : undefined}
              helperText={errors?.Body?.message}
              // {...register('Body')}
            />
          </Grid>
          <Grid item sm={8}>
            <ChipInput
              options={categories.data}
              label="Blog Categories"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.Category ? true : undefined}
              helperText={errors.Category?.message}
              value={watch('Category')?.split('|') || undefined}
              onUpdate={(vals: string[]) =>
                setValue('Category', vals?.join('|') || undefined, {
                  shouldDirty: true,
                })
              }
            />
          </Grid>
          <Grid item sm={8}>
            <ChipInput
              options={tags.data}
              label="Blog Tags"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.Tags ? true : undefined}
              helperText={errors.Tags?.message}
              value={watch('Tags')?.split('|') || undefined}
              onUpdate={(vals: string[]) =>
                setValue('Tags', vals?.join('|') || undefined, {
                  shouldDirty: true,
                })
              }
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="published">Published</InputLabel>
              <Select
                labelId="published"
                label="published"
                defaultValue={defaultValues?.Published || 0}
                error={errors.Published ? true : undefined}
                {...register('Published', { valueAsNumber: true })}
              >
                <MenuItem value={0}>Draft</MenuItem>
                <MenuItem value={1}>Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="featured">Featured</InputLabel>
              <Select
                labelId="featured"
                label="featured"
                defaultValue={defaultValues?.IsFeatured || 0}
                error={errors.IsFeatured ? true : undefined}
                {...register('IsFeatured', { valueAsNumber: true })}
              >
                <MenuItem value={1}>Yes</MenuItem>

                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              label="Featured Image"
              initial={
                (getValues('FeaturedImage')
                  ? getValues('FeaturedImage')?.split('|')
                  : defaultValues.FeaturedImage?.split('|')) || []
              }
              onSubmit={(ids: string[]) => {
                setValue('FeaturedImage', ids.join('|'), {
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

export default BlogPostPage;
