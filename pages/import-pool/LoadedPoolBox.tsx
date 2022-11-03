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

type Props = {}

export default function LoadedPoolBox({}: Props) {
  let isActive = false // Поменять на логику с query в бэк
  let theme = useTheme()

  return (
    <Stack
      sx={{
        flex: 1,
      }}
      display="flex"
      padding={3}
      borderRadius={5}
    >
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{
          fontSize: "24px",
          color: isActive ? theme.text.primary : theme.palette.secondary.main,
        }}
      >
        Название запроса
      </Typography>
      <Typography
        variant="body2"
        fontWeight="700"
        sx={{
          marginTop: "10px",
          color: isActive ? theme.text.primary : theme.palette.secondary.main,
        }}
      >
        Сегмент, этажность, материал стен
      </Typography>
      <Stack marginTop={5} gap={0.5} marginBottom={5}>
        <PoolPreview />
      </Stack>
      <Box display="flex" justifyContent="center" marginTop="50px">
        <Button
          variant="mainDisabled"
          sx={{
            height: "52px",
            width: "50%",
          }}
        >
          Рассчитать
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
        backgroundColor: theme.palette.secondary.light,
      }}
    ></Box>
  )
}

function PoolPreview() {
  let theme = useTheme()

  return (
    <Stack
      sx={{
        backgroundColor: "#3e3e4170",
      }}
      borderRadius={3}
      padding={2}
      gap={1}
      width="40%"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: theme.palette.secondary.light,
        }}
      >
        Название пула
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.secondary.light,
        }}
      >
        объекты
      </Typography>
      <Box height={"15px"} />
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.secondary.light,
        }}
      >
        Эталон
      </Typography>
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
