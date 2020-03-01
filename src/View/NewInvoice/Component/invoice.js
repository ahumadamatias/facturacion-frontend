import React, { Component } from 'react';
import InvoiceApi from '../../../Service/invoice-api';

import './invoice.css';

const invoiceApi = new InvoiceApi();

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidad: "",
            factura:{
                "encabezado": {
                    "cliente": {
                        "id": "",
                    }
                },
                "items": [],
                "pie": {
                    "observaciones": ""
                }
            },
        }
        this.handleOnClickDeleteProduct = this.handleOnClickDeleteProduct.bind(this);
        this.handleOnClickCreateInvoice = this.handleOnClickCreateInvoice.bind(this);
        this.handleChangeObservation = this.handleChangeObservation.bind(this);
        this.generateItems = this.generateItems.bind(this);
    }
    handleOnClickCreateInvoice(e){
        e.preventDefault();
        let factura = this.state.factura;
        factura.encabezado.cliente.id = this.props.client.id;
        factura.items = this.generateItems();
        this.setState({factura: factura});
        console.log(JSON.stringify(this.state.factura))
        invoiceApi.createInvoice(this.state.factura)
            .then( res => {
                console.log(res);
            })
            .catch( e => {
                console.log(e);
            })
    }
    handleOnClickDeleteProduct(id, e){
        e.preventDefault();
        this.props.callback(id);
    }
    handleChangeObservation(e){
        let factura = this.state.factura;
        factura.pie.observaciones = e.target.value;
        this.setState({factura: factura});
    }
    generateItems(){
        let items = [];
        for (let i = 0; i < this.props.products.length; i++) {
            let item = {
                producto: {
                    "id": this.props.products[i].product.id
                },
                "cantidad": this.props.products[i].quantity
            };
            items.push(item);         
        }
        return items
    }
    render(){
        return(
            <div className="content_invoice">
                <button onClick={this.handleOnClickCreateInvoice} type="submit" className="btn">Facturar</button>
                <div className="content_data-empresa">
                    <div className="title_data-empresa"><h2>Datos de la Empresa</h2></div>
                    <div className="data-empresa">
                        <div>
                            <p><span>Nombre: </span></p>
                            <p><span>Dirección: </span></p>
                            <p><span>Pais: </span></p>
                            <p><span>Provincia: </span></p>
                        </div>
                        <div>
                            <p><span>Ciudad: </span></p>
                            <p><span>Código Postal: </span></p>
                            <p><span>CUIT: </span></p>
                            <p><span>Condición Iva: </span></p>
                        </div>
                    </div>
                </div>
                <div className="content_data-client">
                    <h2>Datos Cliente</h2>
                    <p><span>Nombre: </span>{this.props.client.nombre}</p>
                    <p><span>Dirección: </span>{this.props.client.direccion}</p>
                    <p><span>CUIT: </span>{this.props.client.cuit}</p>
                </div>
                <div className="content_list-product">
                    <table className="list-product">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Uni.</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.products.map(product => 
                                <tr>
                                    <td>{product.product.nombre}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.product.precio}</td>
                                    <td>${(product.quantity) * (product.product.precio)}</td>
                                    <div onClick={ (e) => this.handleOnClickDeleteProduct(product.id, e)} className="btn-delete"><span className="icon-cross"></span></div>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <footer className="footer_invoice">
                    <p><span>Total = </span>$120</p>
                    <textarea name="observaciones" value={this.state.factura.pie.observaciones} onChange={this.handleChangeObservation} className="observations_invoice">Observaciones</textarea>
                </footer>
            </div>
        )
    }
}

export default Invoice;