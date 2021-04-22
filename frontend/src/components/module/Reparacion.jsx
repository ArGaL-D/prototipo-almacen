import {useEffect, useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

import Datatable from '../Datatable';
import { generarHilo } from "../config/hilo";
import FormReparacion  from '../forms/FormReparacion';

import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";

import "./styles/Reparacion.css";
import 'react-responsive-modal/styles.css';
import InputDark from '../field/InputDark';



export default function Reparacion({setTitle}) {


    //Columnas-seguimiento-Hilo
    const columnasHilo = [
        "#", "SERIAL", "EQUIPO", "HILO", "REPORTE","DETALLES",
        "ESTATUS", "ETAPA", "FECHA", "HORA"
    ];

    const [ultimotHilo,setUltimotHilo] = useState('');

    const textAviso = '<strong>1)</strong> Si es la primera vez en hacer un reporte, genere un HILO de seguimiento; a partir del segundo reporte hasta su finalización, tendrá que ingresar el mismo HILO.</br><strong>2)</strong> Si el equipo ya cuenta con un HILO de seguimiento y no se acuerda cuál es, de clic en el ícono del <strong>campo</strong> hilo.</br><strong>3)</strong> Si el equipo ya cuenta con un HILO de seguimiento y se registra otro HILO diferente, se creará dos o más ramas de seguimientos diferentes.'

    const textHilo = `Último hilo generado: ${ultimotHilo}`

    const [rows, setRows] = useState([]);
    const [clave,setClave] = useState({hilo:""});    


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

    const handleText = (e) =>{
        setClave({...clave, hilo: e.target.value});
    }


    const sendingData = async () =>{

        if (!clave.hilo){
            Swal.fire({
                icon : "warning",
                title: 'Oops...',        
                text : "Campo vacío",
                confirmButtonText: 'ACEPTAR'
            }) 
        }else{
            try {
                const resp = await axios.post('http://localhost:3001/seguimiento',clave)
                const rowData = resp.data;
                
                if (rowData.length === 0 ){
                    Swal.fire({
                        icon : "warning",
                        title: `Oops...`,        
                        text : "No se encontró el hilo.",
                        confirmButtonText: 'ACEPTAR'
                    }) 
                }else{
                    setRows(rowData);            
                }                
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon : "error",
                    title: `${error}`,        
                    text : "Hubo problemas en buscar el hilo. Probablemente, el servidor esté desactivado o haya conflictos internos en el servidor.",
                    confirmButtonText: 'ACEPTAR'
                }) 
            }
        }
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
                    <Route exact path="/page/reparacion">
                        <div className="form_container">
                            <FormReparacion />
                            <div className="btn-aviso" onClick={warning}>
                                <IoIcons.IoMdWarning/>
                            </div>
                            <div className="btn-hilo" onClick={nuevoHilo}>
                                <BiIcons.BiGitBranch/>
                            </div>
                        </div>
                    </Route>    
                    <Route path="/page/reparacion/seguimiento">
                        <br/>
                        <div className="inpt_hilo">
                            <InputDark
                                icon = {<BiIcons.BiSearch/>}
                                onClick = {sendingData}
                                onChange = {handleText}
                                maxLength = {"10"}
                                placeholder = "Hilo de seguimiento"
                                cursorPointer = {true}
                            />
                        </div>
                        <br/>                        
                        <div className="table_hilo">
                            <Datatable
                                type = 'SEGUIMIENTO'
                                rows = {rows}
                                columns = {columnasHilo}
                            />  
                        </div>
                      
                    </Route>               
                </Switch>
            </div>            
        </div>
    )
}
