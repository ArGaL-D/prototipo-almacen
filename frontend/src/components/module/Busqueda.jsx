import {useEffect, useState} from 'react';
import axios from "axios";
import {withRouter} from 'react-router-dom'
import InputDark from "../field/InputDark";
import Datatable from "../Datatable";

import * as GoIcons from "react-icons/go";

import "./styles/Busqueda.css";

function Buscar({setTitle}) {

    //Filas -
    const [rows,setRows] = useState([]);
    //Columnas - tabla buscar
    const columnasBuscar = [
        "#","Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso","Qr"        
    ];

    // Establecer título actual - navbar
    useEffect(() => {
        setTitle('Búsqueda');
        sessionStorage.setItem('page','buscar');
    })

    // Traer datos(filas) del servidor
    useEffect(() => {
        axios.get('http://localhost:3001/buscar')
             .then(resp => {
                 setRows(resp.data);
             })
             .catch(error => {
                 console.log(`Error en traer datos del servidor: ${error}`)
             })
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
                        type = "BUSCAR"
                        rows = {rows}
                        columns={columnasBuscar}
                    />
                </div>
            

        </div>
    )
}

export default withRouter(Buscar);
