import React from 'react';
import BasicModal from '../BasicModal';
import Typography from '@mui/material/Typography';
import AppButton from '../../buttons/AppButton';
import { Stack } from '@mui/system';
import TickIcon from '../../icons/TickIcon';

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function SuccessModal({ open = false, onClose }: Props) {
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '26px',
          color: 'var(--positive-clr)',
          mb: '20px',
        }}>
        <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
          <TickIcon />
          Пул успешно экспортирован
        </Stack>
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '22px',
          color: 'var(--text-clr-main)',
          mb: '20px',
          mr: '54px',
        }}>
        Ваш запрос был сохранен в архиве Вы сможете вернуться к нему в любое
        время
      </Typography>
      <Stack direction='row' alignItems='center' sx={{ gap: '20px' }}>
        <AppButton href='/archive'>Перейти в архив</AppButton>
        <AppButton variant='secondary' href='/'>
          Вернуться на главную
        </AppButton>
      </Stack>
    </BasicModal>
  );
}
