import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';

type Props = {
  value?: number;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function PercentageItem({ value, sx, ...props }: Props) {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [percentageValue, setPercentageValue] = useState(String(value));
  const percentageInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        percentageInputRef.current &&
        !percentageInputRef.current.contains(event.target as Node)
      ) {
        console.log('You clicked outside of me!');
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [percentageInputRef]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPercentageValue(event.target.value);
  };

  const PercentageJSX = (
    <Typography
      component='span'
      onClick={() => setIsChangeMode(prev => !prev)}
      sx={[
        {
          fontWeight: 500,
          fontSize: 18,
          lineHeight: '20px',
          color: value! > 0 ? 'var(--positive-clr)' : 'var(--negative-clr)',
          backgroundColor: '#F3F7FA',
          p: '5px',
          borderRadius: 'var(--border-radius-1)',
          cursor: 'pointer',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}>
      {value! > 0 ? `+${value}%` : `${value}%`}
    </Typography>
  );

  const InputJSX = (
    <Stack direction='row' alignItems='center'>
      <TextField
        value={percentageValue}
        onChange={handleChange}
        sx={{
          maxWidth: 50,

          '& input': {
            p: '5px',
          },
        }}
      />
      %
    </Stack>
  );

  return (
    <div ref={percentageInputRef}>
      {isChangeMode ? InputJSX : PercentageJSX}
    </div>
  );
}
