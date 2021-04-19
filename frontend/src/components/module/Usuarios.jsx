import Cookies from 'js-cookie';
import React,{useEffect} from 'react';
import Rectangle from '../Rectangle';
import Datatable from "../Datatable";
import InputDark from "../field/InputDark";

import * as IoIcons from 'react-icons/io5';
import * as GoIcons from "react-icons/go";

import "./styles/Usuarios.css";
import PieChart from '../PieChart';

export default function Usuarios({setTitle}) {

    const columns = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso",
        "Editar","Eliminar"        
    ];

    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
        
    })




    return (
        <div className="module-usuarios">
            {/* CONTENEDOR 1 */}
            <div className="container_1">
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
                        title = "Crear usuario"
                        content = "Nuevo perfil"                    
                    />
                </div>
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
                        title = "Crear usuario"
                        content = "Nuevo perfil"                    
                    />
                </div>
            </div>
            {/* CONTENEDOR 2 */}
            <div className="container_2">
                {/* Parte 1 */} 
                <div className="donut">
                    <div className="border">
                        <PieChart />
                    </div>            
                </div>
                {/* Parte 2 */} 
                <div className="box_modules">
                    <div className="inpt_search">
                        <InputDark
                            icon = {<GoIcons.GoSearch/>}
                            placeholder = "Buscar"
                        />
                    </div>
                    <div className="table">
                        <Datatable
                            rows = {null}
                            columns = {columns}
                        /> 
                    </div>
                </div>
            </div>

        </div>
    )
}
