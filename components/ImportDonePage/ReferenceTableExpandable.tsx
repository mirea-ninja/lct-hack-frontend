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

type Props = {
  isReferenceSelected: boolean
  roomsCount: number
  data: DataRow[]
}

export default function ReferenceTableExpandable({
  roomsCount,
  isReferenceSelected,
  data,
}: Props) {
  let theme = useTheme()
  let text = roomsCount != 0 ? `${roomsCount}-комнатные` : "Студии"

  let [expanded, setExpanded] = useState(false)
  let [rowsData, setRowsData] = useState(data)

  console.log(rowsData)

  let icon = isReferenceSelected ? (
    <DoneIcon
      style={{
        color: "#0202a1",
      }}
    />
  ) : (
    <Typography
      fontSize={24}
      color={theme.palette.secondary.dark}
      fontWeight={700}
    >
      выберите эталон
    </Typography>
  )

  const onAccordionChange = (isExpanded: boolean) => {
    setExpanded(isExpanded)
  }

  const addRow = () => {
    console.log("Amogus")
    setRowsData([
      ...rowsData,
      { id: rowsData[rowsData.length - 1].id + 1, KitchenSpace: 0 },
    ])
  }

  const deleteRow = (id: number) => {
    setRowsData(rowsData.filter((row) => row.id != id))
  }

  const onCellEdit = (params: GridCellEditCommitParams) => {
    console.log(params)
    ;(rowsData.find((el) => el.id == params.id) as any)[params.field] =
      params.value
    setRowsData([...rowsData])
  }

  return (
    <Accordion
      elevation={0}
      disableGutters
      onChange={(_, isExpanded) => onAccordionChange(isExpanded)}
      sx={{
        borderRadius: "10px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack direction="row" alignItems="center" gap={5}>
          <Typography
            fontSize={24}
            color={
              expanded ? theme.palette.primary.main : theme.palette.text.primary
            }
            fontWeight={700}
          >
            {text} + {rowsData.length}
          </Typography>
          {icon}
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: 0,
        }}
      >
        <Stack gap={2}>
          <Stack direction="row" gap={2} paddingLeft={1.5}>
            <Button variant="accentActive" onClick={(data) => addRow()}>
              Добавить строку
            </Button>
            <TextField placeholder="Поиск по таблице" size="small" />
          </Stack>
          <ReferenceTable
            data={rowsData}
            onCellEditCommit={onCellEdit}
            deleteRow={deleteRow}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
