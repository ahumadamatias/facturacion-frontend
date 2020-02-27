import React, { Component } from 'react';
import ClientApi from '../../Service/client-api';

import './new-invoice.css'

import Invoice from './Component/invoice'

const clientApi = new ClientApi();

class NewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            codigo: '',
            cuit: '',
            client: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleChange(e){
        console.log(e.target.value)
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render() { 
        return ( 
            <div className="content_new-invoice">
                <form onSubmit={this.handleSubmit}>
                    <div className="content_input-product">
                        <input type="text" name="codigo" placeholder="Ingrese código del Producto" value={this.state.codigo} onChange={this.handleChange}/>
                        <input type="text" placeholder="Ingrese Cantidad"/>
                        <button type="submit">Agregar</button>
                    </div>
                </form>
                <Invoice client={this.state.client}/>
                <br/>
                <br/>
            </div>
         );
    }
}
 
export default NewInvoice;