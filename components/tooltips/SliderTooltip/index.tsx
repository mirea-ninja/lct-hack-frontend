import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import Slider from '@mui/material/Slider';

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
    marginTop: '0 !important',
    // marginRight: '-100px !important',
    // transform: 'translateX(50%) !important',
  },

  [`& .${tooltipClasses.tooltip} .MuiTooltip-arrow`]: {
    color: '#fff',
  },
}));

type MarkType = {
  value: number;
  label: string;
};

type Props = {
  children: React.ReactElement<any, any>;
  min?: number;
  max?: number;
  initialValue?: number;
  price?: number;
  marks?: MarkType[];
  offset?: number;
  negative?: boolean;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function SliderTooltip({
  children,
  min,
  max,
  initialValue = 0,
  price,
  marks,
  negative = false,
  offset,
  sx,
  ...props
}: Props) {
  const [open, setOpen] = React.useState(true);
  const [difference, setDifference] = React.useState(0);
  const [total, setTotal] = React.useState(price);

  const [sliderValue, setSliderValue] = React.useState<
    number | string | Array<number | string>
  >(initialValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue);

    setDifference(+(price! * (Number(sliderValue) / 100)).toFixed(1));
    setTotal(Number(price) + difference);
  };

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
                value={typeof sliderValue === 'number' ? sliderValue : 0}
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
                step={0.1}
                marks={marks}
                min={min}
                max={max}
                sx={{
                  color:
                    sliderValue > 0
                      ? 'var(--positive-clr)'
                      : 'var(--negative-clr)',

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
                  {difference >= 0 ? `+${difference}` : `${difference}`} ₽
                </Typography>
                <Typography
                  sx={{
                    color: 'var(--secondary-clr-light)',
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '16px',
                  }}>
                  {total} ₽
                </Typography>
              </Stack>
              <Percentage value={Number(sliderValue)} />
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
        backgroundColor: '#F3F7FA',
        p: '5px',
        borderRadius: 'var(--border-radius-1)',
        color: value > 0 ? 'var(--positive-clr)' : 'var(--negative-clr)',
        fontSize: 14,
        lineHeight: '16px',
      }}>
      {value > 0 ? `+${value}${symbol}` : `${value}${symbol}`}
    </Typography>
  );
};
