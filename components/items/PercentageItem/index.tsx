import React, { SetStateAction, useEffect, useRef, useState } from "react"
import { SxProps, Theme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { Stack } from "@mui/system"
import { Box, ClickAwayListener } from "@mui/material"
import SliderTooltip from "../../tooltips/SliderTooltip/index"

type Props = {
  value: number
  sx?: SxProps<Theme>
  onPercentChange?: (newVal: number) => void
  [props: string]: any
}

export default function PercentageItem({
  value,
  sx,
  onPercentChange,
  ...props
}: Props) {
  const [isChangeMode, setIsChangeMode] = useState(false)
  const [percentageValue, setPercentageValue] = useState<number>(value)

  const handleClickAway = (): void => {
    setIsChangeMode(false)
    if (onPercentChange != undefined) {
      onPercentChange(percentageValue)
    }
  }

  value = percentageValue / 100

  const handleChange = (val: number | number[]) => {
    console.log(val)
    setPercentageValue(val as number)
  }

  const PercentageJSX = (
    <Typography
      component="span"
      onClick={() => setIsChangeMode((prev) => !prev)}
      sx={[
        {
          fontWeight: 500,
          fontSize: 18,
          lineHeight: "20px",
          width: "50px",
          color:
            value! > 0
              ? "var(--positive-clr)"
              : value == 0
              ? "#A6A8B5"
              : "var(--negative-clr)",
          backgroundColor: "#F3F7FA",
          p: "5px",
          borderRadius: "var(--border-radius-1)",
          cursor: "pointer",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {value! > 0
        ? value! < 1
          ? `+${
              (value * 100).toFixed(1) % 1 == 0
                ? (value * 100).toFixed(1) / 1
                : (value * 100).toFixed(1)
            }%`
          : `+${value}₽`
        : value! == 0
        ? `0%`
        : value! > -1
        ? `${
            (value * 100).toFixed(1) % 1 == 0
              ? (value * 100).toFixed(1) / 1
              : (value * 100).toFixed(1)
          }%`
        : `${value}₽`}
    </Typography>
  )

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: "relative",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        {isChangeMode ? (
          <Box
            sx={{
              position: "absolute",
              top: "25px",
              right: "0px",
              backgroundColor: "red",
            }}
          >
            <SliderTooltip onChange={handleChange}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              ></Box>
            </SliderTooltip>
          </Box>
        ) : (
          <div></div>
        )}
        {PercentageJSX}
      </Box>
    </ClickAwayListener>
  )
}
