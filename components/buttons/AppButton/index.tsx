import { Button } from '@mui/material';
import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const PrimaryButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '16px',
  padding: '15px 20px',
  lineHeight: '20px',
  color: 'var(--bg-clr-pure-white)',
  backgroundColor: 'var(--accent-clr)',
  fontFamily: 'var(--font-primary)',
  borderRadius: 'var(--border-radius-1)',
  transition: 'background .3s',

  '&:hover': {
    backgroundColor: 'var(--accent-clr-hover)',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});

const SecondaryButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '16px',
  padding: '15px 20px',
  lineHeight: '20px',
  color: 'var(--accent-clr)',
  backgroundColor: 'var(--accent-clr-light)',
  fontFamily: 'var(--font-primary)',
  borderRadius: 'var(--border-radius-1)',
  transition: 'background .3s',

  '&:hover': {
    backgroundColor: 'var(--accent-clr-light-hover)',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});

type Props = {
  children: string;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'small';
  onClick?: () => void;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function AppButton({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  sx,
  ...props
}: Props) {
  const primaryButtonJSX = (
    <PrimaryButton
      onClick={onClick}
      sx={[
        {
          width: size === 'default' ? '100%' : 'fit-content',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}>
      {children}
    </PrimaryButton>
  );

  const secondaryButtonJSX = (
    <SecondaryButton
      onClick={onClick}
      sx={[
        {
          width: size === 'default' ? '100%' : 'fit-content',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}>
      {children}
    </SecondaryButton>
  );

  return variant === 'primary' ? primaryButtonJSX : secondaryButtonJSX;
}
