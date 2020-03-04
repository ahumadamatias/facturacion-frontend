import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BusinessApi from '../src/Service/business-api';

import Menu from '../src/GlobalComponent/Menu/menu';
import NewInvoice from '../src/View/NewInvoice/new-invoice';
import Products from '../src/View/Product/products';
import Client from '../src/View/Client/client';
import InvoiceList from '../src/View/InvoiceList/invoice-list';
import InvoiceDetails from '../src/View/InvoiceDetail/invoice-details';
import CreateBusiness from '../src/View/CreateBusiness/create-business';
import Business from '../src/View/Business/business'

const businessApi = new BusinessApi();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBilled: false,
      isBusiness: false
    };
    this.handleIsBilled = this.handleIsBilled.bind(this);
    this.handleIsBusiness = this.handleIsBusiness.bind(this);
  }
  componentDidMount(){
    businessApi.getBusiness()
      .then( () => {
        this.setState({isBusiness: true});
      })
      .catch( e => {
        console.log(e);
      })
  }
  handleIsBusiness(isBusiness){
    this.setState({isBusiness})
  }
  handleIsBilled(isBilled){
    this.setState({isBilled})
  }
  render(){
    return (
      <BrowserRouter>
        <Menu />
        <Switch>
            <Route exact path="/" render={ () => (
              this.state.isBusiness
                  ? <Redirect from="/" to="/clientes" />
                  : <CreateBusiness callback={this.handleIsBusiness} />
            )} />
            <Route exact path="/clientes" render={ () => (
              this.state.isBusiness
                ? <Client />
                : <Redirect from="/clientes" to="/" />
            )} />
            <Route exact path="/cliente/facturar/:id" render={ (props) => (
                this.state.isBilled
                  ? <Redirect from="/cliente/facturar/:id" to="/facturas" />
                  : <NewInvoice data={props} callback={this.handleIsBilled} />
            )} />
            <Route exact path="/productos" render={ () => (
              this.state.isBusiness
                ? <Products />
                : <Redirect from="/productos" to="/" />
            )} />
            <Route exact path="/facturas" render={ () => (
              this.state.isBusiness
                ? <InvoiceList />
                : <Redirect from="/facturas" to="/" />
            )} />
            <Route exact path="/factura/detalle/:id" render={ () => (
              this.state.isBusiness
                ? <InvoiceDetails />
                : <Redirect from="/factura/detalle/:id" to="/" />
            )} />
            <Route exact path="/empresa" render={ () => (
              this.state.isBusiness
                ? <Business callback={this.handleIsBusiness}/>
                : <Redirect from="/empresa" to="/" />
            )} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;