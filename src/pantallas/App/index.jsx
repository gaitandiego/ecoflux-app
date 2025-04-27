import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import * as ROUTES from '../../constantes/routes';
import { withAuthentication } from '../../componentes/Session';

import UseValidateRoutes from '../../hooks/UseValidateRoutes';

import IngresoPage from '../Acceso';
import RecuperarPage from '../Acceso/recuperar';

import EstadosPage from '../Estados';
import EstadosAddPage from '../Estados/agregar';
import EstadosEditPage from '../Estados/editar';

import NotFound from '../NotFound';

import '../../recursos/css/style.css';
import '../../recursos/css/responsive.css';
// Se monta los componente con rutas protegidas y sin proteger 

const App = () => (
	<BrowserRouter>
		<Routes>
			{/* Rutas sin proteger */}
			<Route path={ROUTES.LANDING} element={<IngresoPage />} />
			<Route path={ROUTES.INGRESO} element={<IngresoPage />} />
			<Route path={ROUTES.RECUPERAR_CONTRASENA} element={<RecuperarPage />} />
			{/* Rutas sin proteger */}

			{/* Rutas protegidas con login y scope */}

			<Route path={ROUTES.ESTADOS} element={<UseValidateRoutes ><EstadosPage /></UseValidateRoutes>} />
			<Route path={ROUTES.ESTADOS_ADD} element={<UseValidateRoutes ><EstadosAddPage /></UseValidateRoutes>} />
			<Route path={ROUTES.ESTADOS_EDIT} element={<UseValidateRoutes ><EstadosEditPage /></UseValidateRoutes>} />
			{/* Rutas protegidas */}

			<Route path='*' element={<NotFound />} />

		</Routes>
		<ToastContainer />

	</BrowserRouter>
)


export default withAuthentication(App);