import React, { useState, useEffect, useMemo } from 'react';

import { AuthUserContext } from './index';
import { cliente } from '../../helpers/fetch';

const apiUsuariosalir = import.meta.env.VITE_API_USUARIO_SALIR;

const withAuthentication = Component => {
    const WithAuthentication = props => {
        const [authUser, setAuthUser] = useState()
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            setLoading(true)
            const user = JSON.parse(localStorage.getItem('authUser') || null)
            if (user) {
                setAuthUser(user)
                setLoading(false)
            } else {
                setAuthUser()
                setLoading(false)
            }
        }, [loading])

        const changeUser = (authUser) => {
            setLoading(true)
            localStorage.setItem('authUser', JSON.stringify(authUser.user_info));
            localStorage.setItem('token', authUser.token);
            setAuthUser(authUser)
        }


        const logoutUser = () => {
            setLoading(true)
            setAuthUser(null)
            localStorage.removeItem('authUser');
            cliente().post(apiUsuariosalir)
            localStorage.removeItem('token');
        }
        const contextAuthUser = useMemo(() => ({ authUser, changeUser, logoutUser }), [authUser])

        return (
            <AuthUserContext.Provider value={contextAuthUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        );
    }

    return WithAuthentication;
};

export default withAuthentication;