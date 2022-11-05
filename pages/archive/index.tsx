import React, { useState } from 'react';
import Header from '../../components/main/Header';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AppButton from '../../components/buttons/AppButton';
import FilterIcon from '../../components/icons/FilterIcon';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '../../components/icons/SearchIcon';
import ArchiveList from '../../components/lists/ArchiveList';

type Props = {};

export default function ArchivePage({}: Props) {
  const [type, setType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box>
      <Header hasStepProgress={false} />
      <Box sx={{ padding: '30px' }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: '50px',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '26px',
            color: 'var(--text-clr-main)',
          }}>
          Архив запросов
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mb: '30px' }}>
          <Stack direction='row' sx={{ gap: '20px' }}>
            <AppButton
              variant='secondary'
              size='small'
              startIcon={<FilterIcon />}>
              Фильтр
            </AppButton>
            <Select value={type} onChange={handleChange} displayEmpty>
              <MenuItem value=''>Сначала новые</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Stack>
          <TextField
            placeholder='Поиск'
            sx={{ width: '330px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <ArchiveList />
      </Box>
    </Box>
  );
}
