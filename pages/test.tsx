import * as React from 'react';
import Button from '@mui/material/Button';
import BasicModal from '../components/modals/BasicModal';
import DisconnectModal from '../components/modals/DisconnectModal';

const TestPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <DisconnectModal open={open} onClose={handleClose} />
    </div>
  );
};

export default TestPage;
