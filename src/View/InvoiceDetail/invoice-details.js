import React, { Component } from 'react';
import InvoiceApi from '../../Service/invoice-api';
import BusinessApi from '../../Service/business-api';
import cutString from '../../Utils/cut-string';

import './invoice-details.css'

import Preloader from '../../GlobalComponent/Preloader/preloader';

const invoiceApi = new InvoiceApi();
const businessApi = new BusinessApi()


class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: {
                encabezado: {
                    cliente: {}
                },
                items: [],
                pie: {}
            },
            business: {},
            loading: true
        }
        this.loaderBusiness = this.loaderBusiness.bind(this);
    }
    componentDidMount(){
        invoiceApi.getInvoiceById(this.props.data.match.params.id)
        .then( res => {
            this.setState({invoice: res, loading: false});
            this.loaderBusiness();
        })
        .catch( e => {
            console.log(e);
        })
    }
    loaderBusiness(){
        businessApi.getBusiness()
        .then( res => {
            this.setState({business: res, loading: false});
        })
        .catch( e => {
            console.log(e);
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <div>
                    <br/>
                    <br/>
                    <Preloader />
                </div>
            )
        } 
        return (
            <div className="content_invoice">
                <div className="content_data-empresa">
                    <div className="title_data-empresa"><h2>Datos de la Empresa</h2></div>
                    <div className="data-empresa">
                        <div>
                            <p><span>Nombre: </span>{this.state.business.nombre}</p>
                            <p><span>Dirección: </span>{this.state.business.direccion}</p>
                            <p><span>Pais: </span>{this.state.business.pais}</p>
                            <p><span>Provincia: </span>{this.state.business.provincia}</p>
                        </div>
                        <div>
                            <p className="type-invoice"> {this.state.invoice.encabezado.letra}</p>
                        </div>
                        <div>
                            <p><span>Ciudad: </span>{this.state.business.ciudad}</p>
                            <p><span>Código Postal: </span>{this.state.business.codigo_postal}</p>
                            <p><span>CUIT: </span>{this.state.business.cuit}</p>
                            <p><span>Condición Iva: </span>{this.state.business.condicionIva}</p>
                        </div>
                    </div>
                </div>
                <div className="content_data-client">
                    <h2>Datos Cliente</h2>
                    <p><span>Fecha factura: </span>{cutString(this.state.invoice.encabezado.fecha, "T")}</p>
                    <p><span>Nombre: </span>{this.state.invoice.encabezado.cliente.nombre}</p>
                    <p><span>Dirección: </span>{this.state.invoice.encabezado.cliente.direccion}</p>
                    <p><span>CUIT: </span>{this.state.invoice.encabezado.cliente.cuit}</p>
                    <p><span>Condicion Iva: </span>{this.state.invoice.encabezado.cliente.condicionIva}</p>
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
                            {this.state.invoice.items.map(item => 
                                    <tr>
                                        <td>{item.producto.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${item.producto.precio}</td>
                                        <td>${item.subTotal}</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                <footer className="footer_invoice">
                    <p><span>Total = </span>${this.state.invoice.pie.precioTotal}</p>
                    <p className="observations_invoice-detail">{this.state.invoice.pie.observaciones}</p>
                </footer>
            </div>
        );
    }
}
 
export default InvoiceDetails;

/*{this.props.products.map(product => 
                                <tr>
                                    <td>{product.product.nombre}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.product.precio}</td>
                                    <td>${(product.quantity) * (product.product.precio)}</td>
                                    <div onClick={ (e) => this.handleOnClickDeleteProduct(product.id, e)} className="btn-delete"><span className="icon-cross"></span></div>
                                </tr>
                            )} */