import React, { ChangeEvent } from 'react';
import { Button, Grid, SxProps } from '@mui/material';
import { MediaServices } from 'src/services/mediaServices';
import {AddAPhoto as AddIcon} from '@mui/icons-material';
import { Media } from 'src/models';
interface ImageUploaderProps {
  success: (res: Media) => void;
  error: (e: Error) => void;
  sx: SxProps;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  success,
  error,
  sx,
}) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const selectedFile = selectedFiles[0];
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (image: File) => {
    const formData = new FormData();
    const imageData = { Type: 'IMAGE', Active: 1, Name: image.name };
    formData.append('file', image);
    formData.append('document', JSON.stringify(imageData));
    MediaServices.addNew(formData)
      .then((res) => {
        success(res);
      })
      .catch((e) => {
        error(e);
      });
  };

  return (
    <Grid sx={sx}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          color="secondary"
          component="span"
          startIcon={<AddIcon />}
        >
          Add New
        </Button>
      </label>
    </Grid>
  );
};

export default ImageUploader;
