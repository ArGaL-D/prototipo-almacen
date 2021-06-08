import {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

import Select from '../field/Select';
import Button  from '../field/Button';
import TextArea from '../field/TextArea';
import InputDark from '../field/InputDark';
import QrScannerEquipo from '../qrscanner/QrScannerEquipo';

import * as BiIcons from "react-icons/bi";
import * as GoIcons from "react-icons/go";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";

import "./Form.css";
import '../styles/Datatable.css';

export default function FormReparacion() {

    const [formData, setFormData] = useState({
        reporte: "",
        serial : "",
        equipo : "",
        hilo   : "", 
        estatus: "REPARACIÓN",
        etapa  : "",
        fecha  : "",
        detalles: ""
    });

    const [open, setOpen] = useState(false);
    const [openTable, setOpenTable] = useState(false);

    const onCloseModal = () => setOpen(false);
    const onOpenModal  = () => setOpen(true);

    const onOpenTable  = () => setOpenTable(true);
    const onCloseTable = () => setOpenTable(false);

    const handleText = (e) =>{
        if (e.target.name === "hilo"){
            setFormData({
                ...formData, [e.target.name]: e.target.value
            });            
        }else{
            setFormData({
                ...formData, [e.target.name]: e.target.value.toUpperCase()
            });
        }
    }

    const handleSelect = (e) => {
        const tag = e.target;
        setFormData({...formData, [tag.name]: tag.options[tag.selectedIndex].text.toUpperCase()});
    }

    const getQrData = (equip0,serie) =>{
        setFormData({...formData,equipo: equip0, serial: serie});
    }

    const dataToServer = async (e) =>{
        e.preventDefault();
        try {
            const resp = await axios.post('/reparacion',formData);
            const equipo = resp.data.equipo;

            if (equipo){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se ha registrado el reporte.',
                    showConfirmButton: false,
                    timer: 1500
                })
                //setTimeout(1600,window.location.reload());
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: `El equipo no existe en el almacén, o no se ha registrado aún.`,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Establecer fecha automática
    useEffect( ()=> {
        let currentDate = new Date();
        const inputFecha = document.getElementById('inputFecha');

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

    return(
        <form className="form_rep" onSubmit={dataToServer}>
            <span className="subtitle_reporte">Reporte</span>
            <div className="input">
                <InputDark
                    id = "reporte"
                    name = "reporte"
                    icon = {<HiIcons.HiPencilAlt/>}
                    onChange = {handleText}
                    maxLength = {"50"}
                    placeholder = "Título"
                />
            </div>

            <div className="inputs_reportes">
                <div className="input">
                    <InputDark 
                        id = 'serial'
                        name = 'serial'
                        icon = {<BiIcons.BiBarcodeReader/>}                                   
                        placeholder = "Serial"
                        onClick = {onOpenModal}
                        onChange = {handleText}
                        maxLength = {"30"}
                        defaultValue = {formData.serial}
                        cursorPointer = {true}
                    />
                </div>
                <div className="input equipo">
                    <InputDark 
                        id = 'equipo'
                        name = 'equipo'
                        icon = {<GiIcons.GiWifiRouter/>}                                      
                        onChange = {handleText}
                        maxLength = {"35"}
                        defaultValue = {formData.equipo}
                        placeholder = "Equipo"
                    />
                </div>
            </div>

            <div className="input">
                <InputDark
                    id = "hilo"
                    name = "hilo"
                    icon = {<BiIcons.BiGitBranch/>}      
                    onClick = {onOpenTable}                                 
                    onChange = {handleText}
                    maxLength = {"10"}
                    placeholder = "Hilo"                    
                    cursorPointer = {true}
                />
            </div>

            <div className="select_reporte">
                <div className="select fase">
                    <Select
                        id = "selectReparacion"
                        name = "estatus"
                        type = "REPARACION"    
                        onChange = {handleSelect}                    
                        placeholder = "Reparación"
                    />
                </div>
                
                <div className="select etapa">
                    <Select
                        id = "selectEtapa"
                        name = "etapa"
                        type = "REPARACION_ETAPA" 
                        onChange = {handleSelect}                       
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
                    onChange = {handleText}                                  
                    placeholder = "Fecha actual"
                />
            </div>

            <div className="textArea">
                <TextArea
                    name = "detalles"
                    onChange = {handleText}
                    placeholder = "Detalles del reporte."
                />
            </div>

            <div className="button">
                <Button
                    title = "ACEPTAR"
                />
            </div>
            
            <Modal open={open} onClose={onCloseModal} center>
                <div className="qr_container">
                    <QrScannerEquipo
                        closeModalQr = {setOpen}
                        getQrResults = {getQrData}
                    />
                </div>                
            </Modal>     
            
            <Modal open={openTable} onClose={onCloseTable} center>
                <TablaHilo numSerie={formData.serial} />
            </Modal>     
        </form>
    )    
}



// Componente-Hilo
function TablaHilo ({numSerie}){
    
    const [rows,setRow]  = useState([]);
    const [codigo,setCodigo] = useState({serial: numSerie});

    const columns = [
        "#","SERIAL","EQUIPO","HILO",
        "FECHA", "HORA"
    ];

    const handleText = (e) =>{
        setCodigo({...codigo, serial: e.target.value});
    }
    
    const sendingData = async() =>{
        try{
            const resp = await axios.post('/buscar-hilo',codigo);
            const hilo =  resp.data;
            
            setRow(hilo);
        }catch(error){
            console.log(error)
        }
    }
    

    return(
        <div className="tabla_hilo">
            <div className="inpt_container">
                <div className="boxInput">
                    <InputDark
                        icon = {<GoIcons.GoSearch/>}
                        onChange = {handleText}
                        defaultValue = {codigo.serial}
                        placeholder = "Serial"
                    />
                </div>
                <div className="boxBtn">
                    <button onClick = {sendingData}> 
                        Buscar
                    </button>
                </div>
            </div>
            <div className="table-hilo">
                     <table className="table-equipo">
                        <thead>
                            <tr>
                                {
                                columns.map( (column,index)=>{
                                    return(
                                    <th key={index}>{column}</th>
                                    )  
                                })
                                }
                            </tr>

                        </thead>
                        <tbody>
                        {
                            rows.map( (row,index) =>{
                                return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{row.serial}</td>
                                    <td>{row.equipo}</td>
                                    <td>{row.hilo}</td>
                                    <td>{row.fecha}</td>
                                    <td>{row.hora}</td>
                                </tr>
                                ) 
                            })
                        }                       
                        </tbody>
                     </table>
                </div>
                 
        </div> 
    )
}