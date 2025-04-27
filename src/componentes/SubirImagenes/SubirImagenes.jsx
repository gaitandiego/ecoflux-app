import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import SubirContainer from './Subir';
import ContainerImagen from './Imagen';
import './index.css';
import ContainerCard from './Card';

const SubirImagenes = ({ onUpload,
    onRemove,
    dataSources = [], disabled }) => {

    const [images, setImages] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.png'],
            'application/pdf': ['.pdf']
        },
        maxSize: 2000000,
        onDrop: acceptedFiles => {
            const items = [...images]

            acceptedFiles.map(file => items.push(Object.assign(file, {
                data_url: URL.createObjectURL(file)
            })))
            setImages(items);
        }
    });

    const [selectedImages, setSelectedImages] = useState([]);

    const greaterZeroUpload = disabled ? true : images.length > 0 ? false : true;

    const onSelectImage = (checked, index, url, img) => {
        const data = {
            data_url: url,
            index,
            ...img,
        };
        if (checked) {
            setSelectedImages([data])
        } else {
            setSelectedImages([])
        }
        window.open(url)
    };

    const onClear = () => {
        setSelectedImages([]);
    };

    const uploadImages = () => {
        setImages([])
        onUpload(images)
    }

    const onImageRemove = (index) => {
        const imagesArray = [...images]
        imagesArray.splice(index, 1);
        setImages(imagesArray)
    }
    return (
        <div className="card" border='0'>
            <div className='card-container-full mb-2  '>
                <div className='card-container'>

                    <div className="upload__image-wrapper">
                        <SubirContainer
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                        />
                        <div className="upload-image-preview">
                            <div className='mb-2 row'>
                                <div className='col-12'>
                                    <div className='d-flex  flex-wrap'>
                                        {images.map((image, index) => (
                                            <ContainerImagen key={index} url={image.data_url} index={index} name={image.name} onImageRemove={onImageRemove} type={image.type} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='card-container'>
                    <div className="media-library mb-2">
                        {dataSources && dataSources.map((img, index) => {
                            const includeImage = selectedImages.find((image) => {
                                return image.index === index ? true : false;
                            });
                            return (
                                <ContainerCard
                                    index={index}
                                    key={index}
                                    name={img.name}
                                    checked={includeImage}
                                    onRemove={() => onRemove(img.id, img.name)}
                                    onChange={(e) =>
                                        onSelectImage(e.target.checked, index, img.data_url, img)
                                    }
                                    imageURL={img.data_url}
                                    type={img.type}
                                />
                            );
                        })}
                        {dataSources.length == 0 && (<div className='d-flex justify-content-center align-items-center w-100'>
                            <p>No hay archivos para mostrar</p>
                        </div>)}
                    </div>
                    <div className='row'>
                        <div className='col-11 mt-2 p-0 d-flex justify-content-end ' >
                            <button
                                className='button-images background-rojo '
                                style={{
                                    marginRight: 5,
                                }}
                                disabled={greaterZeroUpload}
                                onClick={() => setImages([])}
                            >
                                <i className="fa-solid fa-square-xmark" />
                            </button>
                            <button
                                className='button-images'
                                disabled={greaterZeroUpload}
                                onClick={uploadImages}
                            >
                                <i className="fa-solid fa-upload" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div >

    )
}

export default SubirImagenes