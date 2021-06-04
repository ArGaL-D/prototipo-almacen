import React,{useState, useEffect} from 'react'
import {QRCode} from 'react-qrcode-logo';
import * as ImIcons from "react-icons/im";
import axios from "axios";

import { 
    PDFViewer,
    Page, 
    Text, 
    View, 
    Document, 
    StyleSheet,
    Image,                       
    } from '@react-pdf/renderer';
  

import './styles/QrPDF.css';

export default function QrPDF() {

    const [deviceData,setDeviceData] = useState([]);
    const [qrCanvas,setQrCanvas] = useState([]);
    const [render, setRender] = useState(false)

    const renderPDF = () => {
        const canvas = document.querySelectorAll('canvas');
        setRender(!render);        
        if (!render){            
            setQrCanvas(Array.from(canvas))
        }
    }

    useEffect(()=>{
        const getDevices = async () => {
            try {
                const resp = await axios.get('/equipos');
                setDeviceData(resp.data);        
            } catch (error) {
                console.log(error)
            }
        }

        getDevices();        
    },[])

    // Styles PDF
    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',            
        },
        section: {      
            width:'auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',            
            margin: '5px',          
          },          
    });
    
    const stylesImg = StyleSheet.create({
        width : '155px', 
        height: '155px',
        margin: '5px',
        border: '2px dashed black', 
        padding: '2px'        
    });

    const styleTitle  = {
        fontSize: '11px',
        fontWeight: '600',
        color: '#1b2631'
    };
    const styleSerial = {
        fontSize: '10px',        
        color: '#424949;'
    };

    return (
        /* Contenedor de QR's*/
        <div className="qr-container">
            {
                deviceData.map((item,key) => {
                    return (
                        <div key={key} className="qrCode-box">
                            <div className="qrCode-border">
                                <QRCode 
                                    size  = {215}
                                    value = { JSON.stringify(item) }                   
                                    enableCORS = {true}                            
                                    qrStyle    = {'squares'}
                                    quietZone  = {10}                            
                                    fgColor    = {"#1b2631"}                   
                                />  
                            </div>
                            <div className="qrCode-content-text">
                                <p className="dev-title">{item.equipo}</p>
                                <p className="dev-serial">{item.serial}</p>
                            </div>
                        </div>
                    )
                })
            }

            {/* Button */} 
            <div className="btn-pdf" onClick={renderPDF}>                
                <ImIcons.ImFilePdf/>
            </div>

            {/* Plantilla PDF */}
            {
                render 
                ? 
                <PDFViewer>
                    <Document>
                        <Page size="Letter" style={styles.page}>
                            {
                                qrCanvas.map((item,key) => {
                                    return(
                                        <View key={key} style={styles.section}>
                                            <Image src={item.toDataURL()} style={stylesImg}/>
                                            <Text style={styleTitle}>{deviceData[key].equipo}</Text>
                                            <Text style={styleSerial}>{deviceData[key].num_serie}</Text>
                                        </View>
                                    )
                                })
                            }
                        </Page>
                    </Document>
                </PDFViewer>
                : null
            }
        </div>
    )
}

