import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureStore } from './redux/store';

import { PageNotFound, List } from './components';
import './App.css';
import { UserDetails } from './components/UserDetails/UserDetails';

const App: React.FC = () => {
  return (
    <Provider store={configureStore()}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/:login" exact component={UserDetails} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
