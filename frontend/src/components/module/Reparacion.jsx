import React,{useEffect} from 'react';

export default function Reparacion({setTitle}) {

    useEffect(() => {
        setTitle('Reparación');
        sessionStorage.setItem('page','reparacion');
    })

    return (
        <div>
            REPARACION
        </div>
    )
}
