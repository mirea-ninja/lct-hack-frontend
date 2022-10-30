import React from "react"
import Header from "../../components/main/Header"
import { Box, Stack } from "@mui/material"
import StepProgress from "../../components/step/StepProgress"
import ImportPoolBox from "./ImportPoolBox"
import LoadedPoolBox from "./LoadedPoolBox"

type Props = {}

export default function ImportPoolPage({}: Props) {
  return (
    <Stack gap={1}>
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
      <Stack direction="row" marginTop="30px" padding={5} gap={7}>
        <ImportPoolBox />
        <LoadedPoolBox />
      </Stack>
    </Stack>
  )
}
