import React from "react"
import Header from "../../components/main/Header"
import { Box, Stack } from "@mui/material"
import StepProgress from "../../components/step/StepProgress"
import ImportPoolBox from "./ImportPoolBox"
import LoadedPoolBox from "./LoadedPoolBox"

type Props = {}

export default function ImportPoolPage({}: Props) {
  return (
    <Stack
      gap={1}
      sx={{
        height: "100%",
      }}
    >
      <Header />
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <StepProgress currentStep={1} stepsCount={5} width="25%" />
      </Box>
      <Stack
        direction="row"
        marginTop="30px"
        padding={5}
        gap={7}
        sx={{
          flexBasis: "100%",
          bottom: 0,
        }}
      >
        <ImportPoolBox />
        <LoadedPoolBox />
      </Stack>
    </Stack>
  )
}
