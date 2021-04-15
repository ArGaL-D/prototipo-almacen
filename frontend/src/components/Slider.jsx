import {useHistory} from 'react-router-dom';
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
            
        </div>
    )
}
