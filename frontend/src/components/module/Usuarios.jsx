import React,{useEffect, useState} from 'react';
import Rectangle from '../Rectangle';
import Datatable from "../Datatable";

import Swal from 'sweetalert2';

import * as IoIcons from 'react-icons/io5';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

import "./styles/Usuarios.css";
import PieChart from '../PieChart';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import Form from '../Form';
import FormCrearUsuario from '../forms/FormCrearUsuario';
import axios from 'axios';

export default function Usuarios({setTitle}) {

    let {path} = useRouteMatch();

    const [deviceRows, setDeviceRows] = useState([]);
    const [userRows, setUserRows] = useState([]);

    const columns = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso",
        "Editar","Eliminar"        
    ];
    
    const userComlumns = [
        "ID", "USUARIO", "NOMBRE(S)", "APELLIDO(S)",
        "EMAIL", "ACCESO", "CONTRASEÑA", "ELIMINAR"
    ]

    // Cambiar valores de cada fila
    const getNodeTD = (e) =>{
        Swal.fire({
            icon: 'warning',
            title: `Email`,
            input: 'text',
            showCancelButton: true,
        }).then((result) => {
            
              Swal.fire({
                title: result.value
              })
            
          })
    }

    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
    })

    useEffect(() =>{
        let unmounted = false;

        axios.get('http://localhost:3001/usuarios')
             .then((resp)=>{
                 if(!unmounted){
                     setUserRows(resp.data);
                 }
             })
             .catch((error)=>{
                 console.log(error)
             })
        return () => { unmounted = true; }
    });


    return (
        <div className="module-usuarios">
            {/* CONTENEDOR 1 */}
            <div className="container_1">
                <div className="rectangle">
                    <Link to={`${path}`}>
                        <Rectangle
                            icon = {<FaIcons.FaChartPie />}
                            title = "Gráfica"
                            content = "Información"
                        />
                    </Link>
                </div>    
                <div className="rectangle">
                    <Link to={`${path}/equipos`}>
                        <Rectangle
                            icon = {<MdIcons.MdImportantDevices />}
                            title = "Equipos"
                            content = "Editar los equipos"
                        />
                    </Link>
                </div>        
                <div className="rectangle">
                    <Link to={`${path}/crear-usuario`}>
                        <Rectangle
                            icon = {<IoIcons.IoPersonAdd />}
                            title = "Crear suario"
                            content = "Total de usuarios"
                        />
                    </Link>
                </div>
                <div className="rectangle">
                    <Link to={`${path}/usuarios`}>
                        <Rectangle
                            icon = {<FaIcons.FaUserFriends />}
                            title = "Usuarios"
                            content = "Total de usuarios"
                        />
                    </Link>
                </div>
            </div>

            
            {/* CONTENEDOR 2 */}
            <div className="container_2">                
                <Switch>
                    <Route path={`${path}`} exact>
                        <div className="donut">
                            <PieChart/>
                        </div>
                    </Route>
                    <Route path={`${path}/crear-usuario`}>
                        <div className="boxUser">
                            <div className="title">
                                Información Personal
                            </div>
                        </div>
                        <div className="form">
                            <FormCrearUsuario />
                        </div>
                    </Route>
                    <Route path={`${path}/usuarios`}>
                        <div className="table">
                            <Datatable
                                type = "USUARIOS"
                                rows = {userRows}
                                columns = {userComlumns}
                                onClick = {getNodeTD}
                            />
                        </div>                        
                    </Route>

                    <Route path={`${path}/equipos`}>
                        <div className="table">
                            <Datatable                                
                                rows = {deviceRows}
                                columns = {columns}                                
                            />
                        </div>
                    </Route>
                    <Route path={`${path}/*`}>
                        <div className="table">
                            ERROR
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
