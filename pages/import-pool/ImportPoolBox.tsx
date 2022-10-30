import { Box, Typography, TextField, Stack, Button } from "@mui/material"
import React from "react"

type Props = {}

export default function ImportPoolBox({}: Props) {
  return (
    <Stack
      sx={{
        flex: 1,
        backgroundColor: "#d7d7d7",
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
          variant="contained"
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
