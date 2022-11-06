import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import PoolTable from '../../tables/PoolTable';

export default function PoolTabs() {
  return (
    <Paper
      sx={{
        boxShadow: 'var(--shadow-1)',
        borderRadius: 'var(--border-radius-1)',
        overflow: 'hidden',
      }}>
      <Stack sx={{ gap: '30px' }}>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ gap: '15px', padding: '10px 20px 0' }}>
          <Button variant='text'>Студии</Button>
          <Button variant='text'>1-комнатные</Button>
          <Button variant='text'>2-комнатные</Button>
          <Button variant='text'>3-комнатные</Button>
          <Button variant='text'>4-комнатные</Button>
          <Button variant='text'>5-комнатные</Button>
        </Stack>

        <PoolTable />
      </Stack>
    </Paper>
  );
}
