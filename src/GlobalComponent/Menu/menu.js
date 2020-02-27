import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import '../../Asset/fonts/fonts/style.css'
import './menu.css'

function Menu(props){
    return(
        <div className="navbar">
            <nav className="menu">
                <Link className="item_menu" to="/productos"><span className="icon-barcode" />Productos</Link>
                <Link className="item_menu" to="/clientes"><span className="icon-user" />Clientes</Link>
                <Link className="item_menu" to="/"><span className="icon-office" />Empresa</Link>
            </nav>
        </div>
    )
}

export default Menu;