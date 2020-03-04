import React, { Component } from 'react';
import ProductApi from '../../Service/product-api';

import './edit-product.css';

const productApi = new ProductApi();

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                id: this.props.data.match.params.id,
                codigo: "",
                nombre: "",
                descripcion: "",
                precio: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }
    componentDidMount(){
        productApi.getProductById(this.state.product.id)
            .then( res => {
                this.setState({product: res})
            })
    }
    handleChange(e){
        let product = this.state.product;
        product[e.target.name] = e.target.value;
        this.setState({product})
    }
    handleUpdateProduct(e){
        e.preventDefault();
        productApi.updateProduct(this.state.product)
            .then( () => {
                this.props.callback(true)
            })
            .catch( e => {
                console.log(e);
            })
    }
    render() { 
        return (
            <div className="edit-product">
                <br/>
                <br/>
                <form>
                    <h3>Actualizar Producto</h3>
                    <div className="content_input-textarea-button">
                        <input type="text" name="codigo" value={this.state.product.codigo} onChange={this.handleChange} placeholder="Ingrese Codigo del Producto" className="input"/>
                        <input type="text" name="nombre" value={this.state.product.nombre} onChange={this.handleChange} placeholder="Ingrese Nombre Producto" className="input"/>
                        <input type="text" name="precio" value={this.state.product.precio} onChange={this.handleChange} placeholder="Ingrese Precio del Producto" className="input"/>
                        <textarea  name="descripcion" value={this.state.product.descripcion} onChange={this.handleChange} className="input">Escriba descripcion</textarea>
                        <button onClick={this.handleUpdateProduct} type="submit" className="btn">Actualizar</button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default EditProduct;