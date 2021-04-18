import React from 'react';
import { Doughnut } from "react-chartjs-2";

export default function PieChart() {

    const data = {
        labels: [
          'Disponiblidad',
          'Reparación',
          'Prestados'
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
            height = {460}               
            options = {
            {
                title: {display: true, text: "EQUIPOS"}
            }
            }        
        /> 
    )
}

//MINUTO 7:05 VIDeO