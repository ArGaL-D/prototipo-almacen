import { useState, useEffect } from "react";
import { generarHilo } from "./config/hilo";
import Button from "./field/Button";

import './styles/Hilo.css';

export default function Hilo() {

    const [hilo,setHilo] = useState('Hilo');
    const [lastHilo,setLastHilo] = useState('Hilo');

    const nuevoHilo = (e) =>{
        e.preventDefault();

        const key = generarHilo();
        setHilo(key);
        setLastHilo(key);

        //Retomar el último hilo generado
        localStorage.setItem('ultimoHilo',key);
    }

    // Guardar el último hilo generado
    useEffect( ()=>{
        const lastKey = localStorage.getItem('ultimoHilo');
        setLastHilo(lastKey);
    },[]);

    return (
        <div className="container-hilo">  
            <div className="boxHilo">
                <span id="title1">
                    {hilo}                    
                </span>
                <span id="title2">
                    Último hilo
                </span>
                <span id="title3">
                    {`${lastHilo}`}
                </span>
            </div>

            <div className="button">
                <Button                 
                    title = "NUEVO HILO"
                    onClick = {nuevoHilo}
                />
            </div>
        </div>
    )
}
