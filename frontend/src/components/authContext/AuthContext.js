import {useState, useEffect, createContext} from 'react';
import axios from "axios";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [authToken, setAuthToken] = useState(false);

    // Validar token del usuario
    useEffect(()=>{  
        const readToken = async () => {
            const token = localStorage.getItem('token');
            
            try {
                const resp = await axios.get('http://localhost:3001/login/verificar',{ headers: {'Authorization': token} });
                
                setAuthToken(resp.data.isAuth);
                console.log(resp.data.isAuth)
            } catch (error) {
                console.log(error)
            }
        }
        
        readToken();
    },[]);


    return (  //valores que se llaman en otros componentes 'value'
        <AuthContext.Provider value={{authToken, setAuthToken}}>
            {children}        
        </AuthContext.Provider>
    )
}



export default AuthContext;



