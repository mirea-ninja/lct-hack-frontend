import React from 'react';
import { Stack } from '@mui/system';
import ArchiveItem from '../../items/ArchiveItem';
import { testArchives } from './test';

type Props = {};

export default function ArchiveList({}: Props) {
  return (
    <Stack sx={{ gap: '20px' }}>
      {testArchives.map(item => (
        <ArchiveItem key={item.id} item={item} />
      ))}
    </Stack>
  );
}
