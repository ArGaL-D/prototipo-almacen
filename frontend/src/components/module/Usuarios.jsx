import Cookies from 'js-cookie';
import React,{useEffect} from 'react';

import "./styles/Usuarios.css";

export default function Usuarios({setTitle}) {

    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
    })

    return (
        <div className="module-usuarios">
            USUARIO
        </div>
    )
}
