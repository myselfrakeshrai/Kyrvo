import { LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import JsonFormRenderer from 'src/components/form/JsonFormRenderer';
import { CollectionData } from 'src/models';
import { CollectionDataService } from 'src/services';
import { CollectionService } from 'src/services';
const CollectionDataPage: React.FC = () => {
  const { id } = useParams();
  const cdata = useQuery({
    queryKey: ['cdata_page'],
    queryFn: () =>
      id ? CollectionDataService.get(id).then((res) => res) : null,
    staleTime: 10,
  });
  const collection = useQuery({
    queryKey: ['collection_cdata_page'],
    queryFn: () => (id ? CollectionService.get(id).then((res) => res) : null),
    staleTime: 10,
  });
  const onSubmit = async (data: string) => {
    const formData = {
      Id: id,
      Data: data,
    } as CollectionData;
    cdata.data
      ? CollectionDataService.edit(id || '0', formData).then((res) => {
          alert('Data saved successfully');
          return res;
        })
      : CollectionDataService.addNew(formData).then((res) => {
          alert('Data saved successfully');
          return res;
        });
  };
  if (collection.isLoading || cdata.isLoading) {
    return <LinearProgress />;
  }
  return (
    <JsonFormRenderer
      schema={collection.data?.JsonSchema || '{}'}
      uiSchema={collection.data?.UiSchema || '{}'}
      data={cdata.data?.Data || '{}'}
      onSubmit={(data) => onSubmit(data)}
    />
  );
};

export default CollectionDataPage;
