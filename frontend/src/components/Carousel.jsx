
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

import image1 from "../imgs/img01.jpg";
import image2 from "../imgs/img02.jpg";
import image3 from "../imgs/img03.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function ControlledCarousel() {
  
  const [images,setImages] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3001/imagenes')
        .then(resp => {
            setImages(resp.data);                
        })
  },[]);

    return (
      <>
        {
            images.length === 0 
            ? 
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                      className="d-block w-100"
                      src={image1}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Hola</h3>
                      <br/>
                      <p>Bienvenido</p>
                      <br/>                      
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                      className="d-block w-100"
                      src={image2}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Hola</h3>
                      <br/>
                      <p>Bienvenido</p>
                      <br/>                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                      className="d-block w-100"
                      src={image3}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Hola</h3>
                      <br/>
                      <p>Bienvenido</p>
                      <br/>                      
                    </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            : 
            <Carousel>
              {
                images.map((image,index) => {
                  return(
                    <Carousel.Item interval={8000} key={index}>   
                      <img                        
                          src = {`http://localhost:3001/${image}`}
                          alt = "First slide"
                          className = "d-block w-100"
                        />
                    </Carousel.Item>     
                  )
                })
              }
            </Carousel>
        }
    </>
    );
  }