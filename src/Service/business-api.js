import axios from 'axios';
const BASE = 'http://127.0.0.1:8080/api/';

class BusinessApi {
    async getBusiness(){
        const query = await axios.get(`${BASE}empresa`);
        const data = query.data;
        return data;
    }
    async getBusinessById(id){
        const query = await axios.get(`${BASE}empresa/${id}`);
        const data = query.data;
        return data;
    }
    async createBusiness(business){
        const businessJson = JSON.stringify(business);
        const query = await axios.post(`${BASE}empresa`, businessJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
    async updateBusiness(business){
        const businessJson = JSON.stringify(business);
        const query = await axios.put(`${BASE}empresa`, businessJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
    async deleteBusiness(id){
        const query = await axios.delete(`${BASE}empresa/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = query.data;
        return data;
    }
}

export default BusinessApi;