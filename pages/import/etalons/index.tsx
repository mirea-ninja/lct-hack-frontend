import React from "react";
import Header from "../../../components/main/Header";
import ReferenceTableExpandable from "../../../components/ImportDonePage/ReferenceTableExpandable";
import {
  DataRow,
  RepairType,
  SegmentType,
  WallMaterials,
} from "../../../components/ImportDonePage/types";
import Button from "@mui/material/Button";
import TextBox from "../../../components/TextBox/TextBox";
import { useApiClient } from "../../../logic/ApiClientHook";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
} from "@mui/material";
import { useStore } from "../../../logic/DataStore";
import { toJS } from "mobx";

export default function ImportDonePage() {
  let store = useStore();
  let api = useApiClient();

  console.log(toJS(store.queryGetData));
  const rows = store.queryGetData?.subQueries ?? [];

  return (
    <Box>
      <Header stepProgress={2} />
      <Stack padding={5} gap={3}>
        <Stack gap={2}>
          <Typography variant="h5" fontWeight="bold" color="#3E3E41">
            Выберите эталон
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack gap={1}>
              <Typography variant="h6" color="#3E3E41">
                {store.queryGetData?.name ?? store.file.name}
              </Typography>
              <Typography variant="body1" color="#3E3E41">
                {store!.queryGetData!.subQueries[0]!.standartObject!.address}
              </Typography>
            </Stack>
            <Stack direction="row" gap={3} height="80%">
              <Button
                variant="contained"
                sx={{
                  boxShadow: "none",

                  "&:hover": {
                    boxShadow: "none",
                  },

                  "&:active": {
                    boxShadow: "none",
                  },
                }}
              >
                Найти аналоги
              </Button>
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
          {rows.map((row, i) => (
            <ReferenceTableExpandable key={i} data={row} roomsCount={i} />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
