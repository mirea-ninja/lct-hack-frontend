import React from "react"
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { truncateSync } from "fs"
import { sizing } from "@mui/system"
import { observer } from "mobx-react"
import { useStore } from "../../logic/DataStore"

type Props = {}

const LoadedPoolBox = observer((props: Props) => {
  console.log("OBSERVERD")
  let data = useStore()
  console.log(data.queryGetData)

  return <LoadedPoolBoxIn {...props} />
})

export default LoadedPoolBox

function LoadedPoolBoxIn({}: Props) {
  let isActive = false // Поменять на логику с query в бэк
  let theme = useTheme()
  let data = useStore()

  console.log("AMOGUS FUCK YES")
  console.log(data.queryGetData)

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
        Название запроса
      </Typography>
      <Typography
        variant="body2"
        fontWeight="700"
        sx={{
          marginTop: "10px",
          color: theme.text.secondary,
          opacity: isActive ? 1 : 0.7,
        }}
      >
        Сегмент, этажность, материал стен
      </Typography>
      <Box
        sx={{
          marginTop: "20px",
          height: "500px",
          width: "750px",
          overflow: "auto",
          scrollBehavior: "smooth",
          overflowY: "scroll",
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
        <Grid container item rowSpacing={2} columnSpacing={1}>
          {" "}
          {/* Поменять на логику c бэка */}
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <PoolPreview />
          </Grid>
          <Grid item xs={6}>
            <PoolPreview />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop="20px">
        <Button
          sx={{
            height: "52px",
            width: "330px",
          }}
          variant={isActive ? "mainActive" : "mainDisabled"}
        >
          Найти аналоги
        </Button>
      </Box>
    </Stack>
  )
}

const SkeletonBox = () => {
  let theme = useTheme()

  return (
    <Box
      sx={{
        borderRadius: "10px",
        height: "25px",
        backgroundColor: theme.text.light,
      }}
    ></Box>
  )
}

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
          <Link
            href="/"
            sx={{
              textDecoration: "none",
            }}
          >
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
        <Grid container spacing={1}>
          <Grid container item spacing={1}>
            <Grid item xs={5}>
              <SkeletonBox />
            </Grid>
            <Grid item xs={4}>
              <SkeletonBox />
            </Grid>
            <Grid item xs={3}>
              <SkeletonBox />
            </Grid>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={8}>
              <SkeletonBox />
            </Grid>
            <Grid item xs={3}>
              <SkeletonBox />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}
