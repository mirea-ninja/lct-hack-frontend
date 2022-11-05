import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import CheckboxUnchecked from './CheckboxUnhecked';
import CheckboxChecked from './CheckboxChecked';

const PrimaryCheckbox = styled(Checkbox)({
  // width: '24px',
  // height: '24px',
  color: 'var(--accent-clr)',
  borderRadius: 'var(--border-radius-1)',
  transition: 'background .3s',
  marginRight: '5px',

  '&:hover': {
    backgroundColor: 'none',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});

type Props = {
  checked?: boolean;
  onChange?: () => void;
  [props: string]: any;
};

export default function ControlledCheckbox({
  checked,
  onChange,
  ...props
}: Props) {
  return <PrimaryCheckbox icon={<CheckboxUnchecked/>} checkedIcon={<CheckboxChecked/>} checked={checked} onChange={onChange} {...props} />;
}
