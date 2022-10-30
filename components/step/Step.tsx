import React from "react"
import { Box, Typography, useTheme } from "@mui/material"

type Props = {
  number: number
}

export default function Step({ number }: Props) {
  let theme = useTheme()

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      borderRadius="50%"
      width="30px"
      height="30px"
      bgcolor={theme.palette.accent.light}
    >
      <Typography
        sx={{
          fontWeight: "bold",
        }}
        color={theme.palette.primary.main}
      >
        {number}
      </Typography>
    </Box>
  )
}
