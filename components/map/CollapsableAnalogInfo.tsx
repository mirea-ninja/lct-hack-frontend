import React from "react";
import { Collapse, InputAdornment, Link, useTheme } from "@mui/material";
import {
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";

import ArrowLeft from "@mui/icons-material/ChevronLeft";
import { EditorModalType, EditorModal } from "./EditorModal";
import { PenIcon } from "../icons/PenIcon";
import { ClosedEyeIcon } from "../icons/ClosedEyeIcon";
import TextField from "@mui/material/TextField";
import AddedByUserIcon from "../icons/AddedByUserIcon";
import { ApartmentGet } from "../../apiConnection/gen/models/apartment-get";
import { useStore } from "../../logic/DataStore";
import { useApiClient } from "../../logic/ApiClientHook";

interface InfoCardProps {
  title: string;
  description: string;
  isPositive: boolean | null;
}

function InfoCard({ title, description, isPositive }: InfoCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px 0px",
        gap: "2px",

        minWidth: "90px",

        backgroundColor:
          // если title содержит "null" или isPositive === null то цвет фона #F6968140 иначе #EEF2F5
          title.includes("null") ? "#F6968140" : "#EEF2F5",
        borderRadius: "10px",
      }}
    >
      <Typography
        fontSize={14}
        fontWeight={500}
        color={theme.palette.secondary.dark}
      >
        {title}
      </Typography>
      <TextField
        fontWeight={500}
        value={description}
        padding={0}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },

          alignSelf: "center",
          input: {
            color:
              isPositive === null
                ? theme.palette.secondary.dark
                : isPositive
                ? "#76BF5C"
                : "#F69681",
            width: "100%",
            textAlign: "center",
            padding: "0px",
            margin: "0px",
          },
          width: "fit-content",
        }}
      />
    </Box>
  );
}

interface AnalogInfoProps {
  key: string;
  analog: ApartmentGet;
  selectedSubQueryGuid: string;
}

