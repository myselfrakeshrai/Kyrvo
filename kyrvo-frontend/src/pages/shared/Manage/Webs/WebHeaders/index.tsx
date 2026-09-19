import React, { useState } from 'react';
import { Alert, Grid, LinearProgress, Typography } from '@mui/material';
import { FormActionsUpdate, HtmlEditor, ImageSelector } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { Web } from 'src/models';
import { WebServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from 'src/stores';
import { PAGE_ACTIONS } from 'src/constants/appConstants';

const WebSchema: z.ZodType<Web> = z.object({
  IntroTop: z.string().min(20),
  IntroImage: z.string().optional(),
});

const WebHeaderPage: React.FC = () => {
  const navigate = useNavigate();
  const { config } = useAppStore();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const id = config.Id;

  //React hook form related intiialization
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Web>({
    resolver: zodResolver(WebSchema),
    defaultValues: async () => (id ? WebServices.getConfig() : ({} as Web)),
  });

  const onSubmit: SubmitHandler<Web> = (formData: Web) => {
    if (id) {
      const confirm = window.confirm(
        `This will update Web "${defaultValues?.IntroTop}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        WebServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            navigate('/manage/webheader');
          });
      }
    } else {
      setLoading(true);
      WebServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          navigate('/manage/webheader');
        });
    }
  };

  const onCancel = () => {
    navigate('/manage/webheader');
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
            {PAGE_ACTIONS.edit} Web
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
          <Grid item sm={6}>
            <HtmlEditor
              label="Introduction"
              initialValue={defaultValues?.IntroTop}
              onChange={(val: string) =>
                setValue('IntroTop', val, { shouldDirty: true })
              }
              helperText={errors?.IntroTop?.message}
            />
          </Grid>
          <Grid item sm={3}>
            <ImageSelector
              label="IntroImage"
              singleSelect={true}
              initial={
                getValues('IntroImage')
                  ? getValues('IntroImage')?.split('|')
                  : defaultValues?.IntroImage?.split('|') || []
              }
              onSubmit={(ids: string[]) => {
                setValue('IntroImage', ids.join('|'), { shouldDirty: true });
              }}
            />
          </Grid>
          <Grid item sm={8}>
            <FormActionsUpdate
              pageAction={PAGE_ACTIONS.edit}
              isDirty={isDirty}
              submitText={id ? 'Update' : 'Create'}
              onCancel={onCancel}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default WebHeaderPage;
