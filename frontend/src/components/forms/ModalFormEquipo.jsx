import { useState} from 'react'
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';
import axios from "axios"

import InputDark from '../field/InputDark';
import Select    from '../field/Select';
import Button    from '../field/Button';
import TextArea  from '../field/TextArea';

import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";


export default function ModalFormEquipo({open,onCloseModal, updateDevice, setUpdateDevice}) {

    
    const handleInput = (e) => {
        if(e.target.name === "descripcion"){
            setUpdateDevice({...updateDevice, [e.target.name]: e.target.value});
        }else{
            setUpdateDevice({...updateDevice, [e.target.name]: e.target.value.toUpperCase()});
        }        
    }
    const handleSelect = (e) => {
        const tag = e.target;
        setUpdateDevice({...updateDevice, [tag.name]: tag.options[tag.selectedIndex].text.toUpperCase() });
    }
    
    const sendingData = async (e) =>{
        e.preventDefault();
    }


    return (
        <Modal open={open} onClose={onCloseModal} center>
            <form className="row_form" onSubmit={sendingData}>
                <div className="user">
                    <InputDark
                        icon = {<BiIcons.BiBarcodeReader />}
                        name = "serial"
                        placeholder = "Serial"
                        defaultValue = {updateDevice.serial}
                        onChange = {handleInput}
                    />
                </div>            
                <br/>
                <div className="user">
                    <InputDark
                        icon = {<GiIcons.GiWifiRouter />}
                        name = "equipo"
                        placeholder = "equipo"
                        defaultValue = {updateDevice.equipo}
                        onChange = {handleInput}
                    />
                </div>            
                <br/>
                <div className="user">
                    <InputDark
                        icon = {<MdIcons.MdBorderColor />}
                        name = "marca"
                        placeholder = "marca"
                        defaultValue = {updateDevice.marca}
                        onChange = {handleInput}
                    />
                </div>            
                <br/>
                <div className="user">
                    <InputDark
                        icon = {<MdIcons.MdBorderColor />}
                        name = "modelo"
                        placeholder = "modelo"
                        defaultValue = {updateDevice.modelo}
                        onChange = {handleInput}
                    />
                </div>            
                <br/>
                <div className="acces">
                    <label>Estatus actual ({updateDevice.estatus})</label>
                    <Select
                        name = "estatus"
                        type = "STATUS"
                        onChange = {handleSelect}
                    />
                </div>
                <br/>
                <div className="acces">
                    <label>Almacén actual ({updateDevice.almacen})</label>
                    <Select
                        name = "estatus"
                        type = "ALMACEN"
                        onChange = {handleSelect}
                    />
                </div>
                <br/>

                <div className="selects">
                    <div className="box-select">
                        <label>Edificio actual ({updateDevice.edificio})</label>
                        <Select
                            name = "edificio"
                            type = "ALMACEN_EDIFICIO"
                            onChange = {handleSelect}
                        />
                    </div>
                    <div className="box-select num2">
                        <label>Piso actual ({updateDevice.piso})</label>
                        <Select
                            name = "piso"
                            type = "ALMACEN_PISO"
                            onChange = {handleSelect}
                        />
                    </div>
                </div>
                <br/>

                <div className="acces">
                    <label>Descripción</label>
                    <TextArea
                        name = "descripcion"
                        placeholder = "Descripción"
                        onChange = {handleInput}
                    />
                </div>
                <br/>

                <div className="btn">
                    <Button
                        title = "ACTUALIZAR"
                    />
                </div>
            </form>
        </Modal>
    )
}
