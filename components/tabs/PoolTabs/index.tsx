import React from "react"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { Stack } from "@mui/system"
import PoolTable from "../../tables/PoolTable"
import { SubQueryGet } from "../../../apiConnection/gen/models/sub-query-get"
import { Pool } from "../../tables/PoolTable/types"

type Props = {
  hasMetroAttribute?: boolean
  subqueries: SubQueryGet[]
}

type PoolTabProps = {
  isActive: boolean
  onClick: () => void
  text: string
}

function PoolTab({ isActive, text, onClick }: PoolTabProps) {
  return (
    <Button
      variant="text"
      sx={{
        color: isActive ? "var(--accent-clr)" : "var(--text-clr-secondary)",
      }}
      onClick={() => onClick()}
    >
      {text}
    </Button>
  )
}

function SubQueryToPoolTableRender(subquery: SubQueryGet): Pool[] {
  return subquery.analogs!.map((object, i) => {
    return {
      id: i,
      isBasic: true,
      pricePerSquareMeter: { value: object.m2price! },
      objectPrice: object.price!,
      floor: { value: object.floor! },
      flatSquare: { value: object.apartmentArea! },
      kitchenSquare: { value: object.kitchenArea! },
      hasBalcony: { value: object.hasBalcony! },
      state: { value: object.quality! },
      metro: { value: object.distanceToMetro! },
    }
  })
}

function idToRooms(id: number): string {
  switch (id) {
    case 1:
      return "1-комнатные"
    case 2:
      return "2-комнатные"
    case 3:
      return "3-комнатные"
    case 4:
      return "4-комнатные"
    case 5:
      return "5-комнатные"
    default:
      return "Студии"
  }
}

export default function PoolTabs({
  subqueries,
  hasMetroAttribute = false,
}: Props) {
  const [activeTab, setActiveTab] = React.useState(0)
  const data = SubQueryToPoolTableRender(subqueries[activeTab])

  return (
    <Paper
      sx={{
        boxShadow: "var(--shadow-1)",
        borderRadius: "var(--border-radius-1)",
        overflow: "hidden",
      }}
    >
      <Stack sx={{ gap: "30px" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ gap: "15px", padding: "10px 20px 0" }}
        >
          {subqueries.map((subqueries, index) => (
            <PoolTab
              key={index}
              isActive={activeTab == index}
              text={idToRooms(index)}
              onClick={() => {
                setActiveTab(index)
              }}
            />
          ))}
        </Stack>

        <PoolTable rows={data} hasMetroAttribute={hasMetroAttribute} />
      </Stack>
    </Paper>
  )
}
