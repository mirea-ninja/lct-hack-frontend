import React from 'react';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DownloadIcon from '../../icons/DownloadIcon';
import { ArrowRight } from '../../icons/ArrowRightIcon';

const PrimaryTypography = styled(Typography)({
  color: 'var(--text-clr-main)',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '20px',
});

const SecondaryTypography = styled(Typography)({
  color: 'var(--text-clr-secondary)',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '20px',
});

type Props = {};

export default function ArchiveItem({}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: '20px',
        borderRadius: 'var(--border-radius-1)',
        cursor: 'pointer',

        '&:hover': {
          boxShadow: 'var(--shadow-1)',
        },
      }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' sx={{ gap: '70px' }}>
          <PrimaryTypography>03.10.2022</PrimaryTypography>
          <PrimaryTypography>Название запроса</PrimaryTypography>
          <SecondaryTypography>Ватутина, 34к2</SecondaryTypography>
          <SecondaryTypography>50 квартир</SecondaryTypography>
        </Stack>
        <Stack direction='row' alignItems='center' sx={{ gap: '50px' }}>
          <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
            <Button
              variant='text'
              startIcon={<DownloadIcon />}
              sx={{ color: 'var(--text-clr-secondary)' }}>
              Первичный файл
            </Button>
            <Button
              variant='text'
              startIcon={<DownloadIcon />}
              sx={{ color: 'var(--accent-clr)' }}>
              Итоговый файл
            </Button>
          </Stack>
          <ArrowRight />
        </Stack>
      </Stack>
    </Paper>
  );
}
