import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: -5.5,
    label: '-5.5%',
  },
  {
    value: 0,
    label: '0%',
  },
  {
    value: 3,
    label: '3%',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: 200,
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: 'var(--border-radius-1)',
    // marginBottom: '-10px !important',
    // marginRight: '-100px !important',
    // transform: 'translateX(50%) !important',
  },

  [`& .${tooltipClasses.tooltip} .MuiTooltip-arrow`]: {
    color: '#fff',
  },
}));

type Props = {
  children: React.ReactElement<any, any>;
  offset?: number;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function SliderTooltip({
  children,
  offset,
  sx,
  ...props
}: Props) {
  const [open, setOpen] = React.useState(true);

  return (
    <HtmlTooltip
      placement='bottom-end'
      arrow
      open={open}
      title={
        <>
          <Stack sx={{ gap: '5px' }}>
            <Stack sx={{ padding: '0 18px' }}>
              <Slider
                defaultValue={0}
                getAriaValueText={valuetext}
                step={0.1}
                valueLabelDisplay='auto'
                marks={marks}
                min={-5.5}
                max={3}
                sx={{
                  color: 'var(--positive-clr)',
                  '& .MuiSlider-markLabel': {
                    fontSize: 14,
                    lineHeight: '143%',
                  },
                }}
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'>
              <Stack>
                <Typography
                  sx={{
                    color: 'var(--secondary-clr-light)',
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '16px',
                  }}>
                  +1 500 ₽
                </Typography>
                <Typography
                  sx={{
                    color: 'var(--secondary-clr-light)',
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '16px',
                  }}>
                  230 250 ₽
                </Typography>
              </Stack>
              <Percentage value={1.5} />
            </Stack>
          </Stack>
        </>
      }>
      {children}
    </HtmlTooltip>
  );
}

type PercentageType = {
  value: number;
  symbol?: string;
};

const Percentage = ({ value, symbol = '%' }: PercentageType) => {
  return (
    <Typography
      sx={{
        color: value > 0 ? 'var(--positive-clr)' : 'var(--negative-clr)',
        fontSize: 14,
        lineHeight: '16px',
      }}>
      {value > 0 ? `+${value}${symbol}` : `${value}${symbol}`}
    </Typography>
  );
};
