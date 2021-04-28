import React,{useState, useEffect} from 'react';
import axios from 'axios';

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

    useEffect(()=>{
        axios.get('http://localhost:3001/imagenes')
            .then(resp => {
                setImage(resp.data);                
            })
    },[]);

    return (
        <div className="images">
            <br/>
            <form className="addImgs">                
                <input type="file" className="file" multiple onChange={handleFile}/>                
                <button  onClick={readFileImg}>Subir</button>
            </form>
            <br/>

            <div className="box_images">
                {
                    image.map((image,index) => {
                        return(
                            <div key={index} className="cardImg">
                               <img src={`http://localhost:3001/${image}`} className="imgSlider" alt=""/>
                            </div>
                        )
                    })
                }

            </div>


        </div>
    )
}
