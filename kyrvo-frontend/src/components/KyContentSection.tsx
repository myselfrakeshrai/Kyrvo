import { FC, ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import { useResponsive } from 'src/hooks/useResponsive';

type KyContentSectionProps = {
  maxWidth?: 'sm' | 'lg' | 'xl';
  backgroundColor?: string;
  children: ReactNode;
  noTopMargin?: boolean;
  py?: number;
  px?: number;
  mx?: number | 'auto';
  my?: number | 'auto';
};

const KyContentSection: FC<KyContentSectionProps> = ({
  maxWidth = 'xl',
  backgroundColor = 'trasparent',
  py = 10,
  px = 5,
  my = 'auto',
  mx = 'auto',
  noTopMargin = false,
  children,
}) => {
  const { isMobile } = useResponsive();
  if (isMobile) {
    px = px/2;
    py = py/2;
  }
  return (
    <Box sx={{ width: '100%', bgcolor: backgroundColor }}>
      <Container maxWidth={maxWidth} sx={{ py, px, mx, mb:my, mt:noTopMargin?0:my}}>
        {children}
      </Container>
    </Box>
  );
};

export default KyContentSection;
