import * as React from 'react';
import Button from '@mui/material/Button';
import DisconnectModal from '../components/modals/DisconnectModal';
import SuccessModal from '../components/modals/SuccessModal';
import NoResultItem from '../components/items/NoResultItem';

const TestPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      {/* <DisconnectModal open={open} onClose={handleClose} /> */}
      <SuccessModal open={open} onClose={handleClose} />
      <br />
      <NoResultItem />
    </div>
  );
};

export default TestPage;
