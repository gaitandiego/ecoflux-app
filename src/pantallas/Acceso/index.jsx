import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../../router/withRouter';
import { compose } from 'react-recompose';
import { toast } from 'react-toastify';
import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import * as ROUTES from '../../constantes/routes';
import * as TEXT from '../../constantes/text';
import { AuthUserContext } from '../../componentes/Session';

import Logo from '../../recursos/img/logo.png';
import { cliente } from '../../helpers/fetch';

const apiUsuario = import.meta.env.VITE_API_USUARIO;

const LoginBase = props => {
	const [cargando, setCargando] = useState(false)
	const [Email, setEmail] = useState('')
	const [Password, setPassword] = useState('')

	const { authUser, changeUser } = useContext(AuthUserContext)

	useEffect(() => {
		if (authUser) {
			props.navigate(ROUTES.RECOLECCIONES);
		}
	}, [authUser])

	const onSubmit = async (event) => {
		setCargando(true);
		event.preventDefault();
		try {
			const resp = await cliente().post(apiUsuario, { email: Email, password: Password });
			if (resp.data) {
				changeUser(resp.data)
			} else {
				toast.error(TEXT.ALERT_EMAIL_ERROR)
			}
			setCargando(false);
		} catch (error) {
			console.log(error)
			toast.error(TEXT.ALERT_EMAIL_ERROR)
			setCargando(false);
		}


	};

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
									<div className="text-login" style={{ textAlign: 'justify' }}>
										<p>{TEXT.LOGIN_DESCRIPCION}</p>
									</div>
								</div>
								<p className="copi d-none d-sm-none d-md-block">{TEXT.FOOTER_COPI}<br /><span>{TEXT.FOOTER_CREADOR}</span></p>
							</Col>

							<Col md={6} className="position-relative">
								<div className="form-content">
									<h1 className="heading">{TEXT.LOGIN_TITULO} {TEXT.FOOTER_CREADOR}</h1>

									<Form onSubmit={onSubmit}>
										<Form.Group>
											<Form.Label>{TEXT.FORM_EMAIL}</Form.Label>
											<Form.Control
												type="email"
												name="Email"
												required
												value={Email}
												onChange={(event) => setEmail(event.target.value)}
											/>
										</Form.Group>

										<Form.Group>
											<Form.Label>{TEXT.FORM_PASS}</Form.Label>
											<Form.Control
												type="password"
												name="Password"
												required
												value={Password}
												onChange={(event) => setPassword(event.target.value)}
											/>

										</Form.Group>
										<div className="text-center">
											<Button type="submit" variant="primary" disabled={cargando} style={{ position: 'relative' }}>{TEXT.BTN_LOGIN}</Button>
											<Link to={ROUTES.RECUPERAR_CONTRASENA} className="fp-link">{TEXT.LOGIN_OLVIDO}</Link>
										</div>
									</Form>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>
	)
}

export default compose(
	withRouter,
)(LoginBase);

