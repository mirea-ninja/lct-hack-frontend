import * as React from 'react';
import Button from '@mui/material/Button';
import BasicModal from '../components/modals/BasicModal';
import InternetErrorModal from '../components/modals/InternetErrorModal';

const TestPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <InternetErrorModal open={open} onClose={handleClose} />
    </div>
  );
};

export default TestPage;
