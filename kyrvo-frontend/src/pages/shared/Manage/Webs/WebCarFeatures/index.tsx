import React, { useState } from 'react';
import {
  Alert,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { FormActionsUpdate, ImageSelector } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { Web } from 'src/models';
import { WebServices } from 'src/services';
import { useAppStore } from 'src/stores';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';

const WebSchema: z.ZodType<Web> = z.object({
  CarFeatureImage: z.string().optional(),
});

const WebCarFeaturePage: React.FC = () => {
  const { config } = useAppStore();
  const id = config.Id;
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  //React hook form related intiialization
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { defaultValues, isDirty },
  } = useForm<Web>({
    resolver: zodResolver(WebSchema),
    defaultValues: async () => (id ? WebServices.getConfig() : ({} as Web)),
  });

  const onSubmit: SubmitHandler<Web> = (formData: Web) => {
    if (id) {
      const confirm = window.confirm(
        `This will update Web CarFeature "${defaultValues?.Id}" in production. Do you want to continue?`,
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
            navigate('/manage/webcarFeature');
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
          navigate('/manage/webcarFeature');
        });
    }
  };

  const onCancel = () => {
    navigate('/manage/webcarFeature');
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
            {PAGE_ACTIONS.edit} Web CarFeature
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
            <ImageSelector
              label="CarFeatureImage"
              singleSelect={true}
              initial={
                getValues('CarFeatureImage')
                  ? getValues('CarFeatureImage')?.split('|')
                  : defaultValues?.CarFeatureImage?.split('|') || []
              }
              onSubmit={(ids: string[]) => {
                setValue('CarFeatureImage', ids.join('|'), {
                  shouldDirty: true,
                });
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

export default WebCarFeaturePage;
