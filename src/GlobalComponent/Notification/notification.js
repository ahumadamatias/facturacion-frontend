import React from 'react';

import './notification.css'

const Notification = (props) => {
    return(
        <div className="content_notification">
            <h1><span className="icon-user-plus" />Operacion Exitosa</h1>
            <p>{props.mensaje}</p> 
        </div>
    )
}

export default Notification;