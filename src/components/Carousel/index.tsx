
import Carousel from "react-bootstrap/Carousel";
import styles from "../Carousel/carousel.module.css"; // Импортируем стили

import carpetslider from "../../img/carpetslider.jpg";
import carpetslider2 from "../../img/carpetslider2.jpg";

const IndividualIntervalsExample = () => {
  return (
    <Carousel className={styles.carouselContainer}>
      <Carousel.Item className={styles.carousel_item} interval={4000}>
        <img
          className={`${styles.carouselImage} d-block w-100`}
          src={carpetslider}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item} interval={4000}>
        <img
          className={`${styles.carouselImage} d-block w-100`}
          src={carpetslider2}
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default IndividualIntervalsExample;
