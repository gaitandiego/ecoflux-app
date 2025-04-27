import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'react-recompose';
import { Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';

import * as ROUTES from '../../constantes/routes';
import * as TEXT from '../../constantes/text';

import Logo from '../../recursos/img/logo.png';

const PassPage = () => (
    <div className="login">
        <Pass />
    </div>
);

class PassBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            Show: false,
            Error: null
        };
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    onSubmit = event => {
        const { Email } = this.state;

        this.props.firebase
            .doPasswordReset(Email)
            .then(() => {
                this.setState({
                    Email: '',
                    Show: true,
                    Mensaje: TEXT.ALERT_PASS_EXITO,
                    Variant: 'success'
                });

                this.myInterval = setInterval(() => {
                    this.setState({ Show: false });
                }, 5000);
            })
            .catch(error => {
                this.setState({
                    Show: true,
                    Mensaje: TEXT.ALERT_PASS_ERROR,
                    Variant: 'danger',
                })

                this.myInterval = setInterval(() => {
                    this.setState({ Show: false });
                }, 5000);
            });

        event.preventDefault();
    };

    render() {
        const { Email, Show, Mensaje, Variant } = this.state;
        const isInvalid = Email === '';

        return (
            <div className="auth-main-content auth-bg-image">
                <div className="d-table">
                    <div className="d-tablecell">
                        <div className="auth-box">
                            <Row>
                                <Col md={6}>
                                    <div className="form-left-content">
                                        <div className="auth-logo">
                                            <Image src={Logo} alt="Logo" />
                                        </div>
                                        <div className="text-login">
                                            <p>{TEXT.PASS_DESCRIPCION}</p>
                                        </div>
                                    </div>
                                    <p className="copi d-none d-sm-none d-md-block">{TEXT.FOOTER_POWER}: <span>{TEXT.FOOTER_CREADOR}</span></p>
                                </Col>

                                <Col md={6} className="position-relative">
                                    <div className="form-content">
                                        <h1 className="heading">{TEXT.PASS_TITULO}</h1>

                                        <Form onSubmit={this.onSubmit}>
                                            <Form.Group>
                                                <Form.Label>{TEXT.FORM_EMAIL}</Form.Label>
                                                <Form.Control type="email" name="Email" value={Email} onChange={(event) => { this.setState({ [event.target.name]: event.target.value }) }} />
                                            </Form.Group>

                                            <div className="text-center">
                                                <Button variant="primary" disabled={isInvalid} onClick={this.onSubmit}>{TEXT.BTN_PASS}</Button>
                                                <Link to={ROUTES.INGRESO} className="fp-link">{TEXT.PASS_LOGIN}</Link>
                                            </div>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <Alert show={Show} variant={Variant} onClose={() => this.setState({ Show: false })} dismissible>
                    {Mensaje}
                </Alert>
            </div>
        );
    }
}

const Pass = compose(
)(PassBase);

export default PassPage;

export { Pass };