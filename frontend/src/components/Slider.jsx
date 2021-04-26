import {useHistory} from 'react-router-dom';
import ControlledCarousel from "./Carousel";
import "./styles/Slider.css";

export default function Slider() {

    let history = useHistory();

    const login = (e) =>{
        e.preventDefault();
        history.push('/login');
    }

    return (
        <div className="slider">
            <header>
                <button onClick={login}>Iniciar sesión</button>
            </header>
            
            <div className="content">            
                <div className="carousel">
                    <ControlledCarousel/>
                </div>                
            </div>
            
        </div>
    )
}
