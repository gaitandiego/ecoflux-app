import React, {useState, useEffect, useContext} from 'react';
import * as Icon from 'react-feather';

import { AuthUserContext } from '../../Session';

function MonthlySales({valor, texto, icono}) {
    const [usuario, setUsuario] = useState(useContext(AuthUserContext))
    
    return (
        <div className="stats-card purple-card mb-4">
            <h3>
                {valor}
                <Icon.ArrowUpCircle 
                    className="icon"
                />
            </h3>
            <p>{texto}</p>
            <i 
                className={icono} 
            />
        </div>
    );
};

export default MonthlySales;