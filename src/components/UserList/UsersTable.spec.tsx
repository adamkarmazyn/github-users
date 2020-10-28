import React from 'react';
import { render } from '@testing-library/react';
import { UsersTable, columns } from './UsersTable';
import { fakeUsers, lastFakeUser } from '../../fakeUsers';

const handleLastRendered = jest.fn();
const handleRowClicked = jest.fn();

test('columns should be rendered', () => {
  const { getByText } = render(
    <UsersTable
      users={fakeUsers}
      lastItemId={lastFakeUser.id}
      handleRowClicked={handleRowClicked}
      handleLastRendered={handleLastRendered}
    />,
  );
  columns.forEach(({ label }) => {
    expect(getByText(label)).toBeInTheDocument();
  });
});

test('renders all data', () => {
  const { getByText } = render(
    <UsersTable
      users={fakeUsers}
      lastItemId={lastFakeUser.id}
      handleRowClicked={handleRowClicked}
      handleLastRendered={handleLastRendered}
    />,
  );
  fakeUsers.forEach(({ login }) => {
    expect(getByText(login)).toBeInTheDocument();
  });
});
