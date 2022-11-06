import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import Icon from '@mui/material/Icon';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from 'next/link';
import HeaderTab from './HeaderTab';
import StepProgress from '../step/StepProgress';

type Props = {
  hasStepProgress?: boolean;
  stepProgress?: number;
  isArchive?: boolean;
};

export default function Header({ hasStepProgress = true, stepProgress = 0 , isArchive = false}: Props) {
  let theme = useTheme();

  return (
    <AppBar
      sx={{
        backgroundColor: 'white',
        paddingLeft: '20px',
        paddingRight: '20px',
        width: '100%',
        boxShadow: '0px 0px 15px rgba(5, 4, 39, 0.2)',
      }}
      elevation={0}
      position='static'>
      <Toolbar
        sx={{
          width: '100%',
          justifyContent: 'flex-start',
        }}>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={32} height={32} />
        </Link>

        {isArchive &&
          <Stack direction='row' paddingLeft="60px" alignItems='center'>
            <HeaderTab isActive={false} link='/import/pool' text='Новый запрос' />
          </Stack>
        }

        <Stack
          direction='row'
          gap={5}
          marginLeft={5}
          marginRight={2}
          alignItems='center'
          sx={{
            padding: '6px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '10px',
            backgroundColor: theme.background.primary,
          }}>
          {!isArchive
          ? <HeaderTab isActive={true} link='/import/pool' text='Новый запрос' />
          : <HeaderTab isActive={true} link='/archive' text='Архив запросов' />}
          {hasStepProgress && (
            <Box
              justifyContent='center'
              alignItems='center'
              sx={{
                display: 'flex',
                flexGrow: 5,
              }}>
              <StepProgress currentStep={stepProgress} stepsCount={5} width='50%' />
            </Box>
          )}
        </Stack>
        <Stack direction='row' gap={10} alignItems='center' marginLeft='auto'>
          {!isArchive && <HeaderTab isActive={false} link='/archive' text='Архив запросов' />}
          <Link href='/docs'>
            <HelpOutlineIcon color='primary' />
          </Link>
          <Link href='/'>
            <AccountCircle color='primary' />
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
