import {useState} from 'react';
import Swal from 'sweetalert2';
import Scanner from "react-webcam-qr-scanner";

import "./QrScanner.css";

const QrScannerEquipo = ( {closeModalQr, getQrResults} ) => {

    const [closeQr, setQrClose] = useState('');


    const handleDecode = (result) => {  
        setQrClose(result.data) // No mover de posición.
        
        //EQUIPO
        try{
            const qrJSON = JSON.parse(result.data);
            const serial = qrJSON.serial;
            const equipo = qrJSON.equipo;
        
            getQrResults(equipo,serial);            
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

export default QrScannerEquipo;