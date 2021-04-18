import Cookies from 'js-cookie';
import React,{useEffect} from 'react';
import Rectangle from '../Rectangle';

import * as IoIcons from 'react-icons/io5';

import "./styles/Usuarios.css";

export default function Usuarios({setTitle}) {

    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
    })

    return (
        <div className="module-usuarios">
            <div className="container1-usuarios">
                <div className="rectangle">
                    <Rectangle
                        icon = {<IoIcons.IoPersonAdd />}
                        title = "Crear usuario"
                        content = "Nuevo perfil"                    
                    />
                </div>
            </div>
            <div className="container2-usuarios">
                
            </div>            
        </div>
    )
}
