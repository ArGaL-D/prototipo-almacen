import React from 'react'
import "./styles/InputDark.css";

export default function InputDark(props) {
    return (
        <div className={props.type==="date"?"input_dark active": "input_dark"}>            
            <input 
                id={props.id}
                name={props.name} 
                type={props.type}
                onChange={props.onChange} 
                autoComplete="off"
                defaultValue = {props.defaultValue} 
                maxLength = {props.maxLength}
                required
                readOnly = {props.readOnly}
            />
            <label 
                className="title">
                {props.placeholder}
            </label>
            <div 
                style ={props.cursorPointer?{cursor:'pointer'}:null}
                onClick={props.onClick}
                className={props.cursorPointer?"icon scanner": "icon"}>                
                {props.icon}
            </div>
        </div>
    )
}