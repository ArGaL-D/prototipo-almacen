import React from 'react';
import Button from "./field/Button";
import {QRCode} from 'react-qrcode-logo';

import "./styles/ModalQr.css";

export default function ModalQr({showModal,qrSize,qrData,closeModal}) {
    return (
        <div className={showModal?"qr-modal active": "qr-modal"}>
            <div className="marco">
                <QRCode 
                    size  = {qrSize}
                    value = { JSON.stringify(qrData) }                   
                    enableCORS = {true}                            
                    qrStyle    = {'squares'}
                    quietZone  = {10 }                            
                    fgColor    = {"#000406"}                   
                />
            </div>

            <div className="btn-modal">
                <Button
                    title = "REGISTRAR"
                    onClick={closeModal}
                />
            </div>  
        </div>
    )
}
