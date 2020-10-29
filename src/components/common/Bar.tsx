import React from 'react';
import { AppBar, Typography, Toolbar, IconButton, CircularProgress, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { State } from '../../redux/State';

interface BarProps {
  isHome?: boolean;
}

const useStyles = makeStyles({
  menuButton: {
    marginLeft: -12,
  },
  progres: {
    marginLeft: 12,
  },
});

export const Bar: React.FC<BarProps> = ({ isHome = false }) => {
  const isLoading = useSelector<State, boolean>((state) => state.users.isLoading);
  const error = useSelector<State, string | undefined>((state) => state.users.error);
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {!isHome && (
            <IconButton color="inherit" className={classes.menuButton} aria-label="Back" onClick={() => history.push('/')}>
              <ArrowBack data-testid="back" />
            </IconButton>
          )}
          <Typography>Github Users</Typography>
          {isLoading && <CircularProgress className={classes.progres} color="secondary" />}
        </Toolbar>
      </AppBar>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};
