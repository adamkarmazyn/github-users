import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageNotFound } from './components';

import './App.css';
import Home from './Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/te">
            <div>test</div>
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
