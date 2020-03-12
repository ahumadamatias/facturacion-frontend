import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductApi from '../../../Service/product-api'

import './product.css'

const productApi = new ProductApi()

class ClientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeEdit: '/producto/editar/'+this.props.data.id,
        }
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    }
    handleDeleteProduct(){
        productApi.deleteProduct(this.props.data.id)
            .then( res => {
                this.props.callback()
            })
            .catch( e => {
                console.log(e)
            });
    }
    handleSubmit(e){
        e.preventDefault()
    }
    render() { 
        return (
            <div className="content_product" onSubmit={this.handleSubmit}>
                <div className="content_product-part1">
                    <div><p>{this.props.data.codigo}</p></div>
                    <div><p>{this.props.data.nombre}</p></div>
                    <div><p>${this.props.data.precio}</p></div>
                </div>
                <div className="content_product-part2">
                    <div><p>{this.props.data.descripcion}</p></div>
                </div>
                <div className="content_product-part3">
                    <div><Link to={this.state.routeEdit}><button className="btn-secondary"><span className="icon-pencil icon" />Editar</button></Link></div>
                    <div><button onClick={this.handleDeleteProduct} className="btn-danger"><span className="icon-bin icon" />Borrar</button></div>
                </div>
            </div>
        );
    }
}
 
export default ClientComponent;