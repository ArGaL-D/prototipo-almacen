import {useEffect, useState} from 'react';
import axios from "axios";
import InputDark from '../field/InputDark';
import Datatable from '../Datatable';
import Select from '../field/Select';

import * as GoIcons from "react-icons/go";
import "./styles/Ubicacion.css";

export default function Ubicacion({setTitle}) {

    const [showSelects, setShowSelects] = useState(false);
    const [rowData, setRowData] = useState([]);
    const columnasUbicacion = [
        "#","EQUIPO", "SERIAL", "EDIFICIO",
        "PISO","AULA","FECHA DE SALIDA"
    ];


    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Ubicación');
        sessionStorage.setItem('page','ubicacion');
    })

    // Obtener datos (filas) desde el servidor
    
    useEffect(() => {
        // Deshabilitar tag selects 
        
        document.getElementById('dropdown-edificio').disabled = !showSelects;
        document.getElementById('dropdown-piso').disabled = !showSelects;
        document.getElementById('dropdown-aula').disabled = !showSelects;

        axios.get('http://localhost:3001/ubicacion')
             .then( res => {
                 setRowData(res.data)
             })
             .catch( err => {
                 console.log(`-> ${err}`)
             })
       
    }, [showSelects])
    
    return (
        <div className="module-ubicacion">            
            <div className="container_search">
                <div className="input">
                    <InputDark
                        icon = {<GoIcons.GoSearch/>}
                        placeholder = "Palabra clave"
                    />
                </div>

                <div className="checkbox">
                    <div className="marco">
                        <input
                            id = "checkbox"
                            name = "checkbox"
                            type = "checkbox"
                        />
                        <label htmlFor="checkbox">Habilitar</label>
                    </div>
                </div>

                <div className="selects">                
                    <div className="marco">
                        <div className="select">
                            <Select
                                id ="dropdown-edificio"
                                type = "EDIFICIO"
                            />
                        </div>
                        <div className="select">
                            <Select
                                id ="dropdown-piso"
                                type = "PISO"
                            />
                        </div>
                        <div className="select">
                            <Select
                                id ="dropdown-aula"
                                type = "AULA"
                            /> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="container_table">
                <div className="datatable">
                    <Datatable
                        type = "UBICACION"
                        columns = {columnasUbicacion}
                        rows = {rowData}
                    />
                </div>
            </div>

        </div>
    )
}
