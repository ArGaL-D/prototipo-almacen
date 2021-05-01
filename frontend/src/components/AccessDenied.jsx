import React from 'react';
import "./styles/AccessDenied.css";

export default function AccessDenied() {

    return (
        <div className="access_denied ">            
            <span className="access_title">Acceso denegado</span>
            <span className="access_subtitle">Consulte con el administrador de la página.</span>
        </div>
    )
}
