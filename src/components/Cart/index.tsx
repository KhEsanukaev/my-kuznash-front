import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, selectCartItems, selectCartStatus, selectCartError } from '../../features/cartSlice';
import styles from '../Cart/cart.module.css'; // Путь к вашему CSS модулю
import { AppDispatch } from '../../app/store';


const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();  // Типизируйте dispatch
  const items = useSelector(selectCartItems);
  const status = useSelector(selectCartStatus);
  const error = useSelector(selectCartError);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveFromCart = (id: string) => {
    // Передаем _id вместо carpetId
    console.log('Removing item with id:', id);
    dispatch(removeFromCart({ carpetId: id, cartId: id }));  // если cartId и carpetId совпадают
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Моя корзина</h2>
        {items.length === 0 ? (
          <div>Ваша корзина пуста.</div>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={`http://localhost:3000/images/${item._id}`} alt={item.name} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>Цена: {item.price} руб.</div>
                  <div className={styles.itemQuantity}>Количество: {item.quantity}</div>
                  <button onClick={() => handleRemoveFromCart(item._id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
