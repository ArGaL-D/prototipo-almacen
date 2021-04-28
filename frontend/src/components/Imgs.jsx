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
                // Guardar imágen
                try {
                    const resp = await axios.post('http://localhost:3001/subir-img',formData,{
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
            Swal.fire({
                icon: 'warning',
                title: 'Ups...',
                html: 'Sólo se admite extensiones <strong>jpg, jpeg y png</strong>.'                
                })
        }
        /*
        try {
            const resp = await axios.post('http://localhost:3001/subir-img',formData,{
                headers: {'Content-Type': 'multipart/form-data'}
            });

            const {fileName,filePath} = resp.data; 
            setUploadFile({fileName, filePath});
        } catch (error) {
            console.log(error)
        }    
        */
    }

    const deleteImg = async (e) => {
        e.preventDefault();

        // Nombre de la imágen
        const image    = e.currentTarget.parentNode.firstChild;        
        const fullPath = image.src;
        const filename = fullPath.replace(/^.*[\\\/]/, '');



        
        /*
        try {
            const resp = await axios.delete(`http://localhost:3001/delete-image/${filename}`);
            if (resp.data.eleted_image){

            }else{
                
            }
        } catch (error) {
            console.log(error)
        }
        */
        
    }

    useEffect(()=>{
        axios.get('http://localhost:3001/imagenes')
            .then(resp => {
                setImage(resp.data);                
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
                                    src={`http://localhost:3001/${image}`} 
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
