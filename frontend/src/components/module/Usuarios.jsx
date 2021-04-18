import Cookies from 'js-cookie';
import React,{useEffect} from 'react';
import Rectangle from '../Rectangle';

import * as IoIcons from 'react-icons/io5';

import "./styles/Usuarios.css";
import PieChart from '../PieChart';

export default function Usuarios({setTitle}) {


    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
        
    })




    return (
        <div className="module-usuarios">
            {/* CONTENEDOR 1 */}
            <div className="container1-usuarios">
                <div className="rectangle">
                    <Rectangle
                        icon = {<IoIcons.IoPersonAdd />}
                        title = "Crear usuario"
                        content = "Nuevo perfil"                    
                    />
                </div>
                <div className="rectangle">
                    <Rectangle
                        icon = {<IoIcons.IoPersonAdd />}
                        title = "Usuarios"
                        content = "Total de usuarios"                    
                    />
                </div>
                <div className="rectangle">
                    <Rectangle
                        icon = {<IoIcons.IoPersonAdd />}
                        title = "Administrador"
                        content = "Datos del perfil"                    
                    />
                </div>
            </div>
            {/* CONTENEDOR 2 */}
            <div className="container2-usuarios">
                <div className="dona">
                    <PieChart />
                </div>
                <div className="info">
                    fskdpk
                </div>
            </div>            
        </div>
    )
}
