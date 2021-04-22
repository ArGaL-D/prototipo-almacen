import React,{useState} from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

import InputDark from "../field/InputDark";
import Select from "../field/Select";
import Button from "../field/Button";

import * as FaIcons   from "react-icons/fa";
import * as MdIcons   from "react-icons/md";

export default function FormCrearUsuario() {

    const [formUser,setFormUser] = useState({
        usuario   : "",
        nombre    : "",
        apellido  : "",
        email     : "",
        password  : "",
        repeatPass: "",
        acceso    : ""
    });
    
    const handleInput = (e) =>{
        setFormUser({...formUser, [e.target.name]: e.target.value});
    }
    const handleSelect = (e) =>{
        const tag = e.target;
        setFormUser({...formUser, acceso: tag.options[tag.selectedIndex].value});
    }

    // Enviar datos al servidor
    const sendingData = async (e) =>{
        e.preventDefault();

        const validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        
        if (formUser.password === formUser.repeatPass){
            if (validate.test(formUser.email)){
                
                try {
                    const resp = await axios.post('http://localhost:3001/crear-usuario',formUser);

                    console.log(resp.data)

                } catch (error) {
                    console.log(error)
                }

            }else{
                Swal.fire({
                    icon: 'warning',
                    title: `Email`,
                    text: "Formato de correo electrónico inválido.",
                })
            }
        }else{
            Swal.fire({
                icon: 'warning',
                title: `Las contraseñas`,
                text: "No coinciden.",
            })
        }
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
                    type = 'email'
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
                <span>Acceso a configuraciones</span>
                <Select
                    id = "selectEtapa"
                    name = "acceso"
                    type = "ACCESO"
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
