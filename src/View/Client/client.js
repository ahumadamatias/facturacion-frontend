import React, { Component } from 'react';
import ClientApi from '../../Service/client-api';

import './client.css';

import ClientComponent from './Component/client-component';
import Notification from '../../GlobalComponent/Notification/notification';
import Preloader from '../../GlobalComponent/Preloader/preloader';

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
            clients: [],
            name: "",
            notification: false,
            loading: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSearchClient = this.handleSearchClient.bind(this);
        this.updateListClient = this.updateListClient.bind(this);
        this.restartInput = this.restartInput.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }
    componentDidMount(){
        clientApi.getClients()
            .then( res => {
                this.setState({clients: res, loading: false})
            })
            .catch( e => {
                console.log(e)
            });
        this.props.callback(false);
    }
    updateListClient(){
        this.setState({loading: true})
        clientApi.getClients()
                .then( res => {
                    this.setState({clients: res, loading: false})
                })
                .catch( e => {
                    console.log(e)
                });
    }
    restartInput(){
        const client= {
            nombre: "",
            cuit: "",
            direccion: "",
            condicionIva: "RESPONSABLE_INSCRIPTO"
        };
        this.setState({client})
    }
    handleChangeSearch(e){
        this.setState({name: e.target.value})
    }
    handleSearchClient(e){
        e.preventDefault()
        this.setState({loading: true})
        clientApi.getClientByName(this.state.name)
            .then( res => {
                this.setState({clients: res, loading: false})
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
            .then( () => {
                this.setState({notification: true})
                this.updateListClient();
            })
            .catch( e => {
                console.log(e);
            });
        this.restartInput();
        }
    showNotification(){
        setTimeout( () => {
            this.setState({notification:false})
    }, 5000)
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
                        <button type="submit" onClick={this.showNotification} className="btn-primary"><span className="icon-user-plus icon" />Crear</button>
                    </div>
                </form>
                <div className="container_notification">
                    {this.state.notification
                        ? <Notification mensaje="Cliente agregado correctamente" />
                        : null     
                    }
                </div>
                <div className="content_clients">
                    <h3>Clientes</h3>
                    <form>
                    <input type="text" value={this.state.name} onChange={this.handleChangeSearch} placeholder="Ingrese Nombre" className="input"/>
                        <button onClick={this.handleSearchClient} className="btn-primary"><span className="icon-search icon" />Buscar</button>
                    </form>
                    {
                        this.state.loading
                            ? <Preloader />
                            : this.state.clients.map(client => 
                                <ClientComponent data={client} callback={this.updateListClient} />
                            )
                    }
                </div>
            </div>
        )
    }
}
 
export default Client;