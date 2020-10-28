import React, { useEffect } from 'react';
import { TableCell, TableRow, Avatar } from '@material-ui/core';
import { User } from '../../models';

interface RowProps {
  user: User;
  lastItemId: number;
  handleLastRendered: () => void;
  handleRowClicked: (login: string) => void;
}

export const Row: React.FC<RowProps> = ({ user, lastItemId, handleLastRendered, handleRowClicked }) => {
  useEffect(() => {
    if (user.id === lastItemId) handleLastRendered();
  });

  const handleClick = () => {
    handleRowClicked(user.login);
  };

  return (
    <TableRow key={user.id}>
      <TableCell onClick={handleClick}>
        <Avatar alt={`${user.login} profile pic`} src={user.avatar_url} />
      </TableCell>
      <TableCell>{user.login}</TableCell>
    </TableRow>
  );
};
