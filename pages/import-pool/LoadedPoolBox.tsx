import React from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"

type Props = {}

export default function LoadedPoolBox({}: Props) {
  return (
    <Stack
      sx={{
        flex: 1,
        backgroundColor: "#d7d7d7",
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
          variant="contained"
          sx={{
            width: "50%",
          }}
        >
          Добавить пул
        </Button>
      </Box>
    </Stack>
  )
}

function PoolPreview() {
  return (
    <Stack
      sx={{
        backgroundColor: "#b4b4b4",
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
