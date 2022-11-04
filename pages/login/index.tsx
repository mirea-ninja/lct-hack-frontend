import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Box, Typography, useTheme } from '@mui/material';
import { StackProps } from '@mui/system';
import { BoxProps } from '@mui/system';
import { Stack } from '@mui/system';
import React from 'react';
import AppButton from '../../components/buttons/AppButton';
import GosuslugiIcon from '../../components/icons/GosuslugiIcon';
import ACMLogoIcon from '../../components/icons/ACMLogoIcon';
import NinjaIcon from '../../components/icons/NinjaIcon';
import styles from '../../styles/Login.module.scss';

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}>
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </Box>
  );
}

function LeftSide(props: BoxProps) {
  let theme = useTheme();

  return (
    <Box
      {...props}
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        alignItems: 'center',
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        padding: '50px',
      }}>
      <ACMLogoIcon />
      <Typography
        variant='h3'
        component='h1'
        sx={{
          maxWidth: '500px',
          color: 'var(--bg-clr-pure-white)',
          fontWeight: 700,
          fontSize: '55px',
          lineHeight: '60px',
        }}>
        Расчет рыночной стоимости жилых объектов в Москве
      </Typography>
      <NinjaIcon />
    </Box>
  );
}

function RightSide(props: StackProps) {
  return (
    <Box {...props} sx={{ flex: 1, padding: '5rem' }}>
      <Stack spacing={2}>
        <Typography variant='h4' sx={{ color: 'black' }}>
          Вход
        </Typography>
        <TextField id='outlined-read-only-input' placeholder='Логин' />
        <TextField id='outlined-read-only-input' placeholder='Пароль' />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Stack direction='row' alignItems='center'>
            <Checkbox sx={{ padding: 0 }}></Checkbox>
            <Typography paddingLeft={2}>Сохранить данные</Typography>
          </Stack>
          <Link>Восстановить пароль</Link>
        </Stack>

        <Stack paddingTop={5} spacing={5}>
          <AppButton>Войти</AppButton>
          <Typography align='center'>ИЛИ</Typography>
          <AppButton variant='secondary'>Войти через SSO</AppButton>
          <Stack direction='row' justifyContent='space-between' spacing={2}>
            <AppButton
              sx={{ flex: 1 }}
              variant='secondary'
              startIcon={<GosuslugiIcon />}>
              Госуслуги
            </AppButton>
            <AppButton sx={{ flex: 1 }} variant='secondary'>
              Mos.ru
            </AppButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
