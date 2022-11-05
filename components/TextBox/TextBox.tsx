import { Typography, useTheme, Box } from "@mui/material"
import { link } from "fs"
import Link from "next/link"
import React from "react"

type Props = {
  text: string | int
  textColor?: string,
  backgroundColor?: string
}

export default function TextBox({ text, textColor, backgroundColor }: Props) {
  let theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : theme.background.primary,
          borderRadius: "10px",
          paddng: "5px",
          width: "fit-content",
          minWidth: "35px",
      }}
    >
      <Typography
        sx={{
          color: textColor ? textColor : theme.text.primary,
          fontSize: "20px",
          fontWeight: "700",
          LineHeight: "22px",
          textAlign: "center",
          padding: "0px 5px",
        }}
      >
        {text}
      </Typography>

    </Box>

  )
}