export default function CollapsableAnalogInfo({
  key,
  analog,
  selectedSubQueryGuid,
}: AnalogInfoProps) {
  const theme = useTheme();
  const store = useStore();
  const apiClient = useApiClient();

  const onAnalogHide = (analog: ApartmentGet) => {
    if (store.queryGetData === null) return;
    if (store.queryGetData.subQueries === null) return;

    const selectedSubQueryIndex = store.queryGetData.subQueries.findIndex(
      (subQuery) => subQuery.guid === selectedSubQueryGuid
    );

    if (selectedSubQueryIndex !== -1) {
      // Обновляем состояние в Store: удаляем аналог из списка выбранных аналогов (selectedAnalogs
      store.queryGetData.subQueries[selectedSubQueryIndex].selectedAnalogs =
        store.queryGetData.subQueries[
          selectedSubQueryIndex
        ].selectedAnalogs!.filter((tmp) => tmp.guid !== analog.guid);

      // Отправляем запрос на сервер для обновления аналогов (перезаписываем список выбранных аналогов)
      apiClient.subqueryApi.setAnalogsApiQueryIdSubquerySubidUserAnalogsPost(
        store.queryGetData!.guid,
        selectedSubQueryGuid,
        {
          guids: store.queryGetData.subQueries[
            selectedSubQueryIndex
          ].selectedAnalogs!.map((analog) => analog.guid),
        }
      );
    }
  };

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

  let address = analog.address ? analog.address : "Адрес не указан";

  let link = analog.link ? analog.link : "https://www.example.com";

  let price_final = analog.adjustment?.priceFinal;
  let m2price = analog.m2price;
  let building_type = analog.segment;
  let floors = analog.floors;
  let walls = analog.walls ? analog.walls : "тип стен не указан";

  let floor = analog.floor;
  let apt_area = analog.apartmentArea;
  let kitchen_area = analog.kitchenArea;
  let has_balcony = analog.hasBalcony;
  let to_metro = analog.distanceToMetro;
  let repair_type = analog.quality;

  let trade_adj = analog.adjustment?.trade;
  let floor_adj = analog.adjustment?.floor;
  let apt_area_adj = analog.adjustment?.aptArea;
  let kitchen_area_adj = analog.adjustment?.kitchenArea;
  let has_balcony_adj = analog.adjustment?.hasBalcony;
  let to_metro_adj = analog.adjustment?.distanceToMetro;
  let repair_type_adj = analog.adjustment?.quality;

  let trade_adj_price = analog.adjustment?.priceTrade;
  let floor_adj_price = analog.adjustment?.priceFloor;
  let apt_area_adj_price = analog.adjustment?.priceArea;
  let kitchen_area_adj_price = analog.adjustment?.priceKitchen;
  let has_balcony_adj_price = analog.adjustment?.priceBalcony;
  let to_metro_adj_price = analog.adjustment?.priceMetro;

  let adj_m2price = m2price
    ? (((price_final - m2price) * 100) / m2price).toFixed(1)
    : null;

  repair_type = repair_type?.toLowerCase();
  repair_type =
    repair_type === "муниципальный ремонт"
      ? "муниципальная"
      : repair_type === "современная отделка"
      ? "современная"
      : "без отделки";

  address = address
    .replace("Москва, ", "")
    .replace("улица", "ул.")
    .replace("проспект", "пр-кт")
    .replace("переулок", "пер.")
    .replace("площадь", "пл.")
    .replace("ул.,", ",")
    .replace("корп.", "к.")
    .replace(" ,", ",");
  building_type =
    building_type?.charAt(0).toUpperCase() + building_type?.slice(1);

  // умножить все _adj на 100 и округлить до 1 знака после запятой. Если после запятой 0, то округлить до целого
  trade_adj = trade_adj ? (trade_adj * 100).toFixed(1) : null;
  trade_adj = trade_adj % 1 === 0 ? trade_adj / 1 : trade_adj;

  floor_adj = floor_adj ? (floor_adj * 100).toFixed(1) : null;
  floor_adj = floor_adj % 1 === 0 ? floor_adj / 1 : floor_adj;

  apt_area_adj = apt_area_adj ? (apt_area_adj * 100).toFixed(1) : null;
  apt_area_adj = apt_area_adj % 1 === 0 ? apt_area_adj / 1 : apt_area_adj;

  kitchen_area_adj = kitchen_area_adj
    ? (kitchen_area_adj * 100).toFixed(1)
    : null;
  kitchen_area_adj =
    kitchen_area_adj % 1 === 0 ? kitchen_area_adj / 1 : kitchen_area_adj;

  has_balcony_adj = has_balcony_adj ? (has_balcony_adj * 100).toFixed(1) : null;
  has_balcony_adj =
    has_balcony_adj % 1 === 0 ? has_balcony_adj / 1 : has_balcony_adj;

  to_metro_adj = to_metro_adj ? (to_metro_adj * 100).toFixed(1) : null;
  to_metro_adj = to_metro_adj % 1 === 0 ? to_metro_adj / 1 : to_metro_adj;

  // repair_type_adj = repair_type_adj ? (repair_type_adj * 100).toFixed(1) : null;
  // repair_type_adj = repair_type_adj % 1 === 0 ? (repair_type_adj / 1) : repair_type_adj;

  return (
    <>
      <EditorModal
        type={EditorModalType.EDIT}
        open={editorOpen}
        setOpen={setEditorOpen}
        // selectedSubQuery={selectedSubQuery}
      />

      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            paddingBottom: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* адрес */}
            <Link
              href={link !== "https://www.example.com" ? link : "#"}
              target={link !== "https://www.example.com" ? "_blank" : "_self"}
              sx={{ textDecoration: "none" }}
            >
              <Typography
                fontSize={20}
                color={theme.palette.text.primary}
                fontWeight={700}
                lineHeight={"22px"}
                marginRight={"20px"}
                sx={{
                  width: "100%",
                  "&:hover": {
                    color:
                      link !== "https://www.example.com"
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                  },
                }}
              >
                {link === "https://www.example.com" && <AddedByUserIcon />}
                {address}
              </Typography>
            </Link>

            {/* кнопки */}
            <IconButton onClick={() => setEditorOpen(true)}>
              <PenIcon />
            </IconButton>
            <IconButton onClick={() => onAnalogHide(analog)}>
              <ClosedEyeIcon />
            </IconButton>
          </Box>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <ArrowLeft sx={{ transform: "rotate(90deg)" }} />
            ) : (
              <ArrowLeft sx={{ transform: "rotate(-90deg)" }} />
            )}
          </IconButton>
        </Box>

        {/* верхние цифры */}
        <Box display={"flex"} alignItems={"center"} marginBottom={"5px"}>
          <Typography
            fontSize={18}
            lineHeight={"20px"}
            color={theme.palette.text.primary}
            fontWeight={500}
            sx={{ marginRight: "5px" }}
          >
            {price_final} ₽ / м²
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Typography
            fontSize={16}
            lineHeight={"18px"}
            color={theme.palette.secondary.dark}
            fontWeight={500}
            sx={{ marginRight: "10px" }}
          >
            {m2price} ₽ / м²
          </Typography>
          <Typography
            fontSize={16}
            lineHeight={"18px"}
            color={
              adj_m2price < 0
                ? "#F79681"
                : adj_m2price > 0
                ? "#76BF5C"
                : theme.palette.secondary.dark
            }
            fontWeight={500}
            sx={{ marginRight: "5px" }}
          >
            {adj_m2price > 0 ? "+" : ""}
            {adj_m2price}%
          </Typography>
          <Typography
            fontSize={16}
            lineHeight={"18px"}
            color={theme.palette.secondary.dark}
            fontWeight={500}
          >
            итог
          </Typography>
        </Box>
        <Collapse in={isCollapsed}>
          <Typography
            fontSize={16}
            lineHeight={"18px"}
            color={theme.palette.secondary.dark}
            fontWeight={500}
            sx={{ marginTop: "15px", marginBottom: "20px" }}
          >
            {building_type}, <br />
            {floors} этаж
            {floors % 10 === 1 && floors % 100 !== 11
              ? ""
              : floors % 10 >= 2 &&
                floors % 10 <= 4 &&
                (floors % 100 < 10 || floors % 100 >= 20)
              ? "а"
              : "ей"}
            , {`${walls}`.toLowerCase()}
          </Typography>

          {/* корректировки */}
          <Grid container spacing={"10px"}>
            <Grid item xs={4}>
              <InfoCard
                title={`торг`}
                description={`${trade_adj <= 0 ? "" : "+"}${trade_adj}%`}
                isPositive={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InfoCard
                title={`${floor} этаж`}
                description={`${floor_adj <= 0 ? "" : "+"}${floor_adj}%`}
                isPositive={
                  floor === null
                    ? null
                    : floor_adj > 0
                    ? true
                    : floor_adj < 0
                    ? false
                    : null
                }
              />
            </Grid>
            <Grid item xs={4}>
              <InfoCard
                title={`S ${apt_area} м²`}
                description={`${apt_area_adj <= 0 ? "" : "+"}${apt_area_adj}%`}
                isPositive={
                  apt_area === null
                    ? null
                    : apt_area_adj > 0
                    ? true
                    : apt_area_adj < 0
                    ? false
                    : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={`S кухни ${kitchen_area} м²`}
                description={`${
                  kitchen_area_adj <= 0 ? "" : "+"
                }${kitchen_area_adj}%`}
                isPositive={
                  kitchen_area === null
                    ? null
                    : kitchen_area_adj > 0
                    ? true
                    : kitchen_area_adj < 0
                    ? false
                    : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={`${has_balcony ? "есть" : "нет"} балкон${
                  has_balcony ? "" : "а"
                }`}
                description={`${
                  has_balcony_adj <= 0 ? "" : "+"
                }${has_balcony_adj}%`}
                isPositive={
                  has_balcony === null
                    ? null
                    : has_balcony_adj > 0
                    ? true
                    : has_balcony_adj < 0
                    ? false
                    : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={`до метро ${to_metro} мин.`}
                description={`${to_metro_adj <= 0 ? "" : "+"}${to_metro_adj}%`}
                isPositive={
                  to_metro === null
                    ? null
                    : to_metro_adj > 0
                    ? true
                    : to_metro_adj < 0
                    ? false
                    : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={repair_type}
                description={`${
                  repair_type_adj <= 0 ? "" : "+"
                }${repair_type_adj}₽`}
                isPositive={
                  repair_type === null
                    ? null
                    : repair_type_adj > 0
                    ? true
                    : repair_type_adj < 0
                    ? false
                    : null
                }
              />
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </>
  );
}
