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
            products: [],
            name: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOnClickCreateClient = this.handleOnClickCreateClient.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.handleSearchProduct = this.handleSearchProduct.bind(this)
        this.updateListProducts = this.updateListProducts.bind(this)
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
    handleChangeSearch(e){
        this.setState({name: e.target.value})
    }
    handleSearchProduct(e){
        e.preventDefault()
        productApi.getProductByName(this.state.name)
            .then( res => {
                this.setState({products: res})
                console.log(res)
            })
            .catch( e => {
                console.log(e)
            })
    }
    updateListProducts(){
        console.log("Entrando a la funcion")
        setTimeout( () => {
            productApi.getProducts()
                .then( res => {
                    this.setState({products: res})
                    console.log("metodo")
                })
                .catch( e => {
                    console.log(e)
                });
        }, 300)
    }
    handleChange(e){
        let product = this.state.product;
        product[e.target.name] = e.target.value;
        this.setState({product: product});
    }
    handleOnClickCreateClient(e){
        e.preventDefault();
        productApi.createProduct(this.state.product)
            .then( res => {
                console.log(res)
            })
            .catch( e => {
                console.log(e)
            });
        setTimeout( () =>{
            productApi.getProducts()
                .then( res => {
                    this.setState({products: res})
                })
                .catch( e => {
                    console.log(e)
                });
        }, 300)
    }
    render() { 
        return ( 
            <div className="products">
                <form>
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
                        <button onClick={this.handleOnClickCreateClient} type="submit" className="btn">Crear</button>
                    </div>
                </form>
                <div className="content_products">
                    <h3>Productos</h3>
                    <form>
                        <input type="text" value={this.state.name} onChange={this.handleChangeSearch} placeholder="Ingrese Nombre" className="input"/>
                        <button onClick={this.handleSearchProduct} className="btn">Buscar</button>
                    </form>
                    {this.state.products.map(product => 
                        <Product data={product} callback={this.updateListProducts} />
                    )}
                </div>
            </div>
        );
    }
}
 
export default Products;