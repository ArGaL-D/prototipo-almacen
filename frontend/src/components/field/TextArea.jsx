import React,{useEffect,useState} from 'react';
import "./styles/TextArea.css";

export default function TextArea(props) {
    const [height,setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, [])

    return (
        <div className="text-area">
            <textarea   
                id   = "text-description" 
                name = {props.name}                     
                cols = "37"  
                rows = {height > 800 ? "5" : "4"}
                defaultValue = {props.defaultValue}
                onChange = {props.onChange}
                placeholder={props.placeholder}>
            </textarea>
        </div>
    )
}
