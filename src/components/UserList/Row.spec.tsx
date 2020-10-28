import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, TableBody } from '@material-ui/core';
import { Row } from './Row';
import { firstFakeUser, lastFakeUser } from '../../fakeUsers';

const handleLastRendered = jest.fn();
const handleRowClicked = jest.fn();

const wrapper: React.FC = ({ children }) => (
  <Table>
    <TableBody>{children}</TableBody>
  </Table>
);

test('should render Row with data', () => {
  const { getByText, getByAltText } = render(
    <Row user={firstFakeUser} lastItemId={lastFakeUser.id} handleLastRendered={handleLastRendered} handleRowClicked={handleRowClicked} />,
    { wrapper },
  );
  expect(getByText(firstFakeUser.login)).toBeInTheDocument();
  expect(getByAltText(`${firstFakeUser.login} profile pic`)).toBeInTheDocument();
});

test('should call handleRowClicked', () => {
  const { getByAltText } = render(
    <Row user={firstFakeUser} lastItemId={lastFakeUser.id} handleLastRendered={handleLastRendered} handleRowClicked={handleRowClicked} />,
    { wrapper },
  );
  const avatar = getByAltText(`${firstFakeUser.login} profile pic`);
  userEvent.click(avatar);
  expect(handleRowClicked).toBeCalled();
});

test('should not call handleLastRendered', () => {
  render(
    <Row user={firstFakeUser} lastItemId={lastFakeUser.id} handleLastRendered={handleLastRendered} handleRowClicked={handleRowClicked} />,
    { wrapper },
  );

  expect(handleLastRendered).not.toBeCalled();
});

test('should call handleLastRendered', () => {
  render(
    <Row user={lastFakeUser} lastItemId={lastFakeUser.id} handleLastRendered={handleLastRendered} handleRowClicked={handleRowClicked} />,
    { wrapper },
  );

  expect(handleLastRendered).toBeCalled();
});
