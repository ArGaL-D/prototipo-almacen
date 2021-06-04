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
        if (render){            
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
            paddingTop: '15px'
        },
        section: {      
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
          },          
    });
    
    const stylesImg = StyleSheet.create({
        width : '150px', 
        height: '150px',
        margin: '.5em',
        border: '2px dashed black', 
        padding: '2px'        
    });

    const styleTitle  = {
        fontSize: '12px'
        
    };
    const styleSerial = {
        fontSize: '10px'
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
                        <Page size="A4" style={styles.page}>
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

