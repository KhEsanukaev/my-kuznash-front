import quality from "../../img/quality.jpg";
import factory3 from "../../img/factory3.png";
import service from "../../img/service.png";
import styles from "../../components/Container/container.module.css";

const Container = () => {
  return (
  <>
  
    <div>
      <div className={styles.desc}>
        <h2>Наши преимущиства</h2>
      </div>
      <div className={styles.images}>
        <div>
          <div className={styles.images1}>
            <img src={quality} alt="" width={135} height={100} />
          </div>
          <div className={styles.text1}>
            <p>
              {" "}
              Стабильность качества Продукция соответствует ГОСТам и
              международным стандартам качества
            </p>
          </div>
        </div>
        <div>
          <div className={styles.images2}>
            <img src={factory3} alt="" />
          </div>
          <div className={styles.text2}>
            <p>
              Покупка у производителя 100% оригинальная продукция. Официальный
              интернет магазин
            </p>
          </div>
        </div>
        <div>
          <div className={styles.images3}>
            <img src={service} alt="" />
          </div>
          <div className={styles.text3}>
            <p>
              качественный сервис 7 дней в неделю принимаем и доставляем заказы
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Container;
