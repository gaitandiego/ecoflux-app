import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import * as Icon from 'react-feather';
import './SideMenu.css';

import * as ROUTES from '../../constantes/routes';
import * as TEXT from '../../constantes/text';

// Navegacion lateral

function SideMenuLight({ sideMenu }) {

    return (
        <div className={`sidemenu-area sidemenu-light ${sideMenu ? 'sidemenu-toggle' : ''}`}>
            <Navbar className={`sidemenu ${sideMenu ? 'hide-nav-title' : ''}`}  >
                <Navbar.Collapse>
                    <Nav>
                        <NavLink to={ROUTES.RECOLECCIONES} className="nav-link">
                            <Icon.Trash2
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_RECOLECCIONES}
                            </span>
                        </NavLink>

                        <NavLink to={ROUTES.USUARIOS} className="nav-link">
                            <Icon.Users
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_USUARIOS}
                            </span>
                        </NavLink>

                        <NavLink to={ROUTES.REPORTE_RECOLECCION} className="nav-link">
                            <Icon.BookOpen
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_REPORTE_RECOLECCION}
                            </span>
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="d-none d-sm-block" style={{ marginTop: 100 }}>

            </div>
        </div >
    );
}

export default SideMenuLight;