import * as GiIcons   from "react-icons/gi";
import * as MdIcons   from "react-icons/md";
import * as BiIcons   from "react-icons/bi";

/* 
    ##########
    #  NOTA  #
    ##########
    No cambiar valores de: 'name' y 'id'
*/

export const inputData = [
    {
        placeholder: "Nombre del equipo",
        title: "Equipo",        
        name : "equipo",
        icon : <GiIcons.GiWifiRouter />,
        id   :  "idEquipo"
    },
    {
        placeholder: "Marca del equipo",
        title: "Marca",        
        name : "marca",
        icon : <MdIcons.MdBorderColor />,
        id   : "idMarca"
    },
    {
        placeholder: "Modelo del equipo",
        title: "Modelo",        
        name : "modelo",
        icon : <MdIcons.MdBorderColor />,
        id   : "idModelo"
    },
    {
        placeholder: "No. de serie",
        title: "Serial",        
        name : "serial",
        icon : <BiIcons.BiBarcodeReader />,
        id   : "idSerie"
    }
];