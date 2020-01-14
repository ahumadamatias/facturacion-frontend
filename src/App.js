import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewInvoice from '../src/View/NewInvoice/new-invoice';
import Menu from '../src/GlobalComponent/Menu/menu'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Menu>
        <Route exac path="/" component={NewInvoice} />
        </Menu>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
