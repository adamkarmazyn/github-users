import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, Typography, TableBody } from '@material-ui/core';
import { User } from '../../models';
import { Row } from './Row';

export const columns = [
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
  users: User[];
  lastItemId: number;
  handleLastRendered: () => void;
  handleRowClicked: (login: string) => void;
}

export const UsersTable: React.FC<DataTableProps> = ({ users, lastItemId, handleLastRendered, handleRowClicked }) => {
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
          {users.map((user) => (
            <Row
              key={user.id}
              user={user}
              lastItemId={lastItemId}
              handleLastRendered={handleLastRendered}
              handleRowClicked={handleRowClicked}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
