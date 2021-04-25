import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/authContext/AuthContext.js";
import ProtectedRoute2 from "./components/access/ProtectedRoute2";

import Error  from "./components/module/Error";
import Login  from "./components/module/Login";
import Page   from "./components/Page/Page";
import Slider from "./components/Slider";


function App() {


  return (

    <AuthProvider>
        <Router>
          <Switch>      
            <Route exact path="/" component={Slider} />
            <Route path="/login" component={Login} />
            
            <ProtectedRoute2 path="/page">
                <Page/>
            </ProtectedRoute2>

            <Route path="*" component={Error} />
          </Switch>
        </Router>   
    </AuthProvider>


    
  );
}

export default App;
