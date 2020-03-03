import axios from 'axios';
const BASE = 'http://127.0.0.1:8080/api/';

class InvoiceApi {
    async getInvoices(){
        const query = await axios.get(`${BASE}facturas`);
        const data = query.data;
        return data;
    }
    async getInvoiceById(id){
        const query = await axios.get(`${BASE}facturas/${id}`);
        const data = query.data;
        return data;
    }
    async getInvoiceByIdClient(id){
        const query = await axios.get(`${BASE}facturas/cliente/${id}`);
        const data = query.data;
        return data;
    }
    async createInvoice(invoice){
        const invoiceJson = JSON.stringify(invoice);
        const query = await axios.post(`${BASE}facturas`, invoiceJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
    async deleteInvoice(id){
        const query = await axios.delete(`${BASE}facturas/${id}`);
        const data = query.data;
        return data;
    }
}

export default InvoiceApi;