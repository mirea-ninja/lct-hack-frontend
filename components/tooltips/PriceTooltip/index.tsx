import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { Stack } from '@mui/system';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--text-clr-main)',
    borderRadius: '10px 10px 10px 0px',
    marginBottom: '-10px !important',
    marginRight: '-100px !important',
    transform: 'translateX(50%) !important',
  },
}));

type Props = {
  children: React.ReactElement<any, any>;
  offset?: number;
  sx?: SxProps<Theme>;
  [props: string]: any;
};

export default function PriceTooltip({
  children,
  offset,
  sx,
  ...props
}: Props) {
  const [open, setOpen] = React.useState(true);

  return (
    <HtmlTooltip
      placement='top-start'
      open={open}
      title={
        <>
          <Stack direction='row' alignItems='center' sx={{ gap: '10px' }}>
            <Percentage value={-10500} />
            <Typography
              sx={{
                color: 'var(--secondary-clr-light)',
                fontSize: 14,
                lineHeight: '16px',
              }}>
              235 678 ₽
            </Typography>
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

const Percentage = ({ value, symbol = '₽' }: PercentageType) => {
  return (
    <Typography
      sx={{
        color: value > 0 ? 'var(--positive-clr)' : 'var(--negative-clr)',
        fontSize: 14,
        lineHeight: '16px',
      }}>
      {value > 0 ? `+${value} ${symbol}` : `${value} ${symbol}`}
    </Typography>
  );
};
