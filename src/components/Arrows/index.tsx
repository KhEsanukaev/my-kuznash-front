
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      <FaArrowLeft style={{  fontSize: "30px" }} />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      <FaArrowRight style={{ fontSize: "30px" }} />
    </div>
  );
};

export { PrevArrow, NextArrow };
