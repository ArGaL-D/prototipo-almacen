import React from 'react';

import * as ImIcons   from "react-icons/im";
import * as GrIcons   from "react-icons/gr";
import * as FaIcons   from "react-icons/fa";
import * as MdIcons   from "react-icons/md";
import * as AiIcons   from "react-icons/ai";

import "./styles/Datatable.css";


export default function Datatable({columns, rows ,type, onOpenModal,updateRow,deleteRow}) {


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
                    EQUIPOS_BUSCAR: rows.map( (row,index) =>{
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
                    EQUIPOS: rows.map( (row,index) =>{
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
                                        <TooltipText text={row.descripcion===""? "Sin descriṕción.":row.descripcion} />
                                    </div>  
                                </td>  
                                <td>{row.almacen}</td> 
                                <td>{row.edificio}</td>
                                <td>{row.piso}</td>
                                <td>
                                  <button className="btn-qr" onClick={updateRow}>
                                      <AiIcons.AiTwotoneEdit/>
                                  </button>  
                                </td>
                                <td>
                                  <button className="btn-qr" onClick={deleteRow}>
                                      <MdIcons.MdDelete/>
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
                    SEGUIMIENTO: rows.map( (row,index) => {
                      return(
                          <tr key={index}>
                              <td>{index+1}</td>
                              <td>{row.serial}</td>
                              <td>{row.equipo}</td>
                              <td>{row.hilo}</td>
                              <td>{row.reporte}</td>
                              <td>
                                  <div className="td-descrip">
                                      {<GrIcons.GrTextAlignFull/>}
                                      <TooltipText text={row.detalles===""? "Sin descriṕción.":row.detalles} />
                                  </div>                                    
                              </td>
                              <td>{row.estatus}</td>
                              <td>{row.etapa}</td>
                              <td>{row.fecha}</td>
                              <td>{row.hora}</td>                                                                
                          </tr>
                      )
                  }),
                  USUARIOS: rows.map( (row,index) => {
                    return(
                        <tr key={index}>
                            <td>{row.id_usuario}</td>
                            <td>{row.usuario}</td>
                            <td>{row.nombre}</td>
                            <td>{row.apellido}</td>
                            <td>{row.email}</td>
                            <td>{row.acceso}</td>
                            <td>
                                <div className="td-descrip" style={{cursor: 'pointer'}} onClick={updateRow} >
                                    {<FaIcons.FaUserEdit/>}                                    
                                </div>                                    
                            </td>
                            <td>
                                <div className="td-descrip" style={{cursor: 'pointer'}} onClick={deleteRow}>
                                    {<MdIcons.MdDelete/>}                                    
                                </div>                                    
                            </td>                          
                        </tr>
                    )
                })
                }[type]
              }
            </tbody>     
        </table>
    )
}


const TooltipText = (props) => {
    return(
        <div className="tooltipText">
            <p>{props.text}</p>
        </div>
    )
}