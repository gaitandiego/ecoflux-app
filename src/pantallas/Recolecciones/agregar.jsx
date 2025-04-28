import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Form, Button, ButtonToolbar } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as ROUTES from '../../constantes/routes';
import * as TEXT from '../../constantes/text';
import * as Icon from 'react-feather';
import Loader from '../../componentes/Common/Loader';
import { cliente } from '../../helpers/fetch';
import { Boton } from '../../componentes/Boton';
import FormDataView from './FormDataView';

// Llamamos el nombre del endpoint 

const apiUrl = import.meta.env.VITE_API_RECOLECCIONES;
const apiUrlUsuarios = import.meta.env.VITE_API_USUARIOS;


// Componente para agregar
const ItemAgregar = props => {
    const [cargando, setCargando] = useState(false)
    const { register, handleSubmit, reset, control, formState: { errors }, watch } = useForm();
    const [cargandoBoton, setCargandoBoton] = useState(false)
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const fetchDataUsuarios = async () => {
            try {
                setCargando(true)
                const response = await cliente().get(apiUrlUsuarios)
                const data = response.data.response.map(item => ({
                    value: item.id,
                    label: item.nombre_usuario
                }))
                setUsuarios(data)
                setCargando(false)
            } catch (error) {
                console.error('Error fetching usuarios:', error);
                setUsuarios([])
                setCargando(false)
            }
        }

        fetchDataUsuarios()
    }, [])

    console.log(usuarios)
    // Enviar peticion al post
    const onSubmit = async (data) => {
        try {
            setCargandoBoton(true)

            const datosItem = {
                ...data,
                id_usuario: data.usuarios.value,
                ruta: data.ruta.value,
            }
            // Enviar peticion al backend 

            await cliente().post(apiUrl, datosItem)
            toast.success(TEXT.ALERT_AGREGADO_EXITO)
            props.navigate(ROUTES.RECOLECCIONES);
            setCargandoBoton(false)

        } catch (error) {
            console.log(error)
            toast.error(TEXT.ALERT_PASS_ERROR)
            setCargandoBoton(false)

        }
    }

    return (
        <>
            {cargando && <Loader message="Loading..." />}
            <div className="main-content-header">
                <div className='d-flex justify-content-between align-items-center'>
                    <h1>{TEXT.RECOLECCIONES_ADD_TITULO}</h1>
                    <button onClick={() => props.goBack()} className='btn btn-primary boton_estandar'><Icon.X className="icon wh-14" /></button>
                </div>
            </div>

            <Row>
                <Col xl={12}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="card-header">
                                <h5 className="card-title">{TEXT.RECOLECCIONES_FORM_TITULO}</h5>
                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <FormDataView Controller={Controller} register={register} usuarios={usuarios} errors={errors} control={control} watch={watch} setCargando={setCargando} />
                                <ButtonToolbar className="float-right">
                                    <Boton type="submit" variant="primary" className="mt-2 mr-2" cargando={cargandoBoton}>{TEXT.BTN_ACEPTAR}</Boton>
                                </ButtonToolbar>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ItemAgregar