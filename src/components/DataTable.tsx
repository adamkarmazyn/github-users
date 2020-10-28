import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, Typography, TableBody } from '@material-ui/core';
import { User } from '../models';
import { Row } from './Row';

const columns = [
  {
    label: 'Avatar',
    selector: 'avatar_url',
  },
  {
    label: 'Login',
    selector: 'login',
  },
];

interface DataTableProps {
  data: User[];
  lastItemId: number;
  handleLastRendered: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, lastItemId, handleLastRendered }) => {
  return (
    <TableContainer>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {columns.map(({ label }, idx) => (
              <TableCell key={label} width={idx === 0 ? '5px' : '95%'}>
                <Typography variant="h6">{label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <Row key={user.id} user={user} lastItemId={lastItemId} handleLastRendered={handleLastRendered} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
