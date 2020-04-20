import React from 'react';
import { Switch} from 'react-router-dom';
import SignInAndCreateUser from '../components/SignInAndCreate/SignInAndCreateUser';
import Home from '../components/Home/Home';
import Route from './Routes';


export default function Routes() {
  return (
    <Switch>
      <div className="App">
        <div className="App-body">
          <Route path="/" exact component={SignInAndCreateUser} />
          <Route path="/home" exact component={Home} isPrivate />
          </div>
      </div>
    </Switch>
  );
}
