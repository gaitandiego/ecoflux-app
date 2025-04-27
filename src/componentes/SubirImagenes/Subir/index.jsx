import React from 'react'
import "./index.css";

const SubirContainer = ({
    getInputProps,
    getRootProps
}) => {

    return (

        <div className={'upload-container'}>
            <div   {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>
                    <i className="fa-solid fa-cloud-arrow-up icon-images" />
                </p>
                <p className="mb-1">Haga clic o arrastre el archivo a esta área para subir</p>
                <p>solo se permite archivos con formatos .jpeg .png .pdf</p>
            </div>

        </div>
    )
}

export default SubirContainer