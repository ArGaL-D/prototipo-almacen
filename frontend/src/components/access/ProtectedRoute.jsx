import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function ProtectedRoute({isAuth: auth, component: Component, ...rest}) {
    return (
        <Route {...rest}  render={(props) =>{
                if(auth){
                    return <Component/>
                }else{
                    return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                }
            }}
        />
    )
}
