import React,{useState} from 'react';
import { Modal } from 'react-responsive-modal';

import InputDark from '../field/InputDark';
import Select from '../field/Select';
import Button from '../field/Button';
import TextArea from '../field/TextArea';


import * as FaIcons   from "react-icons/fa";
import * as BiIcons   from "react-icons/bi";
import * as RiIcons   from "react-icons/ri";
import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import * as HiIcons   from "react-icons/hi";

import "./Form.css";
import Datatable from '../Datatable';

export default function FormReparacion(props) {


    const [open, setOpen] = useState(false);
    const onCloseModal = () => setOpen(false);
    const onOpenModal = () => setOpen(true);

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

    const handleText = (e) =>{
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSelect = (e) => {
        const tag = e.target;
        setFormData({...formData, [tag.name]: tag.options[tag.selectedIndex].text});
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
                    cursorPointer = {true}
                />
            </div>
            <div className="input">
                <InputDark 
                    id = 'equipo'
                    name = 'equipo'
                    icon = {<GiIcons.GiWifiRouter/>}                                      
                    onChange = {handleText}
                    placeholder = "Equipo"
                />
            </div>
            <div className="input">
                <InputDark
                    id = "hilo"
                    name = "hilo"
                    icon = {<BiIcons.BiGitBranch/>}                                       
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
                
            </Modal>                
                

        </form>
    )
    
}
