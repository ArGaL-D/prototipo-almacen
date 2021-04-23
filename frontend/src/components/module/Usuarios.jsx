import React,{useEffect, useState} from 'react';
import Rectangle from '../Rectangle';
import Datatable from "../Datatable";
import { Modal } from 'react-responsive-modal';

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
import InputDark from '../field/InputDark';
import Select from '../field/Select';
import Button from '../field/Button';

export default function Usuarios({setTitle}) {

    let {path} = useRouteMatch();

    const [deviceRows, setDeviceRows] = useState([]);
    const [userRows, setUserRows] = useState([]);
    const [open,setOpen] = useState(false);

    const [updateUser,setUpdateUser] = useState({
        id: "",
        usuario: "",
        nombre:  "",
        apellido: "",
        email: "",
        acceso: "",
        password: ""
    });

    const columns = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso",
        "Editar","Eliminar"        
    ];
    
    const userComlumns = [
        "ID", "USUARIO", "NOMBRE(S)", "APELLIDO(S)",
        "EMAIL", "ACCESO", "EDITAR", "ELIMINAR"
    ]


    const onCloseModal = () => setOpen(false);
    const onOpenModal  = () => setOpen(true);

    // Actualizar fila(tabla) - usuario
    const updateRow = (e) =>{
        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;

        setUpdateUser({
            ...updateUser,
            id      : tag_td[0].textContent,
            usuario : tag_td[1].textContent,
            nombre  : tag_td[2].textContent,
            apellido: tag_td[3].textContent,
            email   : tag_td[4].textContent,
            acceso  : tag_td[5].textContent
        });
        // Abrir Modal
        setOpen(true);
    }

    const handleText = (e) =>{
        const tag = e.target;
        if (tag.name === "acceso"){
            setUpdateUser({...updateUser,
                [tag.name]: tag.options[tag.selectedIndex].text
            });            
        }else{
            setUpdateUser({...updateUser,
                [e.tag.name]: tag.value
            });
        }

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
                                onClick = {updateRow}
                            />
                        </div>   

                        <Modal open={open} onClose={onCloseModal} center>                            
                            <form className="row_form">
                                <div className="user">
                                    <InputDark
                                        name = "usuario"
                                        placeholder = "Usuario"
                                        onChange = {handleText}
                                        defaultValue = {updateUser.usuario}
                                    />
                                </div>
                                <br/>
                                <div className="fullName">
                                    <InputDark
                                        name = "nombre"
                                        placeholder = "Nombre(s)"
                                        onChange = {handleText}
                                        defaultValue = {updateUser.nombre}
                                    />
                                    <br/>
                                    <InputDark
                                        name = "apellido"
                                        placeholder = "Apellido(s)"
                                        onChange = {handleText}
                                        defaultValue = {updateUser.apellido}
                                    />
                                </div>
                                <br/>
                                <div className="email">
                                    <InputDark
                                        name = "email"
                                        placeholder = "Email"
                                        onChange = {handleText}
                                        defaultValue = {updateUser.email}
                                    />
                                </div>
                                <br/>
                                <div className="acces">
                                    <Select
                                        name = "acceso"
                                        type = "ACCESO"
                                        onChange = {updateUser.acceso}
                                    />
                                </div>
                                <br/>
                                <div className="button">
                                    <Button
                                        title = "ACTUALIZAR"
                                    />
                                </div>
                            </form>
                        </Modal>                   
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
