import React from 'react';
import BasicModal from '../BasicModal';
import Typography from '@mui/material/Typography';
import AppButton from '../../buttons/AppButton';
import { Stack } from '@mui/system';
import DisconnectIcon from '../../icons/DisconnectIcon';
import { useRouter } from 'next/router';

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function DisconnectModal({ open = false, onClose }: Props) {
  const router = useRouter();

  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '26px',
          color: 'var(--negative-clr)',
          mb: '20px',
        }}>
        <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
          <DisconnectIcon />
          Нет соединения с интернетом
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
        Проверьте ваше интернет-соединение и попробуйте обновить страницу
      </Typography>
      <Stack direction='row' alignItems='center' sx={{ gap: '20px' }}>
        <AppButton onClick={() => router.reload()}>Обновить страницу</AppButton>
        <AppButton variant='secondary' onClick={onClose}>
          Закрыть сообщение
        </AppButton>
      </Stack>
    </BasicModal>
  );
}
