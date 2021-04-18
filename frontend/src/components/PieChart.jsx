import React from 'react';
import { Doughnut } from "react-chartjs-2";

export default function PieChart() {

    const data = {
        labels: [
          'Disponiblidad',
          'Reparación',
          'Préstamo'
        ],
        datasets: [
        {
          label: 'EQUIPOS',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(64, 192, 146)',
            'rgb(196, 69, 106)',
            'rgb(69, 106, 196)'
          ],        
          
          borderWidth: 2,
          hoverOffset: 6,
          hoverBorderWidth: 0
        }]

      };

    return (
        <div>
           <Doughnut 
              data = {data}                
              width = {600}
              height = {400}   
              options = {
                {
                  title: {display: true, text: "EQUIPOS"}
                }
              }        
           /> 
        </div>
    )
}

//MINUTO 7:05 VIDeO