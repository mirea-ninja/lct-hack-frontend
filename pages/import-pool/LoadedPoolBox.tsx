import React from "react"
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"

type Props = {}

export default function LoadedPoolBox({}: Props) {
  let isActive = false // Поменять на логику с query в бэк

  return (
    <Stack
      sx={{
        flex: 1,
      }}
      display="flex"
      padding={3}
      borderRadius={5}
    >
      <Typography variant="h4" fontWeight="bold">
        Загруженные пулы
      </Typography>
      <Stack marginTop={5} gap={0.5} marginBottom={5}>
        <PoolPreview />
      </Stack>
      <Box display="flex" justifyContent="center" marginTop="auto">
        <Button
          variant="mainDisabled"
          sx={{
            width: "50%",
          }}
        >
          Рассчитать
        </Button>
      </Box>
    </Stack>
  )
}

function PoolPreview() {
  let theme = useTheme()

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.accent.light,
      }}
      borderRadius={3}
      padding={2}
      gap={1}
      width="40%"
    >
      <Typography variant="h5" fontWeight="bold">
        Название пула
      </Typography>
      <Typography variant="body2">
        Здесь появится загруженный вами пул
      </Typography>
    </Stack>
  )
}
