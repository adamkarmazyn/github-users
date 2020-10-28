import { TableCell, TableRow, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { User } from '../models';

interface RowProps {
  user: User;
  lastItemId: number;
  handleLastRendered: () => void;
}

export const Row: React.FC<RowProps> = ({ user, lastItemId, handleLastRendered }) => {
  useEffect(() => {
    if (user.id === lastItemId) handleLastRendered();
  });

  return (
    <TableRow key={user.id}>
      <TableCell>
        <Link to={`/${user.login}`}>
          <Avatar alt={`${user.login} profile pic`} src={user.avatar_url} />
        </Link>
      </TableCell>
      <TableCell>{user.login}</TableCell>
    </TableRow>
  );
};
