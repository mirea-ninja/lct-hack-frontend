import React from 'react';
import Chip from '@mui/material/Chip';
import { SxProps, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const PrimaryChip = styled(Chip)({
  color: 'var(--bg-clr-main)',
  backgroundColor: 'var(--accent-clr)',
  fontFamily: 'var(--font-primary)',
  fontWeight: 500,
  fontSize: '16px',

  '& .MuiChip-deleteIcon': {
    color: 'var(--bg-clr-main)',
  },
});

type Props = {
  label: string;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function TagItem({ label, onDelete, sx, ...props }: Props) {
  return (
    <PrimaryChip
      label='Запросы с 01.01.2022 по 04.11.2022'
      onDelete={onDelete}
      {...props}
    />
  );
}
