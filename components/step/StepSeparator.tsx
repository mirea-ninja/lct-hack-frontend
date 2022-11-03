import React from "react"
import { Box, useTheme } from "@mui/material"

type Props = {
  isActive?: boolean
}

export default function StepSeparator({ isActive }: Props) {
  let theme = useTheme()

  return (
    <Box
      sx={{
        height: "2px",
        top: "45%",
        zIndex: "0",
        flexGrow: "1",
        backgroundColor: isActive
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      }}
    ></Box>
  )
}
