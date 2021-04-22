import React,{useState} from 'react';

import InputDark from "../field/InputDark";
import Select from "../field/Select";
import Button from "../field/Button";

import * as FaIcons   from "react-icons/fa";
import * as MdIcons   from "react-icons/md";

export default function FormCrearUsuario() {

    const [formUser,setFormUser] = useState({
        usuario: "",
        nombre : "",
        apellido: "",
        email: "",
        password: "",
        acceso: ""
    });
    
    const handleInput = (e) =>{
        setFormUser({...formUser, [e.target.name]: e.target.value});
    }
    const handleSelect = (e) =>{
        const tag = e.target;
        setFormUser({...formUser, acceso: tag.options[tag.selectedIndex].value});
    }

    // Enviar datos al servidor
    const sendingData = (e) =>{
        e.preventDefault();
    }


    return (
        <form id="form" onSubmit={sendingData}>
            <br/>
            <div className="input">
                <InputDark 
                    id = 'inputUsuario'
                    name = 'usuario'
                    icon = {<FaIcons.FaUserAlt/>}
                    onChange = {handleInput}                         
                    placeholder = "Usuario"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputNombres'
                    name = 'nombre'
                    icon = {<FaIcons.FaUserEdit/>}
                    onChange = {handleInput}                                     
                    placeholder = "Nombre(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputApellidos'
                    name = 'apellido'
                    icon = {<FaIcons.FaUserEdit/>}
                    onChange = {handleInput}                                      
                    placeholder = "Apellido(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputEmail'
                    name = 'email'
                    type = 'text'
                    icon = {<MdIcons.MdEmail/>}
                    onChange = {handleInput}                                      
                    placeholder = "Email"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputPassword'
                    name = 'password'
                    type = 'password'
                    icon = {<FaIcons.FaKey/>} 
                    onChange = {handleInput}                                    
                    placeholder = "Contraseña"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputRepeatPass'
                    name = 'repeatPass'
                    type = 'password'
                    icon = {<FaIcons.FaKey/>} 
                    onChange = {handleInput}                                    
                    placeholder = "Confirmar contraseña"
                />
            </div>
            <div className="select">
                <span>Permisos</span>
                <Select
                    id = "selectEtapa"
                    name = "acceso"
                    type = "REPARACION_ETAPA"
                    onChange = {handleSelect}
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
