import React, { Component } from 'react';
import BusinessApi from '../../Service/business-api';

import './create-business.css';

const businessApi = new BusinessApi();

class CreateBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {
                nombre: "",
                direccion: "",
                provincia: "",
                pais: "",
                cuit: "",
                codigo_postal: "",
                ciudad: "",
                condicionIva: "RESPONSABLE_INSCRIPTO"
            }
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmitBusiness = this.handleSubmitBusiness.bind(this);
    }
    handleChangeInput(e){
        let empresa = this.state.empresa;
        empresa[e.target.name] = e.target.value;
        this.setState({empresa})
    }
    handleSubmitBusiness(e){
        e.preventDefault();
        businessApi.createBusiness(this.state.empresa)
            .then( () => {
                this.props.callback(true);
            })
            .catch( e => {
                console.log(e);
            })
    }
    render() { 
        return (
            <div className="create-business">
                <h3>Creacion de los datos de la Empresa</h3>
                <form onSubmit={this.handleSubmitBusiness}>
                    <input type="text" name="nombre" value={this.state.empresa.nombre} onChange={this.handleChangeInput} placeholder="Ingrese su Nombre" className="input_create-business input"/>
                    <input type="text" name="direccion" value={this.state.empresa.direccion} onChange={this.handleChangeInput} placeholder="Ingrese su Dirección" className="input_create-business input"/>
                    <input type="text" name="ciudad" value={this.state.empresa.ciudad} onChange={this.handleChangeInput} placeholder="Ingrese su Ciudad" className="input_create-business"/>
                    <input type="text" name="provincia" value={this.state.empresa.provincia} onChange={this.handleChangeInput} placeholder="Ingrese su Provincia" className="input_create-business"/>
                    <input type="text" name="pais" value={this.state.empresa.pais} onChange={this.handleChangeInput} placeholder="Ingrese su Pais" className="input_create-business"/>
                    <input type="text" name="codigo_postal" value={this.state.empresa.codigo_postal} onChange={this.handleChangeInput} placeholder="Ingrese Código Postal" className="input_create-business"/>
                    <input type="text" name="cuit" value={this.state.empresa.cuit} onChange={this.handleChangeInput} placeholder="Ingrese Cuit" className="input_create-business"/>
                    <select name="condicionIva" value={this.state.empresa.condicionIva} onChange={this.handleChangeInput} className="input_create-business">
                        <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                        <option value="MONOTRIBUTISTA">Monotributista</option>
                        <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                    </select>
                    <button type="submit" className="btn-primary"><span className="icon-office icon" />Crear</button>
                </form>
                <br/>
            </div>
        );
    }
}
 
export default CreateBusiness;