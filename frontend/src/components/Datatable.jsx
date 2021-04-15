import React from 'react'
import * as AiIcons   from "react-icons/ai";
import * as MdIcons   from "react-icons/md";
import * as ImIcons   from "react-icons/im";
import * as GrIcons   from "react-icons/gr";

import "./styles/Datatable.css";


export default function Datatable({columns, rows ,type,openModal,deleteData}) {
    return (
        <table className="table-equipo">
            <thead>
                <tr>
                    {
                        columns.map((column,index) =>{
                          return(
                            <th key={index}>{column}</th>
                          )   
                        })
                    }
                </tr>
            </thead>            
            {
                {
                    BUSCAR: <tbodyBuscar 
                                rows={rows}
                                openModal={openModal}
                                deleteData={deleteData}
                            />,
                    UBICACION: <tbodyUbicacion rows={rows} />
                }[type]
            }

        </table>
    )
}


function tbodyBuscar (props){
    return(
        <tbody>
        {
          props.rows.map( (row,index) =>{
            return(
              <tr key={index}>
                 <td>{row.num_serie}</td>  
                 <td>{row.equipo}</td>  
                 <td>{row.marca}</td>  
                 <td>{row.modelo}</td>  
                 <td>{row.estatus}</td>  
                 <td>
                    <div className="td-descrip">
                        {<GrIcons.GrTextAlignFull/>}
                        <TooltipText 
                            text={row.descripcion===""
                                ? "Sin descriṕción."
                                :row.descripcion}
                        />
                    </div>                                    
                 </td>
                 <td>{row.almacen}</td>
                 <td>{row.edificio}</td>
                 <td>{row.piso}</td>
                 <td>
                    <button className="btn-qr"  onClick={props.openModal}>
                        <ImIcons.ImQrcode/>
                    </button>
                 </td>                                
                 <td>
                    <button className="btn-edit" onClick={props.openModal}>
                        <AiIcons.AiTwotoneEdit/>
                    </button>
                 </td>
                 <td>
                    <button className="btn-del"  onClick={props.deleteData}>
                        <MdIcons.MdDelete/>
                    </button>
                 </td>                 
              </tr>  
            )  
          })
        }  
      </tbody>
    )
}

function tbodyUbicacion (props){
    return(
        <tbody>
        {
          props.rows.map( (row,index) =>{
            return(
              <tr key={index}>
                 <td>{row.equipo}</td>  
                 <td>{row.num_serie}</td> 
                 <td>{row.edificio}</td>                   
                 <td>{row.piso}</td>  
                 <td>{row.aula}</td>  
                 <td>{row.fecha_salida}</td>  
              </tr>  
            )  
          })
        }  
      </tbody>
    )
}


const TooltipText = (props) => {
    return(
        <div className="tooltipText">
            <p>{props.text}</p>
        </div>
    )
}