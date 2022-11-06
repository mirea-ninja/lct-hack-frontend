import React, { useState } from 'react';
import Header from '../../../components/main/Header';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AppButton from '../../../components/buttons/AppButton';
import IconButton from '@mui/material/IconButton';
import { CloseIcon } from '../../../components/icons/CloseIcon';
import { FormControlLabel } from '@mui/material';
import AppCheckbox from '../../../components/checkboxes/AppCheckbox';
import PoolTabs from '../../../components/tabs/PoolTabs';

type Props = {};

export default function CalculateEtalonsPage({}: Props) {
  return (
    <Box>
      <Header stepProgress={3} />
      <Box sx={{ padding: '30px' }}>
        <Stack sx={{ mb: '30px', gap: '20px' }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '22px',
                color: 'var(--text-clr-main)',
              }}>
              Расчет цен для пула объектов
            </Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Stack sx={{ gap: '10px' }}>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '22px',
                  color: 'var(--text-clr-main)',
                }}>
                Название запроса
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '22px',
                  color: 'var(--text-clr-main)',
                }}>
                Ватутина, 11, современное жилье, 22 этажа, панель
              </Typography>
            </Stack>
            <Stack direction='row' sx={{ gap: '50px' }}>
              <FormControlLabel
                control={<AppCheckbox defaultChecked />}
                label={
                  <Typography
                    sx={{
                      maxWidth: '200px',
                      fontSize: '16px',
                      lineHeight: '18px',
                      fontWeight: 500,
                      color: 'var(--text-clr-secondary)',
                    }}>
                    Добавить корректировки в файл
                  </Typography>
                }
                sx={{
                  fontSize: '16px',
                  lineHeight: '18px',
                  fontWeight: 500,
                  marginLeft: 0,
                  color: '#3E3E41',
                }}
              />
              <AppButton size='small'>Экспортировать пул</AppButton>
            </Stack>
          </Stack>
        </Stack>
        <PoolTabs />
      </Box>
    </Box>
  );
}
