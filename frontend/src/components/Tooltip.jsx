import "./styles/Tooltip.css";

export default function Tooltip(props){
    return(            /* boxTooltip */
        <div className={props.tooltip}>
            <span>{props.title}</span>
        </div>
    );
}