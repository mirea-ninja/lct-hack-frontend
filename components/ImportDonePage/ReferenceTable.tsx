import * as React from "react"
import { DataRow } from "./types"
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditCommitParams,
  GridColDef,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
  data: DataRow[]
  onCellEditCommit?: (params: GridCellEditCommitParams) => void
  deleteRow: (id: number) => void
}

export default function ReferenceTable({
  data,
  onCellEditCommit,
  deleteRow,
}: Props): JSX.Element {
  const deleteUser = React.useCallback(
    (id: number) => () => {
      deleteRow(id)
    },
    []
  )

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
      type: "boolean",
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
      type: "singleSelect",
      valueOptions: [
        "Муниципальный ремонт",
        "Современная отделка",
        "Без отделки",
      ],
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteRow(params.id as number)}
          />
        </>
      ),
    },
  ]

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={data}
        onCellEditCommit={onCellEditCommit}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}
