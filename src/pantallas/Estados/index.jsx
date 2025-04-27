import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Icon from 'react-feather';
import SweetAlert from 'react-bootstrap-sweetalert';

import Tabla from '../../componentes/Tabla';
import * as ROUTES from '../../constantes/routes';
import * as TEXT from '../../constantes/text';
import { cliente } from '../../helpers/fetch';

// Llamamos el nombre del endpoint 
const apiUrl = import.meta.env.VITE_API_ESTADOS;

// Componente para ver 
const ItemLista = props => {
    const [cargando, setCargando] = useState(true)
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalMensage, setModalMensage] = useState('')
    const [items, setItems] = useState([])
    const [idSelect, setIdSelect] = useState('')
    const [recargar, setRecargar] = useState(false)
    const [columns, setColumnas] = useState([
        {
            title: '#', render: (rowData) => rowData.tableData.id + 1
        },
        { title: TEXT.TABLAS_NOMBRE, field: "nombre" },
        {
            title: TEXT.TABLAS_TIPO, field: "tipo",
        },
        {
            title: TEXT.TABLAS_COLOR, field: "color", render: rowData => <div style={{
                backgroundColor: rowData.color,
                padding: "5px 10px",
                borderRadius: "5px",
                color: "#fff",
                height: "20px",
            }}></div>
        },
    ]);


    useEffect(() => {
        // Llamamos el endpoint para cargar la informacion
        const fecth = async () => {
            try {
                const resp = await cliente().get(apiUrl);
                // si es correcto la peticion guardamos la informacion
                if (resp.data.response) {
                    // guardamos la data de la peticion para mostrarla en la tabla
                    setItems(resp.data.response)
                    // mostramos el loading de cargar
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
    }, [setItems, recargar])

    // se carga el moodal o se oculta el modal 
    const toggle = (key, item) => {
        // si el modal existe limpia la informacion
        if (modal) {
            setIdSelect('')
            setModal(false)
            setModalTitle('')
            setModalMensage('')
            // si el modal no existe monta la informacion pertinente
        } else {
            setIdSelect(key)
            setModal(!modal)
            setModalTitle(TEXT.ALERT_ELIMINAR)
            setModalMensage(`${TEXT.ALERT_ELIMINAR_MENSAJE} ${item}`)
        }
    }

    // Elimina el item seleccionado
    const removeItem = async () => {
        try {
            // recargar la tabla 
            setRecargar(true)

            // obtenemos el id
            const key = idSelect;

            const datosItem = {
                id: key
            }

            // enviamos los datos recolectados a axios
            await cliente().delete(apiUrl, datosItem)
            // ocultamos el modal y enviamos alerta
            setModal(false)
            setModalTitle('')
            setModalMensage('')
            toast.success(TEXT.ALERT_ELIMINADO_EXITO)
            setRecargar(false)
        } catch (error) {
            toast.error(TEXT.ALERT_ERROR)
            setModal(!modal)
            setModalTitle(TEXT.ALERT_ERROR)
            setModalMensage(TEXT.ALERT_PASS_ERROR)
            console.log(error)
        }

    }

    // Las columnas de la tabla 
    // title: nombre de la tabla
    // field: identificador de la fila en el items

    // Los botones de la tabla 
    const actions = [
        {
            icon: () => <div className='boton_estandar_blanco'><Icon.Edit3 size={16} /></div>,
            tooltip: TEXT.BTN_EDITAR,
            onClick: (event, rowData) => props.navigate(`${ROUTES.ESTADOS}/editar/${rowData.id}`, { state: rowData }),
        },
        {
            icon: () => <div className='boton_estandar_blanco'><Icon.Trash2 size={16} /></div>,
            tooltip: TEXT.BTN_ELIMINAR,
            onClick: (event, rowData) => toggle(rowData.id, rowData.nombre)
        }
    ]



    return (
        <>
            <div className="main-content-header">
                <div className='d-flex justify-content-between align-items-center'>
                    <h1>{TEXT.ESTADOS_TITULO}</h1>
                    <button onClick={() => props.navigate(ROUTES.ESTADOS_ADD, { state: { tipo: 'Producto' } })} className='btn btn-primary boton_estandar'><Icon.Plus className="icon wh-14" /></button>
                </div>
            </div>
            <Row>
                <Col xl={12}>
                    <Tabla data={items} actions={actions} title={TEXT.ESTADOS_TITULO_TABLA} columns={columns} cargando={cargando} />
                </Col>
            </Row>

            {modal &&
                <SweetAlert
                    custom
                    showCancel
                    showCloseButton
                    confirmBtnText={TEXT.BTN_ACEPTAR}
                    cancelBtnText={TEXT.BTN_CANCELAR}
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="danger"
                    title={modalTitle}
                    onConfirm={removeItem}
                    onCancel={toggle}
                >
                    {modalMensage}
                </SweetAlert>
            }


        </>
    );
}

export default ItemLista