import { useEffect } from 'react';
import { Link,useRouteMatch } from 'react-router-dom';
import { routes } from "../components/config/sidebarData";
import Tooltip from "./Tooltip";

import "./styles/Sidebar.css";

export default function Sidebar(props) {

    let { url } = useRouteMatch();


    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const li_tags = sidebar.childNodes;
        
        // Pintar tag (a) al dar click
        const customizeTagA = (e) => {
            const tag_a = e.currentTarget;
            

            li_tags.forEach( li => {
                if (li.firstChild === tag_a){
                    tag_a.style.background = 'rgb(250, 210, 135)';
                    tag_a.firstChild.style.color = '#20232a';
                }else{
                    li.firstChild.style.background = '';
                    li.firstChild.firstChild.style.color = '';
                }
            })
        }


        li_tags.forEach( li => {
            const tag_a = li.firstChild;
            tag_a.addEventListener('click',customizeTagA);
        });


    },[]);

    

    return (
        <div className={props.showSidebar ? "sidebar" : "sidebar active"}>
           <ul id="sidebar">
               {
                   routes.map( (route,index) =>{
                    return(
                        <li key={index} className={`li_${index}`}>
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
