import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: '30px',
  width: 530,
  background: 'var(--bg-clr-pure-white)',
  boxShadow: 'var(--shadow-1)',
  borderRadius: 'var(--border-radius-1)',
};

type Props = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export default function BasicModal({ open = false, onClose, children }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
