import React from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import SadIcon from '../../icons/SadIcon';

export default function NoResultItem() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: '30px 20px',
        borderRadius: 'var(--border-radius-1)',
      }}>
      <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
        <SadIcon />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
            color: 'var(--text-clr-secondary)',
          }}>
          По вашему запросу ничего не найдено
          <br />
          Пожалуйста, измените параметры фильтра
        </Typography>
      </Stack>
    </Paper>
  );
}
