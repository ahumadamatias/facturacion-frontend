import React, { Component } from 'react';

import './invoice.css'

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidad: "",
        }
        this.handleOnClickDeleteProduct = this.handleOnClickDeleteProduct.bind(this);
    }
    handleOnClickDeleteProduct(id, e){
        e.preventDefault();
        this.props.callback(id)
    }
    render(){
        return(
            <div className="content_invoice">
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
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Uni.</th>
                            <th>SubTotal</th>
                        </tr>
                        {this.props.products.map(product => 
                            <tr>
                                <td>{product.nombre}</td>
                                <td>4</td>
                                <td>${product.precio}</td>
                                <td>$8</td>
                                <div onClick={ (e) => this.handleOnClickDeleteProduct(product.id, e)} className="btn-delete"><span className="icon-cross"></span></div>
                            </tr>)}
                    </table>
                </div>
                <footer className="footer_invoice">
                    <p><span>Total = </span>$120</p>
                    <textarea name="observaciones" className="observations_invoice">Observaciones</textarea>
                </footer>
            </div>
        )
    }
}

export default Invoice;

/*{props.products ? undefined : props.products.map(product => 
    <tr>
        <td>{product.producto}</td>
        <td>4</td>
        <td>{product.precio}</td>
        <td>$8</td>
        <div className="btn-delete"><span className="icon-cross"></span></div>
    </tr>
)}*/