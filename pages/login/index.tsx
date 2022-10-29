import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { Link } from "@mui/material"
import { Checkbox } from "@mui/material"
import { Box, Typography, useTheme } from "@mui/material"
import { StackProps } from "@mui/system"
import { BoxProps } from "@mui/system"
import { Stack } from "@mui/system"
import React from "react"
import styles from "../../styles/Login.module.scss"

type Props = {}

export default function LoginPage({}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px",
      }}
    >
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </Box>
  )
}

function LeftSide(props: BoxProps) {
  let theme = useTheme()

  return (
    <Box
      {...props}
      sx={{
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        padding: "5rem",
      }}
    >
      <Typography variant="h3" sx={{ color: "white" }}>
        Расчет рыночной стоимости жилых объектов в Москве
      </Typography>
    </Box>
  )
}

function RightSide(props: StackProps) {
  return (
    <Box {...props} sx={{ flex: 1, padding: "5rem" }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ color: "black" }}>
          Вход
        </Typography>
        <TextField id="outlined-read-only-input" placeholder="Логин" />
        <TextField id="outlined-read-only-input" placeholder="Пароль" />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Checkbox sx={{ padding: 0 }}></Checkbox>
            <Typography paddingLeft={2}>Сохранить данные</Typography>
          </Stack>
          <Link>Восстановить пароль</Link>
        </Stack>

        <Stack paddingTop={5} spacing={5}>
          <Button variant="contained">Войти</Button>
          <Typography align="center">ИЛИ</Typography>
          <Button variant="contained">Войти через SSO</Button>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button sx={{ flex: 1 }} variant="contained">
              Госуслуги
            </Button>
            <Button sx={{ flex: 1 }} variant="contained">
              Mos.ru
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
