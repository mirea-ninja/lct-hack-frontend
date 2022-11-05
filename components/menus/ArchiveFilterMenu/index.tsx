import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  anchorEl?: any;
  open?: any;
  onClose?: () => void;
};

export default function ArchiveFilterMenu({ anchorEl, open, onClose }: Props) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onClose}>Profile</MenuItem>
      <MenuItem onClick={onClose}>My account</MenuItem>
      <MenuItem onClick={onClose}>Logout</MenuItem>
    </Menu>
  );
}
