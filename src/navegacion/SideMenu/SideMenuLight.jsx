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
                        <NavLink to={ROUTES.CREDITOS} className="nav-link">
                            <i className="fa-regular fa-credit-card icon"></i>
                            <span className="title">
                                {TEXT.MENU_CREDITOS}
                            </span>
                        </NavLink>


                        <NavLink to={ROUTES.ABONOS} className="nav-link">
                            <i className="fa-regular fa-money-bill icon"></i>
                            <span className="title">
                                {TEXT.MENU_ABONOS}
                            </span>
                        </NavLink>


                        <NavLink to={ROUTES.ESTADOS} className="nav-link">
                            <Icon.Tag
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_ESTADOS}
                            </span>
                        </NavLink>


                        <NavLink to={ROUTES.CLIENTES} className="nav-link">
                            <Icon.Users
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_CLIENTES}
                            </span>
                        </NavLink>
                        <NavLink to={ROUTES.PROVEEDORES} className="nav-link">
                            <Icon.ShoppingBag
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_PROVEEDORES}
                            </span>
                        </NavLink>


                        <NavLink to={ROUTES.METODOS_PAGO} className="nav-link">
                            <Icon.CreditCard
                                className="icon"
                            />
                            <span className="title">
                                {TEXT.MENU_METODOS_PAGO}
                            </span>
                        </NavLink>


                        <NavDropdown title={
                            <div className="dropdown-title">
                                <Icon.User
                                    className="icon"
                                />
                                <span className="title">
                                    {TEXT.MENU_ADMINISTRADORES}
                                    <Icon.ChevronRight
                                        className="icon fr"
                                    />
                                </span>
                            </div>
                        }
                            id="basic-nav-dropdown">


                            <NavLink to={ROUTES.ROLES} className="dropdown-item">
                                <Icon.Tool
                                    className="icon"
                                />
                                <span className="title">
                                    {TEXT.MENU_ROLES}
                                </span>
                            </NavLink>

                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="d-none d-sm-block" style={{ marginTop: 100 }}>

            </div>
        </div >
    );
}

export default SideMenuLight;