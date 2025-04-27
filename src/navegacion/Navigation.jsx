import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Icon from 'react-feather';
import { AuthUserContext } from '../componentes/Session';
import './Navigation.css';
import {
    Navbar,
    Nav,
    NavDropdown,
    Image
} from 'react-bootstrap';

import SignOutButton from '../pantallas/Acceso/salir';


// If want to active light sidebar then please uncomment below & comment above component
import SideMenuLight from './SideMenu/SideMenuLight';

// Logo image path
import Logo from '../recursos/img/logo.png';
import SmallLogo from '../recursos/img/small-logo.png';

// Profile & user image path
import profile from '../recursos/img/profile.jpg';



// Navegacion superior 
const NavigationAuth = () => {

    const { authUser } = useContext(AuthUserContext)
    const [sideMenu, setSideMenu] = useState(false)

    const _toggleClass = () => {
        const currentSideMenu = sideMenu;
        setSideMenu(!currentSideMenu)
    }

    return (
        <div className="page-wrapper">
            <Navbar fixed="top" className="top-menu">
                <Link to="/home/" className={`navbar-brand ${sideMenu ? 'navbar-logo' : ''}`}>
                    {/* Large logo */}
                    <Image src={Logo} alt="Logo" className="large-logo" />
                    {/* Small logo */}
                    <Image src={SmallLogo} alt="Small Logo" className="small-logo" />
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Burger menu */}
                <div className={`burger-menu ${sideMenu ? 'toggle-menu' : ''}`} onClick={_toggleClass}>
                    <span className="top-bar"></span>
                    <span className="middle-bar"></span>
                    <span className="bottom-bar"></span>
                </div>
                {/* End Burger menu */}


                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ml-auto right-nav">

                        <NavDropdown
                            title={
                                <div className="menu-profile">
                                    <span className="name">{`${authUser.nombre_usuario}`}</span>
                                    <Image src={profile} alt="Profile Image" roundedCircle />
                                </div>
                            }
                            id="basic-nav-dropdown" className="profile-nav-item">

                            <SignOutButton />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>


            <SideMenuLight sideMenu={sideMenu} />

        </div >
    );

}

export default NavigationAuth;