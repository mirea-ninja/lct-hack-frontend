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

interface InfoCardProps {
  title: string;
  description: string;
  isPositive: boolean | null;
}

function InfoCard ({ title, description, isPositive }: InfoCardProps) {
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
        fontSize={14}
        fontWeight={500}
        value={description}
        padding={0}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            }},

          alignSelf: "center",
          input: {
            color: isPositive === null ? theme.palette.secondary.dark : isPositive ? "#76BF5C" : "#F69681",
            width: "100%",
            textAlign: "center",
            padding: "0px",
            margin: "0px",

          },
          width: "fit-content",
        }}
      >
      </TextField>
    </Box>
  );
};

interface AnalogInfoProps {
  address: string;
  link: string | null;

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

export default function CollapsableAnalogInfo(
  {
    address = "ул. Ленина, 1",
    link = "https://www.example.com",

    price_final = null,
    m2price = 228228,
    // округлить до 2 знаков после запятой
    adj_m2price = m2price ? ((m2price - price_final) * 100 / m2price).toFixed(1) : null,

    building_type = null,
    floors = null,
    walls = null,

    floor = null,
    apt_area = null,
    kitchen_area = null,
    has_balcony = null,
    to_metro = null,
    repair_type = null,

    trade_adj = -4.5,
    floor_adj = null,
    apt_area_adj = null,
    kitchen_area_adj = null,
    has_balcony_adj = null,
    to_metro_adj = null,
    repair_type_adj = null,

    trade_adj_price = null,
    floor_adj_price = null,
    apt_area_adj_price = null,
    kitchen_area_adj_price = null,
    has_balcony_adj_price = null,
    to_metro_adj_price = null,
  }: AnalogInfoProps,
) {
  const theme = useTheme();

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

  repair_type = repair_type?.toLowerCase();
  repair_type = repair_type === "муниципальный ремонт"
                ? "муниципальная"
                : (repair_type === "современная отделка"
                  ? "современная"
                  : "без отделки");

  address = address.replace("Москва, ", "").replace("улица", "ул.").replace("проспект", "пр-кт").replace("переулок", "пер.").replace("площадь", "пл.").replace("ул.,", ",").replace(" ,", ",")
  building_type = building_type?.charAt(0).toUpperCase() + building_type?.slice(1);

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
            <Link href={link} target="_blank" sx={{textDecoration: "none"}}>
              <Typography
                fontSize={20}
                color={theme.palette.text.primary}
                fontWeight={700}
                lineHeight={"22px"}
                marginRight={"20px"}
                sx={{
                  width: "100%",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },

                }}
              >
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
        <Collapse in={isCollapsed}>
          <Typography
            fontSize={16}
            lineHeight={"18px"}
            color={theme.palette.secondary.dark}
            fontWeight={500}
            sx={{ marginTop: "15px", marginBottom: "20px" }}
          >
            {building_type}, <br />
            {floors} этаж{
              floors % 10 === 1 && floors % 100 !== 11 ? "" : floors % 10 >= 2 && floors % 10 <= 4 && (floors % 100 < 10 || floors % 100 >= 20) ? "а" : "ей"
            }, {' '}
            {walls.toLowerCase()}
          </Typography>

          {/* корректировки */}
          <Grid container spacing={"10px"}>
            <Grid item xs={4}>
              <InfoCard
                title={`торг`}
                description={`${trade_adj <= 0 ? "" : '+'}${trade_adj}%`}
                isPositive={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InfoCard
                title={`${floor} этаж`}
                description={`${floor_adj <= 0 ? "" : '+'}${floor_adj}%`}
                isPositive={floor === null ? null : floor_adj > 0 ? true : floor_adj < 0 ? false : null}
              />
            </Grid>
            <Grid item xs={4}>
              <InfoCard
                title={`S ${apt_area} м²`}
                description={`${apt_area_adj <= 0 ? "" : '+'}${apt_area_adj}%`}
                isPositive={apt_area === null ? null : apt_area_adj > 0 ? true : apt_area_adj < 0 ? false : null}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={`S кухни ${kitchen_area} м²`}
                description={`${kitchen_area_adj <= 0 ? "" : '+'}${kitchen_area_adj}%`}
                isPositive={kitchen_area === null ? null : kitchen_area_adj > 0 ? true : kitchen_area_adj < 0 ? false : null}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={`${has_balcony ? "есть" : "нет"} балкон${has_balcony ? "" : "а"}`}
                description={`${has_balcony_adj <= 0 ? "" : '+'}${has_balcony_adj}%`}
                isPositive={has_balcony === null ? null : has_balcony_adj > 0 ? true : has_balcony_adj < 0 ? false : null}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={`до метро ${to_metro} мин.`}
                description={`${to_metro_adj <= 0 ? "" : '+'}${to_metro_adj}%`}
                isPositive={to_metro === null ? null : to_metro_adj > 0 ? true : to_metro_adj < 0 ? false : null}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title={repair_type}
                description={`${repair_type_adj <= 0 ? "" : '+'}${repair_type_adj}₽`}
                isPositive={repair_type === null ? null : repair_type_adj > 0 ? true : repair_type_adj < 0 ? false : null}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </>
  );
}
