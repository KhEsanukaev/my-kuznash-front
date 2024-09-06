
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Categories/categories.module.css";
import { RootState } from "../../app/store"

const DropdownCategories: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <div className={styles.dropdownCategories}>
      {categories.map((item: { _id: string; text: string }) => (
        <div className={styles.category} key={item._id}>
          <Link to={`/category/${item._id}`}>{item.text}</Link>
        </div>
      ))}
    </div>
  );
};

export default DropdownCategories;
