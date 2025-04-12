import React, { useState } from "react";
import css from "./Filters.module.css";

const Filters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Show all");

  const handleDropdownToggle = () => setIsOpen(!isOpen);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className={css.selectWrapper}>
      <div className={css.selectedValue} onClick={handleDropdownToggle}>
        {selectedFilter || "Choose a filter"}
      </div>
      {isOpen && (
        <div className={css.dropdown}>
          <p onClick={() => handleFilterChange("A to Z")}>A to Z</p>
          <p onClick={() => handleFilterChange("Z to A")}>Z to A</p>
          <p onClick={() => handleFilterChange("Less than 10$")}>
            Less than 10$
          </p>
          <p onClick={() => handleFilterChange("Greater than 10$")}>
            Greater than 10$
          </p>
          <p onClick={() => handleFilterChange("Popular")}>Popular</p>
          <p onClick={() => handleFilterChange("Not popular")}>Not popular</p>
          <p onClick={() => handleFilterChange("Show all")}>Show all</p>
        </div>
      )}
    </div>
  );
};

export default Filters;
