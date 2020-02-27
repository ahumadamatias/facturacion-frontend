import axios from 'axios';
const BASE = 'http://127.0.0.1:8080/api/';

class ProductApi {
    async getProducts(){
        const query = await axios.get(`${BASE}productos`);
        const data = query.data;
        return data;
    }
    async getProductById(id){
        const query = await axios.get(`${BASE}productos/${id}`);
        const data = query.data;
        return data;
    }
    async getProductByName(name){
        const query = await axios.get(`${BASE}productos/search?query=${name}`);
        const data = query.data;
        return data;
    }
    async createProduct(product){
        const productJson = JSON.stringify(product);
        const query = await axios.post(`${BASE}productos`, productJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
}

export default ProductApi;