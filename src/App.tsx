import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { configureStore } from './redux/store';
import { PageNotFound, UserListPage } from './components';
import { UserDetails } from './components/UserDetails/UserDetails';

const App: React.FC = () => {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Switch>
          <Route exact path="/" component={UserListPage} />
          <Route path="/:login" exact component={UserDetails} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
