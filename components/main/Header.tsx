import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import Icon from "@mui/material/Icon"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import React from "react"
import { AccountCircle } from "@mui/icons-material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Link from "next/link"
import HeaderTab from "./HeaderTab"

type Props = {}

export default function Header({}: Props) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        borderShadow: "20px rgba(0, 0, 0, 0.25)",
      }}
    >
      <AppBar
        sx={{
          backgroundColor: "white",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        elevation={0}
        position="static"
      >
        <Toolbar>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" gap={5} sx={{ flexGrow: 10 }}>
            <HeaderTab isActive={true} link="/" text="Новый запрос" />
            <HeaderTab isActive={false} link="/" text="Архив запросов" />
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" gap={10}>
            <Link href="/">
              <HelpOutlineIcon color="primary" />
            </Link>
            <Link href="/">
              <AccountCircle color="primary" />
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
