import React,{useEffect, useState} from 'react';
import Rectangle from '../Rectangle';
import Datatable from "../Datatable";

import * as IoIcons from 'react-icons/io5';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

import "./styles/Usuarios.css";
import PieChart from '../PieChart';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import Form from '../Form';
import FormCrearUsuario from '../forms/FormCrearUsuario';

export default function Usuarios({setTitle}) {

    let {path} = useRouteMatch();

    const [rows, setRows] = useState([]);
    const columns = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso",
        "Editar","Eliminar"        
    ];
    const [userRows, setUserRows] = useState([]);
    const userComlumns = [
        "ID", "USUARIO", "NOMBRE(S)", "APELLIDO(S)",
        "EMAIL", "ACCESO", "CONTRASEÑA", "ELIMINAR"
    ]


    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
        
        console.log(path)
    })


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
                                rows = {userRows}
                                columns = {userComlumns}
                            />
                        </div>                        
                    </Route>

                    <Route path={`${path}/equipos`}>
                        <div className="table">
                            <Datatable
                                rows = {rows}
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
