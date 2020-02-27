import React, { Component } from 'react';
import ClientApi from '../../Service/client-api';
import ProductApi from '../../Service/product-api'

import './new-invoice.css'

import Invoice from './Component/invoice'
import ProductInvoice from './Component/product-invoice'

const clientApi = new ClientApi();
const productApi = new ProductApi();

class NewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsSearch: [],
            codigo: '',
            cuit: '',
            client: {},
            name: ''
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this);
    }
    componentDidMount(){
        clientApi.getClientById(this.props.match.params.id)
            .then( res => {
                this.setState({client: res})
            })
            .catch( e => {
                console.log(e)
            })
    }
    handleOnClickSearch(e){
        e.preventDefault()
        productApi.getProductByName(this.state.name)
            .then( res => {
                this.setState({productsSearch: res})
                console.log(res)
            })
            .catch( e => {
                console.log(e)
            })
    }
    handleChangeSearch(e){
        this.setState({name: e.target.value})
    }
    render() { 
        return ( 
            <div className="content_new-invoice">
                <form>
                    <div className="content_input-product">
                        <input type="text" name="codigo" placeholder="Ingrese Nombre del Producto" value={this.state.name} onChange={this.handleChangeSearch}/>
                        <button type="submit" onClick={this.handleOnClickSearch}>Buscar</button>
                    </div>
                </form>
                {this.state.productsSearch.map(product => 
                        <ProductInvoice data={product} />
                )}
                <Invoice client={this.state.client}/>
                <br/>
                <br/>
            </div>
         );
    }
}
 
export default NewInvoice;