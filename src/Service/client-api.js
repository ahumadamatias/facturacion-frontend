import axios from 'axios';
const BASE = 'http://127.0.0.1:8080/api/';

class ClientApi {
    async getClients(){
        const query = await axios.get(`${BASE}clientes`);
        const data = query.data;
        return data;
    }
    async getClientById(id){
        const query = await axios.get(`${BASE}clientes/${id}`);
        const data = query.data;
        return data;
    }
    async getClientByName(name){
        const query = await axios.get(`${BASE}clientes/search?query=${name}`);
        const data = query.data;
        return data;
    }
    async createClient(client){
        const clientJson = JSON.stringify(client);
        const query = await axios.post(`${BASE}clientes`, clientJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
    async updateClient(client){
        const clientJson = JSON.stringify(client);
        const query = await axios.put(`${BASE}clientes`, clientJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
    async deleteClient(id){
        const query = await axios.put(`${BASE}clientes/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
}

export default ClientApi;