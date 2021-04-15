import Cookies from 'js-cookie';
import React,{useEffect} from 'react';

export default function Usuarios({setTitle}) {

    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
    })

    return (
        <div>
            USUARIO
        </div>
    )
}
