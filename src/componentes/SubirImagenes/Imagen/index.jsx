import React from 'react'
import './index.css';
const sizes = {
    small: 40,
    medium: 70,
};

const ContainerImagen = ({ url, size = "small", onImageRemove, index, type, name }) => (
    <div className='image-container'>
        {type == "application/pdf" ? (
            <i className="fa-solid fa-file-pdf icono-preview" />
        ) : (
            <img width={sizes[size]} height={sizes[size]} src={url} />
        )}

        <p className='name-file'>{name}</p>
        <div className='icon-remove' onClick={() => onImageRemove(index)}>
            <i className="fa-solid fa-x " />
        </div>
    </div>
)

export default ContainerImagen