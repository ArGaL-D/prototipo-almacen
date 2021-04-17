import React,{useEffect} from 'react';
import InputDark from '../field/InputDark';
import Datatable from '../Datatable';
import Select from '../field/Select';

import * as GoIcons from "react-icons/go";
import "./styles/Ubicacion.css";

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
                    <div className="input">
                        <InputDark
                            icon = {<GoIcons.GoSearch/>}
                            placeholder = "Palabra clave"
                        />
                    </div>
                    <div className="checkbox">
                        <input 
                            id = "checkbox"
                            name = "checkbox"
                            type = "checkbox"
                        />
                        <label htmlFor="checkbox">Desbloquear</label>
                    </div>
                </div>

                <div className="selects">
                    <div className="select">
                        <Select
                            type = "EDIFICIO"
                        />                        
                    </div>
                    <div className="select">
                        <Select
                            type = "PISO"
                        />                        
                    </div>
                    <div className="select">
                        <Select
                            type = "AULA"
                        />                        
                    </div>
            
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
