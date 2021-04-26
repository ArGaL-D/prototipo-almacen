import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

import * as FaIcons from 'react-icons/fa';

import Input from "../field/Input";
import Button from "../field/Button";
import AuthContext from "../authContext/AuthContext";

import "./styles/Login.css";


export default function Login() {

    let history = useHistory();
    const {authToken} = useContext(AuthContext);

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
            const token = resp.data.token;

            if (existeUsuario){
                if (passCorrecto){
                    localStorage.setItem("token",token);  
                    history.location("/page")
                }else{
                    setWarning(true);
                }
            }else{
                setWarning(true);
            }        
        } catch (error) {
            console.log(error)
        }   
    }


    if (authToken){
        return <Redirect to="/page/buscar" />
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
                <Button
                    title = "INGRESAR"
                />
             </form>
        </div>
    )
}
