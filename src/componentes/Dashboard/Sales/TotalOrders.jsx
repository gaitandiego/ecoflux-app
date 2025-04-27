import React from 'react';
import * as Icon from 'react-feather';

const TotalOrders = ({valor, texto, icono}) => {
    return (
        <div className="stats-card light-blue-card mb-4">
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

export default TotalOrders;