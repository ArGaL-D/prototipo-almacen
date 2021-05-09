import React,{ useEffect } from 'react'
import "./styles/Home.css"

export default function Home({setTitle}) {
    
    const monthName =
        ['Enero','Febrero','Marzo','Abril','Mayo',
         'Junio','Julio','Agosto','Septiembre','Octubre',
         'Noviembre','Diciembre'
        ];
     
    const date = new Date();    
    
    //Establecer título actual - navbar
    useEffect(() => {
        setTitle('Home');
        sessionStorage.setItem('page','home');
    })

    return (
        <div className="home">
            <span className="home_title">¡Bienvenido!</span>
            <span className="home_subtitle">
                {`Hoy es ${date.getDate()} de ${monthName[date.getMonth()]} del ${date.getFullYear()}`}
            </span>
        </div>
    )
}
