import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Menu from '../src/GlobalComponent/Menu/menu'

import NewInvoice from '../src/View/NewInvoice/new-invoice';
import Products from '../src/View/Product/products';
import Client from '../src/View/Client/client';
import InvoiceList from '../src/View/InvoiceList/invoice-list';
import InvoiceDetails from '../src/View/InvoiceDetail/invoice-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBilled: false
    };
    this.handleIsBilled = this.handleIsBilled.bind(this);
  }
  handleIsBilled(isBilled){
    this.setState({isBilled})
  }
  render(){
    return (
      <BrowserRouter>
        <Menu />
        <Switch>
            <Route exac path="/clientes" component={Client} />
            <Route exac path="/cliente/facturar/:id" render={ (props) => (
                this.state.isBilled
                  ? <Redirect from="/cliente/facturar/:id" to="/facturas" />
                  : <NewInvoice data={props} callback={this.handleIsBilled} />
            )} />
            <Route exac path="/productos" component={Products} />
            <Route exac path="/facturas" component={InvoiceList} />
            <Route exac path="/factura/detalle/:id" component={InvoiceDetails} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;