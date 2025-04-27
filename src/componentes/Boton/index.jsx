import React from 'react'
import { Button } from 'react-bootstrap'

export const Boton = ({ children, cargando, ...props }) => (
    <Button disabled={cargando} {...props}>{cargando && (<div className="spinner-border text-light spinner-border-sm mr-1" role="status">
        <span className="sr-only">Loading...</span>
    </div>)} {children}</Button>
)

