import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../authContext/AuthContext';

const ProtectedRoute2 = ({children,path}) => {

    const {authToken} = useContext(AuthContext);
   
    if(!authToken){
        const currentPath = sessionStorage.getItem('currentPage');
        console.log(currentPath)
        if(currentPath){
            return <Redirect to={currentPath} />        
        }else{
            return <Redirect to='/login' />        
        }        
        
    } 
    
    return (
        <Route path={path}>
             {children}
        </Route>
    )
}

export default ProtectedRoute2;
