import React, { useEffect, useRef, useState } from 'react'
import fotoVacia from '../../recursos/img/fotoVacia.jpg'
import * as Icon from 'react-feather';
import { toast } from 'react-toastify';
import * as TEXT from '../../constantes/text';

const baseUrl = import.meta.env.VITE_API_URL;

const AgregarImagenes = React.forwardRef(({ onChange, errors, value = [], cargando, limite = 4, onChangeRemove = () => { } }, ref) => {
  const [imagenes, setImagenes] = useState([])
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => { hiddenFileInput.current.click(); };

  const handleChange = e => {
    if (imagenes.length < limite) {
      let picture = e.target.files[0]
      setImagenes([...imagenes, { imagePrev: URL.createObjectURL(picture), imagen: picture, nueva: true }])
      onChange([...imagenes, { imagePrev: URL.createObjectURL(picture), imagen: picture, nueva: true }])
    } else {
      toast.error(TEXT.ALERT_ERROR_IMAGENES_LIMITE)
    }
  }

  const BorraImagenes = () => {
    onChangeRemove(imagenes)
    setImagenes([])
    onChange([])
  }

  useEffect(() => {
    setImagenes(value)
  }, [cargando])


  return (
    <div className={`fotos`} ref={ref}>
      <div className={`${errors.fotos && 'is-invalid'} FotoPrev`} >
        <img src={imagenes && imagenes.length > 0 ? imagenes[0].imagePrev || baseUrl + '/' + imagenes[0].ruta : fotoVacia} />
      </div>
      <div className='AgregarImagenes'>
        {imagenes.length > 0 ?
          imagenes.map((item, index) => (
            <div className='AddImagen' key={index}>
              <img src={item === undefined ? fotoVacia : item.imagePrev ? item.imagePrev : baseUrl + '/' + item.ruta} />
              <div style={{ position: 'absolute', top: '25%', right: '35%', }}><span>{index + 1}</span></div>
            </div>
          )
          )
          : <div className={`${errors.fotos && 'is-invalid'} AddImagen`}><img src={fotoVacia} /></div>
        }
      </div>


      <div style={{ display: 'flex' }}>
        <div style={{ flex: 9 }}>
          <button onClick={handleClick} type='button' className='BtnAddImagen'>
            <Icon.Plus className="icon wh-15" /> Sube foto
          </button>
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
        <div style={{ flex: 3, marginLeft: 5 }}>
          <button type='button' onClick={() => BorraImagenes()} className='BtnAddImagenTrash'>
            <Icon.Trash className="icon wh-15" />
          </button>
        </div>
      </div>

    </div>
  )
})

export default AgregarImagenes