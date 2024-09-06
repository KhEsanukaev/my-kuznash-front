import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../features/cartSlice";
import styles from "../CarpetsCard/carpetsCard.module.css";

interface CarpetItem {
  _id: string;
  name: string;
  image: string[];
  description: string;
  price: number;
  size?: {
    width: number;
    height: number;
  };
  categoryId: {
    name: string;
  };
}

interface Props {
  item: CarpetItem;
}

const CarpetsCard: React.FC<Props> = ({ item }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [isInCart, setIsInCart] = useState(cartItems.some(cartItem => cartItem._id === item._id));

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ carpetId: item._id, quantity: 1 }));

      setIsInCart(true);
    }
  };

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(item.price);

  return (
    <div className={styles.card}>
      <div>
        <img
          className={styles.img}
          src={`http://localhost:3000/images/${item?.image[0]}`}
          alt={item?.name}
        />
      </div>
      <div>{item?.categoryId?.name}</div>
      <div className={styles.desc}>{item?.description}</div>
      <div className={styles.name}>{item?.name}</div>
      {item.size && (
        <div className={styles.size}>
          Размер: {item.size.width} x {item.size.height} см
        </div>
      )}
      <div className={styles.price}>
        {formattedPrice}
        <div className={styles.rub}>руб</div>
      </div>
      <button onClick={handleAddToCart}>
        {isInCart ? "Уже в корзине" : "Добавить в корзину"}
      </button>
    </div>
  );
};

export default CarpetsCard;
