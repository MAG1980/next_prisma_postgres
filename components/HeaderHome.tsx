"use client";
import Carousel from 'react-bootstrap/Carousel';


const HeaderHome = () => {
  return (
    <header>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/banner/banner2.png"
            alt="First slide"
          />
    <Carousel.Caption>
            <h3>Сезон "Сады и огороды"</h3>
            <p>СОСЕД ПО ДАЧЕ</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/banner/banner.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>-15% НА СТЕЙКИ</h3>
            <p>при заказе на сайте</p>
          </Carousel.Caption>
        </Carousel.Item>


      </Carousel>





    </header>
  )
}

export default HeaderHome