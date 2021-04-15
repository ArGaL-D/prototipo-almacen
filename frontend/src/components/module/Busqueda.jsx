import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import InputDark from "../field/InputDark";
import Datatable from "../Datatable";

import * as GoIcons from "react-icons/go";

import "./styles/Busqueda.css";

function Buscar({setTitle}) {

    //Columnas - tabla buscar
    const columnasBuscar = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso","Qr",
        "Editar","Eliminar"        
    ];

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Búsqueda');
        sessionStorage.setItem('page','buscar');
    })

    return (
        <div className="module_buscar">

            
                <div className="input">
                    <InputDark
                        icon = {<GoIcons.GoSearch/>}
                        placeholder = "Palabra clave"
                    />
                </div>
                <div className="table">
                    <Datatable 
                        rows = {null}
                        columns={columnasBuscar}
                    />
                </div>
            

        </div>
    )
}

export default withRouter(Buscar);
