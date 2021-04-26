
import { Carousel } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import image1 from "../imgs/background.jpg";
import image2 from "../imgs/edif02.jpg";
import image3 from "../imgs/edif03.jpg";

export default function ControlledCarousel() {
    
    return (
        <Carousel>

          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              <br/>
              <br/>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={image1}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <br/>
              <br/>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image1}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              <br/>
              <br/>
            </Carousel.Caption>
          </Carousel.Item>

      </Carousel>
    );
  }