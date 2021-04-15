import React,{useEffect} from 'react'

export default function Entrega({setTitle}) {

    useEffect(() => {
        setTitle('Entrega');
        sessionStorage.setItem('page','entrega');
    })

    return (
        <div>
            ENTREGA
        </div>
    )
}
