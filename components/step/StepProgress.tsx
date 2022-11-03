import React from "react"
import Step from "./Step"
import { Stack, Box } from "@mui/material"
import StepSeparator from "./StepSeparator"
import { BoxProps } from "@mui/system"

type Props = {
  stepsCount: number
  currentStep: number
  width?: string
} & BoxProps

export default function StepProgress({
  stepsCount,
  currentStep,
  width,
}: Props) {
  return (
    <Box position="relative" width={width}>
      <StepSeparator />
      <Stack direction="row" justifyContent="space-between">
        {Array.from(Array(stepsCount).keys()).map((stepNumber, i) => {
          return <Step key={i} number={i + 1} />
        })}
      </Stack>
    </Box>
  )
}
