import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Swal  from 'sweetalert2';
import axios from 'axios';

import * as FaIcons from 'react-icons/fa';

import Input from "../field/Input";
import Button from "../field/Button";
import AuthContext from "../authContext/AuthContext";

import "./styles/Login.css";


export default function Login() {

    const history = useHistory();
    const {authToken} = useContext(AuthContext);

    const [count,setCount] = useState(0);
    const [randomColor,setRandomColor] = useState('');

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
        setCount(count + 1);
        
        // Verificar usuario
        try {
            const resp = await axios.post('http://localhost:3001/login',formData);
            const existeUsuario = resp.data.existe_usuario;
            const passCorrecto  = resp.data.successful_password;
            const token = resp.data.token;

            if (existeUsuario){
                if (passCorrecto){
                    localStorage.setItem("token",token);  
                    window.location.reload();
                }else{
                    setWarning(true);
                    // Random colors
                    const letters = '0123456789ABCDEF';
                    let color  = '#';
                    for (let i=0; i<6; i++){
                        color +=letters[Math.floor(Math.random()*16)];                    
                    }
                    setRandomColor(color);
                }
            }else{                                
                setWarning(true);   
                // Random colors
                const letters = '0123456789ABCDEF';
                let color  = '#';
                for (let i=0; i<6; i++){
                    color +=letters[Math.floor(Math.random()*16)];                    
                }
                setRandomColor(color);             
            }        
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'LOGIN',
                text: `No se puedo iniciar sesión. Probablemente, el servidor esté desactivo, o tenga conflictos internos.`,
            })
        }           
    }

    const imgCarousel = () =>{
        history.push('/');
    }

    if (authToken){
        return <Redirect to="/page" />
    }

    return (
        <div className="login">    
            <header className="login_header">
                <span 
                    className="login_menu"
                    onClick = {imgCarousel}>
                    Imágenes
                </span>
            </header>        
            <div className="login_container">
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
                                <span style={count > 1 ? {color: randomColor}: null}>
                                    Verifique usuario y/o contraseña
                                </span>
                            </div>
                            : null
                    } 
                    <div className="button">
                        <Button
                            title = "INGRESAR"
                        />
                    </div>  
                </form>
            </div>
        </div>
    )
}
