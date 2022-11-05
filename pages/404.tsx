import { Box, Typography } from '@mui/material';
import AppButton from '../components/buttons/AppButton';
import Header from '../components/main/Header';
import { Stack } from '@mui/system';

type Props = {};

export default function Error404Page({}: Props) {
  return (
    <Box
      sx={{
        height: '100vh',
      }}>
      <Header hasStepProgress={false} />
      <Box sx={{ height: '100%', p: '110px 50px' }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '55px',
            lineHeight: '60px',
            color: 'var(--text-clr-secondary)',
            mb: '30px',
          }}>
          404
          <br />
          Страница не найдена
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '22px',
            color: 'var(--text-clr-main)',
            mb: '50px',
          }}>
          Возможно, она была удалена
          <br />
          Попробуйте обновить страницу или вернуться на главную
        </Typography>
        <Stack
          sx={{
            width: '310px',
          }}>
          <AppButton href='/'>Вернуться на главную</AppButton>
        </Stack>
      </Box>
    </Box>
  );
}
