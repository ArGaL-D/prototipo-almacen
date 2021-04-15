import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch} from 'react-router-dom';

import Navbar  from "../components/Navbar";
import Sidebar from '../components/Sidebar';

import Buscar     from "../equipo/Buscar";
import Registro   from "../equipo/Registro";
import Prestamo   from "../equipo/Prestamo";
import Entrega    from "../equipo/Entrega";
import Ubicacion  from "../equipo/Ubicacion";
import Reparacion from "../equipo/Reparacion";
import Usuario    from "../equipo/Usuario";

import "./Page.css";

export default function Page() {
    
    let   { path} = useRouteMatch();
    const [hiddenSidebar,setHiddenSidebar] = useState(false);
    const [navbarTitle,setNavbarTitle] = useState("Home", ()=> {
        const localData = localStorage.getItem('currentPage');
        return localData ? localData : "";
    });

    const link = () =>{
        console.log(path)
    }

    const hideSiderbar = () =>{
        setHiddenSidebar(!hiddenSidebar)
    }


    useEffect( ()=> {
        localStorage.setItem('currentPage', navbarTitle)
        //console.log(localStorage.getItem('currentPage') )
    },[navbarTitle]);


    return (
        <div className="page">
            <div className="navbar-page">
                <Navbar 
                    title = {!navbarTitle? "HOME": navbarTitle}
                    title_btn = "Salir"  
                    onClick = {link} 
                    hiddenSidebar = {hideSiderbar}
                />
            </div>
            <div className="container">
                <Sidebar 
                    hiddenSidebar = {hiddenSidebar}
                />
                <Switch>
                    <Route exact path={path}>
                        <h3>Please select a topic.</h3>
                    </Route>
                    <Route
                        path={`${path}/buscar`} 
                        children={<Buscar setNavbarTitle={setNavbarTitle}/>}
                    />
                    <Route 
                        path={`${path}/registro`} 
                        children={<Registro setNavbarTitle={setNavbarTitle}/>}
                    />
                    <Route 
                        path={`${path}/prestamo`} 
                        children={<Prestamo setNavbarTitle={setNavbarTitle}/>}
                    />
                    <Route 
                        path={`${path}/entrega`} 
                        children={<Entrega setNavbarTitle={setNavbarTitle}/> }
                    />
                    <Route 
                        path={`${path}/ubicacion`} 
                        children={<Ubicacion setNavbarTitle={setNavbarTitle}/>}
                    />
                    <Route 
                        path={`${path}/reparacion`} 
                        children={<Reparacion setNavbarTitle={setNavbarTitle}/>}
                    /> 
                    <Route 
                        path={`${path}/usuario`} 
                        children={<Usuario setNavbarTitle={setNavbarTitle}/>}
                    />                                                                                
                </Switch>                            
            </div>
            
        </div>
    )
}

