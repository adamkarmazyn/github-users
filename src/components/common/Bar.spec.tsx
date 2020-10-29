import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Store } from 'redux';
import { Bar } from './Bar';
import { configureStore } from '../../redux/store';
import { State } from '../../redux/State';
import { getUserByLoginFail, UserActions } from '../../redux/actions/userActions';

interface ProvidersProps {
  path?: string;
  route?: string;
  componentStore: Store<State, UserActions>;
  history: MemoryHistory;
}

const AllTheProviders: React.FC<ProvidersProps> = ({ path = '/', children, componentStore, history }) => {
  return (
    <Provider store={componentStore}>
      <Router history={history}>
        <Switch>
          <Route exact path={path}>
            {children}
          </Route>
          <Route>Not supproted test page</Route>
        </Switch>
      </Router>
    </Provider>
  );
};

type ExtendedOptions = Omit<RenderOptions, 'queries'> & { wrapperProps?: Pick<ProvidersProps, 'path' | 'route'> };
type ExtendedRenderResult = RenderResult & Pick<ProvidersProps, 'componentStore' | 'history'>;

const customRender = (ui: React.ReactElement, options?: ExtendedOptions): ExtendedRenderResult => {
  const componentStore = configureStore();
  const history = createMemoryHistory({ initialEntries: [options?.wrapperProps?.route || '/'] });
  const view = render(ui, {
    wrapper: (props) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <AllTheProviders {...props} {...options?.wrapperProps} componentStore={componentStore} history={history} />;
    },
    ...options,
  });
  return { ...view, componentStore, history };
};

test('should render bar with title', () => {
  const { getByText } = customRender(<Bar />);
  expect(getByText('Github Users')).toBeInTheDocument();
});

test('should render bar with back button', () => {
  const { getByTestId } = customRender(<Bar />);
  expect(getByTestId('back')).toBeInTheDocument();
});

test('should navigate to home when back button is clicked', () => {
  const { getByTestId, history } = customRender(<Bar />, { wrapperProps: { path: '/:login', route: '/test' } });
  userEvent.click(getByTestId('back'));
  expect(history.location.pathname).toBe('/');
});

test('should render error', () => {
  const { getByText, componentStore } = customRender(<Bar />);
  const error = 'show this error';
  componentStore.dispatch(getUserByLoginFail(error));
  expect(getByText(error)).toBeInTheDocument();
});
