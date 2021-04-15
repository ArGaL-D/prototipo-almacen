import { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Buscar from "./components/module/Busqueda.jsx";
import Error from "./components/module/Error";
import Login from "./components/module/Login";
import Page from "./components/Page/Page";
import ProttectedRoute from "./components/access/ProtectedRoute";
import Slider from "./components/Slider";
import Cookies from "js-cookie";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  


  useEffect( ()=>{
    const readCookie = () =>{
      const cookie = Cookies.get('tester');

      if(cookie){
        setIsAuth(true)
      }
    }

    readCookie();
  });



  return (
    <Router>
      <Switch>
        {/* 
        <Route exact path="/">
          <button onClick={access}>Login</button>

          <button onClick={access}>Logout</button>
            <Link to="/buscar">Buscar</Link>
            <Link to="/login">Login</Link>
            <Link to="/slider">Slider</Link>
            <Link to="/page">-PAGE-</Link>
        </Route>
        */}        
        <Route exact path="/" component={Slider} />
        <Route path="/login" component={Login} />

        <ProttectedRoute path="/buscar" component={Buscar} isAuth={isAuth} />
        <ProttectedRoute path="/page" component={Page} isAuth={isAuth} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
    
  );
}

export default App;
