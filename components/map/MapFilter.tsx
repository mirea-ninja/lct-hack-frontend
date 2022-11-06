import React from 'react';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import { CloseIcon } from '../icons/CloseIcon';
import IconButton from '@mui/material/IconButton';
import { Collapse } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppCheckbox from '../checkboxes/AppCheckbox';

export default function MapFilter() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'absolute',
        top: '70%',
        right: '30px',
        p: '20px',
        background: '#fff',
        boxShadow: 'var(--shadow-1)',
        borderRadius: 'var(--border-radius-1)',
        zIndex: 1000,
      }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
            color: 'var(--text-clr-main)',
          }}>
          Показывать
        </Typography>
        <IconButton onClick={() => setIsExpanded(prev => !prev)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Collapse in={isExpanded}>
        <FormGroup sx={{ mt: '10px' }}>
          <FormControlLabel
            control={<AppCheckbox name='new' />}
            label='Эталон'
            sx={{ mr: 0, ml: '-8px' }}
          />
          <FormControlLabel
            control={<AppCheckbox name='modern' />}
            label='Аналоги'
            sx={{ mr: 0, ml: '-8px' }}
          />
          <FormControlLabel
            control={<AppCheckbox name='old' />}
            label='Область поиска'
            sx={{ mr: 0, ml: '-8px' }}
          />
          <FormControlLabel
            control={<AppCheckbox name='old' />}
            label='Скрытые аналоги'
            sx={{ mr: 0, ml: '-8px' }}
          />
        </FormGroup>
      </Collapse>
    </Paper>
  );
}
