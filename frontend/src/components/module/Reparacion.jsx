import React,{useEffect, useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';

import Form from '../Form';
import Hilo from '../Hilo';
import Datatable from '../Datatable';
import InputDark from '../field/InputDark';

import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io";

import "./styles/Reparacion.css";
import 'react-responsive-modal/styles.css';


export default function Reparacion({setTitle}) {

    //Columnas-seguimiento
    const columnasSeg = [
        "#", "SERIAL", "EQUIPO", "HILO", "REPORTE",
        "DETALLES", "ESTATUS", "ETAPA", "FECHA","HORA"
    ];
    //Columnas-seguimiento-Hilo
    const columnasHilo = [
        "#", "SERIAL", "EQUIPO", "HILO", "FECHA","HORA"
    ];

    const textAviso = '<strong>1)</strong> Si es la primera vez en hacer un reporte, ingrese un HILO de seguimiento; a partir del segundo reporte hasta su finalización, tendrá que ingresar el mismo HILO.</br><strong>2)</strong> Si el equipo ya cuenta con un HILO de seguimiento y no se acuerda cuál es, de clic en el ícono del campo hilo.</br><strong>3)</strong> Si el equipo ya cuenta con un HILO de seguimiento y se registra otro HILO diferente, se creará dos o más ramas de seguimientos diferentes.'

    const [modal,setModal] = useState(false);
    
    const openModal = () =>{
        setModal(!modal);
    }

    const warning = () =>{
        Swal.fire({
            html: textAviso,
            title: 'Aviso',
            icon: 'warning',
            customClass:{
                popup: 'format-pre'
            },  
            confirmButtonText: 'ACEPTAR'
          }) 
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
                                showModal = {openModal}
                            />
                            <div className="aviso" onClick={warning}>
                                <IoIcons.IoMdWarning/>
                            </div>
                            <Modal open={modal} onClose={openModal} center>
                                <Datatable
                                    type = 'HILO'
                                    columns = {columnasHilo}
                                />
                            </Modal>
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
                                    columns = {columnasSeg}                                
                                />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
