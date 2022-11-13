import React from "react";
import { Collapse, useTheme } from "@mui/material";
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
        gap: "2px",

        minWidth: "fit-content",
        width: "100%",

        backgroundColor: isPositive === null ? "#F6968140" : "#EEF2F5",
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
      <Typography
        fontSize={14}
        fontWeight={500}
        color={
          isPositive === null
            ? theme.palette.secondary.dark
            : isPositive
            ? "#76BF5C"
            : "#F69681"
        }
      >
        {description}
      </Typography>
    </Box>
  );
};

interface AnalogInfoProps {
  address: string;

  price_final: number | null;
  m2price: number | null;
  adj_m2price: number | null;

  building_type: string | null;
  floors: number | null;
  walls: string | null;

  floor: number | null;
  apt_area: number | null;
  kitchen_area: number | null;
  has_balcony: boolean | null;
  to_metro: number | null;
  repair_type: string | null;

  trade_adj: number | null;
  floor_adj: number | null;
  apt_area_adj: number | null;
  kitchen_area_adj: number | null;
  has_balcony_adj: number | null;
  to_metro_adj: number | null;
  repair_type_adj: number | null;

  trade_adj_price: number | null;
  floor_adj_price: number | null;
  apt_area_adj_price: number | null;
  kitchen_area_adj_price: number | null;
  has_balcony_adj_price: number | null;
  to_metro_adj_price: number | null;
}

export default function AnalogInfo(
  {
    address = "ул. Ленина, 1",

    price_final = 337337,
    m2price = 228228,
    adj_m2price = -2.3,

    building_type = "cовременнное жилье",
    floors = 22,
    walls = "панель",

    floor = 2,
    apt_area = 33,
    kitchen_area = 7,
    has_balcony = true,
    to_metro = 5,
    repair_type = "муниципальный ремонт",

    trade_adj = -4.5,
    floor_adj = 0,
    apt_area_adj = +2.3,
    kitchen_area_adj = 0,
    has_balcony_adj = 0,
    to_metro_adj = 0,
    repair_type_adj = 0,

    trade_adj_price = -2500,
    floor_adj_price = 0,
    apt_area_adj_price = +1500,
    kitchen_area_adj_price = 0,
    has_balcony_adj_price = 0,
    to_metro_adj_price = 0,
  }: AnalogInfoProps,
) {
  const theme = useTheme();

  const [editorOpen, setEditorOpen] = React.useState(false);

  repair_type = repair_type?.toLowerCase();
  repair_type = repair_type === "муниципальный ремонт"
                ? "муниципальная"
                : (repair_type === "современная отделка"
                  ? "современная"
                  : "без отделки");

  return (
    <>
      <EditorModal
        type={EditorModalType.EDIT}
        open={editorOpen}
        setOpen={setEditorOpen}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "10px",
            paddingBottom: "15px",
          }}
        >
          {/* адрес */}
          <Typography
            fontSize={20}
            color={theme.palette.text.primary}
            fontWeight={700}
            lineHeight={"22px"}
            marginRight={"20px"}
          >
            {address}
          </Typography>

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
            }}
          >
            <InfoCard
                title={`торг`}
                description={`${trade_adj <= 0 ? "" : '+'}${trade_adj}%`}
                isPositive={true}
              />

            <InfoCard
                title={`${floor} этаж`}
                description={`${floor_adj <= 0 ? "" : '+'}${floor_adj}%`}
                isPositive={floor === null ? null : floor > 0}
              />

            <InfoCard
                title={`S ${apt_area} м²`}
                description={`${apt_area_adj <= 0 ? "" : '+'}${apt_area_adj}%`}
                isPositive={apt_area === null ? null : apt_area > 0}
              />

            <InfoCard
                title={`S кухни ${kitchen_area} м²`}
                description={`${kitchen_area_adj <= 0 ? "" : '+'}${kitchen_area_adj}%`}
                isPositive={kitchen_area === null ? null : kitchen_area > 0}
              />

            <InfoCard
                title={`${has_balcony ? "есть" : "нет"} балкон${has_balcony ? "" : "а"}`}
                description={`${has_balcony_adj <= 0 ? "" : '+'}${has_balcony_adj}%`}
                isPositive={has_balcony === null ? null : has_balcony > 0}
              />

            <InfoCard
                title={`до метро ${to_metro} мин.`}
                description={`${to_metro_adj <= 0 ? "" : '+'}${to_metro_adj}%`}
                isPositive={to_metro === null ? null : to_metro > 0}
              />

           <InfoCard
                title={repair_type}
                description={`${repair_type_adj <= 0 ? "" : '+'}${repair_type_adj}₽`}
                isPositive={repair_type=== null ? null : repair_type > 0}
              />
          </Box>
        </Box>
      </Box>
    </>
  );
}
