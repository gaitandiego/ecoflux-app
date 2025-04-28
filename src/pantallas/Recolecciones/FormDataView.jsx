import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';

const FormDataView = (({ Controller, register, errors, control, usuarios }) => {
    return (
        <Row>
            <Form.Group as={Col} controlId="usuarios" xs={12} md={4} sm={6} lg={4} xl={4} className={errors.usuarios && 'is-invalid'}>
                <Form.Label>usuario</Form.Label>
                <Controller
                    name="usuarios"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <Select
                            {...field}
                            placeholder='Seleccionar...'
                            options={usuarios}
                        />
                    }
                />
            </Form.Group>

            <Form.Group as={Col} controlId="celular" xs={12} md={4} sm={6} lg={4} xl={4}>
                <Form.Label>Celular</Form.Label>
                <Form.Control
                    type="text"
                    name="celular"
                    placeholder="celular"
                    {...register("celular", {
                        required: true,
                    })}
                    className={errors.celular && 'is-invalid'}
                />
            </Form.Group>
            <Form.Group as={Col} controlId="direccion" xs={12} md={4} sm={6} lg={4} xl={4}>
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                    type="text"
                    name="direccion"
                    placeholder="direccion"
                    {...register("direccion", {
                        required: true,
                    })}
                    className={errors.direccion && 'is-invalid'}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="ruta" xs={12} md={4} sm={6} lg={4} xl={4} className={errors.ruta && 'is-invalid'}>
                <Form.Label>Ruta</Form.Label>
                <Controller
                    name="ruta"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <Select
                            {...field}
                            placeholder='Seleccionar...'
                            options={[
                                { value: "Ruta 1 - Juan Hernando Urrego", label: "Ruta 1 - Juan Hernando Urrego" },
                                { value: "Ruta 2 - Centro", label: "Ruta 2 - Centro" },
                            ]}
                        />
                    }
                />
            </Form.Group>

        </Row>

    )
})

export default FormDataView