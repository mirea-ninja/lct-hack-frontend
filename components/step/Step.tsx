import React from "react"
import { Box, Stack, Typography, useTheme } from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import StepSeparator from "./StepSeparator"

type Props = {
  stepName: string
  isProgressed?: boolean
  isActive?: boolean
  havePath?: boolean
}

export default function Step({
  isProgressed,
  isActive,
  havePath,
  stepName,
}: Props) {
  let theme = useTheme()

  return (
    <Stack>

      <Typography
        variant="body2"
        sx={{
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
          marginRight: "10px",
          whiteSpace: "nowrap",
        }}
      >
        {stepName}
      </Typography>

      <Stack direction="row" alignItems="center">
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          borderRadius="50px"
          width="20px"
          height="14px"
          zIndex={1}
          bgcolor={
            isProgressed
              ? theme.palette.primary.main
              : isActive
              ? theme.palette.accent.light
              : ""
          }
          sx={{
            border: `2px solid ${
              isProgressed || isActive
                ? theme.palette.primary.main
                : theme.palette.secondary.dark
            }`,
            outline: `3px solid #EEF2F5`,
          }}
        >
          {isProgressed ? (
            <DoneIcon
              sx={{
                width: "100%",
                height: "100%",
                stroke: "white",
                color: "white",
                strokeWidth: 4,
              }}
            />
          ) : (
            <DoneIcon
              sx={{
                width: "100%",
                height: "100%",
                stroke: "#EEF2F5",
                color: "#EEF2F5",
                strokeWidth: 4,
              }}
            />
          )}
        </Box>
        {havePath && <StepSeparator isActive={isProgressed} />}
      </Stack>
    </Stack>
  )
}
