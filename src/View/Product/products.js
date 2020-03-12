import React, {Component} from 'react';
import ProductApi from '../../Service/product-api';

import './products.css';

import Product from './Component/product';
import Notification from '../../GlobalComponent/Notification/notification';
import Preloader from '../../GlobalComponent/Preloader/preloader';

const productApi = new ProductApi();

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
            notification: false,
            loading: true,
        };
        this.updateListProducts = this.updateListProducts.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSearchProduct = this.handleSearchProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnClickCreateProduct = this.handleOnClickCreateProduct.bind(this);
        this.restartInput = this.restartInput.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }
    componentDidMount(){
        productApi.getProducts()
            .then( res => {
                this.setState({loading: false, products: res})
            })
            .catch( e => {
                console.log(e)
            });
        this.props.callback(false);
    }
    updateListProducts(){
        this.setState({loading: true})
        productApi.getProducts()
                .then( res => {
                    this.setState({products: res, loading: false})
                })
                .catch( e => {
                    console.log(e)
                });
    }
    restartInput(){
        const product= {
            codigo: "",
            nombre: "",
            descripcion: "",
            precio: ""
        };
        this.setState({product})
    }
    handleChangeSearch(e){
        this.setState({name: e.target.value})
    }
    handleSearchProduct(e){
        e.preventDefault()
        this.setState({loading: true})
        productApi.getProductByName(this.state.name)
            .then( res => {
                this.setState({products: res, loading: false})
            })
            .catch( e => {
                console.log(e)
            })
    }
    handleChange(e){
        let product = this.state.product;
        product[e.target.name] = e.target.value;
        this.setState({product: product});
    }
    handleOnClickCreateProduct(e){
        e.preventDefault();
        productApi.createProduct(this.state.product)
            .then( () => {
                this.setState({notification: true})
                this.updateListProducts()
            })
            .catch( e => {
                console.log(e)
            });
        this.restartInput();
    }
    showNotification(){
        setTimeout( () => {
            this.setState({notification:false})
        }, 5000)
    }
    render() { 
        return ( 
            <div className="products">
                <form onSubmit={this.handleOnClickCreateProduct}>
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
                        <button type="submit" onClick={this.showNotification} className="btn-primary"><span className="icon-box-remove icon"/>Crear</button>
                    </div>
                </form>
                <div className="container_notification">
                    {this.state.notification
                        ? <Notification mensaje="Producto agregado correctamente" />
                        : null     
                    }
                </div>
                <div className="content_products">
                    <h3>Productos</h3>
                    <form>
                        <input type="text" value={this.state.name} onChange={this.handleChangeSearch} placeholder="Ingrese Nombre" className="input"/>
                        <button onClick={this.handleSearchProduct} className="btn-primary"><span className="icon-search icon" />Buscar</button>
                    </form>
                    {this.state.loading
                        ? <Preloader />
                        : this.state.products.map(product => 
                            <Product data={product} callback={this.updateListProducts} />
                        )
                    }
                </div>
            </div>
        );
    }
}
 
export default Products;