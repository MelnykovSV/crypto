"use client";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function StarCheckbox({ checkStatus = false }) {
  const [isChecked, setIsChecked] = useState(checkStatus);

  const checkHandler = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <button onClick={checkHandler}>
      <span>{isChecked ? <FaStar /> : <FaRegStar />}</span>
    </button>
  );
}
