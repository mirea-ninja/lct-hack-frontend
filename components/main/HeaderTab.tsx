import { Typography, useTheme } from "@mui/material"
import { link } from "fs"
import Link from "next/link"
import React from "react"

type Props = {
  isActive: boolean
  link: string
  text: string
  onClick?: () => void
}

export default function HeaderTab({ isActive, text, onClick, link }: Props) {
  let theme = useTheme()

  let color = isActive
    ? theme.palette.primary.main
    : theme.palette.secondary.main

  return (
    <Link href={link}>
      <Typography color={color} variant="body2" sx={{whiteSpace: "nowrap"}}>
        {text}
      </Typography>
    </Link>
  )
}
