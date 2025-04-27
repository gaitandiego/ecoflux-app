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
const apiUrl = import.meta.env.VITE_API_USUARIOS;

// Componente para agregar
const ItemEdit = props => {
    const [cargando, setCargando] = useState(true)
    const [Id, setId] = useState(props.location.state.id)
    const { register, setValue, handleSubmit, formState: { errors }, control, watch } = useForm({ mode: 'onBlur' });
    const [cargandoBoton, setCargandoBoton] = useState(false)


    useEffect(() => {
        // cargamos la informacion del usuario guardada en el location
        if (props.location.state) {
            setValue("nombre_usuario", props.location.state.nombre_usuario);
            setValue("email", props.location.state.email);
            setValue("password", props.location.state.password);
            setValue("empresa", { value: props.location.state.empresa, label: props.location.state.empresa });
            setValue("rol", { value: props.location.state.rol, label: props.location.state.rol });
        }
        setCargando(false)
    }, [])


    // Enviamos la peticion al backend
    const onSubmit = async (data) => {
        try {
            setCargandoBoton(true)
            // en data nos estrae un json con la informacion de la data
            const datosItem = {
                ...data,
                id: Id,
                empresa: data.empresa.value,
                rol: data.rol.value,
            }

            await cliente().put(apiUrl, datosItem)
            toast.success(TEXT.ALERT_EDITADO_EXITO)
            props.navigate(ROUTES.USUARIOS);
            setCargandoBoton(false)

        } catch (error) {
            console.log(error)
            toast.error(TEXT.ALERT_PASS_ERROR)
            setCargandoBoton(false)
        }
    }

    return (
        <div>
            {cargando && <Loader message="Loading..." />}
            <div className="main-content-header">
                <div className='d-flex justify-content-between align-items-center'>
                    <h1>{TEXT.USUARIOS_EDIT_TITULO}</h1>
                    <button onClick={() => props.goBack()} className='btn btn-primary boton_estandar'><Icon.X className="icon wh-14" /></button>
                </div>
            </div>

            <Row>
                <Col xl={12}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="card-header">
                                <h5 className="card-title">{TEXT.USUARIOS_FORM_EDIT_TITULO}</h5>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <FormDataView Controller={Controller} register={register} errors={errors} control={control} watch={watch} setCargando={setCargando} cargando={cargando} />
                                <ButtonToolbar className="float-right">
                                    <Boton type="submit" variant="primary" className="mt-2 mr-2" cargando={cargandoBoton}>{TEXT.BTN_ACEPTAR}</Boton>
                                </ButtonToolbar>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ItemEdit