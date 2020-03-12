import React from 'react';
import { Link } from 'react-router-dom';

import './menu.css'

function Menu(props){
    return(
        <div className="navbar">
            <nav className="menu">
                <Link className="item_menu" to="/productos"><span className="icon-barcode" />Productos</Link>
                <Link className="item_menu" to="/clientes"><span className="icon-user" />Clientes</Link>
                <Link className="item_menu" to="/facturas"><span className="icon-profile" />Facturas</Link>
                <Link className="item_menu" to="/empresa"><span className="icon-office" />Empresa</Link>
            </nav>
        </div>
    )
}

export default Menu;