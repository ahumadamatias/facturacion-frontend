import React, { Component } from 'react';
import InvoiceApi from '../../../Service/invoice-api';
import adder from '../../../Utils/adder';

import './invoice.css';

import Preloader from '../../../GlobalComponent/Preloader/preloader';

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
            loading: false,
        }
        this.handleOnClickDeleteProduct = this.handleOnClickDeleteProduct.bind(this);
        this.handleOnClickCreateInvoice = this.handleOnClickCreateInvoice.bind(this);
        this.handleChangeObservation = this.handleChangeObservation.bind(this);
        this.generateItems = this.generateItems.bind(this);
    }
    handleOnClickCreateInvoice(e){
        e.preventDefault();
        this.setState({loading: true})
        let factura = this.state.factura;
        factura.encabezado.cliente.id = this.props.client.id;
        factura.items = this.generateItems();
        this.setState({factura: factura});
        invoiceApi.createInvoice(this.state.factura)
            .then( () => {
                this.props.callbackRedirect(true);
            })
            .catch( e => {
                console.log(e);
            });
        }
    handleOnClickDeleteProduct(id, e){
        e.preventDefault();
        this.props.callbackDelete(id);
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
        if (this.state.loading) {
            return (
                <div>
                    <br/>
                    <br/>
                    <Preloader />
                </div>
            )
        }
        return(
            <div className="content_invoice">
                <div className="content_data-empresa">
                    <div className="title_data-empresa"><h2>Datos de la Empresa</h2></div>
                    <div className="data-empresa">
                        <div>
                            <p><span>Nombre: </span>{this.props.business.nombre}</p>
                            <p><span>Dirección: </span>{this.props.business.direccion}</p>
                            <p><span>Pais: </span>{this.props.business.pais}</p>
                            <p><span>Provincia: </span>{this.props.business.provincia}</p>
                        </div>
                        <div>
                            <p><span>Ciudad: </span>{this.props.business.ciudad}</p>
                            <p><span>Código Postal: </span>{this.props.business.codigo_postal}</p>
                            <p><span>CUIT: </span>{this.props.business.cuit}</p>
                            <p><span>Condición Iva: </span>{this.props.business.condicionIva}</p>
                        </div>
                    </div>
                </div>
                <div className="content_data-client">
                    <h2>Datos Cliente</h2>
                    <p><span>Nombre: </span>{this.props.client.nombre}</p>
                    <p><span>Dirección: </span>{this.props.client.direccion}</p>
                    <p><span>CUIT: </span>{this.props.client.cuit}</p>
                    <p><span>Condicion Iva: </span>{this.props.client.condicionIva}</p>
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
                    <p><span>Total = </span>{adder(this.props.products)}</p>
                    <textarea name="observaciones" value={this.state.factura.pie.observaciones} onChange={this.handleChangeObservation} className="observations_invoice" placeholder="Ingrese Observaciones" />
                </footer>
                <div className="invoice-foot-button">
                <button onClick={this.handleOnClickCreateInvoice} type="submit" className="btn-primary"><span className="icon-credit-card icon" />Facturar</button>
                </div>
            </div>
        )
    }
}

export default Invoice;