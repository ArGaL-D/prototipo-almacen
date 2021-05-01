import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import PieChart from '../PieChart';

import Imgs from '../Imgs';
import Rectangle from '../Rectangle';
import Datatable from "../Datatable";
import ModalFormEquipo from '../forms/ModalFormEquipo';
import ModalFormUsuario from '../forms/ModalFormUsuario';
import FormCrearUsuario from '../forms/FormCrearUsuario';

import * as IoIcons from 'react-icons/io5';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";

import "./styles/Usuarios.css";
import QrScannerEquipo from '../qrscanner/QrScannerEquipo';
import AccessDenied from '../AccessDenied';


export default function Usuarios({ setTitle }) {

    let { path } = useRouteMatch();
    const location = useLocation();
    
    const [deviceRows, setDeviceRows] = useState([]);
    const [userRows, setUserRows] = useState([]);    
    const [scanQr, setScanQr] = useState(false);
    const [access, setAccess] = useState(false);
    const [open, setOpen] = useState(false);

    const [qrData, setQrData] = useState({ serial: "", equipo: "" });

    const [updateUser, setUpdateUser] = useState({
        id: "",
        usuario: "",
        nombre: "",
        apellido: "",
        email: "",
        acceso: "No"
    });

    const [updateDevice, setUpdateDevice] = useState({
        editedSerial: "",
        serial: "",
        equipo: "",
        marca: "",
        modelo: "",
        estatus: "",
        descripcion: "",
        almacen: "",
        edificio: "",
        piso: ""
    });


    const columns = [
        "Serial", "Equipo", "Marca", "Modelo", "Estatus",
        "Desc", "Almacén", "Edificio", "Piso",
        "Editar", "Eliminar"
    ];

    const userComlumns = [
        "ID", "USUARIO", "NOMBRE(S)", "APELLIDO(S)",
        "EMAIL", "ACCESO", "CONTRASEÑA", "EDITAR", "ELIMINAR"
    ]    

    const onCloseModal = () => setOpen(false);

    // Actualizar fila(tabla) - usuario - Button
    const updateRow = (e) => {
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
    const updateRowDevice = (e) => {

        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;

        setUpdateDevice({
            ...updateDevice,
            editedSerial: tag_td[0].textContent,
            serial  : tag_td[0].textContent,
            equipo  : tag_td[1].textContent,
            marca   : tag_td[2].textContent,
            modelo  : tag_td[3].textContent,
            estatus : tag_td[4].textContent,
            almacen : tag_td[6].textContent,
            edificio: tag_td[7].textContent,
            piso    : tag_td[8].textContent,

        });
        // Abrir Modal
        setOpen(true);
    }

    // Eliminar fila (Equipo)
    const deleteRowDevice = async (e) => {
        e.preventDefault();

        // Obtener el serial
        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;
        const serial = tag_td[0].textContent;
        
        // Confirmar antes de eliminar
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            html: `<strong>Nota:</strong> si eliminas un equipo, ten encuenta que perderás información de otros módulos. Principalmente, de los equipos con estatus en <strong>REPARACIÓN</strong> y <strong>PRESTADO</strong>.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonColor: '#d33'

        })

        if (result.isConfirmed) {
            const { value: password } = await Swal.fire({
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
                const resp1 = await axios.post('http://localhost:3001/verificar-usuario', { token, password });
                
                if (resp1.data.isAuth) {
                    if (resp1.data.successful_password) {
                        const resp2 = await axios.delete(`http://localhost:3001/delete-equipo/${serial}`);

                        if (resp2.data.successful_delete === false) {
                            Swal.fire({
                                icon: "warning",
                                title: "Problemas en eliminar",
                                text: "Probablemente, la estructura (código) de la BD ha cambiado."
                            });
                        }else{
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Se ha eliminado correctamente.',
                                showConfirmButton: false,
                                timer: 1600
                            })
                            setTimeout(() =>{
                                window.location.reload()
                            },2000);
                        }
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Contraseña",
                            text: "Incorrecta."
                        });
                    }
                } else {
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
        }                      
    }

    // Eliminar fila (Usuario) - Button
    const deleteRowUser = async (e) => {
        e.preventDefault();
        // Obtener ID
        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;
        const idUser = tag_td[0].textContent;

        // Confirmar antes de eliminar
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará completamente el usuario.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonColor: '#d33'

        })

        if (result.isConfirmed) {
            const { value: password } = await Swal.fire({
                title: 'Contraseña',
                input: 'password',
                inputPlaceholder: 'Ingrese contraseña',
                inputAttributes: {
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
            })

            try {
                const token = localStorage.getItem('token');
                const resp1 = await axios.post('http://localhost:3001/verificar-usuario', { token, password });

                if (resp1.data.isAuth) {
                    if (resp1.data.successful_password) {

                        const resp2 = await axios.delete(`http://localhost:3001/delete-usuario/${idUser}`);

                        if (resp2.data.deleted_user === false) {
                            Swal.fire({
                                icon: "warning",
                                title: "Problemas en eliminar",
                                text: "Probablemente, la estructura (código) de la BD ha cambiado."
                            });
                        }

                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Contraseña",
                            text: "Incorrecta."
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hay problemas de autenticación de usuario."
                    });
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: error,
                    text: "Probablemente, el servidor esté desactivado, o haya problemas internos en el servidor."
                });
            }
        }
    }


    // Actualizar contraseña - USUARIO
    const updatePass = async (e) => {
        e.preventDefault();

        // Id del usuario para actualizar pass
        const tag_td = e.currentTarget.parentNode.parentNode.childNodes;
        const idUser = tag_td[0].textContent;

        const { value: formValues } = await Swal.fire({
            title: 'Contraseña Nueva',
            html:
                '<input id="swal-input1" type="password" class="swal2-input">' +
                '<lbel>Repetir Contraseña</label><input id="swal-input2" type="password" class="swal2-input">',
            focusConfirm: false,
            cancelButtonColor: '#d33',
            showCancelButton: true,

            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })

        if (formValues) {
            // Verificar el nuevo password
            if (formValues[0] === formValues[1]) {
                // Ingresar el password actual
                const { value: password } = await Swal.fire({
                    title: 'Ingrese su contraseña',
                    input: 'password',
                    inputPlaceholder: 'Ingrese contraseña',
                    cancelButtonColor: '#d33',
                    showCancelButton: true,
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                })
                // Validar password actual del usuario
                const token = localStorage.getItem('token');
                try {
                    const resp1 = await axios.post('http://localhost:3001/verificar-usuario', { token, password });

                    if (resp1.data.isAuth) {
                        if (resp1.data.successful_password) {

                            const newPass = formValues[0];
                            const resp2 = await axios.put('http://localhost:3001/editar-pass', { newPass, idUser });

                            if (resp2.data.successful_update === false) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Problemas en actualizar",
                                    text: "Probablemente, la estructura (código) de la BD ha cambiado."
                                });
                            }

                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "Contraseña",
                                text: "Incorrecta."
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hay problemas de autenticación de usuario."
                        });
                    }
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: error,
                        text: "Probablemente, el servidor esté desactivado, o haya problemas internos en el servidor."
                    });
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Las Contraseñas',
                    text: 'No coinciden.'
                })
            }
        }
    }

    // Escanear código QR y obtener resultados
    const scanQrCode = () => {
        setScanQr(!scanQr);
    }
    const getQrResults = (equip0, seriaL) => {
        setQrData({ ...qrData, serial: seriaL, equipo: equip0 });
    }

    // Filtrar equipos por SERIAL
    const filteringData = (rows) => {
        return rows.filter(row =>
            row.num_serie.indexOf(qrData.serial) > -1
        )
    }


    // -- - - --- - -- - -- -- --- --- --- -- 

    useEffect(() => {
        setTitle('Usuarios');
        sessionStorage.setItem('page', 'usuarios');
    })

    // Obtener los datos (filas) de los equipos
    useEffect(() => {

        axios.get('http://localhost:3001/equipos')
            .then((resp) => {
                setDeviceRows(resp.data);
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Uups...',
                    text: `No se pudo traer los datos de la tabla; probablemente hay conflictos en el servidor.`,
                })
            })
    }, []);

    // Obtener los datos (filas) de los usuarios
    useEffect(() => {

        axios.get('http://localhost:3001/usuarios')
            .then((resp) => {
                setUserRows(resp.data);
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Uups...',
                    text: `No se pudo traer los datos de la tabla; probablemente hay conflictos en el servidor.`,
                })
            })
    }, []);

    // Guardar la ruta actual del componente
    useEffect(() => {
        sessionStorage.setItem('currentPage', location.pathname);
    });

    // Obtener el tipo de usuario y acceso
    useEffect(() => {
        const readToken = async () => {
            const token = localStorage.getItem('token');
            try {
                const resp = await axios.get('http://localhost:3001/login/verificar', { headers: { 'Authorization': token } });
                
                const userAccess = resp.data.authData.userData.acceso;
                
                if(userAccess === "Si"){
                    setAccess(true)
                }
                

            } catch (error) {
                console.log(error)
            }
        }
        readToken();
    }, []);

    return (
      <>
       {
        !access 
        ?
            <AccessDenied />                        
        :            
        <div className="module-usuarios">
            {/* CONTENEDOR 1 */}
            <div className="container_1">
                <div className="rectangle">
                    <Link to={`${path}`}>
                        <Rectangle
                            icon={<FaIcons.FaChartPie />}
                            title="Gráfica"
                            content="Información"
                        />
                    </Link>
                </div>
                <div className="rectangle">
                    <Link to={`${path}/equipos`}>
                        <Rectangle
                            icon={<MdIcons.MdImportantDevices />}
                            title="Equipos"
                            content="Editar los equipos"
                        />
                    </Link>
                </div>
                <div className="rectangle">
                    <Link to={`${path}/crear-usuario`}>
                        <Rectangle
                            icon={<IoIcons.IoPersonAdd />}
                            title="Crear suario"
                            content="Total de usuarios"
                        />
                    </Link>
                </div>
                <div className="rectangle">
                    <Link to={`${path}/usuarios`}>
                        <Rectangle
                            icon={<FaIcons.FaUserFriends />}
                            title="Usuarios"
                            content="Total de usuarios"
                        />
                    </Link>
                </div>
                <div className="rectangle">
                    <Link to={`${path}/slider-imgs`}>
                        <Rectangle
                            icon={<FaIcons.FaImages />}
                            title="Slider"
                            content="Imágenes"
                        />
                    </Link>
                </div>
            </div>

            {/* CONTENEDOR 2 */}
            <div className="container_2">
                <Switch>
                    <Route path={`${path}`} exact>
                        <div className="donut">
                            <div className="pie_chart">
                                <PieChart />
                            </div>
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
                                type="USUARIOS"
                                rows={userRows}
                                columns={userComlumns}
                                updateRow={updateRow}
                                deleteRow={deleteRowUser}
                                updatePass={updatePass}
                                
                            />
                        </div>

                        <ModalFormUsuario
                            open={open}
                            onCloseModal={onCloseModal}
                            updateUser={updateUser}
                            setUpdateUser={setUpdateUser}
                        />
                    </Route>

                    <Route path={`${path}/equipos`}>
                        <div className="table">
                            <div className="btn_scanQr" onClick={scanQrCode}>
                                <ImIcons.ImQrcode />
                            </div>
                            <Datatable
                                type="EQUIPOS"
                                rows={filteringData(deviceRows)}
                                columns={columns}
                                updateRow={updateRowDevice}
                                deleteRow={deleteRowDevice}
                                
                            />
                        </div>

                        <ModalFormEquipo
                            open={open}
                            onCloseModal={onCloseModal}
                            updateDevice={updateDevice}
                            setUpdateDevice={setUpdateDevice}
                        />

                        {
                            scanQr ?
                                <div className="modal_qrScanner">
                                    <QrScannerEquipo
                                        closeModalQr={setScanQr}
                                        getQrResults={getQrResults}
                                    />
                                </div>
                                : null
                        }
                    </Route>

                    <Route path={`${path}/slider-imgs`}>
                        <div className="container_images">
                            <Imgs />
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
       }
      </>
    )
}