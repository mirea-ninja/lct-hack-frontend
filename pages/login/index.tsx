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
    <Box
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: '5rem',
        backgroundColor: 'var(--bg-clr-pure-white)',
      }}>
      <Stack sx={{ maxWidth: '445px', flex: 1, width: '100%' }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: '50px',
            fontWeight: 700,
            fontSize: '55px',
            lineHeight: '60px',
            color: 'var(--text-clr-main)',
          }}>
          Вход
        </Typography>
        <Stack sx={{ gap: '20px' }}>
          <Stack sx={{ gap: '10px' }}>
            <TextField id='outlined-read-only-input' placeholder='Логин' />
            <TextField id='outlined-read-only-input' placeholder='Пароль' />
          </Stack>
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
        </Stack>

        <Stack sx={{ gap: '30px', marginTop: '40px' }}>
          <AppButton>Войти</AppButton>
          <Typography
            align='center'
            sx={{
              fontWeight: 500,
              fontSize: '16px',
            }}>
            ИЛИ
          </Typography>
          <Stack sx={{ gap: '20px' }}>
            <AppButton variant='secondary'>Войти через SSO</AppButton>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{
                gap: '20px',
              }}>
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
      </Stack>
    </Box>
  );
}
