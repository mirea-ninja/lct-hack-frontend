import { Box, Typography, TextField, Stack, Button } from "@mui/material"
import React from "react"

type Props = {}

export default function ImportPoolBox({}: Props) {
  let isActive = false // Поменять на логику с query в бэк

  return (
    <Stack
      sx={{
        flex: 1,
      }}
      padding={3}
      borderRadius={5}
    >
      <Typography variant="h4" fontWeight="bold">
        Импорт пулов
      </Typography>
      <Stack marginTop={5} gap={0.5}>
        <TextField
          size="small"
          id="outlined-read-only-input"
          placeholder="Название пула"
        />
        <Typography variant="body2">
          Можете оставить это поле пустым, тогда в названии автоматически будет
          дата и время загрузки пула
        </Typography>
      </Stack>
      <Box display="flex" justifyContent="center" marginTop="auto">
        <Button
          variant="mainActive"
          sx={{
            width: "40%",
          }}
        >
          Добавить пул
        </Button>
      </Box>
    </Stack>
  )
}
