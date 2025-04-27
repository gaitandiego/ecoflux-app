import React from 'react'
import './index.css';

const ContainerCard = ({
    index,
    imageURL,
    checked,
    onChange,
    onRemove,
    type,
    name
}) => {
    return (
        <div className="image-card">
            <input
                onChange={onChange}
                type="checkbox"
                checked={checked}
                id={`cb${index}`}
            />
            <label htmlFor={`cb${index}`}>

                {type == "application/pdf" ? (
                    <i className="fa-solid fa-file-pdf" />
                ) : (
                    <img src={imageURL} />
                )}

            </label>
            <div className="options" onClick={onRemove}>
                <i className="fa-solid fa-x icon-remove" />
            </div>
            <p className='card-name-file'>{name}</p>
        </div>
    )
}

export default ContainerCard