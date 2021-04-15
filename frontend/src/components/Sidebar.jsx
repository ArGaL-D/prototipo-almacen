import React from 'react';
import { Link,useRouteMatch } from 'react-router-dom';
import { routes } from "../components/config/sidebarData";
import Tooltip from "./Tooltip";

import "./styles/Sidebar.css";

export default function Sidebar(props) {
    let { url } = useRouteMatch();

    return (
        <div className={props.showSidebar ? "sidebar" : "sidebar active"}>
           <ul>
               {
                   routes.map( (route,index) =>{
                    return(
                        <li key={index}>
                            <Link to={`${url}${route.path}`}>
                                {route.icon}
                            </Link>
                            {/* Sólo funciona en Computadoras -> "hover" */} 
                            <Tooltip title={route.title} tooltip={'boxTooltip'}/>
                        </li>
                    )})
               }
           </ul>
        </div>
    )
}
