import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import * as TEXT from '../../constantes/text';
import Select from 'react-select';

const FormDataView = (({ Controller, register, errors, control }) => {
    return (
        <Row>

            <Form.Group as={Col} controlId="nombre_usuario" xs={12} md={4} sm={6} lg={4} xl={4}>
                <Form.Label>{TEXT.FORM_NOMBRE}</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre_usuario"
                    placeholder={TEXT.FORM_NOMBRE}
                    {...register("nombre_usuario", {
                        required: true,
                    })}
                    className={errors.nombre_usuario && 'is-invalid'}
                />
            </Form.Group>
            <Form.Group as={Col} controlId="email" xs={12} md={4} sm={6} lg={4} xl={4} >
                <Form.Label>email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="email"
                    {...register("email", {
                        required: true,
                    })}
                    className={errors.email && 'is-invalid'}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="password" xs={12} md={4} sm={6} lg={4} xl={4}>
                <Form.Label>{TEXT.FORM_PASSWORD}</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder={TEXT.FORM_PASSWORD}
                    {...register("password", {
                        required: true,
                    })}
                    className={errors.password && 'is-invalid'}
                />
            </Form.Group>
            <Form.Group as={Col} controlId="empresa" xs={12} md={4} sm={6} lg={4} xl={4} className={errors.empresa && 'is-invalid'}>
                <Form.Label>Empresa</Form.Label>
                <Controller
                    name="empresa"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <Select
                            {...field}
                            placeholder='Seleccionar...'
                            options={[
                                { value: "Conectar JDP SAS", label: "Conectar JDP SAS" },
                            ]}
                        />
                    }
                />
            </Form.Group>
            <Form.Group as={Col} controlId="rol" xs={12} md={4} sm={6} lg={4} xl={4} className={errors.rol && 'is-invalid'}>
                <Form.Label>Rol</Form.Label>
                <Controller
                    name="rol"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <Select
                            {...field}
                            placeholder='Seleccionar...'
                            options={[
                                { value: "Administrador", label: "Administrador" },
                                { value: "Usuario", label: "Usuario" },
                            ]}
                        />
                    }
                />
            </Form.Group>
        </Row>

    )
})

export default FormDataView