import React from "react"
import Header from "../../components/main/Header"
import { Box } from "@mui/material"
import StepProgress from "../../components/step/StepProgress"

type Props = {}

export default function ImportPoolPage({}: Props) {
  return (
    <Box>
      <Header />
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          display: "flex",
        }}
      >
        <StepProgress currentStep={1} stepsCount={5} width="25%" />
      </Box>
    </Box>
  )
}
