import React from 'react';
import * as TEXT from '../../constantes/text';
import { AuthUserContext } from '../Session';

const Footer = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <FooterAuth authUser={authUser} />
            ) : null
        }
    </AuthUserContext.Consumer>
);

const FooterAuth = () => {
    return (
        <footer className="footer mt-2">
            <p className="copi">{TEXT.FOOTER_COPI}<br />{TEXT.FOOTER_POWER}<span> {TEXT.FOOTER_CREADOR} </span></p>
        </footer>
    )
}

export default Footer;