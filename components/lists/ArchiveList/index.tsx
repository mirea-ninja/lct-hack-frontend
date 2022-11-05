import React from 'react';
import { Stack } from '@mui/system';
import ArchiveItem from '../../items/ArchiveItem';

type Props = {};

export default function ArchiveList({}: Props) {
  return (
    <Stack sx={{ gap: '20px' }}>
      <ArchiveItem />
    </Stack>
  );
}
