import {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { QRCode} from 'react-qrcode-logo';
import { withRouter, useLocation} from 'react-router-dom'

import Swal from 'sweetalert2';
import axios from "axios";

import InputDark from "../field/InputDark";
import Datatable from "../Datatable";

import * as GoIcons from "react-icons/go";

import "./styles/Busqueda.css";

function Buscar({setTitle}) {

    const location = useLocation();

    const [showQr, setShowQr] = useState(false);
    const [open, setOpen] = useState(false);
    const [text,setText]  = useState("");
    //Filas -
    const [rowData,setRowData] = useState([]);
    //Columnas - tabla buscar
    const columnasBuscar = [
        "#","Serial", "Equipo","Marca","Modelo","Estatus",
        "Descrip", "Almacén","Edificio","Piso","Qr"        
    ];

    const [qrData,setQrData] = useState({
        serial  : "",
        equipo  : "",
        marca   : "",
        modelo  : "",
        almacen : ""
    });

    // Abrir modal - Qr
    const onOpenModal = (e) => {
        if (e.currentTarget.className === "btn-qr"){
            setShowQr(true)
        } else{
            setShowQr(false)
        }        
        setOpen(true);

        const row = e.currentTarget.parentNode.parentNode.childNodes;
        setQrData({...qrData,                    
                     serial : row[1].textContent,   //el serial guardado en la BD para el 'update'.
                     equipo : row[2].textContent,
                     marca  : row[3].textContent,
                     modelo : row[4].textContent,                    
                     almacen: row[7].textContent,                   
        });   
    }
    
    const onCloseModal = () => setOpen(false);

    // Obtener texto del input
    const handleText = (e) =>{
        setText(e.target.value.toUpperCase() );
    }

    // Regresa un arreglo con los nuevos elmentos filtrados.
    const filteringData = (rows) => {
        return rows.filter( row => 
                    row.num_serie.indexOf(text) > -1 ||
                    row.equipo.indexOf(text) > -1    ||
                    row.marca.indexOf(text) > -1     ||
                    row.modelo.indexOf(text) > -1    ||
                    row.estatus.indexOf(text) > -1   ||
                    row.almacen.indexOf(text) > -1   ||
                    row.edificio.toString().indexOf(text) > -1 ||
                    row.piso.toString().indexOf(text) > -1 
        )
    }    
    // Establecer título actual - navbar
    useEffect(() => {
        setTitle('Búsqueda');
        sessionStorage.setItem('page','buscar');
    })

    // Traer datos(filas) del servidor
    useEffect(() => {
        let unmounted = false;

        axios.get('http://localhost:3001/equipos')
                .then(resp => {
                if (!unmounted){
                    setRowData(resp.data);
                }                 
                })
                .catch(error => {
                    console.log(`Error en traer datos del servidor: ${error}`)
                    Swal.fire({
                        icon: 'error',
                        title: 'Uups...',
                        text: `No se pudo traer los datos de la tabla; probablemente hay conflictos en el servidor.`,
                    })
                })
        return () => {unmounted = true}
    })

    // Guardar la ruta actual del componente
    useEffect(()=> {
        sessionStorage.setItem('currentPage',location.pathname);        
    });

    return (
        <div className="module_buscar">
            
                <div className="input">
                    <InputDark
                        icon = {<GoIcons.GoSearch/>}
                        onChange = {handleText}
                        placeholder = "Palabra clave"
                    />
                </div>
                <div className="table">
                    <Datatable 
                        type = "EQUIPOS_BUSCAR"
                        rows = {filteringData(rowData)}
                        columns={columnasBuscar}
                        onOpenModal = {onOpenModal}
                    />
                </div>
                {
                    showQr 
                    ?
                    <Modal open={open} onClose={onCloseModal} center>
                        <QRCode 
                            size  = {window.innerWidth<450 ? 220: 450}
                            value = { JSON.stringify(qrData)}                   
                            enableCORS = {true}                            
                            qrStyle    = {'squares'}
                            quietZone  = {10 }                            
                            fgColor    = {"#000406"}                        
                        />
                    </Modal>
                    : null
                }

        </div>
    )
}

export default withRouter(Buscar);
