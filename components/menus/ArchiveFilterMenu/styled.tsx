import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const MainTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '22px',
  color: 'var(--text-clr-main)',
});

export const Subtitle = styled(Typography)({
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '22px',
  color: 'var(--text-clr-main)',
});

export * from './styled';
