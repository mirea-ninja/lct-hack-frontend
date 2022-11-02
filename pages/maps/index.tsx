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

type Props = {};

const ArrowRight = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.991201 2.41414L4.577 5.99994L0.991201 9.58574C0.600701 9.97624 0.600701 10.6094 0.991201 10.9999C1.3817 11.3904 2.0149 11.3904 2.4054 10.9999L6.69832 6.70704C6.88585 6.51954 6.99121 6.26514 6.99121 5.99994C6.99121 5.73474 6.88585 5.48034 6.69832 5.29284L2.4054 0.999921C2.0149 0.609401 1.3817 0.609401 0.991201 0.999921C0.600701 1.39045 0.600701 2.02361 0.991201 2.41414Z"
      fill="#3E3E41"
    />
  </svg>
);

const ArrowLeft = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.0088 2.41414L2.423 5.99994L6.0088 9.58574C6.3993 9.97624 6.3993 10.6094 6.0088 10.9999C5.6183 11.3904 4.9851 11.3904 4.5946 10.9999L0.301679 6.70704C0.114149 6.51954 0.00878906 6.26514 0.00878906 5.99994C0.00878906 5.73474 0.114149 5.48034 0.301679 5.29284L4.5946 0.999921C4.9851 0.609401 5.6183 0.609401 6.0088 0.999921C6.3993 1.39045 6.3993 2.02361 6.0088 2.41414Z"
      fill="#3E3E41"
    />
  </svg>
);

export default function Maps(props: Props) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",

          width: "100%",
          height: "100%",

          overflow: "hidden",
          transition: ".3s",
          zIndex: 1000,

          top: 30,
          position: "relative",
        }}
      >
        {/* Кнопка открытия/закрытия панели */}
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            width: 44,
            height: 44,

            position: "fixed",
            top: 50,
            left: open ? 330 + 30 : 0,

            background: "#FFFFFF",
            boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
            borderRadius: "0px 10px 10px 00px",
            transition: ".3s",

            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <div
            style={{
              transform: open ? "rotate(360deg)" : "rotate(0deg)",
              transition: ".3s",
            }}
          >
            {open ? <ArrowLeft /> : <ArrowRight />}
          </div>
        </IconButton>

        {/* Выдвижной контейнер */}
        <Box
          style={{
            position: "fixed",
            top: 30,
            width: 330,
            left: open ? 30 : -330,
            transition: ".3s",
            padding: 20,
            background: "#FFFFFF",
            maxHeight: 830,
            minHeight: 600,
            overflow: "auto",
            boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
            borderRadius: "10px",
          }}
        >
          <Typography
            fontSize={24}
            color={theme.text.primary}
            fontWeight={700}
            // font-size: 24px;
            // line-height: 26px;
          >
            Аналоги
          </Typography>
        </Box>
      </Box>

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
