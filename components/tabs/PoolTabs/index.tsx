import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import PoolTable from '../../tables/PoolTable';

export default function PoolTabs() {
  return (
    <Paper
      sx={{
        boxShadow: 'var(--shadow)',
      }}>
      <Stack direction='row' alignItems='center' sx={{ gap: '15px' }}>
        <Button variant='text'>Студии</Button>
        <Button variant='text'>1-комнатные</Button>
        <Button variant='text'>2-комнатные</Button>
        <Button variant='text'>3-комнатные</Button>
        <Button variant='text'>4-комнатные</Button>
        <Button variant='text'>5-комнатные</Button>
      </Stack>

      <PoolTable />
    </Paper>
  );
}
