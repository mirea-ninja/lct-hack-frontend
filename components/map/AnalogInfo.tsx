import React from "react";
import { Collapse, Link, TextField, useTheme } from "@mui/material";
import {
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";

import ArrowLeft from "@mui/icons-material/ChevronLeft";
import { EditorModal, EditorModalType } from "./EditorModal";
import { PenIcon } from "../icons/PenIcon";
import { ClosedEyeIcon } from "../icons/ClosedEyeIcon";
import AddedByUserIcon from "../icons/AddedByUserIcon";
import { ApartmentGet } from "../../apiConnection/gen/models/apartment-get";

interface InfoCardProps {
  title: string;
  description: string;
  isPositive: boolean | null;
}

const InfoCard = ({ title, description, isPositive }: InfoCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",

        width: "fit-content",

        backgroundColor: title.includes("null") ? "#F6968140" : "#EEF2F5",
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
        fontSize={14}
        fontWeight={500}
        value={description}
        padding="0px"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            }},

          alignSelf: "center",
          input: {
            color: isPositive === null ? theme.palette.secondary.dark : isPositive ? "#76BF5C" : "#F69681",
            textAlign: "center",
            padding: "0px",
            margin: "0px",
            width: "100%",

          },
          width: "100%",
        }}
      />
    </Box>
  );
};

interface AnalogInfoProps {
  key: string
  analog: ApartmentGet;
}

