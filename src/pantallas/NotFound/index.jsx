import * as Icon from 'react-feather';
const NotFound = () =>
    <div className="page-wrapper">
        <div className="error-content">
            <div className="d-table">
                <div className="d-tablecell">
                    <Icon.Frown
                        className="icon"
                    />
                    <h1>404</h1>
                    <h4>Página no encontrada</h4>
                    <p>La página que está buscando fue movida, eliminada, renombrada o puede que nunca exista!</p>

                </div>
            </div>
        </div>
    </div>



export default NotFound;