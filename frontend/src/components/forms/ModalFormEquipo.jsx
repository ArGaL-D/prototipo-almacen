import { useState} from 'react'
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';
import axios from "axios"

import InputDark from '../field/InputDark';
import Select from '../field/Select';
import Button from '../field/Button';
import TextArea from '../field/TextArea';

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";


export default function ModalFormEquipo({open,onCloseModal, updateDevice, setUpdateDevice}) {

    

    

    const sendingData = async (e) =>{
        e.preventDefault();
    }

    return (
        <Modal open={open} onClose={onCloseModal} center>
        <form className="row_form" onSubmit={sendingData}>
            <div className="user">
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "usuario"
                    placeholder = "Serial"
                    defaultValue = {updateDevice.serial}
                />
            </div>            
            <br/>
            <div className="user">
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "usuario"
                    placeholder = "equipo"
                    defaultValue = {updateDevice.equipo}
                />
            </div>            
            <br/>
            <div className="user">
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "usuario"
                    placeholder = "marca"
                    defaultValue = {updateDevice.marca}
                />
            </div>            
            <br/>
            <div className="user">
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "usuario"
                    placeholder = "modelo"
                    defaultValue = {updateDevice.modelo}
                />
            </div>            
            <br/>
            <div className="acces">
                <label>Estatus del equipo</label>
                <Select
                    name = "estatus"
                    type = "STATUS"
                />
            </div>
            <br/>
            <div className="acces">
                <label>Almacén</label>
                <Select
                    name = "estatus"
                    type = "ALMACEN"
                />
            </div>
            <br/>
            <div className="acces">
                <div className="box-selects">
                    <label>Edificio</label>
                    <Select
                        name = "estatus"
                        type = "ALMACEN_EDIFICIO"
                    />
                </div>
                <div className="box-selects">
                    <label>Piso</label>
                    <Select
                        name = "estatus"
                        type = "ALMACEN_PISO"
                    />
                </div>
            </div>
        </form>
    </Modal>
    )
}