export default function CollapsableAnalogInfo(
  { key, analog }: AnalogInfoProps
) {
  const theme = useTheme();

  const [editorOpen, setEditorOpen] = React.useState(false);

  let address = analog.address ? analog.address : "Адрес не указан"
  let link = analog.link ? analog.link : "https://www.example.com"

  let price_final = analog.adjustment?.priceFinal ? analog.adjustment?.priceFinal : "?";
  let m2price = analog.m2price ? analog.m2price : "Цена за кв.м. не указана";

  let building_type = analog.segment ? analog.segment : "Тип жилья не указан"
  let floors = analog.floors ? analog.floors : null
  let walls = analog.walls ? analog.walls : "Тип стен не указан"
  let floor = analog.floor ? analog.floor : null
  let apt_area = analog.apartmentArea ? analog.apartmentArea : null
  let kitchen_area = analog.kitchenArea ? analog.kitchenArea : null
  let has_balcony = analog.hasBalcony ? analog.hasBalcony : null
  let to_metro = analog.distanceToMetro ? analog.distanceToMetro : null
  let repair_type = analog.quality ? analog.quality : null

  let trade_adj = analog.adjustment?.trade ? analog.adjustment?.trade : -0.045
  let floor_adj = analog.adjustment?.floor ? analog.adjustment?.floor : 0
  let apt_area_adj = analog.adjustment?.aptArea ? analog.adjustment?.aptArea : 0
  let kitchen_area_adj = analog.adjustment?.kitchenArea ? analog.adjustment?.kitchenArea : 0
  let has_balcony_adj = analog.adjustment?.hasBalcony ? analog.adjustment?.hasBalcony : 0
  let to_metro_adj = analog.adjustment?.distanceToMetro ? analog.adjustment?.distanceToMetro : 0
  let repair_type_adj = analog.adjustment?.quality ? analog.adjustment?.quality : 0

  let trade_adj_price = analog.adjustment?.priceTrade ? analog.adjustment?.priceTrade : null
  let floor_adj_price = analog.adjustment?.priceFloor ? analog.adjustment?.priceFloor : null
  let apt_area_adj_price = analog.adjustment?.priceArea ? analog.adjustment?.priceArea : null
  let kitchen_area_adj_price = analog.adjustment?.priceKitchen ? analog.adjustment?.priceKitchen : null
  let has_balcony_adj_price = analog.adjustment?.priceBalcony ? analog.adjustment?.priceBalcony : null
  let to_metro_adj_price = analog.adjustment?.priceMetro ? analog.adjustment?.priceMetro : null

  let adj_m2price = m2price ? ((price_final - m2price) * 100 / m2price).toFixed(1) : null

  repair_type = repair_type?.toLowerCase();
  repair_type = repair_type === "муниципальный ремонт"
                ? "муниципальная"
                : (repair_type === "современная отделка"
                  ? "современная"
                  : "без отделки");

  address = address.replace("Москва, ", "").replace("улица", "ул.").replace("проспект", "пр-кт").replace("переулок", "пер.").replace("площадь", "пл.").replace("ул.,", ",").replace(" ,", ",")
  building_type = building_type?.charAt(0).toUpperCase() + building_type?.slice(1);

  // умножить все _adj на 100 и округлить до 1 знака после запятой. Если после запятой 0, то округлить до целого
  trade_adj = trade_adj ? (trade_adj * 100).toFixed(1) : null;
  trade_adj = trade_adj % 1 === 0 ? (trade_adj / 1) : trade_adj;

  floor_adj = floor_adj ? (floor_adj * 100).toFixed(1) : null;
  floor_adj = floor_adj % 1 === 0 ? (floor_adj / 1) : floor_adj;

  apt_area_adj = apt_area_adj ? (apt_area_adj * 100).toFixed(1) : null;
  apt_area_adj = apt_area_adj % 1 === 0 ? (apt_area_adj / 1) : apt_area_adj;

  kitchen_area_adj = kitchen_area_adj ? (kitchen_area_adj * 100).toFixed(1) : null;
  kitchen_area_adj = kitchen_area_adj % 1 === 0 ? (kitchen_area_adj / 1) : kitchen_area_adj;

  has_balcony_adj = has_balcony_adj ? (has_balcony_adj * 100).toFixed(1) : null;
  has_balcony_adj = has_balcony_adj % 1 === 0 ? (has_balcony_adj / 1) : has_balcony_adj;

  to_metro_adj = to_metro_adj ? (to_metro_adj * 100).toFixed(1) : null;
  to_metro_adj = to_metro_adj % 1 === 0 ? (to_metro_adj / 1) : to_metro_adj;

  // repair_type_adj = repair_type_adj ? (repair_type_adj * 100).toFixed(1) : null;
  // repair_type_adj = repair_type_adj % 1 === 0 ? (repair_type_adj / 1) : repair_type_adj;

  return (
    <>
      <EditorModal
        type={EditorModalType.EDIT}
        open={editorOpen}
        setOpen={setEditorOpen}
      />
      <Box paddingRight="10px">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "10px",
            paddingBottom: "15px",
          }}
        >
          {/* адрес */}
          <Link
              href={link !== "https://www.example.com" ? link : "#"}
              target={link !== "https://www.example.com" ? "_blank" : "_self"}
              sx={{textDecoration: "none"}}
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
                    color: link !== "https://www.example.com"
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
          <IconButton>
            <ClosedEyeIcon />
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
            color={adj_m2price < 0 ? "#F79681" : adj_m2price > 0 ? "#76BF5C" : theme.palette.secondary.dark}
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
        <Box>
        <Typography
            fontSize={16}
            lineHeight={"18px"}
            color={theme.palette.secondary.dark}
            fontWeight={500}
            sx={{ marginTop: "15px", marginBottom: "20px" }}
          >
            {
              building_type.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
            }, {' '}
            {floors} этаж{
              floors % 10 === 1 && floors % 100 !== 11 ? "" : floors % 10 >= 2 && floors % 10 <= 4 && (floors % 100 < 10 || floors % 100 >= 20) ? "а" : "ей"
            }, {' '}
            {walls.toLowerCase()}
          </Typography>

          {/* корректировки */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "5px",
              width: "100%",
            }}
          >
            <InfoCard
                title={`торг`}
                description={`${trade_adj <= 0 ? "" : '+'}${trade_adj}%`}
                isPositive={false}
              />

            <InfoCard
                title={`${floor} этаж`}
                description={`${floor_adj <= 0 ? "" : '+'}${floor_adj}%`}
                isPositive={floor === null ? null : floor_adj > 0 ? true : floor_adj < 0 ? false : null}
              />

            <InfoCard
                title={`S ${apt_area} м²`}
                description={`${apt_area_adj <= 0 ? "" : '+'}${apt_area_adj}%`}
                isPositive={apt_area === null ? null : apt_area_adj > 0 ? true : apt_area_adj < 0 ? false : null}
              />

            <InfoCard
                title={`S кухни ${kitchen_area} м²`}
                description={`${kitchen_area_adj <= 0 ? "" : '+'}${kitchen_area_adj}%`}
                isPositive={kitchen_area === null ? null : kitchen_area_adj > 0 ? true : kitchen_area_adj < 0 ? false : null}
              />

            <InfoCard
                title={`${has_balcony ? "есть" : "нет"} балкон${has_balcony ? "" : "а"}`}
                description={`${has_balcony_adj <= 0 ? "" : '+'}${has_balcony_adj}%`}
                isPositive={has_balcony === null ? null : has_balcony_adj > 0 ? true : has_balcony_adj < 0 ? false : null}
              />

            <InfoCard
                title={`до метро ${to_metro} мин.`}
                description={`${to_metro_adj <= 0 ? "" : '+'}${to_metro_adj}%`}
                isPositive={to_metro === null ? null : to_metro_adj > 0 ? true : to_metro_adj < 0 ? false : null}
              />

           <InfoCard
                title={repair_type}
                description={`${repair_type_adj <= 0 ? "" : '+'}${repair_type_adj}₽`}
                isPositive={repair_type === null ? null : repair_type_adj > 0 ? true : repair_type_adj < 0 ? false : null}
              />
          </Box>
        </Box>
      </Box>
    </>
  );
}
