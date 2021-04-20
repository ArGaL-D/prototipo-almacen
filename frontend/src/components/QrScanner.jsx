import React, {useState} from 'react';
import axios from "axios";
import Scanner from "react-webcam-qr-scanner";

import "./styles/QrScanner.css";

const QrScanner = ( {closeModalQr, getQrResults} ) => {


    const [closeQr, setQrClose] = useState('');


    const handleDecode = async (result) => {  
        setQrClose(result.data) // No mover de posición.
        //  ALUMNO
            
        let pagina = {url: result.data};
        let url_regex = /.+.dae.ipn.mx.vcred/g;
        let url_correcto = pagina.url.match(url_regex);

        if (url_correcto){
            try{
                const resp = await axios.post('http://localhost:3001/scrapting', pagina);
                const alumno = resp.data;

                getQrResults(alumno.nombre,alumno.boleta);     
            }catch(error){
                console.log(error)
            }
        }else{
            alert("Código Qr incorrecto")
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

export default QrScanner;