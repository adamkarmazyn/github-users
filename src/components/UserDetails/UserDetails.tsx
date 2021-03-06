import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Grid, Typography, makeStyles } from '@material-ui/core';
import { State } from '../../redux/State';
import { User } from '../../models';
import { getUserByLoginStart, getUserByLoginSuccess } from '../../redux/actions/userActions';
import { Bar } from '../common/Bar';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 16,
  },
  avatar: {
    width: 96,
    height: 96,
  },
  name: {
    marginTop: 18,
    marginLeft: 16,
  },
  login: {
    marginTop: 4,
    marginLeft: 16,
  },
});

export const UserDetails: React.FC = () => {
  const { login } = useParams<{ login: string }>();
  const user = useSelector<State, User | null>((state) => state.users.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!user) dispatch(getUserByLoginStart(login));

    return () => {
      dispatch(getUserByLoginSuccess(null));
    };
  }, []);

  return (
    <>
      <Bar />
      {user && (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container className={classes.root} justify="center">
              <Grid item>
                <Avatar alt={`${user.login} profile pic`} className={classes.avatar} src={user.avatar_url} />
              </Grid>
              <Grid item>
                <Typography variant="h5" className={classes.name}>
                  {user.name}
                </Typography>
                <Typography variant="h6" className={classes.login}>
                  {user.login}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
