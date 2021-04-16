import React,{useEffect} from 'react'
import Card from '../Card';


import * as FaIcons from "react-icons/fa";

import "./styles/Prestamo.css";
import Form from '../Form';


export default function Prestamo({setTitle}) {

    useEffect(() => {
        setTitle('Préstamo');
        sessionStorage.setItem('page','prestamo');
    })

    return (
        <div className="module_prestamo">
            <div className="container">
                <div className="tarjeta">
                    <Card 
                        icon = {<FaIcons.FaUserGraduate/>}
                        text = "Salón"
                        title = "Alumno"
                        btnTitle = "Formulario"
                    />
                </div>
                <div className="tarjeta">
                    <Card 
                        icon = {<FaIcons.FaChalkboardTeacher/>}
                        text = "Salón"
                        title = "Profesor"
                        btnTitle = "Formulario"
                    />
                </div>
                <div className="tarjeta">
                    <Card 
                        icon = {<FaIcons.FaUserGraduate/>}
                        text = "Laboratorio"
                        title = "Alumno"
                        btnTitle = "Formulario"
                    />
                </div>
                <div className="tarjeta">
                    <Card 
                        icon = {<FaIcons.FaChalkboardTeacher/>}
                        text = "Laboratorio"
                        title = "Profesor"
                        btnTitle = "Formulario"
                    />
                </div>
                <div className="tarjeta">
                    <Card 
                        icon = {<FaIcons.FaUserTie/>}
                        text = "Asignacion de equipo"
                        title = "Personal"
                        btnTitle = "Formulario"
                    />
                </div>
            </div>

            <div className="formulario">
                <Form
                               
                />                
            </div>
        </div>
    )
}
