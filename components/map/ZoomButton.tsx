import React from "react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/IconButton";

type ZoomButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
};

export const ZoomButton = (props: ZoomButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        color: theme.palette.primary.main,
        padding: "5px",
        "&:hover": {
          background: "transparent",
        },
      }}
      onClick={props.onClick}
    >
      {props.icon}
    </Button>
  );
};
