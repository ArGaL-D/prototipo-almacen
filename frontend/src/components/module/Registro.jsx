import {useEffect,useState} from 'react'
import { QRCode  } from 'react-qrcode-logo';

import { inputData } from "../config/InputData";
import InputDark from "../field/InputDark";
import Button from "../field/Button";
import TextArea from '../field/TextArea';
import Select from '../field/Select';

import "./styles/Registro.css";


export default function Registro({setTitle}) {

    //Establecer título actual - navbar
    useEffect(() => {
        const action = () =>{
            setTitle('Registro');
            sessionStorage.setItem('page','registro');
        }
        action()

        return() =>{
            action();
        }
    })

    const [modal,setModal] = useState(false);

    const [formData,setFormData] = useState({
        serial      : "",
        marca       : "",
        modelo      : "",
        equipo      : "",
        estatus     : "DISPONIBLE", // Por defecto
        almacen     : "DIRECCIÓN",  // Por defecto
        edificio    : 7, // Por defecto -> Almacén
        piso        : 1, // Por defecto -> Almacén
        descripcion : ""            
    });

    /* Contenido del QR */
    const qrData = {
        serial    : formData.serial,
        marca     : formData.marca,
        modelo    : formData.modelo,
        equipo    : formData.equipo
    };

    /* Ocultar||Mostrar modal-Qr*/
    const showModal = (e) =>{
        e.preventDefault();
        setModal(!modal);
    }

    //Recolectar valores del input-select
    const handleInputChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const handleSelectChange = (e) =>{
        const value = e.target.options[e.target.selectedIndex].text.toUpperCase();

        /* Asignar EDIFIICIO Y PISO de acuerdo al tipo del almacén */   
        if (value === "SITE"){
            setFormData( {...formData, almacen: value, edificio: 7, piso: 0} )
        }else if (value === "LABORATORIO CLÍNICOS" || value === "DIRECCIÓN"){
            setFormData( {...formData, almacen: value, edificio: 7, piso: 1} )
        }
        else if (value === "SITE PB" || value === "ESCALERAS" ){
            setFormData( {...formData, almacen: "ESCALERAS", edificio: 4, piso: 0} )
        }
        else if (value === "SITE 1P"){
            setFormData( {...formData, almacen: value, edificio: 4, piso: 1} )
        }
        else if (value === "SITE 2P"){
            setFormData( {...formData, almacen: value, edificio: 4, piso: 2} )
        }else{
            
            setFormData({...formData,
                [e.target.name]: value
            });        
        }

    }

    return (
        <div className="module_registrar">
            
            <form>
                <div className="container">
                    <h3>Datos</h3>
                    {
                        inputData.map((value,index)=>{
                        return(
                            <div key={index} className="input">
                                <InputDark 
                                    id = {value.id}
                                    type = "text"                            
                                    name = {value.name}
                                    icon = {value.icon}
                                    onChange = {handleInputChange}
                                    placeholder = {value.title}
                                    cursorPointer = {value.id==="idSerie" ? true : false}
                                />
                            </div>  
                        )  
                        })  
                    }

                    <div className="select">
                        <h5>Estado</h5> 
                        <Select 
                            id = "status-equipo"
                            name = "estatus"
                            type = "STATUS"
                            onChange = {handleSelectChange}
                        />
                    </div>

                    <div className="select almacen">
                        <h5>Almacén</h5> 
                        <Select 
                            id = "status-equipo"
                            name = "almacen"
                            type = "ALMACEN"
                            onChange = {handleSelectChange}
                        />
                    </div>

                    <div className="text-area">
                        <h3 className="h3title">Descripción</h3>
                        <TextArea 
                            name = {"descripcion"} 
                            onChange = {handleInputChange}
                            placeholder = "Descripción del quipo; en caso de contar con componentes extras o internos."                        
                        />                        
                    </div>

                    <div className="btn">
                        <Button
                            title = "QR-CODE"
                            onClick={showModal}
                        />
                    </div>                                
                </div>  
            </form>

            <div className={modal?"qr-modal active": "qr-modal"}>

                <div className={
                        formData.serial==="" || formData.marca==="" || 
                        formData.equipo==="" || formData.modelo===""
                        ? "marco":"marco active" }>
                    <QRCode 
                            size  = {220}
                            value = { JSON.stringify(qrData) }                   
                            enableCORS = {true}                            
                            qrStyle    = {'squares'}
                            quietZone  = {10 }                            
                            fgColor    = {"#000406"}                   
                            logoWidth  = {75 }
                            logoHeight = {150}
                            logoOpacity= {0.4}
                        />  
                </div>
                
                <div className="btn-modal">
                        <Button
                            title = "REGISTRAR"
                            onClick={showModal}
                        />
                </div>  
                
            </div>

        </div>
    )
}
