import React from "react"
import Header from "../../../components/main/Header"
import { Box, Stack } from "@mui/material"
import StepProgress from "../../../components/step/StepProgress"
import ImportPoolBox from "./ImportPoolBox"
import LoadedPoolBox from "./LoadedPoolBox"
import { useStore } from "../../../logic/DataStore"

type Props = {}

export default function ImportPoolPage({}: Props) {
  let data = useStore()
  const [active, setActive] = React.useState(false)
  return (
    <Stack
      gap={1}
      sx={{
        height: "100%",
      }}
    >
      <Header stepProgress={active ? 2 : 1}/>
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
        <LoadedPoolBox onActiveChange={setActive} />
      </Stack>
    </Stack>
  )
}

ImportPoolPage.requireAuth = true
