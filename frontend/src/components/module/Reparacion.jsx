import React,{useEffect, useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';

import Form from '../Form';
import Hilo from '../Hilo';
import Datatable from '../Datatable';
import InputDark from '../field/InputDark';

import * as BsIcons from "react-icons/bs";
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
            {/* NARVAR */} 
            <div className="navbar_reparacion">
                <Link to = "/page/reparacion">
                    <div className="link-option">
                        <div className="icon1">
                            <BsIcons.BsFileText/>
                        </div>
                        <div className="text">
                            <span>Hacer reporte</span>
                        </div>        
                    </div>
                </Link>
                <Link to = "/page/reparacion/seguimiento">
                    <div className="link-option">
                        <div className="icon1">
                            <BiIcons.BiSearchAlt2/>
                        </div>
                        <div className="text">
                            <span>Seguimiento</span>
                        </div>         
                    </div>
                </Link>
                <div className="avisoNav">
                    <span>Aviso</span>
                </div>
                <div className="hiloNav">
                    <span>Hilo</span>
                </div>
            </div>

            <div className="content">
                <Switch>
                    <Route path="/page/reparacion">
                        <div className="box-reporte">
                            <Form
                                type = "REPORTE"
                                showModal = {openModal}
                            />
                            <div className="aviso" onClick={warning}>
                                <IoIcons.IoMdWarning/>
                            </div>
                            <div className="hilo">
                                <BiIcons.BiGitBranch/>
                            </div>
                            <Modal open={modal} onClose={openModal} center>
                                <Datatable
                                    type = 'HILO'
                                    columns = {columnasHilo}
                                />
                            </Modal>
                        </div>
                    </Route>                   
                </Switch>
            </div>            
        </div>
    )
}
