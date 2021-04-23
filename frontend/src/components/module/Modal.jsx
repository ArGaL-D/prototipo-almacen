import { useState} from 'react'
import { Modal } from 'react-responsive-modal';
import InputDark from '../field/InputDark';
import Select from '../field/Select';
import Button from '../field/Button';

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";


export default function ModalForm({open,onCloseModal, updateUser, setUpdateUser}) {

    const handleText = (e) =>{
        const tag = e.target;
        if (tag.name === "acceso"){
            setUpdateUser({...updateUser,
                [tag.name]: tag.options[tag.selectedIndex].text
            });            
        }else{
            setUpdateUser({...updateUser,
                [tag.name]: tag.value
            });
        }
    }

    return (
        <Modal open={open} onClose={onCloseModal} center>                            
        <form className="row_form">
            <div className="user">
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "usuario"
                    placeholder = "Usuario"
                    onChange = {handleText}
                    defaultValue = {updateUser.usuario}
                />
            </div>
            <br/><br/>
            <div className="fullName">
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "nombre"
                    placeholder = "Nombre(s)"
                    onChange = {handleText}
                    defaultValue = {updateUser.nombre}
                />
                <br/><br/>
                <InputDark
                    icon = {<FaIcons.FaUserEdit/>}
                    name = "apellido"
                    placeholder = "Apellido(s)"
                    onChange = {handleText}
                    defaultValue = {updateUser.apellido}
                />
            </div>
            <br/><br/>
            <div className="email">
                <InputDark
                    icon = {<MdIcons.MdEmail/>}
                    name = "email"
                    placeholder = "Email"
                    onChange = {handleText}
                    defaultValue = {updateUser.email}
                />
            </div>
            <br/>
            <div className="acces">
                <label>Acceso a configuraciones</label>
                <Select
                    name = "acceso"
                    type = "ACCESO"
                    onChange = {handleText}
                />
            </div>
            <br/><br/>
            <div className="button">
                <Button
                    title = "ACTUALIZAR"
                />
            </div>
        </form>
    </Modal> 
    )
}
