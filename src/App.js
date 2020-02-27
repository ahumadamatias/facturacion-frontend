import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from '../src/GlobalComponent/Menu/menu'

import NewInvoice from '../src/View/NewInvoice/new-invoice';
import Products from '../src/View/Product/products';
import Client from '../src/View/Client/client';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
          <Route exac path="/clientes" component={Client} />
          <Route exac path="/cliente/facturar/:id" component={NewInvoice} />
          <Route exac path="/productos" component={Products} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
