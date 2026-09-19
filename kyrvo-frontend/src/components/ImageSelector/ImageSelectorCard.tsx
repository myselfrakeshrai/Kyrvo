import {
  AddCircleOutline,
  Cancel,
  Delete,
  FileCopy,
} from '@mui/icons-material';
import { ButtonGroup, IconButton, Paper, Tooltip } from '@mui/material';
import React from 'react';
import { Media } from 'src/models';
import { getImageUrl } from 'src/utils/helpers';

interface ImageSelectorCardProps {
  image: Media;
  displaySize: number;
  selected?: boolean;
  noActions?: boolean;
  toggleSelection?: (image: Media) => void;
  onDelete?: (id: string) => void;
  onCopyUrl?: (url: string) => void;
}

const ImageSelectorCard: React.FC<ImageSelectorCardProps> = ({
  image,
  displaySize,
  noActions,
  toggleSelection,
  onDelete,
  selected,
  onCopyUrl,
}) => {
  const handleCopyUrl = () => {
    if (onCopyUrl && image.Id) {
      const imageUrl = getImageUrl(image.Id);
      onCopyUrl(imageUrl);
    }
  };

  return (
    <Paper
      key={image.Id}
      className="image-selector-container"
      sx={{
        backgroundImage: `url('${getImageUrl(image.Id as string)}')`,
        height: displaySize,
        width: displaySize,
      }}
    >
      {!noActions && (
        <ButtonGroup
          className="actions"
          variant="contained"
          size="small"
          aria-label="outlined primary button group"
        >
          {toggleSelection && (
            <IconButton
              size="small"
              onClick={() => toggleSelection(image)}
              aria-label="Toggle Select"
            >
              {selected ? (
                <Cancel color="warning" fontSize="small" />
              ) : (
                <AddCircleOutline color="info" fontSize="small" />
              )}
            </IconButton>
          )}
          <Tooltip title="Copy URL">
            <IconButton size="small" onClick={handleCopyUrl}>
              <FileCopy fontSize="small" />
            </IconButton>
          </Tooltip>
          {onDelete && (
            <IconButton
              size="small"
              aria-label="Delete"
              onClick={() => onDelete(image.Id as string)}
            >
              <Delete color="error" fontSize="small" />
            </IconButton>
          )}
        </ButtonGroup>
      )}
    </Paper>
  );
};

export default ImageSelectorCard;
