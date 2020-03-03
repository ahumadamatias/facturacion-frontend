import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './invoice-list-component.css';

class ClientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeInvoice: '/facturas/detalle/' + this.props.invoice.encabezado.id
        };
        this.cutString = this.cutString.bind(this);
    }
    cutString(){
        let arrayStrings = this.props.invoice.encabezado.fecha.split("T");
        return arrayStrings[0];
    }
    render() { 
        return (
            <div className="content_invoice-list-component" onSubmit={this.handleSubmit}>
                <div className="data"><p>{this.cutString()}</p></div>
                <div className="data"><p>Tipo {this.props.invoice.encabezado.letra}</p></div>
                <div className="data"><p>{this.props.invoice.encabezado.cliente.nombre}</p></div>
                <div className="data"><p>$I{this.props.invoice.pie.precioTotal}</p></div>
                <div><Link to={this.state.routeInvoice}><button className="btn">Ver Detalle</button></Link></div>
            </div>
        );
    }
}
 
export default ClientComponent;