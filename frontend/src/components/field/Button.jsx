import React from 'react';
import "./styles/Button.css";

export default function Button(props) {
    return (
        <div className="generic-btn">
            <button onClick={props.onClick}>
                {props.title}
            </button>
        </div>
    )
}
