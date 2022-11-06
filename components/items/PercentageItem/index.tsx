import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type Props = {
  value?: number;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function PercentageItem({ value, sx, ...props }: Props) {
  return (
    <Typography
      component='span'
      sx={[
        {
          fontWeight: 500,
          fontSize: 18,
          lineHeight: '20px',
          color: value! > 0 ? 'var(--positive-clr)' : 'var(--negative-clr)',
          backgroundColor: '#F3F7FA',
          p: '5px',
          borderRadius: 'var(--border-radius-1)',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}>
      {value! > 0 ? `+${value}%` : `${value}%`}
    </Typography>
  );
}
