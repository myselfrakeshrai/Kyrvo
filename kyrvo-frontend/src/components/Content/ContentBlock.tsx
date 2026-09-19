import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';
import './ContentBlock.css';
import KyContentSection from '../KyContentSection';

interface ContentBlockProps {
  title: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  subtitle: string;
  description: string;
  imageUrl: string;
  link?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  subtitle,
  align,
  description,
  imageUrl,
  link,
}) => {
  return (
    <KyContentSection maxWidth={'xl'} py={0} px={0} noTopMargin my={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader title={title} fontWeight={false} alignment={align} />
          {subtitle && <Typography
            variant="subtitle1"
            component="div"
            color="text.secondary"
          >
            {subtitle}
          </Typography>}
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          textAlign={'center'}
          className="ky-image-wrapper"
        >
          <img src={imageUrl} alt="Logo" className="ky-image" />
        </Grid>
        <Grid item xs={12} sm={8} className="ky-text-container">
          <Typography variant="body1">
            <p
              className="ky-description-body"
              dangerouslySetInnerHTML={{ __html: description || '' }}
            ></p>
          </Typography>
          {link && (
            <Button
              variant="contained"
              color="primary"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Us
            </Button>
          )}
        </Grid>
      </Grid>
    </KyContentSection>
  );
};

export default ContentBlock;
