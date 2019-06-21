import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/less/index.less';
import Login from './pages/login';
import Admin from './pages/admin';

class App extends React.Component {

  render() {
    return(
      <BrowserRouter>
        {/*加上Switch 就永远只匹配一个*/}
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
