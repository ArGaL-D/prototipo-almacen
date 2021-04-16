import React,{useEffect} from 'react'
import InputDark from '../field/InputDark';

import * as RiIcons   from "react-icons/ri";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import * as BiIcons   from "react-icons/bi";
import Button from '../field/Button';

import "./styles/Entrega.css";

export default function Entrega({setTitle}) {

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Entrega');
        sessionStorage.setItem('page','entrega');
    })

    return (
        <div className="module-entrega">
            <form>
                <InputDark 
                    id = "entrega-nombre"
                    name = "nombre"
                    icon = {<RiIcons.RiBodyScanFill/>}
                    placeholder = "Nombre"
                />

                <InputDark 
                    id = "entrega-equipo"
                    name = "equipo"
                    icon = {<GiIcons.GiWifiRouter/>}
                    placeholder = "Equipo"
                />

                <InputDark 
                    id = "entrega-serial"
                    name = "serial"
                    icon = {<BiIcons.BiBarcodeReader/>}
                    placeholder = "Serial"                    
                />    

                <InputDark 
                    id = "fecha-salida"
                    name = "fechaSalida"
                    icon = {<MdIcons.MdDateRange/>}
                    placeholder = "Fecha de salida"                    
                /> 

                <InputDark 
                    id = "fecha-entrega"
                    name = "fechaEntrega"
                    icon = {<MdIcons.MdDateRange/>}
                    placeholder = "Fecha de entrega"                    
                /> 

                <Button
                    title = "Entregar"
                />
            </form>
        </div>
    )
}
