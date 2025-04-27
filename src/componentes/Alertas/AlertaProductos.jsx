import React from 'react'
import * as TEXT from '../../constantes/text';

const AlertaProductos = ({ inventario, alerta, numero }) => {
    if (!alerta) {
        return <></>
    }

    if (numero && inventario <= alerta) {
        return (<div className='alertas_rojo'>{inventario}</div>)
    }
    if (numero) {
        return (<div className='alertas_verde'>{inventario}</div>)
    }

    if (inventario <= alerta) {
        return (<div className='alertas_rojo'>{TEXT.FORM_POR_AGOTARSE}</div>)
    }

    return (<div className='alertas_verde'>{TEXT.FORM_CON_EXISTENCIAS}</div>)

}

export default AlertaProductos