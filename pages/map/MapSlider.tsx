import React from "react";
import { useTheme } from "@mui/material";
import {
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { SliderCollapseInfo } from "./SliderCollapseInfo";

import styles from "../../styles/MapSlider.module.scss";

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

const Plus = () => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9981 17C10.9981 17.5523 10.5503 18 9.9981 18C9.4458 18 8.9981 17.5523 8.9981 17V9.9999H1.9981C1.4458 9.9999 0.998096 9.5522 0.998096 8.9999C0.998096 8.4476 1.4458 7.9999 1.9981 7.9999H8.9981V1C8.9981 0.44772 9.4458 0 9.9981 0C10.5503 0 10.9981 0.44772 10.9981 1V7.9999H17.998C18.5503 7.9999 18.998 8.4476 18.998 8.9999C18.998 9.5522 18.5503 9.9999 17.998 9.9999H10.9981V17Z"
      fill="#038CD2"
    />
  </svg>
);

const EyeClosed = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3203 3L2.32031 19"
      stroke="#038CD2"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.94536 4.79046C9.76531 4.26835 9.19609 3.99106 8.67398 4.17112C5.55217 5.24771 2.91655 7.65289 1.1082 10.8025C0.633198 11.6299 0.52005 12.6015 0.768448 13.4975C0.915997 14.0297 1.46705 14.3416 1.99926 14.194C2.53147 14.0465 2.8433 13.4954 2.69575 12.9632C2.58834 12.5757 2.63741 12.1559 2.84265 11.7984C4.46058 8.98037 6.74863 6.95069 9.32602 6.06185C9.84813 5.88179 10.1254 5.31257 9.94536 4.79046ZM15.2497 4.94125C15.0419 5.45293 15.2882 6.03622 15.7999 6.24406C18.1783 7.21018 20.2826 9.15939 21.7978 11.7984C22.0674 12.268 22.0674 12.845 21.7978 13.3146C19.5753 17.1855 16.1066 19.5565 12.3202 19.5565C9.63298 19.5565 7.11986 18.369 5.08541 16.2991C4.69827 15.9052 4.06512 15.8998 3.67125 16.2869C3.27737 16.674 3.2719 17.3072 3.65904 17.7011C6.00439 20.0872 9.01028 21.5565 12.3202 21.5565C17.0058 21.5565 21.0547 18.6256 23.5323 14.3104C24.1559 13.2242 24.1559 11.8889 23.5323 10.8026C21.8378 7.85128 19.4184 5.55518 16.5525 4.39109C16.0408 4.18325 15.4575 4.42956 15.2497 4.94125Z"
      fill="#038CD2"
    />
    <path
      d="M9.4108 11.8254C9.252 12.4572 9.30319 13.1235 9.55663 13.7237C9.81007 14.3239 10.252 14.8252 10.8156 15.152C11.3792 15.4787 12.0338 15.6132 12.6806 15.5349C13.3274 15.4567 13.9311 15.17 14.4005 14.7183C14.8699 14.2666 15.1796 13.6743 15.2826 13.031C15.3856 12.3877 15.2764 11.7284 14.9715 11.1527C14.6666 10.5769 14.1826 10.1161 13.5926 9.83981C13.0027 9.56351 12.3388 9.48677 11.7013 9.6212"
      stroke="#038CD2"
      stroke-width="2"
    />
  </svg>
);

const Open = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 6C11 5.4477 10.5523 5 10 5H4C2.8954 5 2 5.8954 2 7V20C2 21.1046 2.8954 22 4 22H17C18.1046 22 19 21.1046 19 20V14C19 13.4477 18.5523 13 18 13C17.4477 13 17 13.4477 17 14V20H4V7H10C10.5523 7 11 6.5523 11 6Z"
      fill="#038CD2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.5857 4H14.9999C14.4476 4 13.9999 3.5523 13.9999 3C13.9999 2.4477 14.4476 2 14.9999 2H20.9999C21.5522 2 21.9999 2.4477 21.9999 3V9C21.9999 9.5523 21.5522 10 20.9999 10C20.4476 10 19.9999 9.5523 19.9999 9V5.4142L10.4141 15C10.0236 15.3905 9.39041 15.3905 8.99991 15C8.60941 14.6095 8.60941 13.9763 8.99991 13.5858L18.5857 4Z"
      fill="#038CD2"
    />
  </svg>
);

const Hr = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "1px",
        backgroundColor: theme.palette.secondary.light,
        marginTop: "20px",
        marginBottom: "10px",
      }}
    />
  );
};

export const MapSlider = () => {
  const [open, setOpen] = React.useState(false);
  const [subquery, setSubquery] = React.useState(0);

  const theme = useTheme();

  return (
    <Box className={styles.container}>
      {/* Кнопка открытия/закрытия панели */}
      <IconButton
        onClick={() => setOpen(!open)}
        className={styles.slider_open_button}
        sx={{
          left: open ? 330 + 30 : 0,
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
        className={styles.slider}
        sx={{
          left: open ? 30 : -330,

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
            borderRadius: "0px 10px 10px 0px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "0px 10px 10px 0px",
          },
        }}
      >
        <Box className={styles.header}>
          <Typography
            fontSize={24}
            color={theme.palette.text.primary}
            fontWeight={700}
            lineHeight={"24px"}
          >
            Аналоги
          </Typography>

          <Box className={styles.buttons}>
            <IconButton className={styles.button}>
              <Plus />
            </IconButton>
            <IconButton className={styles.button}>
              <EyeClosed />
            </IconButton>
            <IconButton className={styles.button}>
              <Open />
            </IconButton>
          </Box>
        </Box>

        {/* Text toggle buttons without background and bordreds. Space between buttons 30px */}
        <ToggleButtonGroup
          value={subquery}
          exclusive
          onChange={(event, newSubquery) => {
            setSubquery(newSubquery);
          }}
          sx={{
            marginTop: "14px",
            "& .MuiToggleButton-root:not(:last-child)": {
              marginRight: "30px",
            },
          }}
        >
          <ToggleButton
            value={0}
            sx={{
              padding: "10px 0",

              borderRadius: 0,
              border: "none",
              color: theme.palette.text.primary,
              backgroundColor: "transparent",
              "&.Mui-selected": {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",

                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Typography fontSize={16} fontWeight={500} lineHeight={"18px"}>
              1 комн.
            </Typography>
          </ToggleButton>
          <ToggleButton
            value={1}
            sx={{
              padding: "10px 0",

              borderRadius: 0,
              border: "none",
              color: theme.palette.text.primary,
              backgroundColor: "transparent",
              "&.Mui-selected": {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Typography fontSize={16} fontWeight={500} lineHeight={"18px"}>
              2 комн.
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Контейнер с инфой раскрывающейся */}
        <Box className={styles.cards}>
          <SliderCollapseInfo />
          <Hr />
          <SliderCollapseInfo />
          <Hr />
          <SliderCollapseInfo />
        </Box>
      </Box>
    </Box>
  );
};
