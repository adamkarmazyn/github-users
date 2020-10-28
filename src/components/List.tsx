import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, LinearProgress } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { State } from '../redux/State';
import { getAllUsersStart } from '../redux/actions/userActions';
import { User } from '../models';
import { DataTable } from './DataTable';
import { Bar } from './Bar';

const ROWS_PER_PAGE = 10;

export const List: React.FC = () => {
  const users = useSelector<State, User[]>((state) => {
    return state.users.users;
  });
  const [lastUser = { id: 0 }] = [...users].reverse();
  const error = useSelector<State, string | undefined>((state) => state.users.error);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) dispatch(getAllUsersStart());
  }, []);

  const handleGetUserSince = () => {
    dispatch(getAllUsersStart({ since: `${lastUser.id}` }));
  };

  return (
    <div>
      <Bar isHome />
      {error && <div>{error}</div>}
      <DataTable
        data={users.slice((Number(pageNumber) - 1) * ROWS_PER_PAGE, (Number(pageNumber) - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE)}
        lastItemId={lastUser.id}
        handleLastRendered={handleGetUserSince}
      />
      <Box display="flex" justifyContent="flex-end" flex={1} padding={1} paddingRight={10}>
        <Pagination
          page={Number(pageNumber)}
          count={Math.ceil(users.length / ROWS_PER_PAGE) || 1}
          shape="rounded"
          color="primary"
          boundaryCount={1}
          onChange={(e, val) => {
            setPageNumber(val);
          }}
          renderItem={(item) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <PaginationItem {...item} />;
          }}
        />
      </Box>
    </div>
  );
};
