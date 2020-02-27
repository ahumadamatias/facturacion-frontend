import React, {Component} from 'react';
import ProductApi from '../../Service/product-api'

import './products.css'

import Product from './Component/product'

const productApi = new ProductApi()

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                "codigo": "",
                "nombre": "",
                "descripcion": "",
                "precio": ""
            },
            products: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        productApi.getProducts()
            .then( res => {
                this.setState({products: res})
            })
            .catch( e => {
                console.log(e)
            });
    }
    componentDidUpdate() {
        productApi.getProducts()
            .then( res => {
                this.setState({products: res})
            })
            .catch( e => {
                console.log(e)
            });
    }
    handleChange(e){
        let product = this.state.product;
        product[e.target.name] = e.target.value;
        this.setState({product: product});
    }
    handleSubmit(e){
        e.preventDefault();
        productApi.createProduct(this.state.product)
            .then( res => {
                console.log(res)
            })
            .catch( e => {
                console.log(e)
            });
    }
    render() { 
        return ( 
            <div className="products">
                <form onSubmit={this.handleSubmit}>
                    <h3>Crear Nuevo Producto</h3>
                    <div className="content_input-textarea-button">
                        <div className="content_input">
                            <input type="text" name="codigo" value={this.state.product.codigo} onChange={this.handleChange} placeholder="Ingrese Codigo del Producto" className="input"/>
                            <input type="text" name="nombre" value={this.state.product.nombre} onChange={this.handleChange} placeholder="Ingrese Nombre Producto" className="input"/>
                            <input type="text" name="precio" value={this.state.product.precio} onChange={this.handleChange} placeholder="Ingrese Precio del Producto" className="input"/>
                        </div>
                        <div className="content_textarea">
                            <textarea  name="descripcion" value={this.state.product.descripcion} onChange={this.handleChange} className="input">Escriba descripcion</textarea>
                        </div>
                        <button type="submit" className="btn">Crear</button>
                    </div>
                </form>
                <div className="content_clients">
                    <h3>Productos</h3>
                    <form>
                        <input type="text" placeholder="Buscar Producto | Ingrese Nombre" className="input"/>
                    </form>
                    {this.state.products.map(product => 
                        <Product data={product} />
                    )}
                </div>
            </div>
        );
    }
}
 
export default Products;

/*
                    {this.state.products.map(product => 
                        <tr>
                            <td>{product.codigo}</td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>${product.precio}</td>
                        </tr>
                    )}*/