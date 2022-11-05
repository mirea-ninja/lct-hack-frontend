import React from "react"
import Step from "./Step"
import { Stack, Box } from "@mui/material"
import StepSeparator from "./StepSeparator"
import { BoxProps } from "@mui/system"

type Props = {
  stepsCount: number
  currentStep: number
  width?: string
} & BoxProps

const stepValues = [
  {
    stepName: "Загрузка пула",
  },
  {
    stepName: "Выбор эталонов",
  },
  {
    stepName: "Расчет эталонов",
  },
  {
    stepName: "Расчет пула",
  },
  {
    stepName: "Экспорт",
  },
]

export default function StepProgress({
  stepsCount,
  currentStep,
  width,
}: Props) {
  return (
    <Stack direction="row" alignItems="center">
      {Array.from(Array(stepsCount).keys()).map((stepNumber, i) => {
        return (
          <Step
            stepName={stepValues[i].stepName}
            key={i}
            number={i + 1}
            isActive={currentStep === i + 1}
            isProgressed={currentStep > i + 1}
            havePath={i !== stepsCount - 1}
          />
        )
      })}
    </Stack>
  )
}
