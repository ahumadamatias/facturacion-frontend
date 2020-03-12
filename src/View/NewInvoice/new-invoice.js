import React, { Component } from 'react';
import ClientApi from '../../Service/client-api';
import ProductApi from '../../Service/product-api'
import BusinessApi from '../../Service/business-api';

import './new-invoice.css'

import Invoice from './Component/invoice'
import ProductInvoice from './Component/product-invoice'
import Preloader from '../../GlobalComponent/Preloader/preloader';

const clientApi = new ClientApi();
const productApi = new ProductApi();
const businessApi = new BusinessApi()

class NewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsSearch: [],
            productList: [],
            business: {},
            client: '',
            name: '',
            loading: true,
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this);
        this.addProductToAList = this.addProductToAList.bind(this);
        this.deleteProductToAList = this.deleteProductToAList.bind(this);
    }
    componentDidMount(){
        clientApi.getClientById(this.props.data.match.params.id)
            .then( res => {
                this.setState({client: res, loading: false})
            })
            .catch( e => {
                console.log(e)
            })
        businessApi.getBusiness()
            .then( res => {
                this.setState({business: res})
            })
    }
    handleOnClickSearch(e){
        e.preventDefault()
        this.setState({loading: true})
        productApi.getProductByName(this.state.name)
            .then( res => {
                if (this.state.name !== "") {
                    this.setState({productsSearch: res, loading: false})
                } else if (this.state.name === "") {
                    this.setState({productsSearch: [], loading: false})
                } 
            })
            .catch( e => {
                console.log(e)
            })
    }
    handleChangeSearch(e){
        this.setState({name: e.target.value})
    }
    addProductToAList(product, quantity){
        let productAndQuantity = {
            product: product,
            quantity: quantity
        }
        this.state.productList.push(productAndQuantity);
        this.setState({productList: this.state.productList});
    }
    deleteProductToAList(id){
        for (let i = 0; i < this.state.productList.length; i++) {
            if (this.state.productList[i].id === id) {
                this.state.productList.splice(i, 1);
                this.setState({productList: this.state.productList});
            };
        };
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
            <div className="content_new-invoice">
                <form>
                    <div className="content_input-product">
                        <input type="text" name="codigo" placeholder="Ingrese Nombre del Producto" value={this.state.name} onChange={this.handleChangeSearch}/>
                        <button type="submit" onClick={this.handleOnClickSearch} className="btn-primary"><span className="icon-search icon" />Buscar</button>
                    </div>
                </form>
                {
                    this.state.loading
                        ? <Preloader />
                        : this.state.productsSearch.map(product => 
                                <ProductInvoice data={product} callback={this.addProductToAList} />
                            )
                }
                <Invoice client={this.state.client} products={this.state.productList} callbackDelete={this.deleteProductToAList} business={this.state.business} callbackRedirect={this.props.callback} />
                <br/>
                <br/>
            </div>
         );
    }
}
 
export default NewInvoice;