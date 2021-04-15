import React from 'react';
import "./styles/Card.css";

export default function Card(props) {
    return (
        <div className="card">
            <div className="title">
                <span>{props.title}</span>
            </div>
            <div className="icon">
                <span>{props.icon}</span>
            </div>
            <div className="text">
                <p>{props.text}</p>
            </div>
            <div className="link">
                <button>{props.btnTitle}</button>
            </div>
        </div>
    )
}
