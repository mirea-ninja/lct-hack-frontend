import React, { useEffect, useState } from "react"
import Header from "../../components/main/Header"
import { Box, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import AppButton from "../../components/buttons/AppButton"
import IconButton from "@mui/material/IconButton"
import { CloseIcon } from "../../components/icons/CloseIcon"
import { FormControlLabel } from "@mui/material"
import AppCheckbox from "../../components/checkboxes/AppCheckbox"
import PoolTabs from "../../components/tabs/PoolTabs"
import { useStore } from "../../logic/DataStore"
import { useApiClient } from "../../logic/ApiClientHook"
import { useMutation } from "@tanstack/react-query"

type Props = {}

export default function CalculatePoolPage({}: Props) {
  const store = useStore()
  const api = useApiClient()

  const standart = store.queryGetData?.subQueries[0].standartObject

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (params: { queryId: string; subqueryId: string }) => {
      return api.subqueryApi.calculatePoolApiQueryIdSubquerySubidCalculatePoolPost(
        params.queryId,
        params.subqueryId
      )
    },
    onSettled(data, error, variables, context) {},
    onSuccess(data) {
      console.log(data.data)
      store.queryGetData = data.data
    },
  })

  useEffect(() => {
    console.log("CALC POOL USE EFFECT")
    for (let i = 0; i < store.queryGetData!.subQueries.length; i++) {
      let subQuery = store.queryGetData?.subQueries[i]
      mutate({ queryId: store.queryGetData!.guid, subqueryId: subQuery!.guid })
    }
  }, [])

  return (
    <Box>
      <Header stepProgress={5} />
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
              Расчет цен для пула объектов
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
                {/* {standart?.quality ?? "качество жилья"},{" "} */}
                {standart?.floors ?? "N"} этажей,{" "}
                {standart?.walls ?? "тип стены"}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: "50px" }}>
              <FormControlLabel
                control={<AppCheckbox defaultChecked />}
                label={
                  <Typography
                    sx={{
                      maxWidth: "200px",
                      fontSize: "16px",
                      lineHeight: "18px",
                      fontWeight: 500,
                      color: "var(--text-clr-secondary)",
                    }}
                  >
                    Добавить корректировки в файл
                  </Typography>
                }
                sx={{
                  fontSize: "16px",
                  lineHeight: "18px",
                  fontWeight: 500,
                  marginLeft: 0,
                  color: "#3E3E41",
                }}
              />
              <AppButton size="small">Экспортировать пул</AppButton>
            </Stack>
          </Stack>
        </Stack>
        <PoolTabs
          subqueries={
            store.queryGetData?.subQueries ?? [
              {
                guid: "1",
                analogs: [
                  {
                    guid: "12",
                    address: "Ватутина, 11",
                    price: 1000000,
                    apartmentArea: 100,
                    floor: 1,
                    floors: 22,
                    kitchenArea: 10,
                    hasBalcony: true,
                    id: 1,
                  },
                  {
                    guid: "12",
                    address: "Ватутина, 21",
                    price: 10,
                    apartmentArea: 100,
                    floor: 16,
                    floors: 22,
                    kitchenArea: 10,
                    hasBalcony: false,
                    id: 1,
                  },
                ],
              },
              {
                guid: "2",
                analogs: [
                  {
                    guid: "123",
                    address: "Ватутина, 11",
                    price: 1000000,
                    apartmentArea: 100,
                    floor: 1,
                    floors: 22,
                    kitchenArea: 10,
                    hasBalcony: true,
                    id: 1,
                  },
                ],
              },
            ]
          }
        />
      </Box>
    </Box>
  )
}
