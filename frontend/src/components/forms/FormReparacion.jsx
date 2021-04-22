import {useState} from 'react';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';

import Select from '../field/Select';
import Button  from '../field/Button';
import TextArea from '../field/TextArea';
import InputDark from '../field/InputDark';
import QrScannerEquipo from '../qrscanner/QrScannerEquipo';

import * as BiIcons   from "react-icons/bi";
import * as GoIcons   from "react-icons/go";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import * as HiIcons   from "react-icons/hi";

import "./Form.css";
import '../styles/Datatable.css';

export default function FormReparacion(props) {

    const [formData, setFormData] = useState({
        reporte: "",
        serial : "",
        equipo : "",
        hilo   : "", 
        estatus: "",
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
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSelect = (e) => {
        const tag = e.target;
        setFormData({...formData, [tag.name]: tag.options[tag.selectedIndex].text});
    }

    const getQrData = (equip0,serie) =>{
        setFormData({...formData,equipo: equip0, serial: serie});
    }
    return(
        <form className="form_rep">
            <h2>Reporte</h2>
            <div className="input">
                <InputDark
                    id = "reporte"
                    name = "reporte"
                    icon = {<HiIcons.HiPencilAlt/>}
                    onChange = {handleText}
                    placeholder = "Título"
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'serial'
                    name = 'serial'
                    icon = {<BiIcons.BiBarcodeReader/>}                                   
                    placeholder = "Serial"
                    onClick = {onOpenModal}
                    onChange = {handleText}
                    defaultValue = {formData.serial}
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'equipo'
                    name = 'equipo'
                    icon = {<GiIcons.GiWifiRouter/>}                                      
                    onChange = {handleText}
                    defaultValue = {formData.equipo}
                    placeholder = "Equipo"
                />
            </div>
            <div className="input">
                <InputDark
                    id = "hilo"
                    name = "hilo"
                    icon = {<BiIcons.BiGitBranch/>}      
                    onClick = {onOpenTable}                                 
                    onChange = {handleText}
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
                        onChange = {handleSelect}                    
                        placeholder = "Reparación"
                    />
                </div>
                <br/>
                <div className="select">
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
        "#","EQUIPO","SERIAL","HILO",
        "FECHA", "HORA"
    ];

    const handleText = (e) =>{
        setCodigo({...codigo, serial: e.target.value});
    }
    
    const sendingData = async() =>{
        try{
            const resp = await axios.post('http://localhost:3001/buscar-hilo',codigo);
            const hilo =  resp.data;
            
            setRow(hilo);
        }catch(error){
            console.log(error)
        }
    }
    

    return(
        <div>
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
            <div className="table_hilo">
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
                                    <td>{row.num_serie}</td>
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