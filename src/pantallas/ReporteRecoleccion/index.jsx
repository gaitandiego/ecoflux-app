import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Icon from 'react-feather';
import SweetAlert from 'react-bootstrap-sweetalert';

import Tabla from '../../componentes/Tabla';
import * as ROUTES from '../../constantes/routes';
import * as TEXT from '../../constantes/text';
import { cliente } from '../../helpers/fetch';
import GraficaLineaHome from './GraficaLineaHome';

// Llamamos el nombre del endpoint 
const apiUrl = import.meta.env.VITE_API_RECOLECCIONES;

// Componente para ver 
const ItemLista = props => {
    const [cargando, setCargando] = useState(true)
    const [items, setItems] = useState([])


    useEffect(() => {
        // Llamamos el endpoint para cargar la informacion
        const fecth = async () => {
            try {
                const resp = await cliente().get(apiUrl);
                // si es correcto la peticion guardamos la informacion
                if (resp.data.response) {

                    const graficas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    const yearActual = new Date().getFullYear();
                    resp.data.response.map((item) => {
                        const fecha = new Date(item.fecha)
                        const year = fecha.getFullYear();
                        const mes = fecha.getMonth()
                        if (year === yearActual) {
                            graficas[mes] += 1
                        }

                    })
                    setItems([{ name: "Grafica", data: graficas }])
                    setCargando(false)
                } else {
                    setItems([])
                    setCargando(false)
                }
            } catch (error) {
                setCargando(false)
                console.log(error)
            }
        }
        fecth()
    }, [setItems])

    return (
        <>
            <div className="main-content-header">
                <div className='d-flex justify-content-between align-items-center'>
                    <h1>Reporte de recoleccion</h1>
                </div>
            </div>
            <Row>
                <Col xl={12}>
                    <GraficaLineaHome data={items} />
                </Col>
            </Row>


        </>
    );
}

export default ItemLista