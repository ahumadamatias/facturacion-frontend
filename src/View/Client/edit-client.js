import React, { Component } from 'react';
import ClientApi from '../../Service/client-api';

import './edit-client.css';

import Preloader from '../../GlobalComponent/Preloader/preloader';

const clientApi = new ClientApi();

class EditClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {
                id: this.props.data.match.params.id,
                nombre: "",
                direccion: "",
                cuit: "",
                condicionIva: ""
            },
            loading: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        clientApi.getClientById(this.state.client.id)
            .then( res => {
                this.setState({client: res, loading: false});
            })
            .catch( e => {
                console.log(e);
            })
    }
    handleChange(e){
        let client = this.state.client;
        client[e.target.name] = e.target.value;
        this.setState({client});
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({loading: true})
        clientApi.updateClient(this.state.client)
            .then( () => {
                this.props.callback(true);
            })
            .catch( e => {
                console.log(e);
            })
    }
    render() {
        if (this.state.loading) {
            return (
                <div>
                    <br/>
                    <br/>
                    <Preloader />
                </div>
            )
        } 
        return (
            <div className="edit-client">
                <br/><br/>
                <h3>Actualizar Cliente</h3>
                <form onSubmit={this.handleSubmit}>
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" value={this.state.client.nombre} onChange={this.handleChange} placeholder="Ingrese su Nombre y Apellido" className="input"/>
                    <label for="direccion">Dirección</label>
                    <input type="text" name="direccion" value={this.state.client.direccion} onChange={this.handleChange} placeholder="Ingrese su domicilio" className="input"/>
                    <label for="cuit">Cuit</label>
                    <input type="text" name="cuit" value={this.state.client.cuit} onChange={this.handleChange} placeholder="Ingrese su CUIT" className="input"/>
                    <label for="condicionIva">Condicion Iva</label>
                    <select name="condicionIva" value={this.state.client.condicionIva} onChange={this.handleChange} className="input">
                        <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                        <option value="MONOTRIBUTISTA">Monotributista</option>
                        <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                    </select>
                    <button type="submit" className="btn-primary"><span className="icon-box-remove icon" />Actualizar</button>
                </form>
            </div>
        );
    }
}
 
export default EditClient;