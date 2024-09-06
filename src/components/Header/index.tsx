import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCarpets } from "../../features/carpetsSlice";
import location from "../../img/location.png";
import delivery from "../../img/delivery.png";
import back from "../../img/back.png";
import carpet from "../../img/carpet.png";
import star from "../../img/star.png";
import favorites1 from "../../img/favorites1.png";
import basket1 from "../../img/bascet1.jpg";
import exite from "../../img/exite.png";
import loop from "../../img/loop.png";
import styles from "./header.module.css";
import DropdownCategories from "../DropDawnCategories";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarpets());
  }, [dispatch]);

  const handleSearch = () => {
    console.log("Поиск выполнен");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div className={styles.headListUp}>
        <div className={styles.locat}>
          <div className={styles.imgLoc}>
            <img src={location} alt="location" width={20} height={20} />
          </div>
          <div className={styles.city}>
            <p className={styles.text_p}>Грозный</p>
          </div>
        </div>
        <div className={styles.headListDel}>
          <div>
            <img src={delivery} alt="delivery" width={40} height={40} />
            <a href="/">Бесплатная доставка</a>
          </div>
          <div>
            <img src={back} alt="back" width={20} height={20} />
            <a href="/">Возврат в течение 14 дней</a>
          </div>
          <div>
            <img src={carpet} alt="carpet" width={30} height={30} />
            <a href="/">Все ковры в наличии</a>
          </div>
          <div>
            <img src={star} alt="star" width={20} height={20} />
            <a href="/">Отзывы</a>
          </div>
        </div>
      </div>
      <div className={styles.headLow}>
        <div className={styles.kuznash}>
          <Link to="/">Kuznash.ru</Link>
        </div>
        <div className={styles.headNum}>
          <p>8 800 2000 60</p>
        </div>
        <div className={styles.headCatalog}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              className={styles.searchInput}
              placeholder="Поиск..."
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              <img src={loop} alt="Search" width={20} height={20} />
            </button>
          </div>
          <div>
            <Link to="/favorites" className={styles.favoritesLink}>
              <img src={favorites1} alt="favorites" width={20} height={20} />
              <span>Избранное</span>
            </Link>
          </div>
          <Link to="/cart" className={styles.favoritesLink}>
            <img src={basket1} alt="basket" width={20} height={20} />
            <span>Корзина</span>
          </Link>
          <div>
            <Link to="/logout" className={styles.favoritesLink}>
              <img src={exite} alt="exit" width={20} height={20} />
              <span>Выход</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.cotButtons}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.dropdownContainer}
        >
          <button className={`${styles.catalogButton} ${styles.button}`}>
            Каталог
          </button>
          {showDropdown && <DropdownCategories />}
        </div>
        <div className={styles.other_button}>
          <Link to="/services">Услуги</Link>
        </div>
        <div className={styles.other_button}>
          <Link to="/projects">Проекты</Link>
        </div>
        <div className={styles.other_button}>
          <Link to="/about">О компании</Link>
        </div>
        <div className={styles.other_button}>
          <Link to="/contact">Контакты</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
