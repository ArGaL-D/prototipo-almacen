import { useEffect, useState } from 'react'
import {QRCode} from 'react-qrcode-logo';

import "./styles/Prestamo.css";
import Button from '../field/Button';
import FormPrestamo from '../forms/FormPrestamo';
import Select from '../field/Select';


export default function Prestamo({setTitle}) {


    const [openModal,setOpenModal] = useState(false);
    const [openForm,setOpenForm] = useState(false);
    const [typeForm,setTypeForm] = useState('Aumno');

    const [formData, setFormData] = useState({
        nombre:     "",
        clave :     "",
        serial:     "",
        equipo:     "",
        fecha :     "",
        piso:       "",
        aula:       "",
        edificio:   ""
    });

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Préstamo');
        sessionStorage.setItem('page','prestamo');
    })

    // Bloquear índice 0 - tag-select - tipo de formulario
    useEffect( ()=> {
        let select1 = document.getElementById('select-form');
        select1.options[0].disabled = true;
    });


    const handleSelectForm = (e) =>{
        const tag = e.target;
        setTypeForm( tag.options[tag.selectedIndex].text );
    }

    // Recargar la página
    const reloadPage = () =>{
        window.location.reload();
    }


    return (
        <div className="module_prestamo">
            
                <div className="formulario">
                    <div className="select-form">
                        <Select
                            id = 'select-form'
                            type = "PRESTAMO"
                            onChange = {handleSelectForm}
                        />
                    </div>

                    <FormPrestamo
                        type = {typeForm}
                        formData = {formData}
                        setFormData = {setFormData}
                        setOpenModal = {setOpenModal}
                    />   
                    <div className={openModal?"qrModal active": "qrModal"}>
                        <div className="marco">
                            <QRCode 
                                size  = {230}
                                value = { JSON.stringify
                                        ({
                                            nombre:formData.nombre, 
                                            equipo:formData.equipo, 
                                            serial: formData.serial, 
                                            fecha_salida:formData.fecha}
                                        )}                   
                                enableCORS = {true}                            
                                qrStyle    = {'squares'}
                                quietZone  = {10 } 
                            />  
                        </div>
                        <Button
                            title = "ACEPTAR"
                            onClick = {reloadPage}
                        />
                    </div>         
                </div>            

        </div>
    )
}

