import React from 'react';
import Swal from 'sweetalert2';

import * as AiIcons   from "react-icons/ai";
import * as MdIcons   from "react-icons/md";
import * as ImIcons   from "react-icons/im";
import * as GrIcons   from "react-icons/gr";

import "./styles/Datatable.css";


export default function Datatable({columns, rows ,type, onOpenModal}) {

    const mostrarDescrpcn = () =>{
      Swal.fire("hola")
    }

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
            
            <tbody>
              {
                {
                    BUSCAR: rows.map( (row,index) =>{
                            return(
                              <tr key={index}>
                                <td>{index + 1 }</td>  
                                <td>{row.num_serie}</td>  
                                <td>{row.equipo}</td>  
                                <td>{row.marca}</td>  
                                <td>{row.modelo}</td>
                                <td>{row.estatus}</td>
                                <td>
                                   <div className="td-descrip">
                                        {<GrIcons.GrTextAlignFull/>}
                                        <TooltipText text={row.descripcion===""? "Sin descriṕción.":row.descripcion} />
                                    </div>  
                                </td>  
                                <td>{row.almacen}</td> 
                                <td>{row.edificio}</td>
                                <td>{row.piso}</td>
                                <td>
                                  <button className="btn-qr" onClick={onOpenModal}>
                                      <ImIcons.ImQrcode/>
                                  </button>  
                                </td>  
                              </tr>  
                            )  
                          }),
                    UBICACION: rows.map( (row,index) =>{
                              return(
                                <tr key={index}>
                                  <td>{index + 1}</td>  
                                  <td>{row.equipo}</td>  
                                  <td>{row.num_serie}</td> 
                                  <td>{row.edificio}</td>                   
                                  <td>{row.piso}</td>  
                                  <td>{row.aula}</td>  
                                  <td>{row.fecha_salida}</td>  
                                </tr>  
                              )  
                            }),
                    HILO:  rows.map( (row,index) =>{
                      return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.num_serie}</td>
                            <td>{row.equipo}</td>
                            <td>{row.hilo}</td>
                            <td>{row.fecha}</td>
                            <td>{row.hora}</td>
                        </tr>
                      )                               
                    })    
                }[type]
              }
            </tbody>     
        </table>
    )
}


function tbodyBuscar ({rows}){
    return(
        <tbody>
        {
          rows.map( (row,index) =>{
            return(
              <tr key={index}>
                 <td>{row.num_serie}</td>  
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

function tbodyHilo (props){
  return(
      <tbody>
      {
        props.rows.map( (row,index) =>{
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{row.num_serie}</td>
              <td>{row.equipo}</td>
              <td>{row.hilo}</td>
              <td>{row.fecha}</td>
              <td>{row.hora}</td>
            </tr>  
          )  
        })
      }  
    </tbody>
  )
}

function tbodyUsuarios (props){
  return(
      <tbody>
      {
        props.rows.map( (row,index) =>{
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{row.id_usuario}</td>
              <td>{row.usuario}</td>
              <td>{row.nombre}</td>
              <td>{row.apellido}</td>
              <td>{row.email}</td>
              <td>{row.permisos}</td>
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