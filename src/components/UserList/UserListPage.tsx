import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { State } from '../../redux/State';
import { getAllUsersStart } from '../../redux/actions/userActions';
import { User } from '../../models';
import { UsersTable } from './UsersTable';
import { Bar } from '../common/Bar';

const ROWS_PER_PAGE = 10;
const PAGE_KEY = 'lastPage';

export const UserListPage: React.FC = () => {
  const history = useHistory();
  const users = useSelector<State, User[]>((state) => {
    return state.users.users;
  });
  const [lastUser = { id: 0 }] = [...users].reverse();

  const getInitialPage = (): number => {
    const fromPage = sessionStorage.getItem(PAGE_KEY) ? Number(sessionStorage.getItem(PAGE_KEY)) : 1;
    const page = users.length > 0 && users.length - (fromPage - 1) * ROWS_PER_PAGE > 0 ? fromPage : 1;
    return page;
  };
  const [pageNumber, setPageNumber] = useState(getInitialPage());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) dispatch(getAllUsersStart());
  }, []);

  useEffect(() => {
    sessionStorage.setItem(PAGE_KEY, `${pageNumber}`);
  }, [pageNumber]);

  const handleGetUserSince = () => {
    dispatch(getAllUsersStart({ since: `${lastUser.id}` }));
  };

  const handleRowClicked = (login: string) => {
    history.push(`/${login}`);
  };

  const handleSetPage = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div>
      <Bar isHome />
      <UsersTable
        users={users.slice((Number(pageNumber) - 1) * ROWS_PER_PAGE, (Number(pageNumber) - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE)}
        lastItemId={lastUser.id}
        handleLastRendered={handleGetUserSince}
        handleRowClicked={handleRowClicked}
      />
      <Box display="flex" justifyContent="flex-end" flex={1} padding={1} paddingRight={10}>
        <Pagination
          page={Number(pageNumber)}
          count={Math.ceil(users.length / ROWS_PER_PAGE) || 1}
          shape="rounded"
          color="primary"
          boundaryCount={1}
          onChange={(e, val) => {
            handleSetPage(val);
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
