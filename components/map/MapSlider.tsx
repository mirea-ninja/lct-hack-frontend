import React from "react";
import { useTheme } from "@mui/material";
import {
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import CollapsableAnalogInfo from "./CollapsableAnalogInfo";

import styles from "./MapSlider.module.scss";
import { ArrowRight } from "../icons/ArrowRightIcon";
import { ArrowLeft } from "../icons/ArrowLeftIcon";
import { ClosedEyeIcon } from "../icons/ClosedEyeIcon";
import { OpenIcon } from "../icons/OpenIcon";
import HiddenAnalogsModal from "./HiddenAnalogsModal";
import { EditorModalType, EditorModal } from "./EditorModal";

import { QueryGet } from "../../apiConnection/gen/models/query-get";
import { useStore } from "../../logic/DataStore";

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

type Props = {
  onSelectedSubQueryChange: (guid: string) => void;
};

export default function MapSlider({ onSelectedSubQueryChange }: Props) {
  const [open, setOpen] = React.useState(true);
  const [subquery, setSubquery] = React.useState(0);
  const [hiddenAnalogsShow, setHiddenAnalogsShow] = React.useState(false);
  const [editorCreateOpen, setEditorCreateOpen] = React.useState(false);

  const theme = useTheme();
  let store = useStore();

  console.log(subquery);

  const subqueries = store.queryGetData?.subQueries ?? [];

  return (
    <>
      {" "}
      <EditorModal
        type={EditorModalType.CREATE}
        open={editorCreateOpen}
        setOpen={setEditorCreateOpen}
      />
      <HiddenAnalogsModal
        open={hiddenAnalogsShow}
        setOpen={setHiddenAnalogsShow}
      />
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
            overflowY: "auto",
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
              <IconButton
                className={styles.button}
                onClick={() => {
                  setEditorCreateOpen(true);
                }}
              >
                <Plus />
              </IconButton>
              <IconButton
                className={styles.button}
                onClick={() => setHiddenAnalogsShow(true)}
              >
                <ClosedEyeIcon />
              </IconButton>
              <IconButton
                className={styles.button}
                href="/calculate_etalons/table"
              >
                <OpenIcon />
              </IconButton>
            </Box>
          </Box>

          <ToggleButtonGroup
            exclusive
            onChange={(event, newSubqueryIndex) => {
              setSubquery(newSubqueryIndex);
              onSelectedSubQueryChange(subqueries[newSubqueryIndex].guid);
            }}
            sx={{
              marginTop: "14px",
              "& .MuiToggleButton-root:not(:last-child)": {
                marginRight: "30px",
              },
            }}
          >
            {subqueries.map((subQuery, i) => {
              const text =
                subQuery.standartObject?.rooms != 0
                  ? `${subQuery.standartObject?.rooms}-комн.`
                  : "cтудии";
              return (
                <ToggleButton
                  value={i}
                  sx={{
                    padding: "10px 0",

                    borderRadius: "10px",
                    border: "none",
                    color: theme.palette.text.primary,
                    backgroundColor: "tranparent",
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
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    lineHeight={"18px"}
                    color={
                      subquery === i
                        ? theme.palette.primary.main
                        : theme.palette.text.primary
                    }
                  >
                    {text}
                  </Typography>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>

          {/* Контейнер с инфой раскрывающейся */}
          <Box className={styles.cards}>
            <CollapsableAnalogInfo />
            <Hr />
            <CollapsableAnalogInfo />
            <Hr />
            <CollapsableAnalogInfo />
          </Box>
        </Box>
      </Box>
    </>
  );
}
