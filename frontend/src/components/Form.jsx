import React, { useState } from 'react';
import { useParams } from 'react-router';
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
    
    let { id } = useParams();

    return (
        <>
            <FormAlumno />
        </>
    )
}


function FormAlumno (){

    const [formData, setFormData] = useState({
        alumno:     "",
        boleta:     "",
        serial:     "",
        equipo:     "",
        fecha :     "",        
        piso:       "",
        aula:       "",
        edificio:   ""
    });

    //Recoletar datos de los campos-formulario
    const handleText = (e) =>{
        const tag  = e.target;
        const name = e.target.name;

        if (name==="edificio"){
            setFormData({...formData, edificio: tag.selectedIndex});
        }else if (name==="piso"){
            setFormData({...formData, piso: tag.selectedIndex});
        }else if (name==="aula"){
            setFormData({...formData, aula: tag.options[tag.selectedIndex].text});
        }else{
            setFormData({...formData,[name]: tag.value});
        }

    }
    

    return(
        <form id="form">
            <h3>Alumno</h3>
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    name = 'alumno'
                    icon = {<RiIcons.RiBodyScanFill/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = "Nombre"
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-boleta'
                    name = 'boleta'
                    icon = {<FaIcons.FaIdCardAlt/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = "Boleta"
                />
            </div>
            <h3>Equipo</h3>
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    name = 'serial'
                    icon = {<BiIcons.BiBarcodeReader/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = "Serial"
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-name'
                    name = 'equipo'
                    icon = {<GiIcons.GiWifiRouter/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = "Equipo"
                />
            </div>

            <div className="input">
                <InputDark 
                    id = 'input-name'
                    name = 'fecha'
                    type = "date"
                    icon = {<MdIcons.MdDateRange/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = "Fecha de salida"
                />
            </div>
            <h3>Ubicación</h3>
            <div className="select">
                <Select
                    id = "select-edificio"
                    name = "edificio"
                    type = "EDIFICIO"
                    onChange = {handleText}
                    numEdificio = {formData.edificio}
                />
            </div>
            <div className="select">
                <Select
                    id = "select-piso"
                    name = "piso"
                    type = "PISO"
                    onChange = {handleText}
                    numEdificio = {formData.edificio}
                    numPiso = {formData.piso}
                />
            </div>
            <div className="select">
                <Select
                    id = "select-aula"
                    name = "aula"
                    type = "AULA"                    
                    onChange = {handleText}                    
                    numEdificio = {formData.edificio}
                    numPiso = {formData.piso}
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
