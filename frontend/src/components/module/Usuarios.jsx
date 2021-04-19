import Cookies from 'js-cookie';
import React,{useEffect} from 'react';
import Rectangle from '../Rectangle';
import Datatable from "../Datatable";
import InputDark from "../field/InputDark";

import * as IoIcons from 'react-icons/io5';
import * as GoIcons from "react-icons/go";

import "./styles/Usuarios.css";
import PieChart from '../PieChart';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import Form from '../Form';

export default function Usuarios({setTitle}) {

    let {path} = useRouteMatch();

    const columns = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso",
        "Editar","Eliminar"        
    ];

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
                            icon = {<IoIcons.IoPersonAdd />}
                            title = "Gráficas"
                            content = "Información"
                        />
                    </Link>
                </div>    
                <div className="rectangle">
                    <Link to={`${path}/equipos`}>
                        <Rectangle
                            icon = {<IoIcons.IoPersonAdd />}
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
                            icon = {<IoIcons.IoPersonAdd />}
                            title = "Usuarios"
                            content = "Total de usuarios"
                        />
                    </Link>
                </div>
                <div className="rectangle">
                    <Link to={`${path}/administrador`}>
                        <Rectangle
                            icon = {<IoIcons.IoPersonAdd />}
                            title = "Administrador"
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
                            <div className="form">
                                <Form
                                    type = "USUARIO"
                                />
                            </div>
                        </div>
                    </Route>
                    <Route path={`${path}/usuarios`}>
                        <h2>Usuarios</h2>
                    </Route>
                    <Route path={`${path}/administrador`}>
                        <h2>Administrador</h2>
                    </Route>
                    <Route path={`${path}/equipos`}>
                        <div className="table">
                            <Datatable
                                rows = {null}
                                columns = {columns}
                            />
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
