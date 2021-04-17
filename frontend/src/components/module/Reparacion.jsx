import React,{useEffect} from 'react';
import {Link, Switch, Route} from 'react-router-dom';

import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";

import "./styles/Reparacion.css";
import Form from '../Form';

export default function Reparacion({setTitle}) {
    
    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Reparación');
        sessionStorage.setItem('page','reparacion');
    })

    return (
        <div className="module-reparacion">
            
            <div className="container1">
                <h1>Opciones</h1>
                <Link to = "/page/reparacion/hilo">
                    <div className="option-hilo link-option">
                        <div className="icon1">
                            <BiIcons.BiGitBranch/>
                        </div>
                        <div className="text">
                            <span>Generar hilo</span>
                        </div>
                        <div className="icon2">
                            <RiIcons.RiArrowRightSFill/>
                        </div>          
                    </div>
                </Link>
                <Link to = "/page/reparacion/reporte">
                    <div className="option-hilo link-option">
                        <div className="icon1">
                            <GrIcons.GrTextAlignLeft/>
                        </div>
                        <div className="text">
                            <span>Generar reporte</span>
                        </div>
                        <div className="icon2">
                            <RiIcons.RiArrowRightSFill/>
                        </div>          
                    </div>
                </Link>
                <Link to = "/page/reparacion/seguimiento">
                    <div className="option-seguimiento  link-option">
                        <div className="icon1">
                           <GiIcons.GiArchiveResearch/>
                        </div>
                        <div className="text">
                            <span>Seguimiento</span>
                        </div>
                        <div className="icon2">
                            <RiIcons.RiArrowRightSFill/>
                        </div>          
                    </div>
                </Link>
            </div>

            <div className="container2">
                <Switch>
                    <Route path="/page/reparacion/hilo">
                        <h3>HOLA HILO</h3>
                    </Route>
                   
                    <Route path="/page/reparacion/reporte">
                        <div className="box-reporte">
                            <Form
                                type = "REPORTE"
                            />
                        </div>
                    </Route>

                    <Route path="/page/reparacion/seguimiento">
                        <h3>HOLA SEGUIMIENTO</h3>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
