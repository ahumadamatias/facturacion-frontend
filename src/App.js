import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewInvoice from '../src/View/NewInvoice/new-invoice'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exac path="/new-invoice" component={NewInvoice} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
