import React, { useContext } from "react";
import { AuthUserContext } from '../componentes/Session';
import { Navigate, Routes } from 'react-router-dom';

import Navigation from '../navegacion/Navigation'
import Footer from '../componentes/Footer/Footer';
import * as ROUTES from '../constantes/routes';
import NotFound from "../pantallas/NotFound";

import { compose } from 'react-recompose';
import { withRouter } from '../router/withRouter';

import Loader from '../componentes/Common/Loader';

// Valida si las rutas existen

const UseValidateRoutes = ({ children, removerNav, ...props }) => {

    const { authUser } = useContext(AuthUserContext);
    // Carga el loading 

    if (authUser && removerNav) {
        return (React.cloneElement(children, { ...props }))
    }

    // valida si el usuario esta registrado y tiene los permisos de vista 
    if (authUser) {
        return (<div className="page-wrapper">
            <div className="main-content d-flex flex-column">
                <Navigation />

                {React.cloneElement(children, { ...props })}
                <div className="flex-grow-1"></div>
                <Footer />
            </div>
        </div>)
    }

    // valida si existe el usuario y no tiene los permisos 
    if (authUser) return (<NotFound />)

    return <Navigate to={ROUTES.INGRESO} />

}

export default compose(
    withRouter,
)(UseValidateRoutes);

