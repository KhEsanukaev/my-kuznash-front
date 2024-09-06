import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCarpets } from "../../features/carpetsSlice";
import { RootState } from "../../app/store";
import CarpetsCard from "../CarpetsCard";
import CarpetsHeader from "../CarpetsHeader";
import styles from "./carpets.module.css";

interface Props {
  searchQuery?: string;
}

const Carpets: React.FC<Props> = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();

  const carpets = useSelector((state: RootState) => state.carpets.carpets);
  const status = useSelector((state: RootState) => state.carpets.status);
  const error = useSelector((state: RootState) => state.carpets.error);

  const [categoryName, setCategoryName] = useState("");
  const [selectedWidth, setSelectedWidth] = useState<number | null>(null);
  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCarpets());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (id && carpets.length > 0) {
      const category = carpets.find((item) => item.categoryId._id === id)?.categoryId.name;
      if (category) {
        setCategoryName(category);
      }
    }
  }, [id, carpets]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  // Log the carpets data for debugging
  console.log("Carpets data:", carpets);

  const filteredCarpets = carpets.filter((item) => {
    const matchesId = !id || item.categoryId._id === id;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery?.toLowerCase() || "");
    const matchesSize = (!selectedWidth || item.size?.width === selectedWidth) &&
                        (!selectedHeight || item.size?.height === selectedHeight);

    // Log items without size for debugging
    if (!item.size) {
      console.warn("Item without size:", item);
    }

    return matchesId && matchesQuery && matchesSize;
  });

  return (
    <div className={styles.carpets}>
      {id && <CarpetsHeader categoryName={categoryName} />}
      <div className={styles.filters}>
        <select onChange={(e) => setSelectedWidth(parseInt(e.target.value))}>
          <option value="">Select Width</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
          <option value="250">250</option>
          <option value="300">300</option>
          <option value="350">350</option>
          <option value="400">400</option>
          <option value="450">450</option>
          {/* Add more sizes as needed */}
        </select>
        <select onChange={(e) => setSelectedHeight(parseInt(e.target.value))}>
          <option value="">Select Height</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
          <option value="250">250</option>
          <option value="300">300</option>
          <option value="350">350</option>
          <option value="400">400</option>
          <option value="450">450</option>
          {/* Add more sizes as needed */}
        </select>
      </div>
      <div className={styles.cardsContainer}>
        {filteredCarpets.map((item) => (
          <CarpetsCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Carpets;
