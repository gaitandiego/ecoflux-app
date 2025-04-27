import React, { useContext } from 'react';
import * as Icon from 'react-feather';
import { AuthUserContext } from '../../componentes/Session';

const SignOutButton = (props) => {
    const { logoutUser } = useContext(AuthUserContext)
    return (
        < div onClick={logoutUser} className="dropdown-item" style={{ cursor: 'pointer' }}>
            <Icon.LogOut
                className="icon"
            />
            Cerrar sesión

        </div >
    )
};

export default SignOutButton;