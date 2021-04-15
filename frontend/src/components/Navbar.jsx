import React from 'react';
import * as FaIcons from 'react-icons/fa';

import "./styles/Navbar.css";

export default function Navbar(props) {
    return (
        <header className="navbar">
            <div className="icon" onClick={props.hiddenSidebar}>
                <FaIcons.FaBars/>
            </div>
            <div className="title">
                {props.title}
            </div>
            <button onClick={props.onClick}>
                {props.title_btn}
            </button>
        </header>
    )
}
