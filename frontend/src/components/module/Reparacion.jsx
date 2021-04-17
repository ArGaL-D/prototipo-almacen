import React,{useEffect, useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';

import Form from '../Form';
import Hilo from '../Hilo';
import Datatable from '../Datatable';
import InputDark from '../field/InputDark';

import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";

import "./styles/Reparacion.css";


export default function Reparacion({setTitle}) {

    //Columnas-seguimiento
    const columnas = [
        "#", "SERIAL", "EQUIPO", "HILO", "REPORTE",
        "DETALLES", "ESTATUS", "ETAPA", "FECHA","HORA"
    ];

    const [modal,setModal] = useState(false);
    
    const showModal = () =>{
        setModal(!modal);
        console.log('hola')
    }


    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Reparación');
        sessionStorage.setItem('page','reparacion');
    })

    return (
        <div className="module-reparacion">
            
            <div className="containerRep1">
                <h1>Opciones</h1>
                <Link to = "/page/reparacion/hilo">
                    <div className="link-option">
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
                    <div className="link-option">
                        <div className="icon1">
                            <GrIcons.GrTextAlignLeft/>
                        </div>
                        <div className="text">
                            <span>Hacer reporte</span>
                        </div>
                        <div className="icon2">
                            <RiIcons.RiArrowRightSFill/>
                        </div>          
                    </div>
                </Link>
                <Link to = "/page/reparacion/seguimiento">
                    <div className="link-option">
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

            <div className="containerRep2">
                <Switch>
                    <Route path="/page/reparacion/hilo">
                        <div className="card-hilo">
                            <Hilo/>                            
                        </div>
                    </Route>
                   
                    <Route path="/page/reparacion/reporte">
                        <div className="box-reporte">
                            <Form
                                type = "REPORTE"
                                showModal = {showModal}
                            />
                        </div>
                    </Route>

                    <Route path="/page/reparacion/seguimiento">
                        <div className="seguimiento">
                            <div className="inpt-buscar">
                                <InputDark
                                    icon = {<GoIcons.GoSearch/>}
                                    placeholder = "Hilo de seguimiento"
                                />
                            </div>
                            <div className="table-seguimiento">
                                <Datatable 
                                    rows = {null}
                                    columns = {columnas}                                
                                />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
