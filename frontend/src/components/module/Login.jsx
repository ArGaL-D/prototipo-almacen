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
    const [field,setField] = useState(false);


    const handleInputText = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        /*
        try{
            const resp = await axios.post('http://localhost:3001/login',formData);
            const user_id = resp.data.idUser;
            const user_name = resp.data.userName;
            const user_exist = resp.data.existe_usuario;
            const inHalfADay = 0.5;

            if(user_exist){
                
                setAuthToken(user_name);
                setCookieName(user_name);             
                Cookies.set(
                    user_name,
                    user_id,
                    {
                        sameSite: 'strict', 
                        secure: true, 
                        expires: inHalfADay
                    });      
                                     
            }else{
                setField(true);
                console.log(user_exist)                
            }
        }catch(error){
            console.log(`-> ${error}`)
        } 
        */
        const inHalfADay = 0.5;
        Cookies.set(
            "tester",
             "tester123",
            {
                sameSite: 'strict', 
                secure: true, 
                expires: inHalfADay
            }); 
        history.push('/page'); 
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
                    field ?
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
