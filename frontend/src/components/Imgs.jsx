import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import * as MdIcons from 'react-icons/md';

import "./styles/Imgs.css";

export default function Imgs() {

    const [file,setFile] = useState(null);
    const [filename,setFilename] = useState('');
    const [image,setImage] = useState([]);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    // Abrir y seleccionar imágenes
    const readFileImg = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file',file);

        // Revisar extensión
        const result = filename.lastIndexOf('.')+1;
        const extension = filename.substring(result);

        if (extension === 'jpg' || extension === 'png' || extension === 'jpeg'){
            if (file.size <= 1024 * 1024 * 2){

                // Validar password actual del usuario
                const { value: password } = await Swal.fire({
                    title: 'Ingrese su contraseña',
                    input: 'password',                    
                    inputPlaceholder: 'Ingrese contraseña',
                    cancelButtonColor: '#d33',
                    showCancelButton: true,
                    inputAttributes: {
                      autocapitalize: 'off',
                      autocorrect: 'off'
                    }
                  })
                // Verificar contraseña
                try {
                    const token = localStorage.getItem('token');
                    const resp1 = await axios.post('/verificar-usuario', { token, password });
                    if (resp1.data.isAuth){
                        // Guargar imagen
                        if (resp1.data.successful_password) {

                            const resp = await axios.post('/subir-img',formData,{
                                headers: {'Content-Type': 'multipart/form-data'}
                            });
                            
                            if (resp.data.uploaded_file){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Se ha guardado la imagen correctamente',
                                    showConfirmButton: false,
                                    timer: 1700
                                })
                            }else{
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Hubo problemas, en guardar la imagen. Probablemente, el servidor tiene conflictos internos, o esté desactivado el servidor.',
                                    showConfirmButton: false,
                                    timer: 1700
                              })
                            }
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "Contraseña",
                                text: "Incorrecta."
                            });
                        }
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hay problemas de autenticación de usuario."
                        });
                    }                    
                } catch (error) {
                    console.log(error)
                }
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Ups...',
                    html: 'Sólo se admite archivos menores a <strong>2Mb</strong>.'                
                })
            }
            
        }else{
            if (filename.length === 0){
                Swal.fire({
                    icon: 'warning',
                    title: 'Uups...',
                    html: 'Seleccione una imagen.'                
                })
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Uups...',
                    html: 'Sólo se admite extensiones <strong>jpg, jpeg y png</strong>.'                
                })
            }
        }
    }

    const deleteImg = async (e) => {
        e.preventDefault();

        // Nombre de la imágen
        const image    = e.currentTarget.parentNode.firstChild;        
        const fullPath = image.src;
        const filename = fullPath.replace(/^.*[\\/]/, '');      
        
        // Solicitar password
        const { value: password } = await Swal.fire({
            title: 'Contraseña',
            input: 'password',
            inputPlaceholder: 'Ingrese contraseña',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        })
        
        try {
            const token = localStorage.getItem('token');
            const resp1 = await axios.post('/verificar-usuario', { token, password });

            if (resp1.data.isAuth) {
                if (resp1.data.successful_password) {
                    // Eliminar imagen
                    const resp = await axios.delete(`/delete-image/${filename}`);
                    if (resp.data.deleted_image){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Se ha eliminado correctamente la imagen',
                            showConfirmButton: false,
                            timer: 1700
                        })
                    }else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'No se pudo eliminar la imagen.',
                            showConfirmButton: false,
                            timer: 1700
                        })
                    }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Contraseña",
                        text: "Incorrecta."
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hay problemas de autenticación de usuario."
                });
            }            
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'warning',
                title: error,
                html: 'Probablemente, el servidor esté desactivado, o haya conflictos internos en el srvidor.'                
            })
        }  
    }

    useEffect(()=>{
        axios.get('/imagenes')
            .then(resp => {
                setImage(resp.data);                
            })
            .catch(error => {
                console.log(error)
            })
    },[]);

    return (
        <div className="images">
            <form className="form_imgs">                
                <input type="file" className="file" multiple onChange={handleFile}/>                
                <div className="btn_subir">
                    <button onClick={readFileImg}>Guardar</button>
                </div>
            </form>

            <div className="box_images">
                {
                    image.map((image,index) => {
                        return(
                            <div key={index} className="cardImg">
                               <img 
                                    id = {`image_${index}`}
                                    src={`/${image}`} 
                                    className="imgSlider" 
                                    alt=""                                      
                                />
                                <div className="delete_img" onClick={deleteImg} >
                                    <MdIcons.MdDelete/>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
