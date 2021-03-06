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
        acceso    : "No"
    });
    
    const handleInput = (e) =>{
        setFormUser({...formUser, [e.target.name]: e.target.value});
    }

    const handleSelect = (e) =>{
        const tag = e.target;
        setFormUser({...formUser, acceso: tag.options[tag.selectedIndex].value});
    }

    const reloadPage = () =>{
        window.location.reload();        
    }

    // Enviar datos al servidor
    const sendingData = async (e) =>{
        e.preventDefault();

        const validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        
        if (formUser.password === formUser.repeatPass){
            if (validate.test(formUser.email)){
                
                try {
                    const resp = await axios.post('/crear-usuario',formUser);
                    
                    const existeUsuario = resp.data.existe_usuario;
                    const existeEmail = resp.data.existe_email;

                    if (existeUsuario){
                        Swal.fire({
                            icon: 'error',                            
                            title: `Uups...`,                            
                            html:`El nombre de usuario <strong>[${formUser.usuario}]</strong> ya se registró.`
                        })
                    }else{
                        if (existeEmail){
                            Swal.fire({
                                icon: 'error',                            
                                title: `Ups...`,                            
                                html:`El email <strong>[${formUser.email}]</strong> ya existe.`
                            })
                        }else{
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Se ha registrado correctamente.',
                                showConfirmButton: false,
                                timer: 1600
                              })
                            
                            setTimeout(reloadPage,2200);
                        }
                    }
                    console.log(resp.data)

                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',                            
                        title: `${error}`,                            
                        text: "Probablemente, el servidor esté desactivado, o haya problemas internos en el servidor."
                    })
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
                    maxLength = {"50"}                      
                    placeholder = "Usuario"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputNombres'
                    name = 'nombre'
                    icon = {<FaIcons.FaUserEdit/>}
                    onChange = {handleInput}  
                    maxLength = {"50"}                                   
                    placeholder = "Nombre(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputApellidos'
                    name = 'apellido'
                    icon = {<FaIcons.FaUserEdit/>}
                    onChange = {handleInput}   
                    maxLength = {"50"}                                   
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
                    maxLength = {"100"}                                 
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
                    maxLength = {"100"}                               
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
                    maxLength = {"50"}                             
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
