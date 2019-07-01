import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Index from './index/index';
import Detail from './detail';
import SaveUpdata from './save-updata';

class Product extends Component {

  render() {
    return(
      <Switch>
        <Route path="/product/index" component={Index}/>
        <Route path="/product/detail" component={Detail}/>
        <Route path="/product/saveupdata" component={SaveUpdata}/>
        <Redirect to="/product/index"/>
      </Switch>
    );
  }
}

export default Product;

