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
import * as HiIcons   from "react-icons/hi";

import "./styles/Form.css";
import TextArea from './field/TextArea';


export default function Form(props) {
    
    return (
        <>
        {
            {
                ALUMNO: <FormPrestamo type={props.type}/>,
                PROFESOR: <FormPrestamo type={props.type}/>, 
                PERSONAL: <FormPrestamo type={props.type}/>,                
                REPORTE: <FormReparacion showModal={props.showModal}/>,
                USUARIO: <FormUsuario showModal={props.showModal}/>
            }[props.type]
        }
            
        </>
    )
}

// Formulario del módulo PRÉSTAMO

function FormPrestamo (props){

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
            <h3>{`${props.type}`}</h3>
            <div className="input">
                <InputDark 
                    id = "input-name"
                    name = {props.type.toLowerCase()}
                    icon = {<RiIcons.RiBodyScanFill/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = "Nombre"
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-clave'
                    name = 'clave'
                    icon = {<FaIcons.FaIdCardAlt/>}
                    onClick = {null} 
                    onChange = {handleText}                   
                    placeholder = {props.type==="ALUMNO" ? "Boleta" : "Clave" }
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

// Formulario del módulo REPARACIÓN

function FormReparacion (props){
    return(
        <form id="form">
            <h2>Reporte</h2>
            <div className="input">
                <InputDark
                    id = "reporte"
                    name = "reporte"
                    icon = {<HiIcons.HiPencilAlt/>}
                    placeholder = "Título"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'serial'
                    name = 'serial'
                    icon = {<BiIcons.BiBarcodeReader/>}                  
                    onChange = {null}                   
                    placeholder = "Serial"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'equipo'
                    name = 'equipo'
                    icon = {<GiIcons.GiWifiRouter/>}                     
                    onChange = {null}                   
                    placeholder = "Equipo"
                />
            </div>
            <div className="input">
                <InputDark
                    id = "hilo"
                    name = "hilo"
                    icon = {<BiIcons.BiGitBranch/>}
                    onClick = {props.showModal}
                    placeholder = "Hilo"
                    cursorPointer = {true}
                />
            </div>

            <div className="select-options">
                <div className="select">
                    <Select
                        id = "selectReparacion"
                        name = "reparacion"
                        type = "REPARACION"
                        onChange = {null}
                        placeholder = "Reparación"
                    />
                </div>
                <div className="select">
                    <Select
                        id = "selectEtapa"
                        name = "etapa"
                        type = "REPARACION_ETAPA"
                        onChange = {null}
                        placeholder = "Estatus"
                    />            
                </div>
            </div>

            <div className="input">
                <InputDark 
                    id = 'inputFecha'
                    name = 'fecha'
                    type = "date"
                    icon = {<MdIcons.MdDateRange/>}                     
                    onChange = {null}                   
                    placeholder = "Fecha actual"
                />
            </div>

            <div className="textArea">
                <TextArea
                    placeholder = "Detalles del reporte."
                />
            </div>

            <div className="button">
                <Button
                    title = "ACEPTAR"
                />
            </div>

        </form>
    )
}

// Formulario de CREAR USUARIO - módulo Admin

function FormUsuario (props){
    return(
        <form id="form">
            <br/>
            <div className="input">
                <InputDark 
                    id = 'inputUsuario'
                    name = 'usuario'
                    icon = {<FaIcons.FaUserAlt/>}        
                    onChange = {null}                   
                    placeholder = "Usuario"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputNombres'
                    name = 'nombres'
                    icon = {<FaIcons.FaUserEdit/>}                     
                    onChange = {null}                   
                    placeholder = "Nombre(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputApellidos'
                    name = 'apellidos'
                    icon = {<FaIcons.FaUserEdit/>}                     
                    onChange = {null}                   
                    placeholder = "Apellido(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputEmail'
                    name = 'email'
                    type = 'text'
                    icon = {<MdIcons.MdEmail/>}                     
                    onChange = {null}                   
                    placeholder = "Email"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputPassword'
                    name = 'password'
                    type = 'password'
                    icon = {<FaIcons.FaKey/>}                    
                    onChange = {null}                   
                    placeholder = "Contraseña"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputRepeatPass'
                    name = 'repeatPass'
                    type = 'password'
                    icon = {<FaIcons.FaKey/>}                     
                    onChange = {null}                   
                    placeholder = "Confirmar contraseña"
                />
            </div>
            <div className="select">
                <span>Permisos</span>
                <Select
                    id = "selectEtapa"
                    name = "etapa"
                    type = "REPARACION_ETAPA"
                    onChange = {null}
                    placeholder = "Estatus"
                />            
            </div>
            <div className="button">
                <Button
                    title = "REGISTRAR"
                />
            </div>
        </form>
    )
}