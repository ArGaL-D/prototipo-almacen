import {useEffect, useState} from 'react';
import { QRCode} from 'react-qrcode-logo';
import axios from "axios";

import Input from "../components/fieldform/Input";
import Datatable from "../components/Datatable";

import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import "./styles/Buscar.css";
import Select from '../components/fieldform/Select';
import TextArea from '../components/fieldform/TextArea';
import Button from '../components/fieldform/Button';

export default function Buscar({setNavbarTitle}) {
    // variables
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [formData, setFormData] = useState({
        serial  : "",
        equipo  : "",
        marca   : "",
        modelo  : "",
        estatus : "",
        almacen : "",
        descripcion: ""
    });


    //Establecer título - Navbar
    useEffect(() => {
        setNavbarTitle("Buscar");  
    })
    //Traer datos - para la tabla
    useEffect(() => {
        axios.get('http://localhost:3001/buscar')
             .then(resp => {
                 setData(resp.data);
             })
             .catch(error => {
                 console.log(`Error en traer datos del servidor: ${error}`)
             })
    },[])

    // Tag - input - search
    const hadleSearchText = (e) => {
        setText(e.target.value.toUpperCase());
    }
    // Tags - input - Formulario
    const handleText = (e) => {        
        const tag = e.target; 

        if (tag.name === "estatus-modal"){
            setFormData({...formData, estatus: tag.options[tag.selectedIndex].text.toUpperCase()});
        }else if (tag.name === "almacen-modal"){
            setFormData({...formData, almacen: tag.options[tag.selectedIndex].text.toUpperCase()});
        }else if (tag.name === "descripcion"){
            setFormData({...formData, descripcion: tag.value.toUpperCase()});
        }else if (tag.name === "serial"){
            setFormData({...formData, editedSerial: tag.value.toUpperCase()});
        }else{
            setFormData({...formData, [e.target.name]: tag.value.toUpperCase()});
        }        
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

    // Abrir y cerrar - Modal
    const onCloseModal = () => setOpen(false);

    const onOpenModal = (e) => {
        if (e.currentTarget.className === "btn-qr"){
            setShowQr(true)
        } else{
            setShowQr(false)
        }        
        setOpen(true);

        const row = e.currentTarget.parentNode.parentNode.childNodes;
        setFormData({...formData,
                     editedSerial: row[0].textContent, //En caso de editar el 'serial'; tener de refrencia
                     serial : row[0].textContent,   //el serial guardado en la BD para el 'update'.
                     equipo : row[1].textContent,
                     marca  : row[2].textContent,
                     modelo : row[3].textContent,                    
                     estatus: row[4].textContent,
                     almacen: row[6].textContent,
                     descripcion: row[5].textContent                     
                    });   
    }    

    /* Actualizar datos */
    const updateData = async (e) => {
        e.preventDefault();
        const mensaje = "¿Estás seguro de editar (actualizar) los nuevos cambios?";
        const actualizar = window.confirm(mensaje);
        let succesfulUpdate = false;
        if(actualizar){
            try{
                const res = await axios.put('http://localhost:3001/editarEquipo', formData);
                succesfulUpdate = res.data.updated;
                if(succesfulUpdate){
                    window.location.reload();
                    console.log(res.data)
                }else{
                    alert("Hubo problemas en actualizar la información \n- Revise los mensajes"+
                    " del servidor para conocer más del problema");
                }
            }catch(error){
                console.log(error)
            }
        }else{
            setOpen(false);            
        }        
    }    

    /* Eliminar datos */
    const deleteData = (e) => {
        e.preventDefault();

        const row = e.currentTarget.parentNode.parentNode.childNodes;

        const mensaje = "ADVERTENCIA: Puede haber pérdida de información si el equipo ha interactuado con otros módulos."+
                        "\n(Si el equipo sólo fue registrado y no presenta ninguna actividad prosiga).";
        const eliminar = window.confirm(mensaje);

        if(eliminar){
            axios.delete(`http://localhost:3001/equipo/${row[0].textContent}`)
                 .catch(error => {
                     console.log(`Se produjo un -> ${error}`)
                 })
            const table = document.getElementById('table-equipo');
            table.deleteRow(row.rowIndex);
        }else{
            console.log("CERRAR")
        }
        
    }    

    return (
        <div className="buscar">
            <div className="container">
                <div className="box-input">
                    <Input 
                        id = "inpt-buscar"
                        name = "buscar"
                        type = "text"
                        icon = {<BsIcons.BsSearch/>}
                        onChange = {hadleSearchText}
                        placeholder = "Palabra clave"
                    />
                </div>
            </div>


            <div className="table">
                <Datatable 
                    type = "buscar"
                    data = {filteringData(data)} 
                    openModal = {onOpenModal}
                    deleteData = {deleteData}
                />
            </div>
            {
                showQr 
                ?
                    open ?
                        <div className="marco-modal">
                        <div className="qr">
                            <div className="icon-close" onClick={onCloseModal}>
                                <IoIcons.IoIosCloseCircle/>
                            </div>
                            <QRCode 
                                size  = {window.innerWidth<450 ? 220: 450}
                                value = { JSON.stringify({
                                    serial  : formData.serial,
                                    equipo  : formData.equipo,
                                    marca   : formData.marca,
                                    modelo  : formData.modelo,
                                    almacen : formData.almacen
                                })}                   
                                enableCORS = {true}                            
                                qrStyle    = {'squares'}
                                quietZone  = {10 }                            
                                fgColor    = {"#000406"}                        
                            />
                            </div>
                        </div>
                    :null
                    
                :open ?
                    <div className="marco-modal">
                        <form>
                            <div className="icon-close" onClick={onCloseModal}>
                                <IoIcons.IoIosCloseCircle/>
                            </div>
                      

                            <div className="inpt">
                                <Input 
                                    id = "inpt-serial"
                                    name = "serial"
                                    type = "text"
                                    icon = {<BsIcons.BsSearch/>}
                                    onChange = {handleText}
                                    placeholder = "Serial"
                                    defaultValue = {formData.serial}
                                 />                                                            
                            </div>
                            <div className="inpt">
                                <Input 
                                    id = "inpt-equipo"
                                    name = "equipo"
                                    type = "text"
                                    icon = {<BsIcons.BsSearch/>}
                                    onChange = {handleText}
                                    placeholder = "Equipo"
                                    defaultValue = {formData.equipo}
                                 />                                                            
                            </div>
                            <div className="inpt">
                                <Input 
                                    id = "inpt-marca"
                                    name = "marca"
                                    type = "text"
                                    icon = {<BsIcons.BsSearch/>}
                                    onChange = {handleText}
                                    placeholder = "Marca"
                                    defaultValue = {formData.marca}
                                    
                                 />                                                            
                            </div>
                            <div className="inpt">
                                <Input 
                                    id = "inpt-modelo"
                                    name = "modelo"
                                    type = "text"
                                    icon = {<BsIcons.BsSearch/>}
                                    onChange = {handleText}
                                    placeholder = "Modelo"
                                    defaultValue = {formData.modelo}
                                 />                                                            
                            </div>

                            <div className="dropdown">
                                <div className="dropdown1">
                                    <Select 
                                        id = "status-modal"
                                        name = "estatus-modal"                                    
                                        type = "STATUS"
                                        title = {`Estatus (${formData.estatus})`}
                                        onChange = {handleText}
                                    />
                                </div>
                                <div className="dropdown2">
                                    <Select 
                                        id = "status-modal"
                                        name = "estatus-modal"                                    
                                        type = "ALMACEN"
                                        title = {`Almacén (${formData.almacen})`}
                                        onChange = {handleText}
                                    />    
                                </div>                                                            
                            </div>

                            <div className="inpt">
                                <TextArea 
                                    name = "descripcion"
                                    onChange = {handleText}
                                    defaultValue = {formData.descripcion}
                                />                                                          
                            </div>
                            <Button                                 
                                title = "ACEPTAR"
                                onClick = {updateData}
                            />
                        </form>
                    </div>
                 :null
               
            }    
                    
                            


        </div>
    )
}
