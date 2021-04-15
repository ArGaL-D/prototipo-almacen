import { edificio, 
    piso, 
    status, 
    aula, 
    almacen, 
    almacenEdificio, 
    almacenPiso,
    reparacion,
    etapaReparacion 
   } from "../config/selectData";

import React from 'react';
import "./styles/Select.css";

export default function Select(props) {
    return (
        <div className="select">
            <select 
                id={props.id} 
                name={props.name}
                onClick={props.onClick}
                onChange={props.onChange} 
                defaultValue={props.defaultValue} >
              {
                
                {
                    EDIFICIO: edificio.map( (value,key) => {
                        return(      
                            <option value={value} key={key} required>{value}</option>
                        )
                    }),
                    PISO: piso(props.num_edificio).map( (value, key) => {
                        return(
                            <option value={value} key={key}>{value}</option>
                        )
                    })
                    ,
                    STATUS: status.map( (value, key) => {
                        return(
                            <option value={value} key={key}>{value}</option>
                        )
                    } ),
                    AULA: aula(props.num_edificio, props.num_piso).map( (value, key) => {
                        return(
                            <option value={value} key={key}>{value}</option>
                        )
                    }),
                    ALMACEN: almacen.map( (value, index) => {
                        return(
                            <option value={value} key={index}>{value}</option>
                        )
                    }),
                    ALMACEN_EDIFICIO: almacenEdificio.map( (value, index) => {
                        return(
                            <option value={value} key={index}>{value}</option>
                        )
                    }),
                    ALMACEN_PISO: almacenPiso.map( (value, index) => {
                        return(
                            <option value={value} key={index}>{value}</option>
                        )
                    }),
                    REPARACION: reparacion.map( (value, index) => {
                        return(
                            <option value={value} key={index}>{value}</option>
                        )
                    }),
                    REPARACION_ETAPA: etapaReparacion.map( (value, index) => {
                        return(
                            <option value={value} key={index}>{value}</option>
                        )
                    })
                }[props.type]
                        
              }  
            </select>
        </div>
    )
}