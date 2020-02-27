import React, { Component } from 'react';
import ClientApi from '../../Service/client-api';

import './client.css';

import ClientComponent from './Component/client-component';

const clientApi = new ClientApi();

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {
                "nombre": "",
                "cuit": "",
                "direccion": "",
                "condicionIva": "RESPONSABLE_INSCRIPTO"
            },
            clients: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        clientApi.getClients()
            .then( res => {
                this.setState({clients: res})
            })
            .catch( e => {
                console.log(e)
            });
    }
    componentDidUpdate() {
        clientApi.getClients()
            .then( res => {
                this.setState({clients: res})
            })
            .catch( e => {
                console.log(e)
            });
    }
    handleChange(e){
        let client = this.state.client;
        client[e.target.name] = e.target.value;
        this.setState({client: client});
    }
    handleSubmit(e){
        e.preventDefault();
        clientApi.createClient(this.state.client)
            .then( res => {
                console.log(res)
            })
            .catch( e => {
                console.log(e)
            });
    }
    render() { 
        return ( 
            <div className="client">
                <form onSubmit={this.handleSubmit}>
                    <h3>Crear Nuevo Cliente</h3>
                    <div>
                        <input type="text" name="nombre" value={this.state.client.nombre} onChange={this.handleChange} placeholder="Ingrese su Nombre y Apellido" className="input"/>
                        <input type="text" name="direccion" value={this.state.client.direccion} onChange={this.handleChange} placeholder="Ingrese su domicilio" className="input"/>
                        <input type="text" name="cuit" value={this.state.client.cuit} onChange={this.handleChange} placeholder="Ingrese su CUIT" className="input"/>
                        <select name="condicionIva" value={this.state.client.condicionIva} onChange={this.handleChange} className="input">
                            <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                            <option value="MONOTRIBUTISTA">Monotributista</option>
                            <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                        </select>
                        <button type="submit" className="btn">Crear</button>
                    </div>
                </form>
                <div className="content_clients">
                    <h3>Clientes</h3>
                    <form>
                        <input type="text" placeholder="Buscar Cliente | Ingrese Nombre" className="input"/>
                    </form>
                    {this.state.clients.map(client => 
                        <ClientComponent data={client} />
                    )}
                </div>
            </div>
        )
    }
}
 
export default Client;