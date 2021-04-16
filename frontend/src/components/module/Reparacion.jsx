import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';

import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";

import "./styles/Reparacion.css";

export default function Reparacion({setTitle}) {
    
    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Reparación');
        sessionStorage.setItem('page','reparacion');
    })

    return (
        <div className="module-reparacion">
            
            <div className="container1">
                <h1>Opciones</h1>
                <Link to = "/page/reparacion/hilo">
                    <div className="option-hilo link-option">
                        <div className="icon1">
                            <BiIcons.BiGitBranch/>
                        </div>
                        <div className="text">
                            <span>Generar hilo</span>
                        </div>
                        <div className="icon2">
                            <RiIcons.RiArrowRightSFill/>
                        </div>          
                    </div>
                </Link>
                <Link to = "/page/reparacion/seguimiento">
                    <div className="option-seguimiento  link-option">
                        <div className="icon1">
                            <FiIcons.FiGitBranch/>
                        </div>
                        <div className="text">
                            <span>Seguimiento</span>
                        </div>
                        <div className="icon2">
                            <RiIcons.RiArrowRightSFill/>
                        </div>          
                    </div>
                </Link>
            </div>

            <div className="container2">
                
            </div>
        </div>
    )
}
