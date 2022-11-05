import React from "react"
import Header from "../../../components/main/Header"
import ReferenceTableExpandable from "../../../components/ImportDonePage/ReferenceTableExpandable"
import {
  DataRow,
  RepairType,
  SegmentType,
  WallMaterials,
} from "../../../components/ImportDonePage/types"
import Button from "@mui/material/Button"
import TextBox from "../../../components/TextBox/TextBox"
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
} from "@mui/material"


const rows: DataRow[] = [
  {
    id: 1,
    Location: "Дворец путина",
    Rooms: 99,
    Segment: SegmentType.New,
    FloorsCount: 389,
    WallMaterials: WallMaterials.Brick,
    Floor: 0,
    AptArea: 30000,
    KitchenArea: 5000,
    HasBalcony: true,
    ToMetro: 600,
    RepairType: RepairType.ModernRepair,
  },
  {
    id: 2,
    Location: "Мирэа",
    Rooms: 1,
    Segment: SegmentType.Old,
    FloorsCount: 5,
    WallMaterials: WallMaterials.Monolith,
    Floor: 0,
    AptArea: 10,
    KitchenArea: 10,
    HasBalcony: false,
    ToMetro: 5,
    RepairType: RepairType.WithoutRepair,
  },
]

type Props = {
  metadata?: string
}


export default function ImportDonePage({ metadata }: Props) {
  return (
    <Box>
      <Header />
      <Stack padding={5} gap={3}>
        <Stack gap={2}>
          <Typography variant="h5" fontWeight="bold" color="#3E3E41">
            Выберите эталон
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack gap={1}>
              <Typography variant="h6" color="#3E3E41">
                {metadata ?? "Название запроса"}
              </Typography>
              <Typography variant="body1" color="#3E3E41">
                {metadata ?? "Ватутина, 11, современное жилье, 22 этажа, панель"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={3} height="80%">
              <Button variant="contained">Найти аналоги</Button>
            </Stack>
          </Stack>
        </Stack>
        <Box
          sx={{
            maxHeight: "680px",
            scrollBehavior: "smooth",
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
        </Box>
      </Stack>
    </Box>
  )
}
