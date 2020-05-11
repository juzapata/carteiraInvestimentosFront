import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignInAndCreateUser from '../components/SignInAndCreate/SignInAndCreateUser';
import Home from '../components/Home/Home';



export default function Routes() {
  return (
    <Switch>
      <div className="App">
        <div className="App-body">
          <Route path="/" exact component={SignInAndCreateUser} redirectTo="/" />
          <Route path="/home" exact component={Home} isPrivate />
        </div>
      </div>
    </Switch>
  );
}
