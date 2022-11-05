import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pool } from './types';
import PercentageItem from '../../items/PercentageItem';
import { Stack } from '@mui/system';

const StyledStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    color: 'var(--text-clr-secondary)',
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    backgroundColor: 'var(--bg-clr-main)',
    borderRight: '1px solid #E9ECEE',
  },

  '&:nth-of-type(1), &:nth-of-type(2)': {
    backgroundColor: 'var(--bg-clr-pure-white)',
  },
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(1) td': {
    fontWeight: 700,
    boxShadow: 'var(--shadow-etalon)',
    backgroundColor: 'var(--bg-clr-pure-white)',
  },
  'td,  th': {
    fontWeight: 500,
    borderBottom: '5px solid var(--bg-clr-pure-white)',
  },
});

const rows: Pool[] = [
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
  {
    id: Math.random(),
    isBasic: true,
    pricePerSquareMeter: 357100,
    objectPrice: 39673490,
    floor: 1,
    flatSquare: 6,
    kitchenSquare: 24,
    hasBalcony: false,
    state: 'Муниципальный ремонт',
  },
];

export default function PoolTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Цена за м2</StyledTableCell>
            <StyledTableCell align='left'>Стоимость объекта</StyledTableCell>
            <StyledTableCell align='left'>Этаж расположения</StyledTableCell>
            <StyledTableCell align='left'>Площадь квартиры, м2</StyledTableCell>
            <StyledTableCell align='left'>Площадь кухни, м2</StyledTableCell>
            <StyledTableCell align='left'>Балкон или лоджия</StyledTableCell>
            <StyledTableCell align='left'>Состояние</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell scope='row'>
                <StyledStack>
                  {row.pricePerSquareMeter} ₽
                  <PercentageItem value={4.5} />
                </StyledStack>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <StyledStack>
                  {row.objectPrice} ₽
                  <PercentageItem value={-4.5} />
                </StyledStack>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <StyledStack>
                  {row.floor}
                  <PercentageItem value={4.5} />
                </StyledStack>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <StyledStack>
                  {row.flatSquare}
                  <PercentageItem value={-4.5} />
                </StyledStack>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <StyledStack>{row.kitchenSquare}</StyledStack>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <StyledStack>{row.hasBalcony ? 'Да' : 'Нет'}</StyledStack>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <StyledStack>{row.state}</StyledStack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
