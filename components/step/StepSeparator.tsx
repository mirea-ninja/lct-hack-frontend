import React from "react"
import { Box, useTheme } from "@mui/material"

type Props = {}

export default function StepSeparator({}: Props) {
  let theme = useTheme()

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: -1,
        height: "2px",
        backgroundColor: theme.palette.primary.main,
      }}
    ></Box>
  )
}
