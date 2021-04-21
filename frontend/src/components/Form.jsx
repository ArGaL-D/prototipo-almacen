import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

import InputDark from './field/InputDark';
import Select from './field/Select';
import Button from './field/Button';

import * as FaIcons   from "react-icons/fa";
import * as BiIcons   from "react-icons/bi";
import * as RiIcons   from "react-icons/ri";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import * as HiIcons   from "react-icons/hi";

import "./styles/Form.css";
import TextArea from './field/TextArea';


export default function Form({type,qrData,setQrData,showModal,setOpenModal}) {
    
    return (
        <>
        {
            {
                ALUMNO: <FormPrestamo 
                                type={type}  
                                qrData={qrData} 
                                setQrData={setQrData} 
                        />,
                PROFESOR: <FormPrestamo 
                                type={type}  
                                qrData={qrData} 
                                setQrData={setQrData} 
                        />, 
                ASIGNACION: <FormPrestamo 
                                type={type}  
                                qrData={qrData} 
                                setQrData={setQrData}
                                setOpenModal = {setOpenModal}
                         />,      
                REPORTE: <FormReparacion showModal={showModal}/>,
                USUARIO: <FormUsuario showModal={showModal}/>
            }[type]
        }
            
        </>
    )
}

// Formulario del módulo PRÉSTAMO

function FormPrestamo ({type, qrData, setQrData,setOpenModal}){

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

    // Bloquear índice 0 a los tag-select
    useEffect( ()=> {
        let select1 = document.getElementById('select-edificio');
        let select2 = document.getElementById('select-piso');
        let select3 = document.getElementById('select-aula');
        
        select1.options[0].disabled = true;
        select2.options[0].disabled = true;
        select3.options[0].disabled = true;

    });

    //Recoletar datos de los campos-formulario
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
        //Agregar datos al Qr
        if (name === "nombre" || name === "equipo" || name === "serial" || name === "fecha"){
            setQrData({...qrData, [tag.name]: tag.value.toUpperCase()})
        }   
    }

    // Enviar datos al servidor
    const sendingData = async (e) =>{
        e.preventDefault();

        if (formData.edificio === "" || formData.piso === "2" || formData.aula === ""){
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
                        text: `El equipo [${formData.serial}] no se encuentra disponible por el momento, o no se ha registrado su entrega del préstamo. `,
                      })
                }                
                setOpenModal(true);    

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
    
    return(
        <form id="form" onSubmit={sendingData}>
            <h3>{type}</h3>
            <div className="input">
                <InputDark 
                    id = "input-name"
                    name = "nombre"
                    icon = {<RiIcons.RiBodyScanFill/>}
                    onChange = {handleText}                   
                    placeholder = "Nombre"
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'input-clave'
                    name = 'clave'
                    icon = {<FaIcons.FaIdCardAlt/>}
                    onChange = {handleText}                   
                    placeholder = {type === "ALUMNO" ? "Boleta" : "Clave" }
                />
            </div>  
            <h3>Equipo</h3>
            <div className="input">
                <InputDark 
                    id = 'input-serial'
                    name = 'serial'
                    icon = {<BiIcons.BiBarcodeReader/>}
                    onChange = {handleText}                   
                    placeholder = "Serial"
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
            <div className="button">
                <Button
                    title = "FINALIZAR"
                />
            </div>
        </form>
    )
}

// Formulario del módulo REPARACIÓN

function FormReparacion (props){
    return(
        <form id="form">
            <h2>Reporte</h2>
            <div className="input">
                <InputDark
                    id = "reporte"
                    name = "reporte"
                    icon = {<HiIcons.HiPencilAlt/>}
                    placeholder = "Título"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'serial'
                    name = 'serial'
                    icon = {<BiIcons.BiBarcodeReader/>}                                   
                    placeholder = "Serial"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'equipo'
                    name = 'equipo'
                    icon = {<GiIcons.GiWifiRouter/>}                                      
                    placeholder = "Equipo"
                />
            </div>
            <div className="input">
                <InputDark
                    id = "hilo"
                    name = "hilo"
                    icon = {<BiIcons.BiGitBranch/>}
                    onClick = {props.showModal}
                    placeholder = "Hilo"
                    cursorPointer = {true}
                />
            </div>

            <div className="select-options">
                <div className="select">
                    <Select
                        id = "selectReparacion"
                        name = "reparacion"
                        type = "REPARACION"
                        placeholder = "Reparación"
                    />
                </div>
                <br/>
                <div className="select">
                    <Select
                        id = "selectEtapa"
                        name = "etapa"
                        type = "REPARACION_ETAPA"
                        placeholder = "Estatus"
                    />            
                </div>
            </div>

            <div className="input">
                <InputDark 
                    id = 'inputFecha'
                    name = 'fecha'
                    type = "date"
                    icon = {<MdIcons.MdDateRange/>}                                    
                    placeholder = "Fecha actual"
                />
            </div>

            <div className="textArea">
                <TextArea
                    placeholder = "Detalles del reporte."
                />
            </div>

            <div className="button">
                <Button
                    title = "ACEPTAR"
                />
            </div>

        </form>
    )
}

// Formulario de CREAR USUARIO - módulo Admin

function FormUsuario (){
    return(
        <form id="form">
            <br/>
            <div className="input">
                <InputDark 
                    id = 'inputUsuario'
                    name = 'usuario'
                    icon = {<FaIcons.FaUserAlt/>}                         
                    placeholder = "Usuario"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputNombres'
                    name = 'nombres'
                    icon = {<FaIcons.FaUserEdit/>}                                     
                    placeholder = "Nombre(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputApellidos'
                    name = 'apellidos'
                    icon = {<FaIcons.FaUserEdit/>}                                      
                    placeholder = "Apellido(s)"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputEmail'
                    name = 'email'
                    type = 'text'
                    icon = {<MdIcons.MdEmail/>}                                      
                    placeholder = "Email"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputPassword'
                    name = 'password'
                    type = 'password'
                    icon = {<FaIcons.FaKey/>}                                     
                    placeholder = "Contraseña"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'inputRepeatPass'
                    name = 'repeatPass'
                    type = 'password'
                    icon = {<FaIcons.FaKey/>}                                     
                    placeholder = "Confirmar contraseña"
                />
            </div>
            <div className="select">
                <span>Permisos</span>
                <Select
                    id = "selectEtapa"
                    name = "etapa"
                    type = "REPARACION_ETAPA"
                    placeholder = "Estatus"
                />            
            </div>
            <div className="button">
                <Button
                    title = "REGISTRAR"
                />
            </div>
        </form>
    )
}

