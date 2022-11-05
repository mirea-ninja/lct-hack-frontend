import * as React from 'react';
import Button from '@mui/material/Button';
import BasicModal from '../components/modals/BasicModal';

const TestPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <BasicModal open={open} onClose={handleClose}>
        <h1>hello</h1>
      </BasicModal>
    </div>
  );
};

export default TestPage;
