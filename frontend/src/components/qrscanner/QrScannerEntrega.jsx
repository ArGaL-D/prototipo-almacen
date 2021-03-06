import {useState} from 'react';
import Swal from 'sweetalert2';
import Scanner from "react-webcam-qr-scanner";

import "./QrScanner.css";

const QrScannerEntrega = ( {closeModalQr, getQrResults} ) => {

    const [closeQr, setQrClose] = useState('');


    const handleDecode = (result) => {  
        setQrClose(result.data) // No mover de posición.
        
        //EQUIPO
        try{
            const qrJSON = JSON.parse(result.data);
            const nombre = qrJSON.nombre;
            const serial = qrJSON.serial;
            const equipo = qrJSON.equipo;
            const fechaSalida = qrJSON.fechaSalida;
        
            if (nombre === undefined || serial === undefined || equipo === undefined || fechaSalida === undefined){
                Swal.fire({
                    icon: 'error',
                    title: `QR`,
                    text: `Se detectó inconsistencias en el código QR`,
                  })
            }else{
                getQrResults(nombre,equipo,serial,fechaSalida); 
            }            
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: `QR`,
                text: `Incorrecto`,
              })
            console.log(`Formato incorrecto QR -> ${error}`)
        }
        closeModalQr(false);
    } 
    
    const handleScannerLoad = (mode) => {
          console.log(mode);
    }

  return (
    <>
      {   //Verificar si hay datos
          closeQr === '' 
          ? 
            <Scanner 
                className = "qr-scanner"
                onDecode  = {handleDecode}
                onScannerLoad ={handleScannerLoad}
                constraints = {{ 
                audio: false, 
                video: { facingMode: "environment" }
                }}
                captureSize={{ width: 500, height: 500 }}
            /> 
         : null //Close MODAL Qr scanner
      }     
    </>
  );
}

export default QrScannerEntrega;