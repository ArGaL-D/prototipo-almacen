import React,{useState, useEffect} from 'react';
import axios from 'axios';

import * as MdIcons from 'react-icons/md';

import "./styles/Imgs.css";

export default function Imgs() {

    const [file,setFile] = useState(null);
    const [filename,setFilename] = useState('Selecciona las imágenes');
    const [uploadFile,setUploadFile] = useState({});
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

        try {
            const resp = await axios.post('http://localhost:3001/subir-img',formData,{
                headers: {'Content-Type': 'multipart/form-data'}
            });

            const {fileName,filePath} = resp.data; 
            setUploadFile({fileName, filePath});
        } catch (error) {
            console.log(error)
        }    
            
    }

    const deleteImg = async (e) => {
        e.preventDefault();

        // Nombre de la imágen
        const fullPath = e.target.src;
        const filename = fullPath.replace(/^.*[\\\/]/, '');

        console.log(filename)
        
        try {
            const resp = await axios.delete(`'http://localhost:3001/imagenes/${filename}`);
            console.log(resp.data.deleted_image)
        } catch (error) {
            console.log(error)
        }
        
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
                                    src={`http://localhost:3001/${image}`} 
                                    className="imgSlider" 
                                    alt=""
                                    onClick={deleteImg}    
                                />
                                <div className="delete_img">
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
