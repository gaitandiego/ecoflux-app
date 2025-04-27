import React from 'react';
import * as Icon from 'react-feather';

const CompletedOrders = ({valor, texto, icono}) => {
    return (
        <div className="stats-card success-card mb-4">
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

export default CompletedOrders;