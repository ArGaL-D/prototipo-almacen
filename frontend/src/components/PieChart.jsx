import { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

export default function PieChart() {

  const [equipos, setEquipos] = useState({
      disponibles: 0,
      prestados  : 0,
      reparacion : 0
  });

  useEffect(()=>{
      const totalEquipos = async () => {
        try {
          const resp = await axios.get('http://localhost:3001/total-equipos');
          setEquipos({
            disponibles: resp.data.equipos_disponibles,
            prestados  : resp.data.equipos_prestados,
            reparacion : resp.data.equipos_reparacion
          });
        } catch (error) {
            console.log(error)
        }
      }

      totalEquipos();
  },[])

  const data = {
        labels: [
          'Disponiblidad',
          'Prestados',
          'Reparación'
          
        ],
        datasets: [
        {
          label: 'EQUIPOS',
          data: [equipos.disponibles,equipos.prestados, equipos.reparacion],
          backgroundColor: [
            'rgb(64, 192, 146)',           
            'rgb(69, 106, 196)',
            'rgb(196, 69, 106)'
          ],    
          responsive: true,
          borderWidth: 2,
          hoverOffset: 6,
          hoverBorderWidth: 0
        }]

  };

  return (
    <Doughnut 
        data = {data}                
        width = {600}
        height = {400}               
        options = { 
            {
                title: {display: true, text: "EQUIPOS"},
                legend: {
                    position: 'bottom'
                }                    
            }
        }        
    /> 
  )
}

//MINUTO 7:05 VIDeO