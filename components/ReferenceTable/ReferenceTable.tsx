import * as React from "react"
import { DataRow } from "./types"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
  {
    field: "Location",
    headerName: "Местоположение",
    minWidth: 170,
    editable: true,
  },
  {
    field: "Rooms",
    headerName: "Количество комнат",
    minWidth: 100,
    editable: true,
  },
  {
    field: "Segment",
    headerName: "Сегмент",
    align: "right",
    editable: true,
    width: 120,
  },
  {
    field: "FloorsCount",
    headerName: "Этажность дома",
    align: "right",
    editable: true,
    width: 120,
  },
  {
    field: "WallMaterials",
    headerName: "Материал стен",
    align: "right",
    editable: true,
    width: 120,
  },
  {
    field: "Floor",
    headerName: "Этаж расположения",
    align: "right",
    editable: true,
    width: 120,
  },
  {
    field: "TotalSpace",
    headerName: "Прощадь квартиры, кв.м",
    type: "number",
    align: "right",
    editable: true,
    width: 120,
  },
  {
    field: "KitchenSpace",
    headerName: "Прощадь кухни, кв.м",
    align: "right",
    type: "number",
    editable: true,
    width: 120,
  },
  {
    field: "WithBalcony",
    headerName: "Наличие балкона/лоджии",
    align: "right",
    type: "bool",
    editable: true,
    width: 150,
  },
  {
    field: "TimeToMetroInMinutes",
    headerName: "Удаленность от метро",
    align: "right",
    editable: true,
    width: 150,
  },
  {
    field: "FurnishQuality",
    headerName: "Состояние отделки",
    align: "right",
    editable: true,
    width: 150,
  },
]

type Props = {
  data: DataRow[]
}

export default function ReferenceTable({ data }: Props): JSX.Element {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}
