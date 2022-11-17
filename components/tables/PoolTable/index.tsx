import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Pool } from "./types"
import PercentageItem from "../../items/PercentageItem"
import { Stack } from "@mui/system"
import { toJS } from "mobx"
import { SubQueryGet } from "../../../apiConnection/gen/models/sub-query-get"
import { ApartmentGet } from "../../../apiConnection/gen/models/apartment-get"

const StyledStack = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    color: "var(--text-clr-secondary)",
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    backgroundColor: "var(--bg-clr-main)",
    borderRight: "1px solid #E9ECEE",
  },

  "&:nth-of-type(1), &:nth-of-type(2)": {
    backgroundColor: "var(--bg-clr-pure-white)",
  },
})

const StyledTableRow = styled(TableRow)({
  "td, th": {
    fontWeight: 500,
    borderBottom: "5px solid var(--bg-clr-pure-white)",
  },

  "&:nth-of-type(1) td": {
    fontWeight: 700,
    backgroundColor: "var(--bg-clr-pure-white)",
    borderBottom: "5px solid #1E1E1E32",
    borderRight: "none",
  },
})

type Props = {
  hasMetroAttribute?: boolean
  rows: RowsData[]
}

export type RowsData = {
  sub: SubQueryGet
  apt: ApartmentGet
  row?: Pool
}

export default function PoolTable({ rows, hasMetroAttribute = false }: Props) {
  console.log(toJS(rows))
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Цена / м²</StyledTableCell>
            <StyledTableCell align="left">Стоимость объекта</StyledTableCell>
            <StyledTableCell align="left">Этаж расположения</StyledTableCell>
            <StyledTableCell align="left">Площадь квартиры, м²</StyledTableCell>
            <StyledTableCell align="left">Площадь кухни, м²</StyledTableCell>
            <StyledTableCell align="left">Балкон / лоджия</StyledTableCell>
            {hasMetroAttribute && (
              <StyledTableCell align="left">
                Время до метро, мин
              </StyledTableCell>
            )}
            <StyledTableCell align="left">Отделка</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <ResultTableRow
              apartment={row.apt}
              subquery={row.sub}
              row={row.row}
              key={index}
              hasMetroAttribute={hasMetroAttribute}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type TableRowProps = {
  row: Pool
  apartment: ApartmentGet
  subquery: SubQueryGet
  hasMetroAttribute?: boolean
}

const ResultTableRow = ({
  row,
  hasMetroAttribute,
  subquery,
  apartment,
}: TableRowProps) => {
  console.log(toJS(row))

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell scope="row">
        <StyledStack>
          {row.pricePerSquareMeter.value} ₽
          {hasMetroAttribute && row.pricePerSquareMeter.value > 0 && (
            <PercentageItem
              adjType="floor"
              sub={subquery}
              apart={apartment}
              value={
                row.pricePerSquareMeter.change - row.pricePerSquareMeter.value
              }
            />
          )}
        </StyledStack>
      </StyledTableCell>
      <StyledTableCell align="right">
        <StyledStack>{row.objectPrice} ₽</StyledStack>
      </StyledTableCell>
      <StyledTableCell align="right">
        <StyledStack>
          {row.floor.value}
          {row.floor.change != null && (
            <PercentageItem
              adjType="floor"
              sub={subquery}
              apart={apartment}
              value={row.floor.change}
            />
          )}
        </StyledStack>
      </StyledTableCell>
      <StyledTableCell align="right">
        <StyledStack>
          {row.flatSquare.value}
          {row.flatSquare.change != null && (
            <PercentageItem
              adjType="floor"
              sub={subquery}
              apart={apartment}
              value={row.flatSquare.change}
            />
          )}
        </StyledStack>
      </StyledTableCell>
      <StyledTableCell align="right">
        <StyledStack>
          {row.kitchenSquare.value}
          {row.kitchenSquare.change != null && (
            <PercentageItem
              adjType="floor"
              sub={subquery}
              apart={apartment}
              value={row.kitchenSquare.change}
            />
          )}
        </StyledStack>
      </StyledTableCell>
      <StyledTableCell align="right">
        <StyledStack>
          {row.hasBalcony.value ? "Да" : "Нет"}
          {row.hasBalcony.change != null && (
            <PercentageItem
              adjType="floor"
              sub={subquery}
              apart={apartment}
              value={row.hasBalcony.change}
            />
          )}
        </StyledStack>
      </StyledTableCell>
      {hasMetroAttribute && (
        <StyledTableCell align="right">
          <StyledStack>
            {row.metro.value}
            {row.metro.change != null && (
              <PercentageItem
                adjType="floor"
                sub={subquery}
                apart={apartment}
                value={row.metro.change}
              />
            )}
          </StyledStack>
        </StyledTableCell>
      )}
      <StyledTableCell align="left">
        <StyledStack>
          {row.state.value}
          {row.state.change != null && (
            <PercentageItem
              adjType="floor"
              sub={subquery}
              apart={apartment}
              value={row.state.change}
            />
          )}
        </StyledStack>
      </StyledTableCell>
    </StyledTableRow>
  )
}
