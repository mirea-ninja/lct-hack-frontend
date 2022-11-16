import React from "react"
import { Collapse, useTheme } from "@mui/material"
import {
  Button,
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Stack,
  GridWrap,
} from "@mui/material"

import ArrowLeft from "@mui/icons-material/ChevronLeft"
import Link from "next/link"

const Tag = (text: string) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        padding: "5px 5px",
        margin: "3px auto",
        borderRadius: "10px",
        background: "#DFE1E3",
        width: "100%",
        minWidth: "fit-content",

        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Typography
        fontSize="14px"
        lineHeight="16px"
        color={theme.palette.text.primary}
        fontWeight={400}
      >
        {text}
      </Typography>
    </Box>
  )
}

const FloorTag = (floor: number) => {
  return Tag(`${floor} этаж`)
}

const AreaTag = (area: number) => {
  return Tag(`S ${area} м²`)
}

const KitchenAreaTag = (area: number) => {
  return Tag(`S кухня ${area} м²`)
}

const HasBalconyTag = (hasBalcony: boolean) => {
  return Tag(hasBalcony ? "есть балкон" : "нет балкона")
}

const ToMetroTag = (toMetro: number) => {
  return Tag(`${toMetro} мин. до метро`)
}

const RepairTypeTag = (repairType: string) => {
  return Tag(repairType.toLowerCase())
}

type Props = {
  isExpanded: boolean

  address: string
  price: number
  buildingType: string
  floors: number
  walls: string

  floor: number
  area: number
  kitchenArea: number
  hasBalcony: boolean
  toMetro: number
  repairType: string
}

export default function ReferenceCard({
  isExpanded = true,
  address,
  price,
  buildingType,
  floors,
  walls,
  floor,
  area,
  kitchenArea,
  hasBalcony,
  toMetro,
  repairType,
}: Props) {
  const theme = useTheme()

  const [isCollapsed, setIsCollapsed] = React.useState(isExpanded)

  return (
    <Box
      sx={{
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "20px",
        gap: "5px",

        position: "absolute",
        width: "fit-content",
        minHeight: "135px",
        right: "30px",
        top: "127px",

        backgroundColor: "#FFFFFF",

        boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          width: "100%",
        }}
      >
        <Typography
          fontSize={20}
          fontWeight={700}
          lineHeight={"22px"}
          marginRight={"20px"}
        >
          Эталон
        </Typography>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <ArrowLeft
            sx={{
              transform: isCollapsed ? "rotate(90deg)" : "rotate(-90deg)",
              transition: "transform .3s",
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={isCollapsed}>
        <Box>
          <Typography variant="body2" pb={"10px"}>
            {address.replace("г. ", "").replace("Москва, ", "").replace("улица", "ул.").replace("ул. ", "").replace("проспект", "пр-кт").replace("переулок", "пер.").replace("площадь", "пл.").replace("ул.,", ",").replace("корп.", "к.").replace("д.", "").replace(", к. ", "К").replace(" ,", ",")}
          </Typography>
          <Typography variant="body2" pb={"10px"}>
            {price} ₽ / м²
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.secondary.dark}
            pb={"10px"}
          >
            {buildingType},<br /> {floors} этаж
            {floors % 10 == 1 && floors % 100 != 11
              ? ""
              : floors % 10 >= 2 &&
                floors % 10 <= 4 &&
                (floors % 100 < 10 || floors % 100 >= 20)
              ? "а"
              : "ей"}
            , {walls.toLowerCase()}
          </Typography>
          <Stack paddingBottom="10px">
            <Stack direction="row" gap="5px">
              {FloorTag(floor)}
              {AreaTag(area)}
              {KitchenAreaTag(kitchenArea)}
            </Stack>
            <Stack direction="row" gap="5px">
              {HasBalconyTag(hasBalcony)}
              {ToMetroTag(toMetro)}
            </Stack>
            {RepairTypeTag(repairType)}
          </Stack>
        </Box>
      </Collapse>
      <Link href="/calculate_pool">
        <Button variant={"mainActive"} sx={{ width: "100%", height: "50px",}}>
          Рассчитать пул
        </Button>
      </Link>
    </Box>
  )
}
