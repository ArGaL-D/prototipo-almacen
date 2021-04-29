import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

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

    const location = useLocation();

    const [openScanner, setOpenScanner] = useState(false);
    const [formData,setFormData] = useState({
        equipo : "",
        serial : "",
        nombre : "",
        fechaSalida : "",
        fechaEntrega: ""
    });

    // Establecer título actual - navbar
    useEffect(() => {
        setTitle('Entrega');
        sessionStorage.setItem('page','entrega');
    })

    // Establecer y bloquear campo fecha-salida
    useEffect(() =>{
        const tagFecha = document.getElementById('fecha-salida');

        tagFecha.valueAsDate = new Date(formData.fechaSalida);
        tagFecha.readOnly = true;

    },[formData]);

    // Guardar la ruta actual del componente
    useEffect(()=> {
        sessionStorage.setItem('currentPage',location.pathname);        
    });    

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

    const sendingData = async (e) =>{
        e.preventDefault();

        try {
            const resp = await axios.post('http://localhost:3001/entrega',formData);
            const existeEquipo = resp.data.existe_equipo;
            const equipoEntregado = resp.data.equipo_entregado;

            if (existeEquipo === false){
                Swal.fire({
                    icon: 'warning',
                    title: 'Uups...',
                    html: `El equipo <strong>[${formData.serial}]</strong> no ha sido registrado por el administrador.`,
                })
            }else{
                if (equipoEntregado === false){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `No se puedo registrar la entrega del equipo <strong>[${formData.serial}]</strong>. Probablemente, el equipo no ha sido préstado, o está en reparación.`,
                    })
                }else{
                    window.location.reload();
                }
            }
            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="module-entrega">
            <form onSubmit={sendingData}>
                <h3>Datos de entrega</h3>
                <div className="inpt">
                    <InputDark 
                        id = "entrega-nombre"
                        name = "nombre"
                        icon = {<FaIcons.FaUserFriends/>}                        
                        onChange = {handleInputText}
                        placeholder = "Nombre"
                        defaultValue = {formData.nombre}
                    />
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "entrega-equipo"
                        name = "equipo"
                        icon = {<GiIcons.GiWifiRouter/>}                        
                        onChange = {handleInputText}
                        placeholder = "Equipo"
                        defaultValue = {formData.equipo}
                    />
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "entrega-serial"
                        name = "serial"
                        icon = {<BiIcons.BiBarcodeReader/>}                        
                        onChange = {handleInputText}
                        placeholder = "Serial"
                        defaultValue = {formData.serial}           
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
                        defaultValue = {formData.fechaSalida}                 
                    /> 
                </div>
                <div className="inpt">
                    <InputDark 
                        id = "fecha-entrega"
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
