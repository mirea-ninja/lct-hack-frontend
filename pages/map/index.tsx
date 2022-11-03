import React from "react";
import {
  YMaps,
  Map,
  Circle,
  Polygon,
  Placemark,
  Rectangle,
} from "react-yandex-maps";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import styles from "../../styles/Map.module.scss";
import { MapSlider } from "./MapSlider";

type Props = {};

export default function Maps(props: Props) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  return (
    <Box>
      <MapSlider />

      {/* Map */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        <YMaps>
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            width="100%"
            height="100vh"
            options={{
              suppressMapOpenBlock: true,
              suppressObsoleteBrowserNotifier: true,
            }}
          >
            <Circle
              geometry={[[55.8, 37.8], 10000]}
              options={{
                fillColor: "#DB709377",
                strokeColor: "#DB7093",
                strokeWidth: 3,
              }}
            />
            <Polygon
              geometry={[
                [
                  [55.8, 37.8],
                  [54.8, 37.8],
                  [54.8, 38.8],
                  [55.8, 38.8],
                ],
              ]}
              options={{
                fillColor: "#FF8C0077",
                strokeColor: "#FF8C00",
                strokeWidth: 3,
              }}
            />
            <Placemark
              geometry={[55.684758, 37.738521]}
              properties={{
                balloonContent: "цвет <strong>воды пляжа бонди</strong>",
              }}
              options={{
                preset: "islands#icon",
                iconColor: "#3caa3c",
              }}
            />
            <Rectangle
              geometry={[
                [55.4, 37.4],
                [55.8, 37.8],
              ]}
              options={{
                fillColor: "#7B68EE77",
                strokeColor: "#7B68EE",
                strokeWidth: 3,
              }}
            />
          </Map>
        </YMaps>
      </Box>
    </Box>
  );
}
