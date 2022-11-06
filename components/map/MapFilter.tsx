import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Collapse } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AppCheckbox from "../checkboxes/AppCheckbox";
import ArrowLeft from "@mui/icons-material/ChevronLeft";

type Props = {
  setShowEtalon: (value: boolean) => void;
  setShowAnalogs: (value: boolean) => void;
  setShowSearchArea: (value: boolean) => void;
  setShowHiddenAnalogs: (value: boolean) => void;
};

export default function MapFilter(props: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const [etalon, setEtalon] = React.useState(true);
  const [analogs, setAnalogs] = React.useState(true);
  const [searchArea, setSearchArea] = React.useState(true);
  const [hiddenAnalogs, setHiddenAnalogs] = React.useState(true);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: "70%",
        right: "30px",
        p: "20px",
        background: "#fff",
        boxShadow: "var(--shadow-1)",
        borderRadius: "var(--border-radius-1)",
        zIndex: 1000,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "22px",
            color: "var(--text-clr-main)",
          }}
        >
          Показывать
        </Typography>
        <IconButton onClick={() => setIsExpanded((prev) => !prev)}>
          <ArrowLeft
            sx={{
              transform: isExpanded ? "rotate(90deg)" : "rotate(-90deg)",
              transition: "transform .3s",
            }}
          />
        </IconButton>
      </Stack>
      <Collapse in={isExpanded}>
        <FormGroup sx={{ mt: "10px" }}>
          <FormControlLabel
            control={
              <AppCheckbox
                name="new"
                checked={etalon}
                onChange={() => {
                  props.setShowEtalon(!etalon);
                  setEtalon(!etalon);
                }}
              />
            }
            label="Эталон"
            sx={{ mr: 0, ml: "-8px" }}
          />
          <FormControlLabel
            control={
              <AppCheckbox
                name="modern"
                checked={analogs}
                onChange={() => {
                  props.setShowAnalogs(!analogs);
                  setAnalogs(!analogs);
                }}
              />
            }
            label="Аналоги"
            sx={{ mr: 0, ml: "-8px" }}
          />
          <FormControlLabel
            control={
              <AppCheckbox
                name="old"
                checked={searchArea}
                onChange={() => {
                  props.setShowSearchArea(!searchArea);
                  setSearchArea(!searchArea);
                }}
              />
            }
            label="Область поиска"
            sx={{ mr: 0, ml: "-8px" }}
          />
          <FormControlLabel
            control={
              <AppCheckbox
                name="old"
                checked={hiddenAnalogs}
                onChange={() => {
                  props.setShowHiddenAnalogs(!hiddenAnalogs);
                  setHiddenAnalogs(!hiddenAnalogs);
                }}
              />
            }
            label="Скрытые аналоги"
            sx={{ mr: 0, ml: "-8px" }}
          />
        </FormGroup>
      </Collapse>
    </Paper>
  );
}
