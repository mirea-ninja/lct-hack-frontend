import React from "react";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { CloseIcon } from "../icons/CloseIcon";
import AnalogInfo from "./AnalogInfo";
import styles from "./HiddenAnalogsModal.module.scss";
import { SubQueryGet } from "../../apiConnection/gen/models/sub-query-get";
import { ApartmentGet } from "../../apiConnection/gen/models/apartment-get";
import { useApiClient } from "../../logic/ApiClientHook";
import { useStore } from "../../logic/DataStore";

const Hr = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "1px",
        backgroundColor: theme.palette.secondary.light,
        marginTop: "20px",
        marginBottom: "10px",
      }}
    />
  );
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedSubQuery: SubQueryGet;
};

export default function HiddenAnalogsModal({
  open,
  setOpen,
  selectedSubQuery,
}: Props) {
  const theme = useTheme();
  const store = useStore();
  const apiClient = useApiClient();

  const onAnalogSetSelected = (analog: ApartmentGet) => {
    const selectedSubQueryIndex = store.queryGetData!.subQueries.findIndex(
      (subQuery) => subQuery.guid === selectedSubQuery.guid
    );

    if (store.queryGetData === null) return;
    if (selectedSubQueryIndex === -1) return;

    if (
      selectedSubQueryIndex !== -1 &&
      analog.floor !== null &&
      analog.apartmentArea !== null &&
      analog.kitchenArea !== null &&
      analog.hasBalcony !== null &&
      analog.quality !== null &&
      analog.distanceToMetro !== null
    ) {
      // Обновляем состояние в Store: добавляем аналог в список выбранных аналогов

      store.queryGetData.subQueries[
        selectedSubQueryIndex
      ].selectedAnalogs!.push(analog);
    }

    // Отправляем запрос на сервер для обновления аналогов (перезаписываем список выбранных аналогов)
    apiClient.subqueryApi
      .setAnalogsApiQueryIdSubquerySubidUserAnalogsPost(
        store.queryGetData!.guid,
        selectedSubQuery.guid,
        {
          guids: store.queryGetData.subQueries[
            selectedSubQueryIndex
          ].selectedAnalogs!.map((analog) => analog.guid),
        }
      )
      .then((_) => {
        apiClient.subqueryApi
          .calculateAnalogsApiQueryIdSubquerySubidCalculateAnalogsPost(
            store.queryGetData!.guid,
            selectedSubQuery.guid
          )
          .then((_) => {
            // Отправляем аналоги на перерасчет
            apiClient.subqueryApi
              .recalculateAnalogsApiQueryIdSubquerySubidRecalculateAnalogsPost(
                store.queryGetData!.guid,
                selectedSubQuery.guid
              )
              .then((res) => {
                // Обновляем локальное состояние с учётом перерасчёта
                store.updGetQueryData(res.data);
              });
          });
      });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={styles.modal}
        sx={{
          background: theme.palette.background.paper,
        }}
      >
        {/* header */}
        <Box className={styles.header}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Typography
              fontSize={24}
              lineHeight={"26px"}
              color={theme.palette.text.primary}
              fontWeight={700}
            >
              Скрытые аналоги
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* body */}
        <Box
          sx={{
            width: "100%",
            marginTop: "5px",
            scrollBehavior: "smooth",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.palette.secondary.light} ${theme.palette.secondary.main}`,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "10px",
            },
          }}
        >
          {selectedSubQuery.analogs!.map((analog, i) => (
            <>
              {selectedSubQuery.selectedAnalogs?.findIndex(
                (selectedAnalog) => selectedAnalog.guid === analog.guid
              ) === -1 && (
                <>
                  <AnalogInfo
                    key={analog.guid}
                    analog={analog!}
                    setSelected={onAnalogSetSelected}
                    selectedSubQueryGuid={selectedSubQuery.guid}
                  />
                  {i !== selectedSubQuery.analogs!.length - 1 && <Hr />}
                </>
              )}
            </>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
