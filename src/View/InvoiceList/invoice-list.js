import React, { Component } from 'react';
import InvoiceApi from '../../Service/invoice-api';

import InvoiceListComponent from './Component/invoice-list-component';
import Preloader from '../../GlobalComponent/Preloader/preloader';

import './invoice-list.css';

const invoiceApi = new InvoiceApi();

class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            loading: true
        };
        this.updateListInvoice = this.updateListInvoice.bind(this);
    }
    componentDidMount(){
        invoiceApi.getInvoices()
            .then( res => {
                this.setState({invoices: res, loading: false});
            })
            .catch( e => {
                console.log(e);
            });
    }
    updateListInvoice(){
        this.setState({loading: true});
        invoiceApi.getInvoices()
            .then( res => {
                console.log(res)
                this.setState({invoices: res, loading: false});
            })
            .catch( e => {
                console.log(e);
            });
    }
    render() { 
        return (
            <div className="invoice-list">
                <h3>Facturas</h3>
                {
                    this.state.loading
                        ? <Preloader />
                        : this.state.invoices.map( invoice => 
                                <InvoiceListComponent invoice={invoice} callback={this.updateListInvoice} />
                            )
                }
            </div>
        );
    }
}
 
export default InvoiceList;