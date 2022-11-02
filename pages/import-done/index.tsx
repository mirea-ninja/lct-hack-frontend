import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Stack,
} from "@mui/material"
import React from "react"
import Header from "../../components/main/Header"
import ReferenceTableExpandable from "../../components/ImportDonePage/ReferenceTableExpandable"
import {
  DataRow,
  FurnishQuality,
  SegmentType,
  WallMaterials,
} from "../../components/ImportDonePage/types"
import Button from "@mui/material/Button"

const rows: DataRow[] = [
  {
    id: 1,
    Location: "Дворец путина",
    Rooms: 99,
    Segment: SegmentType.New,
    FloorsCount: 389,
    WallMaterials: WallMaterials.Brick,
    Floor: 0,
    TotalSpace: 30000,
    KitchenSpace: 5000,
    WithBalcony: true,
    TimeToMetroInMinutes: 600,
    FurnishQuality: FurnishQuality.Modern,
  },
  {
    id: 2,
    Location: "Мирэа",
    Rooms: 1,
    Segment: SegmentType.Old,
    FloorsCount: 5,
    WallMaterials: WallMaterials.Monolith,
    Floor: 0,
    TotalSpace: 10,
    KitchenSpace: 10,
    WithBalcony: false,
    TimeToMetroInMinutes: 5,
    FurnishQuality: FurnishQuality.WithoutFurnish,
  },
]

type Props = {
  metadata?: string
}

export default function ImportDonePage({ metadata }: Props) {
  return (
    <div>
      <Header />
      <Stack padding={5} gap={3}>
        <Stack gap={2}>
          <Typography variant="h5" fontWeight="bold">
            Выберите эталон
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack gap={1}>
              <Typography variant="body1">Название запроса</Typography>
              <Typography variant="body1">
                {metadata ?? "Улица долбаеба 5"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={3} height="80%">
              <Button variant="accentActive">Сохранить и выйти</Button>
              <Button variant="contained">Найти аналоги</Button>
            </Stack>
          </Stack>
        </Stack>
        <ReferenceTableExpandable
          isReferenceSelected={false}
          roomsCount={0}
          data={rows}
        />
        <ReferenceTableExpandable
          isReferenceSelected={true}
          roomsCount={1}
          data={rows}
        />
        <ReferenceTableExpandable
          isReferenceSelected={true}
          roomsCount={2}
          data={rows}
        />
        <ReferenceTableExpandable
          isReferenceSelected={true}
          roomsCount={3}
          data={[]}
        />
        <ReferenceTableExpandable
          isReferenceSelected={true}
          roomsCount={4}
          data={[]}
        />
      </Stack>
    </div>
  )
}
