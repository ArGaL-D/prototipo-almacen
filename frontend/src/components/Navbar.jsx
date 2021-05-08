import React,{useEffect, useState} from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';

import "./styles/Navbar.css";

export default function Navbar(props) {

    const [username,setUsername] = useState('');
    
    // Validar token del usuario
    useEffect(()=>{  
        const readToken = async () => {
            const token = localStorage.getItem('token');            
            try {
                const resp = await axios.get('/login/verificar',{ headers: {'Authorization': token} });                
                setUsername(resp.data.authData.userData.usuario);
            } catch (error) {
                console.log(error)
            }
        }
        readToken();
    },[]);

    return (
        <header className="nav-bar">
            <div className="icon" onClick={props.hiddenSidebar}>
                <FaIcons.FaBars/>
            </div>
            <div className="title">
                {props.title}
            </div>
            <div className="user_container">
                {username}
            </div>
            <button onClick={props.onClick}>
                {props.title_btn}
            </button>
        </header>
    )
}
