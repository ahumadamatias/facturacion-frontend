import React from 'react';
import { Link } from 'react-router-dom';

import '../../Asset/fonts/fonts/style.css'
import './menu.css'

function Menu(props){
    return(
        <div className="navbar">
            <nav className="menu">
                <Link className="item_menu" to="/"><span className="icon-plus" />Nueva Factura</Link>
                <Link className="item_menu" to="/"><span className="icon-barcode" />Producto</Link>
                <Link className="item_menu" to="/"><span className="icon-user" />Cliente</Link>
                <Link className="item_menu" to="/"><span className="icon-office" />Empresa</Link>
            </nav>
            {props.children}
        </div>
    )
}

export default Menu;