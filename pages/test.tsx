import * as React from 'react';
import Button from '@mui/material/Button';
import DisconnectModal from '../components/modals/DisconnectModal';
import SuccessModal from '../components/modals/SuccessModal';
import PriceTooltip from '../components/tooltips/PriceTooltip';
import SliderTooltip from '../components/tooltips/SliderTooltip';

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

const TestPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <PriceTooltip>
        <Button sx={{ mt: '10em' }}>Hover me to see PriceTooltip</Button>
      </PriceTooltip>
      <SliderTooltip
        min={-5.5}
        max={3}
        marks={marks}
        initialValue={0}
        price={100}>
        <Button sx={{ mt: '10em' }}>Hover me to see SliderTooltip</Button>
      </SliderTooltip>
      {/* <DisconnectModal open={open} onClose={handleClose} /> */}
      <SuccessModal open={open} onClose={handleClose} />
    </div>
  );
};

export default TestPage;
