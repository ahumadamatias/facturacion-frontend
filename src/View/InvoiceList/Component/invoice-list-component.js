import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InvoiceApi from '../../../Service/invoice-api';
import cutString from '../../../Utils/cut-string';

import './invoice-list-component.css';

const invoiceApi = new InvoiceApi();

class ClientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeInvoice: '/factura/detalle/' + this.props.invoice.encabezado.id
        };
        this.handleDeleteInvoice = this.handleDeleteInvoice.bind(this);
    }
    handleDeleteInvoice(e){
        e.preventDefault();
        invoiceApi.deleteInvoice(this.props.invoice.encabezado.id)
            .then( () => {
                this.props.callback();
            })
            .catch( e => {
                console.log(e)
            });
    }
    render() { 
        return (
            <div className="content_invoice-list-component" onSubmit={this.handleSubmit}>
                <div className="data"><p>{cutString(this.props.invoice.encabezado.fecha, "T")}</p></div>
                <div className="data"><p>Tipo {this.props.invoice.encabezado.letra}</p></div>
                <div className="data"><p>{this.props.invoice.encabezado.cliente.nombre}</p></div>
                <div className="data"><p>${this.props.invoice.pie.precioTotal}</p></div>
                <div><Link to={this.state.routeInvoice}><button className="btn-primary"><span className="icon-files-empty icon" />Ver Detalle</button></Link></div>
                <div><button onClick={this.handleDeleteInvoice} className="btn-danger"><span className="icon-bin icon" />Borrar</button></div>
            </div>
        );
    }
}
 
export default ClientComponent;