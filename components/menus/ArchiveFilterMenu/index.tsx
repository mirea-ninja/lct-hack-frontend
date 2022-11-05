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
  const [value, setValue] = React.useState<number[]>([1, 37]);

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
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Stack sx={{ gap: '20px' }}>
        <Subtitle>Даты запроса</Subtitle>
        <Stack direction='row' alignItems='center' sx={{ gap: '20px' }}>
          <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
            <Typography>с</Typography>
            <TextField
              type='date'
              variant='outlined'
              sx={{
                '& input': {
                  padding: '10px 20px',
                },
              }}
            />
          </Stack>
          <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
            <Typography>по</Typography>
            <TextField
              type='date'
              variant='outlined'
              sx={{
                '& input': {
                  padding: '10px 20px',
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack direction='row' sx={{ gap: '30px' }}>
        <Stack sx={{ gap: '20px' }}>
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
        <Stack sx={{ gap: '20px' }}>
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

      <Stack sx={{ gap: '10px' }}>
        <Subtitle>Этажность дома</Subtitle>
        <Stack sx={{ maxWidth: '320px', gap: '5px' }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
            min={1}
            max={30}
          />
          <Stack direction='row' alignItems='center' sx={{ gap: '20px' }}>
            <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
              <Typography>с</Typography>
              <TextField
                variant='outlined'
                sx={{
                  maxWidth: '70px',
                  '& input': {
                    padding: '10px 20px',
                  },
                }}
              />
            </Stack>
            <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
              <Typography>по</Typography>
              <TextField
                variant='outlined'
                sx={{
                  maxWidth: '70px',
                  '& input': {
                    padding: '10px 20px',
                  },
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction='row' sx={{ gap: '30px' }}>
        <AppButton variant='secondary'>Очистить</AppButton>
        <AppButton onClick={onClose}>Применить</AppButton>
      </Stack>
    </Menu>
  );
}
