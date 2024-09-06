import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categoriesSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../Arrows";
import styles from "../Categories/categories.module.css";
import carpet from "../../img/carpet.jpg";
import { RootState } from "../../app/store"; // Импортируем RootState

const CardCategories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className={styles.carousel}></div>
      <div className={styles.cardCategories}>
        <h2 className={styles.header}>Ковры</h2>
        <Slider {...settings} className={styles.cardList}>
          {categories.map(
            (item: { _id: string; text: string; imageUrl: string }) => (
              <div className={styles.card} key={item._id}>
                <Link to={`/category/${item._id}`}>
                  <img src={carpet} alt={item.text} width={160} height={140} />
                  <div className={styles.cardText}>{item.text}</div>
                </Link>
              </div>
            )
          )}
        </Slider>
      </div>
    </>
  );
};

export default CardCategories;
