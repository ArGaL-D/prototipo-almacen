import React,{useEffect, useState} from 'react'
import InputDark from '../field/InputDark';
import Button from '../field/Button';

import * as FaIcons   from "react-icons/fa";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import * as BiIcons   from "react-icons/bi";
import * as ImIcons   from "react-icons/im";


import "./styles/Entrega.css";
import QrScannerEntrega from '../qrscanner/QrScannerEntrega';

export default function Entrega({setTitle}) {

    const [openScanner, setOpenScanner] = useState(false);
    const [formData,setFormData] = useState({
        equipo : "",
        serial : "",
        nombre : "",
        fechaSalida : "",
        fechaEntrega: ""
    });

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Entrega');
        sessionStorage.setItem('page','entrega');
    })

    // Mostrar modal - scanner
    const showScanner = () =>{
        setOpenScanner(!openScanner);
    }

    // Obtener resultados del Scanner-Qr
    const getQrResults = (persona,equip0,serie,fecha) =>{
        setFormData({...formData,
                nombre: persona,
                equipo: equip0,
                serial: serie,
                fechaSalida: fecha
        });
    }

    const handleInputText = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value.toUpperCase()});
    }

    return (
        <div className="module-entrega">
            <form>
                <h3>Datos de entrega</h3>
                <div className="inpt">
                    <InputDark 
                        id = "entrega-nombre"
                        name = "nombre"
                        icon = {<FaIcons.FaUserFriends/>}                        
                        onChange = {handleInputText}
                        placeholder = "Nombre"
                    />
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "entrega-equipo"
                        name = "equipo"
                        icon = {<GiIcons.GiWifiRouter/>}                        
                        onChange = {handleInputText}
                        placeholder = "Equipo"
                    />
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "entrega-serial"
                        name = "serial"
                        icon = {<BiIcons.BiBarcodeReader/>}                        
                        onChange = {handleInputText}
                        placeholder = "Serial"                    
                    />   
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "fecha-salida"
                        name = "fechaSalida"
                        icon = {<MdIcons.MdDateRange/>}   
                        type = "date"
                        onChange = {handleInputText}                        
                        placeholder = "Fecha de salida"                    
                    /> 
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "fecha-salida"
                        name = "fechaEntrega"
                        icon = {<MdIcons.MdDateRange/>}   
                        type = "date"                     
                        onChange = {handleInputText}                        
                        placeholder = "Fecha de entrega"                    
                    /> 
                </div>                
                <Button
                    title = "ENTREGAR"
                />
                { openScanner?
                    <div className="qrContainer">
                        <QrScannerEntrega
                            closeModalQr = {setOpenScanner}
                            getQrResults = {getQrResults}
                        />
                    </div>
                  :null
                }
            </form>

            <div className="icon-scan" onClick={showScanner}>
                <ImIcons.ImQrcode/>
            </div>
        </div>
    )
}
