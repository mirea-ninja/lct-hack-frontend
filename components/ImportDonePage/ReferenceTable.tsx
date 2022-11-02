import * as React from "react"
import { DataRow } from "./types"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
  {
    field: "Floor",
    headerName: "Этаж расположения",
    editable: true,
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
  {
    field: "TotalSpace",
    headerName: "Прощадь квартиры, кв.м",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
  {
    field: "KitchenSpace",
    headerName: "Прощадь кухни, кв.м",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
  {
    field: "WithBalcony",
    headerName: "Наличие балкона/лоджии",
    type: "bool",
    editable: true,
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
  {
    field: "FurnishQuality",
    headerName: "Состояние отделки",
    editable: true,
    align: "left",
    headerAlign: "left",
    flex: 1,
  },
]

type Props = {
  data: DataRow[]
}

export default function ReferenceTable({ data }: Props): JSX.Element {
  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}
