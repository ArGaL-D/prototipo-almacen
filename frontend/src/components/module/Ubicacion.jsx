import React,{useEffect} from 'react';

export default function Ubicacion({setTitle}) {

    useEffect(() => {
        setTitle('Ubicación');
        sessionStorage.setItem('page','ubicacion');
    })

    return (
        <div>
            UBICACION
        </div>
    )
}
