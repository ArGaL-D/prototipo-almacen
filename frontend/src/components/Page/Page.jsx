import { useState } from 'react'
import { withRouter,useRouteMatch,Switch, Route } from 'react-router-dom'

import Home       from '../module/Home';
import Busqueda   from '../module/Busqueda';
import Entrega    from '../module/Entrega';
import Prestamo   from '../module/Prestamo';
import Registro   from '../module/Registro';
import Reparacion from '../module/Reparacion';
import Ubicacion  from '../module/Ubicacion';
import Usuarios   from '../module/Usuarios';
import Navbar     from "../Navbar";
import Sidebar    from '../Sidebar';

import "./Page.css";

function Page() {
  let {path} = useRouteMatch();

  const [title,setTitle] = useState('Home');
  const [sidebar,setSidebar] = useState(true);

  const showSidebar = () =>{
    setSidebar(!sidebar);
  }

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className="page">
        <Navbar 
            title_btn="Salir" 
            title={title}
            hiddenSidebar = {showSidebar}
            onClick = {cerrarSesion}
        />

        <div className="container_page">
          <Sidebar showSidebar={sidebar} />          
          <Switch>
              <Route exact path={path}
                  children={<Home 
                  setTitle={setTitle}/>}
              />
              <Route 
                  path={`${path}/buscar`}     
                  children={<Busqueda   
                  setTitle={setTitle}/>}
              />              
              <Route 
                  path={`${path}/registro`}   
                  children={<Registro   
                  setTitle={setTitle}/>}
              />
              <Route 
                  path={`${path}/prestamo`}   
                  children={<Prestamo   
                  setTitle={setTitle}/>}
              />
              <Route 
                  path={`${path}/entrega`}    
                  children={<Entrega    
                  setTitle={setTitle}/>}
              />              
              <Route 
                  path={`${path}/ubicacion`}  
                  children={<Ubicacion  
                  setTitle={setTitle}/>}
              />
              <Route 
                  path={`${path}/reparacion`} 
                  children={<Reparacion 
                  setTitle={setTitle}/>}
              />
              <Route 
                  path={`${path}/usuarios`}   
                  children={<Usuarios   
                  setTitle={setTitle}/>}
              />
              <Route path="/*">
                    <Error />
              </Route>
          </Switch>
        </div>
    </div>
  )
}


export default withRouter(Page);

function Error() {
    return (
      <div>
        <h2>ERROR - </h2>
      </div>
    );
  }
  