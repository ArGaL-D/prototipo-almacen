import {withRouter} from 'react-router-dom'

import "./styles/Error.css";

function Error() {
    return (
        <div className="error_container">
            <div className="error_404">
                <span>404</span>
            </div>
            <div className="text_error">
                <span>No se econtró la página.</span>
            </div>
            <div className="btn_error">
                <button id="btn_regresar">
                    REGRESAR
                </button>
            </div>
        </div>
    )
}

export default withRouter(Error);