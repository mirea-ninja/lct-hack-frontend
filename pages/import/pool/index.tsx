import React from "react"
import Header from "../../../components/main/Header"
import { Box, Stack } from "@mui/material"
import StepProgress from "../../../components/step/StepProgress"
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
      <Stack
        direction="row"
        marginTop="30px"
        marginLeft="100px"
        marginRight="100px"
        justifyContent="center"
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

ImportPoolPage.requireAuth = true
