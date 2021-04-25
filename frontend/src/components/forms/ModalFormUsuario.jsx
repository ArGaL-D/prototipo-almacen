import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';
import axios from "axios"

import InputDark from '../field/InputDark';
import Select from '../field/Select';
import Button from '../field/Button';

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";


export default function ModalFormUsuario({open,onCloseModal, updateUser, setUpdateUser}) {

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

    const sendingData = async (e) =>{
        e.preventDefault();

        const { value: password} = await Swal.fire({
            title: 'Contraseña',
            input: 'password',
            inputPlaceholder: 'Ingrese contraseña',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        })
        
        // Verificar password
        try{
            const token = localStorage.getItem('token');
            const resp1 = await axios.post('http://localhost:3001/verificar-usuario', {token, password});
            
            if (resp1.data.isAuth){

                if (resp1.data.successful_password){                    
                    const resp2 = await axios.put('http://localhost:3001/editar-usuario', updateUser);
 
                    if (resp2.data.successful_update){
                        onCloseModal();
                    }else {
                        Swal.fire({
                            icon: "warning",
                            title: "Problemas en actualizar",
                            text: "Probablemente, la estructura (código) de la BD ha cambiado."
                        });                    }
                }else{
                    Swal.fire({
                        icon: "warning",
                        title: "Contraseña",
                        text: "Incorrecta."
                    });
                }
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Veifique su contraseña."
                });
            }
        }catch(error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: `${error}`,
                text: "Probablemente, el servidor esté desactivado, o haya problemas internos en el servidor."
            });
        }    

    }

    return (
        <Modal open={open} onClose={onCloseModal} center>                            
        <form className="row_form" onSubmit={sendingData}>
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
                    type = "email"
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
