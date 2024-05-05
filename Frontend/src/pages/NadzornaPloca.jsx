import Carousel from 'react-bootstrap/Carousel';
import chuckImage from '../assets/chuck.png';
import desertImage from '../assets/desert.jpg';
import duhanskaImage from '../assets/Duhanska.jpg';
import karatekidImage from '../assets/karatekid.png';
import voceImage from '../assets/voce.jpg';
import mentholImage from '../assets/Menthol.jpg';

var heroData = [
  {
    id: 1,
    image: chuckImage,
    title: 'Chuck Norris',
    description: 'Uziva u našoj duhanskoj tekućini.',
    
  },
  {
    id: 2,
    image: voceImage,
    title: 'Voćna Aroma',
     
    
  },
  {
    id: 3,
    image: duhanskaImage,
    title: 'Duhanska Aroma',
    
    
  },
  {
    id: 4,
    image: desertImage,
    title: 'Desertna Aroma',
   
    
  },
  {
    id: 5,
    image: mentholImage,
    title: 'Menthol Aroma',
    
    
  },
  {
    id: 6,
    image: karatekidImage,
    title: 'Otkrijte sve vrste aroma na našoj stranici',
    
    
  },
]
function AppHero() {
  return (
    
    <section id="home" className="mt-4">
       <Carousel>
          {
            heroData.map(hero => {
              return (
                <Carousel.Item key={hero.id} className='hero-item' >
                  <img
                    className="d-block  w-100 hero-image "
                    src={hero.image}
                    alt={"slide " + hero.id}
                  />
                  <Carousel.Caption>
                    <h2 class="text-cyan-50 font-serif text-xl">{hero.title}</h2>
                    <p class="text-cyan-50 font-serif ">{hero.description}</p>
                    
                  </Carousel.Caption>             
                </Carousel.Item>
              );
            })
          }
      </Carousel>
    </section>
  );
}

export default AppHero;