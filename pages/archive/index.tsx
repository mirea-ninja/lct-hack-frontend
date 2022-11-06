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
import ArchiveFilterMenu from '../../components/menus/ArchiveFilterMenu';
import TagItem from '../../components/items/TagItem';
import NoResultItem from '../../components/items/NoResultItem';

type Props = {};

export default function ArchivePage({}: Props) {
  const [type, setType] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Box>
      <Header isArchive={true}/>
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
        <Stack sx={{ mb: '30px', gap: '20px' }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Stack direction='row' sx={{ gap: '20px' }}>
              <AppButton
                variant='secondary'
                size='small'
                startIcon={<FilterIcon />}
                onClick={handleClick}>
                Фильтр
              </AppButton>
              <ArchiveFilterMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              />
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
          <Stack direction='row' sx={{ gap: '20px' }}>
            <TagItem
              label='Запросы с 01.01.2022 по 04.11.2022'
              onDelete={handleDelete}
            />
            <TagItem
              label='Запросы с 01.01.2022 по 04.11.2022'
              onDelete={handleDelete}
            />
          </Stack>
        </Stack>

        <br />
        <NoResultItem />
        <br />

        <ArchiveList />
      </Box>
    </Box>
  );
}
