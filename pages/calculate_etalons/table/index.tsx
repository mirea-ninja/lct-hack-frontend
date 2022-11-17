import React, { useState, useEffect } from "react"
import Header from "../../../components/main/Header"
import { Box, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import AppButton from "../../../components/buttons/AppButton"
import IconButton from "@mui/material/IconButton"
import { CloseIcon } from "../../../components/icons/CloseIcon"
import { FormControlLabel } from "@mui/material"
import AppCheckbox from "../../../components/checkboxes/AppCheckbox"
import PoolTabs from "../../../components/tabs/PoolTabs"
import { useStore } from "../../../logic/DataStore"
import Link from "next/link"
import { useApiClient } from "../../../logic/ApiClientHook"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toJS } from "mobx"
import { Pool } from "../../../components/tables/PoolTable/types"
import { SubQueryGet } from "../../../apiConnection/gen"
import { RowsData } from "../../../components/tables/PoolTable"

type Props = {}

function SubQueryToPoolTableRender(subquery: SubQueryGet): RowsData[] {
  console.log(toJS(subquery))

  var arr: RowsData[] = [
    {
      sub: subquery,
      apt: subquery.standartObject!,
    },
    ...subquery.selectedAnalogs!.map<RowsData>((obj) => {
      return {
        sub: subquery,
        apt: obj,
      }
    }),
  ].map((object, i) => {
    return {
      sub: subquery,
      apt: object.apt,
      row: {
        id: i,
        isBasic: true,
        pricePerSquareMeter: {
          value: object.apt.m2price ?? 0,
          change: object.apt.adjustment?.priceArea,
        },
        objectPrice: object.apt.price!,
        floor: {
          value: object.apt.floor!,
          change: object.apt.adjustment?.floor,
        },
        flatSquare: {
          value: object.apt.apartmentArea!,
          change: object.apt.adjustment?.aptArea,
        },
        kitchenSquare: {
          value: object.apt.kitchenArea!,
          change: object.apt.adjustment?.kitchenArea,
        },
        hasBalcony: {
          value: object.apt.hasBalcony!,
          change: object.apt.adjustment?.hasBalcony,
        },
        state: {
          value: object.apt.quality!,
          change: object.apt.adjustment?.quality,
        },
        metro: {
          value: object.apt.distanceToMetro!,
          change: object.apt.adjustment?.quality,
        },
      },
    }
  })

  return arr
}

export default function CalculateEtalonsPage({}: Props) {
  const store = useStore()
  const api = useApiClient()

  const standart = store.queryGetData?.subQueries[0].standartObject

  console.log(toJS(store.queryGetData))

  return (
    <Box>
      <Header stepProgress={3} />
      <Box sx={{ padding: "30px" }}>
        <Stack sx={{ mb: "30px", gap: "20px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "22px",
                color: "var(--text-clr-main)",
              }}
            >
              Расчет цены эталонного объекта
            </Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack sx={{ gap: "10px" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "var(--text-clr-main)",
                }}
              >
                {store.queryGetData?.name ??
                  store.file?.name ??
                  "Название запроса"}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "var(--text-clr-main)",
                }}
              >
                {standart?.address ?? "Адрес"},{" "}
                {standart?.quality?.toLowerCase() ?? "качество жилья"},{" "}
                {standart?.floors ?? "N"} этажей,{" "}
                {standart?.walls?.toLowerCase() ?? "тип стены"}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: "50px" }}>
              <Link href="/calculate_etalons/map">
                <AppButton size="small" variant="secondary">
                  Вернуться на карту
                </AppButton>
              </Link>
              <Link href="/calculate_pool">
                <AppButton size="small">Рассчитать пул</AppButton>
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <PoolTabs
          subQueryToPoolTableRender={SubQueryToPoolTableRender}
          subqueries={store.queryGetData?.subQueries!}
          hasMetroAttribute
        />
      </Box>
    </Box>
  )
}
