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
import { SubQueryGet } from "../../apiConnection/gen"
import { toJS } from "mobx"
import { RowsData } from "../../components/tables/PoolTable"

function SubQueryToPoolTableRender(subquery: SubQueryGet): RowsData[] {
  console.log(toJS(subquery))

  var arr: RowsData[] = [
    {
      sub: subquery,
      apt: subquery.standartObject!,
    },
    ...subquery
      .inputApartments!.filter(
        (obj) => obj.guid != subquery.standartObject!.guid
      )
      .map<RowsData>((obj) => {
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

type Props = {}

export default function CalculatePoolPage({}: Props) {
  const store = useStore()
  const api = useApiClient()

  const [corrections, setCorrections] = useState<boolean>(true)
  const [splitByList, setSplitByList] = useState<boolean>(true)

  const [link, setLink] = useState<string>()

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

  const exportApi = useMutation({
    mutationFn: (params: {
      queryId: string
      useCorrections: boolean
      splitByList: boolean
    }) => {
      return api.poolApi.exportApiExportGet(
        params.queryId,
        params.useCorrections,
        params.splitByList
      )
    },
    onSuccess(data) {
      console.log(data.data)
      setLink(data.data.link)
    },
  })

  useEffect(() => {
    console.log("CALC POOL USE EFFECT")
    for (let i = 0; i < store.queryGetData!.subQueries.length; i++) {
      let subQuery = store.queryGetData?.subQueries[i]
      mutate({ queryId: store.queryGetData!.guid, subqueryId: subQuery!.guid })
    }
  }, [])

  console.log(toJS(store.queryGetData))

  if (link != null) {
    window.open(link)
  }

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
            <Stack direction="row" sx={{ gap: "20px" }}>
              <FormControlLabel
                control={
                  <AppCheckbox
                    onChange={() => {
                      setCorrections(!corrections)
                    }}
                    defaultChecked
                  />
                }
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

              <FormControlLabel
                control={
                  <AppCheckbox
                    onChange={() => {
                      setSplitByList(!splitByList)
                    }}
                    defaultChecked
                  />
                }
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
                    Разбить выходной файл на листы
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
              <AppButton
                size="small"
                onClick={() => {
                  exportApi.mutate({
                    queryId: store.queryGetData!.guid,
                    useCorrections: corrections,
                    splitByList: splitByList,
                  })
                }}
              >
                Экспортировать пул
              </AppButton>
              {link != null && <a id="downloadStuff" href={link} download />}
            </Stack>
          </Stack>
        </Stack>
        <PoolTabs
          subQueryToPoolTableRender={SubQueryToPoolTableRender}
          subqueries={store.queryGetData!.subQueries}
        />
      </Box>
    </Box>
  )
}
