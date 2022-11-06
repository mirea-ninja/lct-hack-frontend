import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
} from "@mui/material"
import React, { useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useTheme } from "@mui/material"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import ReferenceTable from "./ReferenceTable"
import DoneIcon from "@mui/icons-material/Done"
import { DataRow } from "./types"
import { GridCellEditCommitParams } from "@mui/x-data-grid"
import TextBox from "../TextBox/TextBox"
import { SubQueryGet } from "../../apiConnection/gen/models/sub-query-get"
import { useStore } from "../../logic/DataStore"

type Props = {
  roomsCount: number
  data: SubQueryGet
}

function SubqueryToDataRow(data: SubQueryGet): DataRow[] {
  return data.inputApartments?.map((apartment, i) => {
    return {
      id: i,
      guid: apartment.guid,
      AptArea: apartment.apartmentArea,
      Floor: apartment.floor,
      KitchenArea: apartment.kitchenArea,
      HasBalcony: apartment.hasBalcony,
      RepairType: apartment.quality,
    }
  }) as DataRow[]
}

export default function ReferenceTableExpandable({ roomsCount, data }: Props) {
  let theme = useTheme()
  let text = roomsCount != 0 ? `${roomsCount}-комнатные` : "Студии"

  let store = useStore()
  let [expanded, setExpanded] = useState(false)

  let isReferenceSelected = true

  let rowsData = store.queryGetData
  let rows = SubqueryToDataRow(data)

  let selected = (
    <Typography
      fontSize="20px"
      lineHeight="22px"
      color={theme.text.secondary}
      fontWeight={700}
    >
      {" "}
      {isReferenceSelected ? "эталон выбран" : "выберите эталон"}
    </Typography>
  )

  const onAccordionChange = (isExpanded: boolean) => {
    setExpanded(isExpanded)
  }

  const addRow = () => {
    //setRowsData([...rowsData, { id: rowsData[rowsData.length - 1].id + 1 }])
  }

  // const deleteRow = (id: number) => {
  //   setRowsData(rowsData.filter((row) => row.id != id))
  // }

  // const onCellEdit = (params: GridCellEditCommitParams) => {
  //   console.log(params)
  //   ;(rowsData.find((el) => el.id == params.id) as any)[params.field] =
  //     params.value
  //   setRowsData([...rowsData])
  // }

  return (
    <Accordion
      elevation={0}
      disableGutters
      onChange={(_, isExpanded) => onAccordionChange(isExpanded)}
      sx={{
        borderRadius: "10px",
        gap: "10px",
        paddingRight: "10px",
        marginBottom: "10px",
        overflowX: "hidden",
        overflowY: "hidden",
        minHeight: "54px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          overflowX: "hidden",
        }}
      >
        <Stack direction="row" alignItems="center" gap="10px">
          <TextBox
            text={rows?.length ?? 0}
            textColor={expanded ? theme.palette.primary.main : ""}
            backgroundColor={expanded ? theme.palette.accent.main : ""}
          />
          <Typography
            fontSize="20px"
            lineHeight="22px"
            color={expanded ? theme.palette.primary.main : theme.text.primary}
            fontWeight={700}
          >
            {text}
          </Typography>
          {selected}
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "0px",
          maxHeight: "350px",
          overflowY: "auto",
          overflowX: "hidden",
          gap: "10px",
          scrollbarWidth: "thin",
          scrollbarColor: `#DFE1E3 #A6A8B5`,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#DFE1E3",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#A6A8B5",
            borderRadius: "10px",
          },
        }}
      >
        <Stack gap={2}>
          <Stack direction="row" gap={2} paddingLeft={1.5}>
            {/* <Button variant="accentActive" onClick={(data) => addRow()}>
              Добавить строку
            </Button>
            <TextField placeholder="Поиск по таблице" size="small" /> */}
          </Stack>
          <ReferenceTable
            data={rows}
            // onCellEditCommit={onCellEdit}
            // deleteRow={deleteRow}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
