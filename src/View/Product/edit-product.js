import React, { Component } from 'react';
import ProductApi from '../../Service/product-api';

import './edit-product.css';

import Preloader from '../../GlobalComponent/Preloader/preloader';

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
            },
            loading: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }
    componentDidMount(){
        productApi.getProductById(this.state.product.id)
            .then( res => {
                this.setState({product: res, loading: false})
            })
    }
    handleChange(e){
        let product = this.state.product;
        product[e.target.name] = e.target.value;
        this.setState({product})
    }
    handleUpdateProduct(e){
        e.preventDefault();
        this.setState({loading: true})
        productApi.updateProduct(this.state.product)
            .then( () => {
                this.props.callback(true)
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
            <div className="edit-product">
                <br/>
                <br/>
                <form>
                    <h3>Actualizar Producto</h3>
                    <div className="content_input-textarea-button">
                        <label for="codigo">Código</label>
                        <input type="text" name="codigo" value={this.state.product.codigo} onChange={this.handleChange} placeholder="Ingrese Codigo del Producto" className="input"/>
                        <label for="nombre">Nombre Producto</label>
                        <input type="text" name="nombre" value={this.state.product.nombre} onChange={this.handleChange} placeholder="Ingrese Nombre Producto" className="input"/>
                        <label for="precio">Precio</label>
                        <input type="text" name="precio" value={this.state.product.precio} onChange={this.handleChange} placeholder="Ingrese Precio del Producto" className="input"/>
                        <label for="descripcion">Descripción</label>
                        <textarea  name="descripcion" value={this.state.product.descripcion} onChange={this.handleChange} className="input">Escriba descripcion</textarea>
                        <button onClick={this.handleUpdateProduct} type="submit" className="btn-primary"><span className="icon-box-remove icon" />Actualizar</button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default EditProduct;