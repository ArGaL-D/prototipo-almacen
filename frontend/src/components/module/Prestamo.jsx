import { useEffect} from 'react'
import { Link } from 'react-router-dom';
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
                <Link to="/page/prestamo/form-alumno-salon">                    
                    <Card 
                        icon = {<FaIcons.FaUserGraduate/>}
                        text = "Salón"
                        title = "Alumno"
                        btnTitle = "Formulario"
                    />                    
                </Link>
                
                <Link to="/page/prestamo/form">
                    <Card 
                        icon = {<FaIcons.FaChalkboardTeacher/>}
                        text = "Salón"
                        title = "Profesor"
                        btnTitle = "Formulario"
                    />               
                </Link>

                <Link to="/page/prestamo/form">                
                    <Card 
                        icon = {<FaIcons.FaUserGraduate/>}
                        text = "Laboratorio"
                        title = "Alumno"
                        btnTitle = "Formulario"
                    />
                </Link>  

                <Link to="/page/prestamo/form">
                    <Card 
                        icon = {<FaIcons.FaChalkboardTeacher/>}
                        text = "Laboratorio"
                        title = "Profesor"
                        btnTitle = "Formulario"
                    />
                </Link>

                <Link to="/page/prestamo/form">
                    <Card 
                        icon = {<FaIcons.FaUserTie/>}
                        text = "Asignacion de equipo"
                        title = "Personal"
                        btnTitle = "Formulario"
                    />
                </Link>                                
            </div>

            <div className="container2">

                <div className="form">
                    <Form
                                
                    />    
                </div>

            </div>
        </div>
    )
}
