import { useEffect} from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import Card from '../Card';


import * as FaIcons from "react-icons/fa";

import "./styles/Prestamo.css";
import Form from '../Form';


export default function Prestamo({setTitle}) {

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Préstamo');
        sessionStorage.setItem('page','prestamo');
    })

    //Ocultar tarjetas 
    const ocultar = () =>{
        document.getElementById('container2').style.cssText ="z-index:20;"
    }

    return (
        <div className="module_prestamo">
            <div className="container">
                <Link to="/page/prestamo/form-alumno-salon">                    
                    <Card 
                        icon = {<FaIcons.FaUserGraduate/>}
                        text = "Salón"
                        title = "Alumno"
                        btnTitle = "Formulario"
                        onClick = {ocultar}
                    />                    
                </Link>
                
                <Link to="/page/prestamo/form-prof-salon">
                    <Card 
                        icon = {<FaIcons.FaChalkboardTeacher/>}
                        text = "Salón"
                        title = "Profesor"
                        btnTitle = "Formulario"
                        onClick = {ocultar}
                    />               
                </Link>

                <Link to="/page/prestamo/form-alumno-lab">                
                    <Card 
                        icon = {<FaIcons.FaUserGraduate/>}
                        text = "Laboratorio"
                        title = "Alumno"
                        btnTitle = "Formulario"
                        onClick = {ocultar}
                    />
                </Link>  

                <Link to="/page/prestamo/form-prof-lab">
                    <Card 
                        icon = {<FaIcons.FaChalkboardTeacher/>}
                        text = "Laboratorio"
                        title = "Profesor"
                        btnTitle = "Formulario"
                        onClick = {ocultar}
                    />
                </Link>

                <Link to="/page/prestamo/form-asignacion">
                    <Card 
                        icon = {<FaIcons.FaUserTie/>}
                        text = "Asignacion de equipo"
                        title = "Asignación"
                        btnTitle = "Formulario"
                        onClick = {ocultar}
                    />
                </Link>                                
            </div>

            <div className="container2" id="container2">
                <Switch>
                    <Route path={`/page/prestamo/form-alumno-salon`}>
                        <div className="form">
                            <Form
                                type = "ALUMNO"     
                            />    
                        </div>
                    </Route>
                    <Route path={`/page/prestamo/form-prof-salon`}>
                        <div className="form">
                            <Form
                                type = "PROFESOR"     
                            />    
                        </div>
                    </Route>
                    <Route path={`/page/prestamo/form-alumno-lab`}>
                        <div className="form">
                            <Form
                                type = "ALUMNO"     
                            />    
                        </div>
                    </Route>
                    <Route path={`/page/prestamo/form-prof-lab`}>
                        <div className="form">
                            <Form
                                type = "PROFESOR"     
                            />    
                        </div>
                    </Route>
                    <Route exact path={`/page/prestamo`}>
                        <div className="form">
                            <Form
                                type = "ASIGNACION"     
                            />    
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
