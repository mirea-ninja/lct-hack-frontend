import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import Icon from "@mui/material/Icon"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import React from "react"
import { AccountCircle } from "@mui/icons-material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Link from "next/link"
import HeaderTab from "./HeaderTab"
import StepProgress from "../step/StepProgress"

type Props = {}

export default function Header({}: Props) {
  let theme = useTheme()

  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        paddingLeft: "20px",
        paddingRight: "20px",
        width: "100%",
        boxShadow: "0px 0px 15px rgba(5, 4, 39, 0.2)",
      }}
      elevation={0}
      position="static"
    >
      <Toolbar
        sx={{
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
        </Link>
        <Stack
          direction="row"
          gap={5}
          marginLeft={5}
          marginRight={2}
          alignItems="center"
          sx={{
            padding: "6px",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderRadius: "10px",
            backgroundColor: theme.palette.accent.light,
          }}
        >
          <HeaderTab isActive={true} link="/" text="Новый запрос" />
          <Box
            justifyContent="center"
            alignItems="center"
            sx={{
              display: "flex",
              flexGrow: 5,
            }}
          >
            <StepProgress currentStep={1} stepsCount={5} width="50%"/>
          </Box>
        </Stack>
        <Stack direction="row" gap={10} marginLeft="auto">
          <HeaderTab isActive={false} link="/" text="Архив запросов" />
          <Link href="/">
            <HelpOutlineIcon color="primary" />
          </Link>
          <Link href="/">
            <AccountCircle color="primary" />
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
