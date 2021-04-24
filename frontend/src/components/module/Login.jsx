import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';

import Input from "../field/Input";

import "./styles/Login.css";
import { useHistory, Redirect } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';


export default function Login() {

    let history = useHistory();

    const [formData,setFormData] = useState({
        username: "",
        userpass: ""
    });
    const [warning,setWarning] = useState(false);


    const handleInputText = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        
        // Verificar usuario

        try {
            const resp = await axios.post('http://localhost:3001/login',formData);
            const existeUsuario = resp.data.existe_usuario;
            const passCorrecto  = resp.data.successful_password;
            const token = resp.data;

            if (existeUsuario){
                if (passCorrecto){
                    localStorage.setItem("token",token);
                }else{
                    setWarning(true);
                }
            }else{
                setWarning(true);
            }        
        } catch (error) {
            console.log(error)
        }

        //history.push('/page'); 
    }




    const session = sessionStorage.getItem('page')
    
    // Regresar a la misma pág. al 'refrescar' el navegador
    if(session === "buscar"){
        return <Redirect to="/page/buscar" />
    }
    else if(session === "registro"){
        return <Redirect to="/page/registro" />
    }
    else if(session === "prestamo"){
        return <Redirect to="/page/prestamo" />
    }
    else if(session === "entrega"){
        return <Redirect to="/page/entrega" />
    }
    else if(session === "ubicacion"){
        return <Redirect to="/page/ubicacion" />
    }
    else if(session === "usuarios"){
        return <Redirect to="/page/usuarios" />
    }
    else if(session === "reparacion"){
        return <Redirect to="/page/reparacion" />
    }


    return (
        <div className="login">            
            <form onSubmit={handleOnSubmit}>
                <Input 
                    id = "login"
                    name = "username"
                    type = "text"
                    icon = {<FaIcons.FaUserAlt/>}
                    onChange = {handleInputText}
                    placeholder = "Usuario"
                />
                <Input 
                    id = "login"
                    name = "userpass"
                    type = "password"
                    icon = {<FaIcons.FaKey/>}
                    onChange = {handleInputText}
                    placeholder = "Contraseña"
                />
                {
                    warning ?
                        <div className="warning">
                            <span>Verifique usuario y/o contraseña</span>
                        </div>
                        : null
                }   
                <button>INGRESAR</button>
             </form>
        </div>
    )
}
