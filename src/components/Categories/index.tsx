
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../features/categoriesSlice";
import styles from "../Categories/categories.module.css"
import { Link } from "react-router-dom";
import { RootState } from "../../app/store"


const Categories: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());

      }, [dispatch]);
console.log(categories);



  return (
    <>
      <div className={styles.all_categories}>
    {categories.map((item: { _id: string; text: string }) => (
      <div className={styles.category} key={item._id}>
        <Link to={`/category/${item._id}`}>{item.text}</Link>
      </div>
    ))}
  </div>
  </>
  
  )
}

export default Categories
