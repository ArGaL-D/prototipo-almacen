import React from 'react';
import InputDark from './field/InputDark';
import Select from './field/Select';
import Button from './field/Button';

import * as FaIcons   from "react-icons/fa";
import * as BiIcons   from "react-icons/bi";
import * as RiIcons   from "react-icons/ri";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";

import "./styles/Form.css";

export default function Form() {
    return (
        <>
            <FormAlumno />
        </>
    )
}


function FormAlumno (){
    return(
        <form id="form">
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    icon = {<RiIcons.RiBodyScanFill/>}
                    onClick = {null} 
                    onChange = {null}                   
                    placeholder = "Alumno"
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    icon = {<FaIcons.FaIdCardAlt/>}
                    onClick = {null} 
                    onChange = {null}                   
                    placeholder = "Boleta"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    icon = {<BiIcons.BiBarcodeReader/>}
                    onClick = {null} 
                    onChange = {null}                   
                    placeholder = "Serial"
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    icon = {<GiIcons.GiWifiRouter/>}
                    onClick = {null} 
                    onChange = {null}                   
                    placeholder = "Equipo"
                    cursorPointer = {true}
                />
            </div>

            <div className="input">
                <InputDark 
                    id = 'input-name'
                    type = "date"
                    icon = {<MdIcons.MdDateRange/>}
                    onClick = {null} 
                    onChange = {null}                   
                    placeholder = "Fecha de salida"
                />
            </div>
            <div className="select">
                <Select
                    id = "select-edificio"
                    name = "edificio"
                    type = "EDIFICIO"
                />
            </div>
            <div className="select">
                <Select
                    id = "select-edificio"
                    name = "edificio"
                    type = "PISO"
                />
            </div>
            <div className="AULA">
                <Select
                    id = "select-edificio"
                    name = "edificio"
                    type = "EDIFICIO"
                />
            </div>
            <div className="button">
                <Button
                    title = "FINALIZAR"
                />
            </div>
        </form>
    )
}
