//@ts-ignore
import * as React from "react"
import { DataRow } from "./types"
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditCommitParams,
  gridClasses,
  GridColDef,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import { Radio } from "@mui/material"
import { CheckBox } from "@mui/icons-material"
import CheckboxChecked from "../checkboxes/AppCheckbox/CheckboxChecked"
import CheckboxUnchecked from "../checkboxes/AppCheckbox/CheckboxUnhecked"

type Props = {
  data: DataRow[]
  // onCellEditCommit?: (params: GridCellEditCommitParams) => void
  // deleteRow: (id: number) => void
}

export default function ReferenceTable({
  data,
}: // onCellEditCommit,
// deleteRow,
Props): JSX.Element {
  // const deleteUser = React.useCallback(
  //   (id: number) => () => {
  //     deleteRow(id)
  //   },
  //   []
  // )

  const columns: GridColDef[] = [
    {
      field: "Floor",
      headerName: "Этаж расположения",
      // editable: true,
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "AptArea",
      headerName: "Площадь квартиры, кв.м",
      type: "number",
      // editable: true,
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "KitchenArea",
      headerName: "Прощадь кухни, кв.м",
      type: "number",
      // editable: true,
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "HasBalcony",
      headerName: "Наличие балкона/лоджии",
      type: "boolean",
      // да - true, нет - false
      // editable: true,
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "RepairType",
      headerName: "Состояние отделки",
      // editable: true,
      align: "left",
      headerAlign: "left",
      // type: "singleSelect",
      // valueOptions: [
      //   "Муниципальный ремонт",
      //   "Современная отделка",
      //   "Без отделки",
      // ],
      flex: 1,
    },
  ]

  return (
    <DataGrid
      rows={data}
      // onCellEditCommit={onCellEditCommit}
      columns={columns}
      pageSize={5}
      onStateChange={(state, event, change) => {
        console.log(state)
        console.log(event)
        console.log(change)
      }}
      selectionModel={0}
      onSelectionModelChange={(newSelection) => {
        console.log(newSelection)
      }}
      rowsPerPageOptions={[]}
      autoHeight={true}
      sx={{
        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
          outline: "none",
        },
        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
          {
            outline: "none",
          },
        height: "fit-content",
        maxHeight: "300px",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        overflowY: "auto",

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
    />
  )
}
