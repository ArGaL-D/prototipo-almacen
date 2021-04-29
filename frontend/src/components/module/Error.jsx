import { withRouter, useLocation } from 'react-router-dom'

import "./styles/Error.css";

function Error() {
    
    const location = useLocation();

    return (
        <div className="error_container">
            <div className="error_404">
                <span>404</span>
            </div>
            <div className="text_error">
                <span>No se econtró la página</span>
                <br/>
                <span className="page_not_found">
                    <strong>{location.pathname}</strong>
                </span>
            </div>
            
            <div className="btn_error">
                <br/>
                <button id="btn_regresar">
                    REGRESAR
                </button>
            </div>
        </div>
    )
}

export default withRouter(Error);