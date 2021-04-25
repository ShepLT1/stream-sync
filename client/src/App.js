import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingPage } from './pages/Landing';
import { UserDash } from './pages/UserDash';
import { PartyDash } from './pages/PartyDash';
import { UserReg } from './pages/UserRegistration';
import { PartyReg } from './pages/PartyRegistration';
import { UserSettings } from './pages/UserSettings';
import { PartySettings } from './pages/PartySettings';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <LandingPage />
          </Route>
          <Route path='/userdash'>
            <UserDash />
          </Route>
          <Route path='/partydash'>
            <PartyDash />
          </Route>
          <Route path='/userreg'>
            <UserReg />
          </Route>
          <Route path='/partyreg'>
            <PartyReg />
          </Route>
          <Route path='/usersettings'>
            <UserSettings />
          </Route>
          <Route path='/partysettings'>
            <PartySettings />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
