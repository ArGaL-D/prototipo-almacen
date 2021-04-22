import React,{useEffect, useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';

import Hilo from '../Hilo';
import Datatable from '../Datatable';
import InputDark from '../field/InputDark';
import { generarHilo } from "../config/hilo";

import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io";

import "./styles/Reparacion.css";
import 'react-responsive-modal/styles.css';
import FormReparacion from '../forms/FormReparacion';


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

    const [ultimotHilo,setUltimotHilo] = useState('');

    const textAviso = '<strong>1)</strong> Si es la primera vez en hacer un reporte, genere un HILO de seguimiento; a partir del segundo reporte hasta su finalización, tendrá que ingresar el mismo HILO.</br><strong>2)</strong> Si el equipo ya cuenta con un HILO de seguimiento y no se acuerda cuál es, de clic en el ícono del <strong>campo</strong> hilo.</br><strong>3)</strong> Si el equipo ya cuenta con un HILO de seguimiento y se registra otro HILO diferente, se creará dos o más ramas de seguimientos diferentes.'

    const textHilo = `Último hilo generado: ${ultimotHilo}`

    const [modal,setModal] = useState(false);
    
    const openModal = () =>{
        setModal(!modal);
    }

    const crearHilo = () =>{
        const hilo = generarHilo();
        setUltimotHilo(hilo);
        localStorage.setItem('lastHilo',hilo);
        
        return hilo;
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

    const nuevoHilo = () =>{
        Swal.fire({
            html: textHilo,
            title: crearHilo(),            
            customClass:{
                popup: 'format-pre'
            },  
            confirmButtonText: 'ACEPTAR'
        }) 
    }
    // Guardar el último hilo generado
    useEffect( ()=>{
        const lastKey = localStorage.getItem('ultimoHilo');
        setUltimotHilo(lastKey);
    },[]);


    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Reparación');
        sessionStorage.setItem('page','reparacion');
    })

    return (
        <div className="module-reparacion">
            {/* NARVAR */} 
            <div className="nav_container">
                <Link to = "/page/reparacion">
                    <div className="link-option">
                        <div className="text">
                            <span>Reporte</span>
                        </div>        
                    </div>
                </Link>
                <Link to = "/page/reparacion/seguimiento">
                    <div className="link-option">
                        <div className="text">
                            <span>Seguimiento</span>
                        </div>         
                    </div>
                </Link>

                <div className="avisoNav" onClick={warning}>
                    <span>Aviso</span>
                </div>
                <div className="hiloNav" onClick={nuevoHilo}>
                    <span>Hilo</span>
                </div>
            </div>

            <div className="content">
                <Switch>
                    <Route path="/page/reparacion">
                        <div className="form_container">
                            <FormReparacion />
                            <div className="btn-aviso" onClick={warning}>
                                <IoIcons.IoMdWarning/>
                            </div>
                            <div className="btn-hilo" onClick={nuevoHilo}>
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
