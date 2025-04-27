import React from 'react';
import * as Icon from 'react-feather';

const PendingOrders = ({valor, texto, icono}) => {
    return (
        <div className="stats-card danger-card mb-4">
            <h3>
                {valor}
                <Icon.ArrowDownCircle 
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

export default PendingOrders;