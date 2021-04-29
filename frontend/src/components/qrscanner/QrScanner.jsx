import {useState} from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import Scanner from "react-webcam-qr-scanner";

import "./QrScanner.css";

const QrScanner = ( {closeModalQr, getQrResults, type} ) => {

    const [closeQr, setQrClose] = useState('');

    const handleDecode = async (result) => {  
        setQrClose(result.data) // No mover de posición.
  
        //  ALUMNO          
        if (type === "Alumno"){
            let pagina = {url: result.data};
            let url_regex = /.+.dae.ipn.mx.vcred/g;
            let url_correcto = pagina.url.match(url_regex);
    
            if (url_correcto){
                try{
                    const resp = await axios.post('http://localhost:3001/scrapting', pagina);
                    const alumno = resp.data;
    
                    if (resp.data.error){

                    }
                    getQrResults(alumno.nombre,alumno.boleta);     
                }catch(error){
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: `${error}`,
                        text: `Hay problemas en extraer la información del alumno.`,
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: `Código QR`,
                    text: `incorrecto`,
                })
            }
        }

        //PROFESOR o ASIGNACIÓN
        if (type === "Profesor" || type === "Asignación"){
            let credencial   = result.data;
            let nombre_regex = /[^-0-9]+$/;
            let clave_regex  = /IPN-\d+/;

            // Juntar resultados  del regex    
            const clave =  credencial.match(clave_regex );
            const nombre = credencial.match(nombre_regex);
            
            //Verificar valores
            if(clave && nombre){
                getQrResults(nombre[0],clave[0]);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: `Código QR`,
                    text: `incorrecto`,
                })
            }
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