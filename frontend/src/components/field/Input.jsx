import React from 'react'
import "./styles/Input.css";

export default function Input(props) {
    return (
        <div className="input_field">            
            <input 
                id={props.id}
                name={props.name} 
                type={props.type}
                onChange={props.onChange} 
                autoComplete="off"
                defaultValue = {props.defaultValue} 
                required
            />
            <label 
                className="title">
                {props.placeholder}
            </label>
            <div 
                onClick={props.scan}
                className="icon">
                {props.icon}
            </div>
        </div>
    )
}