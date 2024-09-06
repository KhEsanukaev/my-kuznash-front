import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CarpetsHeader.module.css";

interface Props {
  categoryName: string;
}

const CarpetsHeader: React.FC<Props> = ({ categoryName }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <button onClick={handleBackClick} className={styles.backButton}>
        Назад
      </button>
      <h1 className={styles.title}>{categoryName}</h1>
    </div>
  );
};

export default CarpetsHeader;

