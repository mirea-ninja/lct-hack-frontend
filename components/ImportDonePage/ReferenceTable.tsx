//@ts-ignore
import * as React from "react";
import { DataRow } from "./types";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditCommitParams,
  gridClasses,
  GridColDef,
  GridColumns,
  GridRowId,
  ruRU,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Radio } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import CheckboxChecked from "../checkboxes/AppCheckbox/CheckboxChecked";
import CheckboxUnchecked from "../checkboxes/AppCheckbox/CheckboxUnhecked";
import { useState } from "react";
import { observer } from "mobx-react";
import { useApiClient } from "../../logic/ApiClientHook";
import { useStore } from "../../logic/DataStore";
import { useMutation } from "@tanstack/react-query";
import { toJS } from "mobx";

type Props = {
  data: DataRow[];
  subqueryId: string;
  // onCellEditCommit?: (params: GridCellEditCommitParams) => void
  // deleteRow: (id: number) => void
};

export const ReferenceTable = observer(
  ({
    data,
    subqueryId,
  }: // onCellEditCommit,
  // deleteRow,
  Props): JSX.Element => {
    // const deleteUser = React.useCallback(
    //   (id: number) => () => {
    //     deleteRow(id)
    //   },
    //   []
    // )
    const store = useStore();
    const api = useApiClient();

    const selectionId = data.find(
      (d) =>
        d.guid ==
        store.queryGetData?.subQueries.find((q) => q.guid == subqueryId)
          ?.standartObject?.guid
    )?.id;

    const [upd, setUpdate] = useState(false);
    console.log("ref table");
    console.log(toJS(store.queryGetData));
    console.log(selectionId);

    const { mutate, isLoading, isError, isSuccess } = useMutation({
      mutationFn: (params: { id1: string; id2: string; id3: string }) => {
        return api.subqueryApi.setBaseQueryIdSubquerySubidBaseApartmentPost(
          params.id1,
          params.id2,
          { guid: params.id3 }
        );
      },
      onSettled(data, error, variables, context) {
        console.log(data);
        console.log(error);
      },
      onSuccess: (aptData) => {
        store.queryGetData!.subQueries!.find(
          (q) => q.guid == subqueryId
        )!.standartObject = aptData.data;
      },
    });

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
    ];

    return (
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        // onCellEditCommit={onCellEditCommit}
        columns={columns}
        pageSize={5}
        onStateChange={(state, event, change) => {
          console.log(state);
          console.log(event);
          console.log(change);
        }}
        selectionModel={selectionId}
        onSelectionModelChange={(newSelection) => {
          console.log(newSelection);
          mutate({
            id1: store.queryGetData!.guid,
            id2: subqueryId,
            id3: data.find(
              (d) =>
                d.guid ==
                store.queryGetData?.subQueries
                  .find((q) => q.guid == subqueryId)
                  ?.inputApartments!.find(
                    (a) =>
                      a.guid ==
                      data[(newSelection as GridRowId[])[0] as number].guid
                  )?.guid
            )!.guid!,
          });
          setUpdate(!upd);
          //setSelectionId((newSelection as GridRowId[])[0] as number)
        }}
        rowsPerPageOptions={[]}
        autoHeight={true}
        sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
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
    );
  }
);

export default ReferenceTable;
