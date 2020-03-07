import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BusinessApi from '../../Service/business-api';

import '../CreateBusiness/create-business.css';
import './business.css';

const businessApi = new BusinessApi();

class Business extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {
                id: "",
                nombre: "",
                direccion: "",
                provincia: "",
                pais: "",
                cuit: "",
                codigo_postal: "",
                ciudad: "",
                condicionIva: "RESPONSABLE_INSCRIPTO"
            },
            redirect: false
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmitBusiness = this.handleSubmitBusiness.bind(this);
        this.handleDeleteBusiness = this.handleDeleteBusiness.bind(this);
        this.redirectRender = this.redirectRender.bind(this);
    }
    componentDidMount(){
        businessApi.getBusiness()
            .then( res => {
                this.setState({empresa: res})
            })
            .catch( e => {
                console.log(e);
            })
    }
    handleChangeInput(e){
        let empresa = this.state.empresa;
        empresa[e.target.name] = e.target.value;
        this.setState({empresa})
    }
    handleSubmitBusiness(e){
        e.preventDefault();
        businessApi.updateBusiness(this.state.empresa)
            .then( () => {
                this.setState({redirect: true});
            })
            .catch( e => {
                console.log(e);
            })
    }
    handleDeleteBusiness(e){
        e.preventDefault()
        businessApi.deleteBusiness(this.state.empresa.id)
            .then( () => {
                this.props.callback(false);
            })
            .catch( e => {
                console.log(e);
            })
    }
    redirectRender(){
        if (this.state.redirect) {
            return <Redirect to="/clientes" />
        }
    }
    render() { 
        return (
            <div className="create-business">
                {this.redirectRender()}
                <h3>Datos de la Empresa</h3>
                <form onSubmit={this.handleSubmitBusiness}>
                    <label for="nombre">Nombre o Razón Social</label>
                    <input id="nombre" type="text" name="nombre" value={this.state.empresa.nombre} onChange={this.handleChangeInput} placeholder="Ingrese su Nombre" className="input_create-business input"/>
                    <label for="nombre">Dirección</label>
                    <input type="text" name="direccion" value={this.state.empresa.direccion} onChange={this.handleChangeInput} placeholder="Ingrese su Dirección" className="input_create-business input"/>
                    <label for="nombre">Ciudad</label>
                    <input type="text" name="ciudad" value={this.state.empresa.ciudad} onChange={this.handleChangeInput} placeholder="Ingrese su Ciudad" className="input_create-business"/>
                    <label for="nombre">Provincia</label>
                    <input type="text" name="provincia" value={this.state.empresa.provincia} onChange={this.handleChangeInput} placeholder="Ingrese su Provincia" className="input_create-business"/>
                    <label for="nombre">País</label>
                    <input type="text" name="pais" value={this.state.empresa.pais} onChange={this.handleChangeInput} placeholder="Ingrese su Pais" className="input_create-business"/>
                    <label for="nombre">Código Postal</label>
                    <input type="text" name="codigo_postal" value={this.state.empresa.codigo_postal} onChange={this.handleChangeInput} placeholder="Ingrese Código Postal" className="input_create-business"/>
                    <label for="nombre">Cuit</label>
                    <input type="text" name="cuit" value={this.state.empresa.cuit} onChange={this.handleChangeInput} placeholder="Ingrese Cuit" className="input_create-business"/>
                    <label for="nombre">Condición Iva</label>
                    <select name="condicionIva" value={this.state.empresa.condicionIva} onChange={this.handleChangeInput} className="input_create-business">
                        <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                        <option value="MONOTRIBUTISTA">Monotributista</option>
                        <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                    </select>
                    <div className="content_button">
                        <button type="submit" className="btn-primary">Actualizar</button>
                        <button onClick={this.handleDeleteBusiness} type="submit" className="btn-danger">Borrar</button>
                    </div>
                </form>
                <br/>
            </div>
        );
    }
}
 
export default Business;