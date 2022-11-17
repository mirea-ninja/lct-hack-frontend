import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DownloadIcon from "../../icons/DownloadIcon";
import { ArrowRight } from "../../icons/ArrowRightIcon";
import { useStore } from "../../../logic/DataStore";
import { QueryGet } from "../../../apiConnection/gen/models/query-get";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";

const PrimaryTypography = styled(Typography)({
  color: "var(--text-clr-main)",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "20px",
});

const SecondaryTypography = styled(Typography)({
  color: "var(--text-clr-secondary)",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "20px",
});

type Props = { item: QueryGet };

const getQueryDefaultAddress = (query: QueryGet) => {
  if (query.subQueries.length === 0) return "";
  const subQuery = query.subQueries[0];
  return subQuery.standartObject !== undefined
    ? subQuery.standartObject.address
    : subQuery.analogs !== undefined && subQuery.analogs.length > 0
    ? subQuery.analogs[0].address
    : "";
};

const getQueryApartmentCount = (query: QueryGet) => {
  if (query.subQueries.length === 0) return 0;
  let count = 0;
  query.subQueries.forEach((subQuery) => {
    count += subQuery.inputApartments!.length;
  });
  return count;
};

export default function ArchiveItem({ item }: Props) {
  const store = useStore();
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        padding: "20px",
        borderRadius: "var(--border-radius-1)",
        // cursor: "pointer",

        "&:hover": {
          boxShadow: "var(--shadow-1)",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" sx={{ gap: "70px" }}>
          <PrimaryTypography>
            {new Date(item.createdAt).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </PrimaryTypography>
          <PrimaryTypography sx={{ width: "400px" }}>
            {item.name}
          </PrimaryTypography>
          <SecondaryTypography>
            {getQueryDefaultAddress(item)}
          </SecondaryTypography>
          <SecondaryTypography sx={{ width: "120px" }}>
            {getQueryApartmentCount(item)} квартир
          </SecondaryTypography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ gap: "50px" }}>
          <Stack direction="row" alignItems="center" sx={{ gap: "10px" }}>
            <Button
              onClick={() => {
                window.open(item.inputFile, "_blank");
              }}
              variant="text"
              startIcon={<DownloadIcon />}
              sx={{ color: "var(--text-clr-secondary)" }}
            >
              Первичный файл
            </Button>
            <Button
              onClick={() => {
                window.open(item.outputFile, "_blank");
              }}
              variant="text"
              startIcon={<DownloadIcon />}
              sx={{ color: "var(--accent-clr)" }}
            >
              Итоговый файл
            </Button>
          </Stack>
          <IconButton
            sx={{ width: "40px", height: "40px" }}
            onClick={() => {
              // Обновляем локальное состояние Store от выбранного запроса
              store.updGetQueryData(item);

              // Устанавливаем isAnalogsLoaded в true, чтобы при переходе на страницу карты аналоги не искались заново
              store.isAnalogsLoaded = true;

              // Переходим на страницу выбора эталона (import/etalons)
              router.replace("/import/etalons");
            }}
          >
            <ArrowRight />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
