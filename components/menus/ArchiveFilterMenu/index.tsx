import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import AppButton from '../../buttons/AppButton';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppCheckbox from '../../checkboxes/AppCheckbox';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MainTitle, Subtitle } from './styled';

function valuetext(value: number) {
  return `${value}°C`;
}

type Props = {
  anchorEl?: any;
  open?: any;
  onClose?: () => void;
};

export default function ArchiveFilterMenu({ anchorEl, open, onClose }: Props) {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          marginTop: '20px',
          p: '30px',
          borderRadius: 'var(--border-radius-1)',
          boxShadow: 'var(--shadow-controls)',
        },

        '& .MuiList-root': {
          display: 'grid',
          gap: '30px',
        },
      }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <MainTitle>Фильтр</MainTitle>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Stack>
        <Subtitle>Даты запроса</Subtitle>
        <Stack direction='row'>
          <Typography>с</Typography>
          <TextField type='date' variant='outlined' />
          <Typography>по</Typography>
          <TextField type='date' variant='outlined' />
        </Stack>
      </Stack>

      <Stack direction='row' sx={{ gap: '30px' }}>
        <Stack>
          <Subtitle>Сегмент</Subtitle>
          <FormGroup>
            <FormControlLabel
              control={<AppCheckbox name='new' />}
              label='Новостройка'
            />
            <FormControlLabel
              control={<AppCheckbox name='modern' />}
              label='Современное жилье'
            />
            <FormControlLabel
              control={<AppCheckbox name='old' />}
              label='Старый жилой фонд'
            />
          </FormGroup>
        </Stack>
        <Stack>
          <Subtitle>Материал стен</Subtitle>
          <FormGroup>
            <FormControlLabel
              control={<AppCheckbox name='new' />}
              label='Новостройка'
            />
            <FormControlLabel
              control={<AppCheckbox name='modern' />}
              label='Современное жилье'
            />
            <FormControlLabel
              control={<AppCheckbox name='old' />}
              label='Старый жилой фонд'
            />
          </FormGroup>
        </Stack>
      </Stack>

      <Stack>
        <Subtitle>Этажность дома</Subtitle>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
          getAriaValueText={valuetext}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Typography>с</Typography>
          <TextField variant='outlined' />
          <Typography>по</Typography>
          <TextField variant='outlined' />
        </Stack>
      </Stack>

      <Stack direction='row' sx={{ gap: '30px' }}>
        <AppButton variant='secondary'>Очистить</AppButton>
        <AppButton onClick={onClose}>Применить</AppButton>
      </Stack>
    </Menu>
  );
}
