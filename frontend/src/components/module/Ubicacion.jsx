import React,{useEffect} from 'react';
import InputDark from '../field/InputDark';
import Select from '../field/Select';
import "./styles/Ubicacion.css";

import * as GoIcons from "react-icons/go";
import Datatable from '../Datatable';

export default function Ubicacion({setTitle}) {

    const columnasUbicacion = [
        "EQUIPO", "SERIAL", "EDIFICIO",
        "PISO","AULA","FECHA DE SALIDA"
    ];


    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Ubicación');
        sessionStorage.setItem('page','ubicacion');
    })

    return (
        <div className="module-ubicacion">
            <div className="container1">
                
            </div>
            
            <div className="container2">
                <div className="buscador">
                    <InputDark
                        icon = {<GoIcons.GoSearch/>}
                        placeholder = "buscar"
                    />
                </div>

                <div className="ubicacion">
                    <Select
                        type = "EDIFICIO"
                    />
                    <Select
                        type = "PISO"
                    />
                    <Select
                        type = "AULA"
                    />                
                </div>

                <div className="tabla">
                    <Datatable
                        columns = {columnasUbicacion}
                        rows = {null}
                    />
                </div>
            </div>





        </div>
    )
}
