import React, { useEffect, useState } from 'react'
import { Row, Col, Breadcrumb, Form, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap';
import * as TEXT from '../../constantes/text';
import Select from 'react-select';

const FormDataView = (({ Controller, register, errors, control, watch, setCargando, cargando }) => {
    return (
        <Row>

            <Form.Group as={Col} controlId="nombre" xs={12} md={4} sm={6} lg={4} xl={4}>
                <Form.Label>{TEXT.FORM_NOMBRE}</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    placeholder={TEXT.FORM_NOMBRE}
                    {...register("nombre", {
                        required: true,
                    })}
                    className={errors.nombre && 'is-invalid'}
                />
            </Form.Group>
            <Form.Group as={Col} controlId="color" className={errors.color && 'is-invalid'} xs={12} md={4} sm={6} lg={4} xl={4} >
                <Form.Label>{TEXT.FORM_COLOR}</Form.Label>
                <Form.Control
                    type="color"
                    name="color"
                    placeholder={TEXT.FORM_COLOR}
                    {...register("color", {
                        required: true,
                    })}
                    className={errors.color && 'is-invalid'}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="tipo" xs={12} md={4} sm={6} lg={4} xl={4} className={errors.tipo && 'is-invalid'}>
                <Form.Label>{TEXT.FORM_TIPO}</Form.Label>
                <Controller
                    name="tipo"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <Select
                            {...field}
                            placeholder='Seleccionar...'
                            options={[
                                { value: TEXT.FORM_ACUMULA, label: TEXT.FORM_ACUMULA },
                                { value: TEXT.FORM_DETIENE, label: TEXT.FORM_DETIENE }
                            ]}
                        />
                    }
                />
            </Form.Group>

        </Row>

    )
})

export default FormDataView