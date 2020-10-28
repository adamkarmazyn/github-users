import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/State';
import { User } from '../../models';
import { getUserByLoginStart } from '../../redux/actions/userActions';

export const UserDetails: React.FC = () => {
  const { login } = useParams<{ login: string }>();
  const user = useSelector<State, User | null>((state) => state.users.user);
  const isLoading = useSelector<State, boolean | null>((state) => state.users.isLoading);
  const error = useSelector<State, string | undefined>((state) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) dispatch(getUserByLoginStart(login));
  }, [user]);

  return (
    <>
      <div>{login}</div>
      <div>{JSON.stringify(user, null, 2)}</div>
    </>
  );
};
