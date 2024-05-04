import React from 'react';
import { Container } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';


const CarouselComponent = () => {
  return (
    <Container className='mt-4'>
     <Carousel >
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src="src/assets/chuck.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 class="text-cyan-50 font-serif text-xl">Chuck Norris</h3>
            <p class="text-cyan-50 font-serif text-xl">Uziva u našoj duhanskoj tekućini.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/assets/voce.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 class="text-cyan-50 font-serif text-xl">Voćna Aroma</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/assets/desert.jpg"
            alt="Third slide"
          />
           <Carousel.Caption>
            <h3 class="text-cyan-50 font-serif text-xl">Desertna Aroma</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/assets/Duhanskajpg.jpg"
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3 class="text-cyan-50 font-serif text-xl">Duhanska Aroma</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/assets/karatekid.png"
            alt="Fifth slide"
          />
          <Carousel.Caption>
            <h3 class="text-cyan-50 font-serif text-xl">Otkrijte sve vrste aroma na našoj stranici </h3>
            
          </Carousel.Caption>

        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselComponent;