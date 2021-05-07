import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import axios from "axios";
import Swal  from 'sweetalert2';

import InputDark from '../field/InputDark';
import Datatable from '../Datatable';
import Select    from '../field/Select';

import * as GoIcons from "react-icons/go";
import "./styles/Ubicacion.css";

export default function Ubicacion({setTitle}) {

    const location = useLocation();

    const [text,setText] = useState("");
    const [num, setNum]  = useState( {edificio:"", piso:"", aula:""} );
    const [showSelects, setShowSelects] = useState(false);
    const [rowData, setRowData] = useState([]);
    const columnasUbicacion = [
        "#","EQUIPO", "SERIAL", "EDIFICIO",
        "PISO","AULA","FECHA DE SALIDA"
    ];

    //Obtener texto del buscador
    const handleText = (e) =>{
        setText(e.target.value.toUpperCase());
    }

    // Obtener valor de los selects
    const handleSelect = (e) =>{
        const tag = e.target;
        if ( tag.name === "aula"){
            setNum({...num,[tag.name]: tag.options[tag.selectedIndex].text});    
        } else{
            setNum({...num,[tag.name]: tag.selectedIndex});
        }        
    }

    //Bloquear y desbloqueat -selects
    const handleCheck = e => {
        const select1 = document.getElementById('dropdown-edificio');
        const select2 = document.getElementById('dropdown-piso');
        const select3 = document.getElementById('dropdown-aula');

        setShowSelects(e.target.checked);
        console.log(showSelects)

        if (!e.target.checked){
            select1.options[0].selected = true;
            select2.options[0].selected = true;
            select3.options[0].selected = true;
        }
    }

    // Buscar  equipo(nombre)
    const search = (rows) => {
    
        if (showSelects===false){
            return rows.filter( row => 
                row.equipo.indexOf(text) > -1     ||
                row.num_serie.indexOf(text) > -1  ||
                row.aula.toString().indexOf(text) > -1 
            )
        }else{
            return rows.filter( row => 
                row.equipo.indexOf(text) > -1    &&
                row.edificio.toString().indexOf(num.edificio.toString() ) > -1 &&
                row.piso.toString().indexOf(num.piso.toString() ) > -1   &&
                row.aula.toString().indexOf(num.aula.toString() ) > -1   
            )
        } 
    } 

    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Ubicación');
        sessionStorage.setItem('page','ubicacion');
    })

    // Obtener datos (filas) desde el servidor
    useEffect(() => {
        // Deshabilitar tag selects         
        document.getElementById('dropdown-edificio').disabled = !showSelects;
        document.getElementById('dropdown-piso').disabled = !showSelects;
        document.getElementById('dropdown-aula').disabled = !showSelects;
        
        // Pedir datos 'filas' al servidor
        axios.get('http://localhost:3001/ubicacion')
             .then( res => {
                 setRowData(res.data)
             })
             .catch( err => {
                 console.log(`-> ${err}`)
                 Swal.fire({
                    icon: 'error',
                    title: 'Uups...',
                    text: `No se pudo traer los datos de la tabla; probablemente hay conflictos en el servidor.`,
                })
             })
       
    }, [showSelects])

    // Bloquear índice 0 - tag-select - tipo de formulario
    useEffect( ()=> {
        const select1 = document.getElementById('dropdown-edificio');
        const select2 = document.getElementById('dropdown-piso');
        const select3 = document.getElementById('dropdown-aula')

        select1.options[0].disabled = true;
        select2.options[0].disabled = true;
        select3.options[0].disabled = true;
    });

    // Guardar la ruta actual del componente
    useEffect(()=> {
        sessionStorage.setItem('currentPage',location.pathname);        
    });
    
    
    return (
        <div className="module-ubicacion">            
            <div className="container_search">
                <div className="input">
                    <InputDark
                        icon = {<GoIcons.GoSearch/>}
                        placeholder = "Palabra clave"
                        onChange = {handleText}
                    />
                </div>

                <div className="checkbox">
                    <div className="marco">
                        <input
                            id = "checkbox"
                            name = "checkbox"
                            type = "checkbox"
                            onChange = {handleCheck}
                        />
                        <label htmlFor="checkbox">Habilitar</label>
                    </div>
                </div>

                <div className="selects">                
                    <div className="marco">
                        <div className="select">
                            <Select
                                id ="dropdown-edificio"
                                name = "edificio"
                                type = "EDIFICIO"
                                onChange = {handleSelect}
                                numEdificio = {num.edificio}
                            />
                        </div>
                        <div className="select">
                            <Select
                                id ="dropdown-piso"
                                name = "piso"
                                type = "PISO"                                
                                onChange = {handleSelect}
                                numPiso = {num.piso}
                                numEdificio = {num.edificio}                                
                            />
                        </div>
                        <div className="select">
                            <Select
                                id ="dropdown-aula"
                                name = "aula"
                                type = "AULA"
                                numPiso = {num.piso}
                                numEdificio = {num.edificio}
                                onChange = {handleSelect}
                            /> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="container_table">
                <div className="datatable">
                    <Datatable
                        type = "UBICACION"
                        columns = {columnasUbicacion}
                        rows = {search(rowData)}
                    />
                </div>
            </div>

        </div>
    )
}
