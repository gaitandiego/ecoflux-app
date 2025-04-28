import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import * as ROUTES from '../../constantes/routes';
import { withAuthentication } from '../../componentes/Session';

import UseValidateRoutes from '../../hooks/UseValidateRoutes';

import IngresoPage from '../Acceso';
import RecuperarPage from '../Acceso/recuperar';

import UsuariosPage from '../Usuarios';
import UsuariosAddPage from '../Usuarios/agregar';
import UsuariosEditPage from '../Usuarios/editar';
import RecoleccionesPage from '../Recolecciones';
import RecoleccionesAddPage from '../Recolecciones/agregar';
import RecoleccionesEditPage from '../Recolecciones/editar';

import ReporteRecoleccionPage from '../ReporteRecoleccion';


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

			<Route path={ROUTES.USUARIOS} element={<UseValidateRoutes ><UsuariosPage /></UseValidateRoutes>} />
			<Route path={ROUTES.USUARIOS_ADD} element={<UseValidateRoutes ><UsuariosAddPage /></UseValidateRoutes>} />
			<Route path={ROUTES.USUARIOS_EDIT} element={<UseValidateRoutes ><UsuariosEditPage /></UseValidateRoutes>} />

			<Route path={ROUTES.RECOLECCIONES} element={<UseValidateRoutes ><RecoleccionesPage /></UseValidateRoutes>} />
			<Route path={ROUTES.RECOLECCIONES_ADD} element={<UseValidateRoutes ><RecoleccionesAddPage /></UseValidateRoutes>} />
			<Route path={ROUTES.RECOLECCIONES_EDIT} element={<UseValidateRoutes ><RecoleccionesEditPage /></UseValidateRoutes>} />

			<Route path={ROUTES.REPORTE_RECOLECCION} element={<UseValidateRoutes ><ReporteRecoleccionPage /></UseValidateRoutes>} />
			{/* Rutas protegidas */}

			<Route path='*' element={<NotFound />} />

		</Routes>
		<ToastContainer />

	</BrowserRouter>
)


export default withAuthentication(App);