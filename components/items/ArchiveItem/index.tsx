import React from 'react';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DownloadIcon from '../../icons/DownloadIcon';
import { ArrowRight } from '../../icons/ArrowRightIcon';
import { ArchiveItemType } from './types';

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

type Props = { item: ArchiveItemType };

export default function ArchiveItem({ item }: Props) {
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
          <PrimaryTypography>{item.date}</PrimaryTypography>
          <PrimaryTypography>{item.name}</PrimaryTypography>
          <SecondaryTypography>{item.address}</SecondaryTypography>
          <SecondaryTypography>{item.flatsAmount} квартир</SecondaryTypography>
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
