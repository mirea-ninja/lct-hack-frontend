import React from "react";
import { Collapse, useTheme } from "@mui/material";
import {
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";

import ArrowLeft from "@mui/icons-material/ChevronLeft";

const PenIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.90141 11.8619L13.2969 1.46643C13.3061 1.46378 13.3158 1.4611 13.3258 1.45839C13.4626 1.42133 13.6605 1.38264 13.8925 1.37944C14.3367 1.37331 14.9278 1.49293 15.5133 2.07843C16.0988 2.66392 16.2184 3.25504 16.2123 3.69925C16.2091 3.93131 16.1704 4.1292 16.1334 4.266C16.1307 4.27601 16.128 4.28563 16.1253 4.29486L5.72984 14.6904L2.51571 15.076L2.90141 11.8619Z"
      stroke="#3E3E41"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M10.7002 2.64893L14.7408 6.68954"
      stroke="#3E3E41"
      stroke-width="2"
    />
  </svg>
);

const ClosedEyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_386_11196)">
      <path
        d="M4.25977 2.25L16.2598 14.25"
        stroke="#3E3E41"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.3046 3.51117C10.4847 2.98906 11.0539 2.71177 11.576 2.89182C13.9854 3.72274 16.0056 5.57355 17.3857 7.97725C17.7756 8.65647 17.8685 9.45421 17.6646 10.1898C17.517 10.722 16.966 11.0338 16.4338 10.8862C15.9016 10.7387 15.5897 10.1876 15.7373 9.65543C15.8002 9.42841 15.7714 9.18246 15.6512 8.97308C14.4616 6.90104 12.789 5.42571 10.924 4.78255C10.4019 4.60249 10.1246 4.03328 10.3046 3.51117ZM6.79435 3.61168C7.00219 4.12336 6.75588 4.70665 6.24419 4.91449C4.52126 5.61433 2.98243 7.03288 1.86845 8.97314C1.71051 9.24823 1.71052 9.58622 1.86846 9.86131C3.50342 12.709 6.03244 14.4172 8.75981 14.4172C10.6974 14.4172 12.5207 13.5618 14.0076 12.0489C14.3948 11.655 15.0279 11.6496 15.4218 12.0367C15.8157 12.4238 15.8212 13.057 15.434 13.4509C13.6361 15.28 11.3201 16.4172 8.75981 16.4172C5.13321 16.4172 2.02403 14.149 0.134003 10.8571C-0.377998 9.96537 -0.378001 8.86909 0.133994 7.97732C1.42726 5.72477 3.28121 3.95934 5.49153 3.06152C6.00321 2.85368 6.5865 3.09999 6.79435 3.61168Z"
        fill="#3E3E41"
      />
      <path
        d="M10.9419 8.86903C11.061 9.3429 11.0226 9.84266 10.8325 10.2928C10.6424 10.7429 10.311 11.1189 9.88831 11.364C9.46561 11.6091 8.97462 11.7099 8.48955 11.6512C8.00448 11.5925 7.55169 11.3775 7.19962 11.0387C6.84755 10.6999 6.61534 10.2557 6.53807 9.77327C6.46081 9.29081 6.5427 8.79631 6.77136 8.36451C7.00002 7.93271 7.36303 7.58708 7.80552 7.37986C8.24801 7.17263 8.74593 7.11508 9.22402 7.2159"
        stroke="#3E3E41"
        stroke-width="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_386_11196">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

interface InfoCardProps {
  title: string;
  description: string;
  isPositive: boolean | null;
}

const InfoCard = ({ title, description, isPositive }: InfoCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px 0px",
        gap: "2px",

        minWidth: "90px",

        backgroundColor: "#F3F7FA",
        borderRadius: "10px",
      }}
    >
      <Typography
        fontSize={14}
        fontWeight={500}
        color={theme.palette.secondary.dark}
      >
        {title}
      </Typography>
      <Typography
        fontSize={14}
        fontWeight={500}
        color={
          isPositive === null
            ? theme.palette.secondary.dark
            : isPositive
            ? "#76BF5C"
            : "#F69681"
        }
      >
        {description}
      </Typography>
    </Box>
  );
};

export const SliderCollapseInfo = () => {
  const theme = useTheme();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "10px",
          paddingBottom: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            fontSize={20}
            color={theme.palette.text.primary}
            fontWeight={700}
            lineHeight={"22px"}
            marginRight={"20px"}
          >
            Ватунина, 24
          </Typography>
          <IconButton>
            <PenIcon />
          </IconButton>
          <IconButton>
            <ClosedEyeIcon />
          </IconButton>
        </Box>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? (
            <ArrowLeft sx={{ transform: "rotate(90deg)" }} />
          ) : (
            <ArrowLeft sx={{ transform: "rotate(-90deg)" }} />
          )}
        </IconButton>
      </Box>
      <Box display={"flex"} alignItems={"center"} marginBottom={"5px"}>
        <Typography
          fontSize={18}
          lineHeight={"20px"}
          color={theme.palette.text.primary}
          fontWeight={500}
          sx={{ marginRight: "5px" }}
        >
          244 054 ₽
        </Typography>
        <Typography
          fontSize={16}
          lineHeight={"18px"}
          color={theme.palette.text.primary}
          fontWeight={500}
        >
          м²
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Typography
          fontSize={16}
          lineHeight={"18px"}
          color={theme.palette.secondary.dark}
          fontWeight={500}
          sx={{ marginRight: "10px" }}
        >
          249 800 ₽ м²
        </Typography>
        <Typography
          fontSize={16}
          lineHeight={"18px"}
          color={"#F79681"}
          fontWeight={500}
          sx={{ marginRight: "5px" }}
        >
          -2,3%
        </Typography>
        <Typography
          fontSize={16}
          lineHeight={"18px"}
          color={theme.palette.secondary.dark}
          fontWeight={500}
        >
          итог
        </Typography>
      </Box>
      <Collapse in={isCollapsed}>
        <Typography
          fontSize={16}
          lineHeight={"18px"}
          color={theme.palette.secondary.dark}
          fontWeight={500}
          sx={{ marginTop: "15px", marginBottom: "20px" }}
        >
          Современное жилье, 22 этажа, панель
        </Typography>

        <Grid container spacing={"10px"}>
          <Grid item xs={4}>
            <InfoCard title={"торг"} description={"-4,5%"} isPositive={false} />
          </Grid>
          <Grid item xs={4}>
            <InfoCard title={"этаж 4"} description={"0"} isPositive={null} />
          </Grid>
          <Grid item xs={4}>
            <InfoCard
              title={"S 45 м²"}
              description={"+1,5%"}
              isPositive={true}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoCard
              title={"S кухня 45 м²"}
              description={"+1,5%"}
              isPositive={true}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoCard
              title={"нет балкона"}
              description={"0"}
              isPositive={null}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoCard
              title={"до метро 10 мин."}
              description={"0"}
              isPositive={null}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoCard
              title={"без отделки"}
              description={"-10 300 ₽"}
              isPositive={false}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};
