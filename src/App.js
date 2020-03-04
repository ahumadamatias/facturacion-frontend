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
import EditProduct from './View/Product/edit-product';
import EditClient from './View/Client/edit-client';

const businessApi = new BusinessApi();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      isBusiness: false
    };
    this.handleIsVerified = this.handleIsVerified.bind(this);
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
  handleIsVerified(isVerified){
    this.setState({isVerified})
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
                ? <Client callback={this.handleIsVerified} />
                : <Redirect from="/clientes" to="/" />
            )} />
            <Route exact path="/cliente/facturar/:id" render={ (props) => (
                this.state.isVerified
                  ? <Redirect from="/cliente/facturar/:id" to="/facturas" />
                  : <NewInvoice data={props} callback={this.handleIsVerified} />
            )} />
            <Route exact path="/cliente/editar/:id" render={ (props) => (
                this.state.isVerified
                  ? <Redirect from="/cliente/editar/:id" to="/clientes" />
                  : <EditClient data={props} callback={this.handleIsVerified} />
            )} />
            <Route exact path="/productos" render={ () => (
              this.state.isBusiness
                ? <Products callback={this.handleIsVerified} />
                : <Redirect from="/productos" to="/" />
            )} />
            <Route exact path="/producto/editar/:id" render={ (props) => (
              this.state.isVerified
              ? <Redirect from="/producto/editar/:id" to="/productos" />
              : <EditProduct data={props} callback={this.handleIsVerified} />
            )} />
            <Route exact path="/facturas" render={ () => (
              this.state.isBusiness
                ? <InvoiceList />
                : <Redirect from="/facturas" to="/" />
            )} />
            <Route exact path="/factura/detalle/:id" render={ (props) => (
              this.state.isBusiness
                ? <InvoiceDetails data={props} />
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