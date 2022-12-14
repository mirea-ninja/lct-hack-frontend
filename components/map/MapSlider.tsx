import React from "react";
import { useTheme } from "@mui/material";
import {
  Box,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"

import CollapsableAnalogInfo from "./CollapsableAnalogInfo"

import styles from "./MapSlider.module.scss"
import { ArrowRight } from "../icons/ArrowRightIcon"
import { ArrowLeft } from "../icons/ArrowLeftIcon"
import { ClosedEyeIcon } from "../icons/ClosedEyeIcon"
import { ClosedEyeIconBig } from "../icons/ClosedEyeIconBig";
import { OpenIcon } from "../icons/OpenIcon"
import HiddenAnalogsModal from "./HiddenAnalogsModal"
import { EditorModalType, EditorModal } from "./EditorModal"

import { QueryGet } from "../../apiConnection/gen/models/query-get"
import { SubQueryGet } from "../../apiConnection/gen";
import { useStore } from "../../logic/DataStore"
import Link from "next/link"

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
)

const Hr = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: "1px",
        backgroundColor: theme.palette.secondary.light,
        marginTop: "20px",
        marginBottom: "10px",
      }}
    />
  )
}


interface AnlogBoxProps {
  selectedSubQuery: SubQueryGet;
}

function AnalogBox({ selectedSubQuery }: AnlogBoxProps) {
  const store = useStore();

  return (
    <Box className={styles.cards}>
      {selectedSubQuery.selectedAnalogs!.map((analog, i) => (
        <>
          <CollapsableAnalogInfo
            key={analog.guid}
            analog={analog!}
            selectedSubQueryGuid={selectedSubQuery.guid}
          />
          {i !== selectedSubQuery.selectedAnalogs!.length - 1 && <Hr />}
        </>
      ))}
    </Box>
  );
}

type Props = {
  onSelectedSubQueryChange: (guid: string) => void;
  selectedSubQuery: SubQueryGet;
};

export default function MapSlider({
  onSelectedSubQueryChange,
  selectedSubQuery,
}: Props) {
  const [open, setOpen] = React.useState(true);
  const [hiddenAnalogsShow, setHiddenAnalogsShow] = React.useState(false);
  const [editorCreateOpen, setEditorCreateOpen] = React.useState(false);


  const theme = useTheme()
  let store = useStore()



  const subqueries = store.queryGetData?.subQueries ?? []


  return (
    <>
      {" "}
      <EditorModal
        type={EditorModalType.CREATE}
        open={editorCreateOpen}
        setOpen={setEditorCreateOpen}
        selectedSubQueryGuid={selectedSubQuery.guid}
      />
      <HiddenAnalogsModal
        open={hiddenAnalogsShow}
        setOpen={setHiddenAnalogsShow}
        selectedSubQuery={selectedSubQuery}
      />
      <Box className={styles.container}>
        {/* ???????????? ????????????????/???????????????? ???????????? */}
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

        {/* ?????????????????? ?????????????????? */}
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
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "10px",
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
              ??????????????
            </Typography>

            <Box className={styles.buttons}>
              <IconButton
                className={styles.button}
                onClick={() => {
                  setEditorCreateOpen(true)
                }}
              >
                <Plus />
              </IconButton>
              <IconButton
                className={styles.button}
                onClick={() => setHiddenAnalogsShow(true)}
              >
                <ClosedEyeIconBig />
              </IconButton>
              <Link href="/calculate_etalons/table">
                <IconButton className={styles.button}>
                  <OpenIcon />
                </IconButton>
              </Link>
            </Box>
          </Box>

          {/* ???????????? ???????????? ???????????????????? */}
          <ToggleButtonGroup
            exclusive
            onChange={(event, newSubqueryIndex) => {
              onSelectedSubQueryChange(subqueries[newSubqueryIndex].guid)
            }}
            sx={{
              marginTop: "14px",
              "& .MuiToggleButton-root:not(:last-child)": {
                marginRight: "30px",
              },
            }}
          >
            {subqueries.map((subQuery, i) => {
              return (
                <ToggleButton
                  value={i}
                  sx={{
                    padding: "10px 0",

                    borderRadius: "10px",
                    border: "none",
                    color: theme.palette.text.primary,
                    backgroundColor: "transparent",

                    "&:hover": {
                      backgroundColor: "transparent",
                      borderRadius: "10px",

                    },
                  }}
                >
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    lineHeight={"18px"}
                    // sx={{

                    // }}
                    color={
                      subQuery === selectedSubQuery
                        ? theme.palette.primary.main
                        : theme.palette.text.primary
                    }
                  >
                    {subQuery.standartObject?.rooms != 0
                      ? `${subQuery.standartObject?.rooms}-????????.`
                      : "????????????"}
                  </Typography>
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>

          {/* ?????????????????? ?? ?????????? ???????????????????????????? */}
          <AnalogBox selectedSubQuery={selectedSubQuery} />
        </Box>
      </Box>
    </>
  )
}
