import React, { Component } from 'react';
import InvoiceApi from '../../Service/invoice-api';

import InvoiceListComponent from './Component/invoice-list-component';

import './invoice-list.css';

const invoiceApi = new InvoiceApi();

class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        }
    }
    componentDidMount(){
        invoiceApi.getInvoices()
            .then( res => {
                this.setState({invoices: res});
            })
            .catch( e => {
                console.log(e);
            });
    }
    render() { 
        return (
            <div className="invoice-list">
                <h3>Facturas</h3>
                {this.state.invoices.map( invoice => 
                    <InvoiceListComponent invoice={invoice}/>
                )}
            </div>
        );
    }
}
 
export default InvoiceList;