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
        </form>
    </Modal>
    )
}
