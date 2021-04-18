import React from 'react';

import "./styles/Rectangle.css";

export default function Rectangle({icon, title, content}) {
    return (
        <div className="rectangle-option">
            <div className="bar">
                {icon}
            </div>
            <div className="content">
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    )
}
