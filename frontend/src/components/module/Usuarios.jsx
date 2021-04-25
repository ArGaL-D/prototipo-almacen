import React,{useEffect, useState} from 'react';
import { Switch, Route, useRouteMatch, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import PieChart from '../PieChart';

import Rectangle from '../Rectangle';
import Datatable from "../Datatable";
import ModalFormUsuario from '../forms/ModalFormUsuario';
import ModalFormEquipo from '../forms/ModalFormEquipo';
import Form from '../Form';
import FormCrearUsuario from '../forms/FormCrearUsuario';


import * as IoIcons from 'react-icons/io5';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

import "./styles/Usuarios.css";


export default function Usuarios({setTitle}) {

    let {path} = useRouteMatch();
    const location = useLocation();

    const [deviceRows, setDeviceRows] = useState([]);
    const [userRows, setUserRows] = useState([]);
    const [open,setOpen] = useState(false);

    const [updateUser,setUpdateUser] = useState({
        id      : "",
        usuario : "",
        nombre  :  "",
        apellido: "",
        email   : "",
        acceso  : "No"
    });

    const [updateDevice, setUpdateDevice] = useState({
        editedSerial : "",
        serial      : "",
        equipo      : "",
        marca       : "",
        modelo      : "",
        estatus     : "",
        descripcion : "",
        almacen     : "",
        edificio    : "",
        piso        : ""
    });

    const columns = [
        "Serial", "Equipo","Marca","Modelo","Estatus",
        "Desc", "Almacén","Edificio","Piso",
        "Editar","Eliminar"        
    ];
    
    const userComlumns = [
        "ID", "USUARIO", "NOMBRE(S)", "APELLIDO(S)",
        "EMAIL", "ACCESO", "EDITAR", "ELIMINAR"
    ]


    const onCloseModal = () => setOpen(false);

    // Actualizar fila(tabla) - usuario - Button
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

    // Actualizar fila(tabla) - equipo - Button 
    const updateRowDevice = (e) =>{        
        
        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;

        setUpdateDevice({
            ...updateDevice,      
            editedSerial : tag_td[0].textContent,      
            serial   : tag_td[0].textContent,
            equipo   : tag_td[1].textContent,
            marca    : tag_td[2].textContent,
            modelo   : tag_td[3].textContent,
            estatus  : tag_td[4].textContent,
            almacen  : tag_td[6].textContent,  
            edificio : tag_td[7].textContent,  
            piso     : tag_td[8].textContent,  

        });
        // Abrir Modal
        
        setOpen(true);
        console.log(open)
    }
    
    // Eliminar fila (Equipo)
    const deleteRowDevice = async (e) => {
        e.preventDefault();

        // Obtener el serial
        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;

        setUpdateDevice({
            ...updateDevice,      
            serial : tag_td[0].textContent,
        })   

        const { value: password} = await Swal.fire({
            title: 'Contraseña',
            input: 'password',
            inputPlaceholder: 'Ingrese contraseña',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        })
        // Verificar password
        try {
            const token = localStorage.getItem('token');
            const resp1 = await axios.post('http://localhost:3001/verificar-usuario', {token, password});
            
            if (resp1.data.isAuth){
                if (resp1.data.successful_password){
                    const resp2 = await axios.delete(`http://localhost:3001/delete-equipo/${updateDevice.serial}`);

                    if(resp2.data.successful_delete === false){
                        Swal.fire({
                            icon: "warning",
                            title: "Problemas en eliminar",
                            text: "Probablemente, la estructura (código) de la BD ha cambiado."
                        });  
                    }
                }else{
                    Swal.fire({
                        icon: "warning",
                        title: "Contraseña",
                        text: "Incorrecta."
                    });
                }
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hay problemas de autenticación de usuario."
                });
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error,
                text: "Probablemente, el servidor esté desactivado, o haya problemas internos en el servidor."
            });
        }

        console.log("delete ")
    }

    // Eliminar fila (Usuario) - Button
    const deleteRow = async (e) =>{
        e.preventDefault();

        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;
        const idUser = tag_td[0].textContent;
        // Confirmar antes de eliminar
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará completamente el usuario.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonColor: '#d33'
           
          }).then((result) => {
            if (result.isConfirmed) {
                // Solicitar contraseña
                Swal.fire({
                    title: 'Contraseña',
                    input: 'password',
                    inputPlaceholder: 'Ingrese contraseña',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                }).then((result) => {                 
                    // Verificar contraseña
                    const data = {id: idUser, password: result.value}
                   
                    axios.post("http://localhost:3001/usuario-pass",data)
                        .then( (res) => {
                            const checkingPass = res.data.succesful_password;
                                                
                            if (checkingPass){
                                // Eliminar usuario        
                                axios.delete(`http://localhost:3001/usuario/${idUser}`)
                                    .then( (resp) => {
                                        const deletedUser = resp.data.deleted_user;

                                        if (deletedUser){
                                            onCloseModal();
                                        }else{
                                            Swal.fire({
                                                icon: "warning",
                                                title: "Oops!",
                                                text: "No se pudo eliminar el usuario."
                                            }); 
                                        }
                                    })
                                    .catch(error => {
                                        Swal.fire({
                                            icon: "error",
                                            title: error,
                                            text: "Probablemente, hay conflictos internos en el servidor. "
                                        });
                                    })
                            }else{
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Veifique su contraseña."
                                });
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: "error",
                                title: error,
                                text: "Probablemente, el servidor esté desactivado, o haya conflictos internos en el servidor."
                            });
                            console.log(error)
                        })
                })
                
            }
          })
    }

    useEffect(() => {
        setTitle('Usuarios');    
        sessionStorage.setItem('page','usuarios');
    })

    // Obtener los datos (filas) de los equipos
    useEffect(() =>{
        let unmounted = false;

        axios.get('http://localhost:3001/equipos')
             .then((resp)=>{
                 if(!unmounted){
                     setDeviceRows(resp.data);
                 }
             })
             .catch((error)=>{
                 console.log(error)
             })
        return () => { unmounted = true; }
    });

    // Obtener los datos (filas) de los usuarios
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

    // Guardar la ruta actual del componente
    useEffect(()=> {
        sessionStorage.setItem('currentPage',location.pathname);        
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
                                updateRow = {updateRow}
                                deleteRow ={deleteRow}
                            />
                        </div>   

                        <ModalFormUsuario
                            open={open}
                            onCloseModal={onCloseModal}
                            updateUser = {updateUser}
                            setUpdateUser = {setUpdateUser}                            
                        />                
                    </Route>

                    <Route path={`${path}/equipos`}>
                        <div className="table">
                            <Datatable     
                                type = "EQUIPOS"                  
                                rows = {deviceRows}
                                columns = {columns}    
                                updateRow = {updateRowDevice}       
                                deleteRow = {deleteRowDevice}        
                            />
                        </div>
                        
                        <ModalFormEquipo
                            open={open}
                            onCloseModal={onCloseModal}
                            updateDevice = {updateDevice}
                            setUpdateDevice = {setUpdateDevice} 
                        />
                        
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
