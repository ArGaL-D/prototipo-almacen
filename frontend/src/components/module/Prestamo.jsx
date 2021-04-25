import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {QRCode} from 'react-qrcode-logo';
import axios from "axios";
import Swal from 'sweetalert2';

import InputDark from '../field/InputDark'
import Select from '../field/Select'
import Button from '../field/Button'

import "./styles/Prestamo.css";

import * as FaIcons   from "react-icons/fa";
import * as BiIcons   from "react-icons/bi";
import * as RiIcons   from "react-icons/ri";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import QrScanner from '../qrscanner/QrScanner';
import QrScannerEquipo from '../qrscanner/QrScannerEquipo';

export default function Prestamo({setTitle}) {

    const location = useLocation();

    const [openScanner1,setOpenScaner1] = useState(false);
    const [openScanner2,setOpenScaner2] = useState(false);
    const [openModalQr ,setOpenModalQr] = useState(false);

    const [typeForm,setTypeForm] = useState('Aumno');

    const [formData, setFormData] = useState({
        nombre:     "",
        clave :     "",
        serial:     "",
        equipo:     "",
        fecha :     "",
        piso:       "",
        aula:       "",
        edificio:   ""
    });

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Préstamo');
        sessionStorage.setItem('page','prestamo');
    })

    // Bloquear índice 0 - tag-select - tipo de formulario
    useEffect( ()=> {
        let select1 = document.getElementById('select-form');
        select1.options[0].disabled = true;
    });

    // Establecer fecha automática
    useEffect( ()=> {
        let currentDate = new Date();
        const inputFecha = document.getElementById('input-date');

        let month = currentDate.getUTCMonth() + 1;
        let day   = currentDate.getDate();
        let year  = currentDate.getUTCFullYear();

        const today = `${year}-${month}-${day}`;

        inputFecha.valueAsDate = new Date(today);
        inputFecha.readOnly = true;

        // Guardar fecha actual
        if (formData.fecha === ""){
            setFormData({...formData, fecha: today});
        }
    },[formData]);


    // Guardar la ruta actual del componente
    useEffect(()=> {
        sessionStorage.setItem('currentPage',location.pathname);        
    });


    //Abrir ventana modal Qr-scanner
    const showModalScanner1 = () =>{
        setOpenScaner1(true);
    }
    const showModalScanner2 = () =>{
        setOpenScaner2(true);
    }

    // Recargar página
    const reloadPage = (e) =>{
        e.preventDefault();
        window.location.reload();
    }

    //Obtener reultados del QR
    const getQrResults = (alumno,boleta) =>{
        setFormData({...formData, nombre:alumno, clave:boleta})
    }
    const getQrResults2 = (equipo_nombre,num_serie) =>{
        setFormData({...formData, equipo:equipo_nombre, serial:num_serie})
    }

    // Recolectar opción de tipo de formulario
    const handleSelectForm = (e) =>{
        const tag = e.target;
        setTypeForm( tag.options[tag.selectedIndex].text );
    }

    //Recoletar datos del formulario
    const handleText = (e) =>{
        const tag  = e.target;
        const name = e.target.name;

        if (name==="edificio"){
            setFormData({...formData, edificio: tag.selectedIndex});
        }else if (name==="piso"){
            setFormData({...formData, piso: tag.selectedIndex});
        }else if (name==="aula"){
            setFormData({...formData, aula: tag.options[tag.selectedIndex].text});
        }else{
            setFormData({...formData,[name]: tag.value.toUpperCase()});
        }
    }


    // Enviar datos al servidor
    const sendingData = async (e) =>{
        e.preventDefault();

        if (formData.edificio === "" || formData.piso === "" || formData.aula === ""){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: `Por favor, seleccione los campos faltantes de ubicación.`,
              })
        }else{
            try {
                const resp = await axios.post('http://localhost:3001/prestamo',formData);

                const existeEquipo = resp.data.existe_serial;
                const equipoDisponible = resp.data.equipo_disponible;
                const equipoStatus = resp.data.equipo_status;

                if (existeEquipo===false){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: `El equipo ${formData.equipo}-${formData.serial} no se encuentra registrado en el almacén. Seleccione otro equipo. `,
                      })
                }else if (equipoDisponible===false){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: `El equipo [${formData.serial}] no se encuentra disponible por el momento. ESTATUS: '${equipoStatus}'. `,
                      })
                }else{
                    setOpenModalQr(true);
                }
                

            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: `${error}`,
                    text: `Hubo problemas en registrar el préstamo. Probablemente, el servidor esté desactivado o haya conflictos internos en el servidor.`,
                  })
            }
        }
    }


    return (
        <div className="module_prestamo">
            
            <form id="formPrestamo" onSubmit={sendingData}>      
                <div className="select-form">
                    <Select
                        id = 'select-form'
                        type = "PRESTAMO"
                        onChange = {handleSelectForm}
                    />
                </div>      
                <h3>{typeForm}</h3>
                <div className="input">
                    <InputDark
                        id = "input-name"
                        name = "nombre"
                        icon = {<RiIcons.RiBodyScanFill/>}
                        onClick = {showModalScanner1}
                        onChange = {handleText}
                        placeholder = "Nombre"
                        defaultValue = {formData.nombre}
                        cursorPointer = {true}                        
                    />
                </div>
                <div className="input">
                    <InputDark
                        id = 'input-clave'
                        name = 'clave'
                        icon = {<FaIcons.FaIdCardAlt/>}
                        onChange = {handleText}                        
                        placeholder = {typeForm === "Alumno" ? "Boleta" : "Clave" }                        
                        defaultValue = {formData.clave}
                    />
                </div>
                <h3>Equipo</h3>
                <div className="input">
                    <InputDark
                        id = 'input-serial'
                        name = 'serial'
                        icon = {<BiIcons.BiBarcodeReader/>}
                        onClick = {showModalScanner2}
                        onChange = {handleText}
                        placeholder = "Serial"
                        defaultValue = {formData.serial}
                        cursorPointer = {true}
                    />
                </div>
                <div className="input">
                    <InputDark
                        id = 'input-equipo'
                        name = 'equipo'
                        icon = {<GiIcons.GiWifiRouter/>}
                        onChange = {handleText}
                        placeholder = "Equipo"
                        defaultValue = {formData.equipo}
                    />
                </div>

                <div className="input">
                    <InputDark
                        id = 'input-date'
                        name = 'fecha'
                        type = "date"
                        icon = {<MdIcons.MdDateRange/>}
                        onChange = {handleText}
                        placeholder = "Fecha de salida"
                    />
                </div>
                <h3>Ubicación</h3>
                <div className="selects">
                    <div className="select">
                        <Select
                            id = "select-edificio"
                            name = "edificio"
                            type = "EDIFICIO"
                            onChange = {handleText}
                            numEdificio = {formData.edificio}
                        />
                    </div>
                    <div className="select">
                        <Select
                            id = "select-piso"
                            name = "piso"
                            type = "PISO"
                            onChange = {handleText}
                            numEdificio = {formData.edificio}
                            numPiso = {formData.piso}
                        />
                    </div>
                    <div className="select">
                        <Select
                            id = "select-aula"
                            name = "aula"
                            type = "AULA"
                            onChange = {handleText}
                            numEdificio = {formData.edificio}
                            numPiso = {formData.piso}
                        />
                    </div>
                </div>
                <div className="button">
                    <Button
                        title = "ACEPTAR"
                    />
                </div>

                {
                    openScanner1 ?
                        <div className="qrScanner">
                            <QrScanner
                                type = {typeForm}
                                closeModalQr = {setOpenScaner1}
                                getQrResults = {getQrResults}
                            />
                        </div>
                    : null
                }
                {
                    openScanner2 ?
                        <div className="qrScanner">
                            <QrScannerEquipo
                                closeModalQr  = {setOpenScaner2}
                                getQrResults = {getQrResults2}
                            />
                        </div>
                    : null
                }
                <div className={openModalQr?"qrGenerator active": "qrGenerator"}>
                    <div className="marco">
                        <QRCode 
                            size  = {220}
                            value = { JSON.stringify({
                                nombre: formData.nombre,
                                equipo: formData.equipo,
                                serial: formData.serial,
                                fechaSalida: formData.fecha
                            })}                   
                            enableCORS = {true}                            
                            qrStyle    = {'squares'}
                            quietZone  = {10}                              
                        />
                    </div>
                    <Button
                        title = "FINALIZAR"
                        onClick = {reloadPage}
                    />  
                </div>
            </form>
        </div>
    )
}

