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
import { DataRow } from "./types"

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
  let isSelectedText = isReferenceSelected
    ? "эталон выбран"
    : "эталон НЕ выбран"

  let [expanded, setExpanded] = useState(false)

  const onAccordionChange = (isExpanded: boolean) => {
    setExpanded(isExpanded)
  }

  return (
    <Accordion
      elevation={0}
      disableGutters
      onChange={(_, isExpanded) => onAccordionChange(isExpanded)}
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
            {text}
          </Typography>
          <Typography
            fontSize={24}
            color={theme.palette.secondary.dark}
            fontWeight={700}
          >
            {isSelectedText}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: 0,
        }}
      >
        <Stack gap={2}>
          <Stack direction="row" gap={1} paddingLeft={1}>
            <Button>Добавить строку</Button>
            <TextField placeholder="Поиск по таблице" size="small" />
          </Stack>
          <ReferenceTable data={data} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
