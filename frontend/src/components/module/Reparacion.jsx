import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';

import "./styles/Reparacion.css";

export default function Reparacion({setTitle}) {
    
    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Reparación');
        sessionStorage.setItem('page','reparacion');
    })

    return (
        <div className="module-reparacion">
            
            <div className="container1">
                <Link to = "/page/reparacion/hilo">

                </Link>
                <Link to = "/page/reparacion/seguimiento">
                    
                </Link>
            </div>

            <div className="container2">
                
            </div>
        </div>
    )
}
