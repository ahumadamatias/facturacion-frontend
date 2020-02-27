import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './product.css'

class ClientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeEdit: '/producto/editar/'+this.props.data.id,
        }
    }
    handleSubmit(e){
        e.preventDefault()
    }
    render() { 
        return (
            <div className="content_product" onSubmit={this.handleSubmit}>
                <div className="content_product-part1">
                    <div className="data"><p>{this.props.data.codigo}</p></div>
                    <div className="data"><p>{this.props.data.nombre}</p></div>
                    <div className="data"><p>{this.props.data.precio}</p></div>
                </div>
                <div className="content_product-part2">
                    <div className="data"><p>{this.props.data.descripcion}</p></div>
                </div>
                <div className="content_product-part3">
                    <div><Link to={this.state.routeEdit}><button className="btn">Editar</button></Link></div>
                    <div><Link to={this.state.routeDelete}><button className="btn">Borrar</button></Link></div>
                </div>
            </div>
        );
    }
}
 
export default ClientComponent;