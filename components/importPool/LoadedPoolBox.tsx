import React from "react"
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { truncateSync } from "fs"
import { sizing } from "@mui/system"
import { observer } from "mobx-react"
import { useStore } from "../../logic/DataStore"
import { QueryGet } from "../../apiConnection/gen/models/query-get"
import { toJS } from "mobx"
import { SubQueryGet } from "../../apiConnection/gen/models/sub-query-get"
import { useApiClient } from "../../logic/ApiClientHook"
import { useMutation, useQuery } from "@tanstack/react-query"
import { RepairType } from "../ImportDonePage/types"
import { ApartmentGet } from "../../apiConnection/gen/models/apartment-get"

type Props = {
  onActiveChange: (active: boolean) => void
}

const LoadedPoolBox = observer(({ onActiveChange }: Props) => {
  let theme = useTheme()
  let data = useStore()
  let api = useApiClient()

  console.log(toJS(data.queryGetData))

  const isActive = data.queryGetData !== null
  onActiveChange(isActive)

  const set = useMutation({
    mutationFn: (params: {
      apt: ApartmentGet
      queryId: string
      subqueryId: string
    }) => {
      console.log("GET ANALOG REQUEST:")
      return api.parser.parseParsePost({
        address: params.apt.address,
        floors: params.apt.floors,
        rooms: params.apt.rooms,
        segment: params.apt.segment!.toString().toLowerCase(),
        walls: params.apt.walls!.toString().toLowerCase(),
        radius: 1500,
        queryId: params.queryId,
        subqueryId: params.subqueryId,
      })
    },
    onSettled(data, error, variables, context) {
      console.log(data)
      console.log("GOT A")
    },
    onSuccess(data) {
      console.log("GOT ANALOG")
    },
  })

  return (
    <Stack
      sx={{
        flex: 1,
        backgroundColor: isActive ? theme.palette.background.paper : null,
      }}
      display="flex"
      maxWidth="800px"
      padding={3}
      borderRadius={5}
    >
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{
          fontSize: "24px",
          color: theme.text.primary,
          opacity: isActive ? 1 : 0.7,
        }}
      >
        {data.queryGetData?.name == ""
          ? data.file?.name
          : data.queryGetData?.name}
      </Typography>
      <Typography
        variant="body2"
        fontWeight="700"
        sx={{
          marginTop: "10px",
          color: theme.text.secondary,
          opacity: isActive ? 1 : 0.7,
        }}
      ></Typography>
      <Box
        sx={{
          marginTop: "20px",
          height: "500px",
          width: "750px",
          overflow: "auto",
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
        {!isActive ? (
          <Grid container item rowSpacing={2} columnSpacing={1}>
            <Grid item xs={6}>
              <PoolPreview />
            </Grid>
            <Grid item xs={6}>
              <PoolPreview />
            </Grid>
            {/* <Grid item xs={6}>
              <PoolPreview />
            </Grid>
            <Grid item xs={6}>
              <PoolPreview />
            </Grid>
            <Grid item xs={6}>
              <PoolPreview />
            </Grid>
            <Grid item xs={6}>
              <PoolPreview />
            </Grid> */}
          </Grid>
        ) : (
          <Grid container item rowSpacing={2} columnSpacing={1}>
            {data.queryGetData?.subQueries?.map((subQuery, i) => (
              <Grid item xs={6}>
                <PoolData key={i} id={i} data={subQuery} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="20px">
        <Link href="/calculate_etalons/map">
          <Button
            sx={{
              height: "52px",
              width: "330px",
            }}
            variant={isActive ? "mainActive" : "mainDisabled"}
            disabled={!isActive}
          >
            Найти аналоги
          </Button>
        </Link>
      </Box>
    </Stack>
  )
})

export default LoadedPoolBox

type SkeletonProps = {
  text?: string
}

function getRandomEtalon(queryGet: SubQueryGet): ApartmentGet {
  return queryGet.inputApartments![0]
}

const SkeletonBox = ({ text }: SkeletonProps) => {
  let theme = useTheme()
  return (
    <Box
      sx={{
        padding: "5px 5px",
        margin: "3px ",
        width: "fit-content",
        // minWidth: "80px",
        borderRadius: "10px",
        height: "25px",
        backgroundColor: theme.text.light,
      }}
      display="flex"
      justifyContent="left"
      alignItems="center"
    >
      {text != null ? (
        <Typography
          fontSize="14px"
          lineHeight="16px"
          color={theme.palette.text.primary}
          fontWeight={400}
        >
          {text}
        </Typography>
      ) : null}
    </Box>
  )
}

function roomsToName(data: SubQueryGet): string {
  if (data.inputApartments?.length == 0) {
    return "Неизвестно";
  }

  const rooms = data.inputApartments![0].rooms;

  switch (rooms) {
    case 0:
      return "Студии"
    case 1:
      return "1-комнатные"
    case 2:
      return "2-комнатные"
    case 3:
      return "3-комнатные"
    case 4:
      return "4-комнатные"
    case 5:
      return "5-комнатные"
  }
}

type PoolDataProps = {
  data: SubQueryGet
  id: number
}

const PoolData = observer(({ data, id }: PoolDataProps) => {
  let theme = useTheme()
  let api = useApiClient()
  let store = useStore()

  const isEtalonSelected = data.standartObject == null
  console.log("POOL DATA")

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (params: { id1: string; id2: string; id3: string }) => {
      return api.subqueryApi.setBaseQueryIdSubquerySubidBaseApartmentPost(
        params.id1,
        params.id2,
        { guid: params.id3 }
      )
    },
    onSuccess: (aptData) => {
      console.log(toJS(store.queryGetData))
      store.queryGetData!.subQueries!.find(
        (q) => q.guid == data.guid!
      )!.standartObject = aptData.data
    },
  })

  if (isEtalonSelected) {
    let etalon = getRandomEtalon(data)
    data.standartObject = etalon
    mutate({ id1: store.queryGetData!.guid, id2: data.guid, id3: etalon.guid })
    // set.mutate({
    //   apt: etalon,
    //   queryId: store.queryGetData!.guid,
    //   subqueryId: data.guid,
    // })
  }

  if (isLoading) {
    return (
      <div>
        <SkeletonBox text="Загрузка" />
      </div>
    )
  }

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.accent.light,
      }}
      borderRadius={3}
      padding={2}
      gap={1}
      width="360px"
      height="220px"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: theme.text.primary,
        }}
      >
        {roomsToName(data)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        {data.inputApartments!.length} объект{
          () => {
          const count = data.inputApartments!.length
          count % 10 == 1 && count % 100 != 11
          ? ""
          : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)
          ? "а"
          : "ов"
        }}
      </Typography>
      <Box height={"15px"} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography
            variant="body2"
            sx={{
              color: theme.text.primary,
            }}
          >
            Эталон
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link href="/import/etalons">
            <Typography
              variant="body2"
              sx={{
                textAlign: "right",
                color: theme.palette.accent.color,
              }}
            >
              сменить
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Box>
        {/* <Stack paddingBottom="10px">
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
          </Stack> */}
          <Stack paddingBottom="10px">
            <Stack direction="row" gap="5px">
              <SkeletonBox
                text={`S ${data.standartObject?.apartmentArea} м²` ?? ""}
              />
              <SkeletonBox
                text={`S кухни ${data.standartObject?.kitchenArea} м²` ?? ""}
              />
              <SkeletonBox
                text={data.standartObject?.hasBalcony ? "есть балкон" : "нет балкона"}
              />
            </Stack>
            <Stack direction="row" gap="5px">
              <SkeletonBox text={data.standartObject?.quality?.toLowerCase()} />
              <SkeletonBox text={data.standartObject?.floor + " этаж"} />
            </Stack>
          </Stack>
        {/* <Grid container spacing={1}>
          <Grid container item spacing={1}>


            <Grid item xs={5}>
              <SkeletonBox
                text={`Площадь ${data.standartObject?.apartmentArea} м²` ?? ""}
              />
            </Grid>
            <Grid item xs={4}>
              <SkeletonBox
                text={`Площадь кухни ${data.standartObject?.kitchenArea} м²` ?? ""}
              />
            </Grid>
            <Grid item xs={3}>
              <SkeletonBox
                text={
                  data.standartObject?.hasBalcony ? "есть балкон" : "нет балкона"
                }
              />
            </Grid>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={8}>
              <SkeletonBox text={data.standartObject?.quality?.toLowerCase()} />
            </Grid>
            <Grid item xs={3}>
              <SkeletonBox text={data.standartObject?.floor + " этаж"} />
            </Grid>
          </Grid>
        </Grid> */}
      </Box>
    </Stack>
  )
})

function PoolPreview() {
  let theme = useTheme()

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.accent.light,
        opacity: 0.7,
      }}
      borderRadius={3}
      padding={2}
      gap={1}
      width="360px"
      height="220px"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: theme.text.primary,
        }}
      >
        Количество комнат
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.secondary.light,
        }}
      >
        количество объектов
      </Typography>
      <Box height={"15px"} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography
            variant="body2"
            sx={{
              color: theme.text.secondary,
            }}
          >
            Эталон
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {/* <Link href="/"> */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
              color: theme.palette.accent.color,
            }}
          >
            сменить
          </Typography>
          {/* </Link> */}
        </Grid>
      </Grid>
      <Box>
      <Stack paddingBottom="10px">
            <Stack direction="row" gap="5px">
              <SkeletonBox text={"S м²"}/>
              <SkeletonBox text={"S кухни м²"}/>
              <SkeletonBox text={"наличие балкона"}/>
            </Stack>
            <Stack direction="row" gap="5px">
              <SkeletonBox text={"отделка"}/>
              <SkeletonBox text={"этаж"}/>
            </Stack>
          </Stack>
      </Box>
    </Stack>
  )
}
