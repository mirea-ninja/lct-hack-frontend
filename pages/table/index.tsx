import * as React from "react"
import {
  DataRow,
  SegmentType,
  WallMaterials,
  FurnishQuality,
} from "../../components/ReferenceTable/types"
import { Box } from "@mui/material"
import ReferenceTable from "../../components/ReferenceTable/ReferenceTable"

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

export default function TableEditingPage() {
  return (
    <Box padding={10}>
      <ReferenceTable data={rows}></ReferenceTable>
    </Box>
  )
}
