import React, { useState, useEffect, useRef } from "react";
import css from "./Filters.module.css";

const Filters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Show all");

  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.selectWrapper}>
      <p className={css.title}>Filters</p>
      <div
        className={css.selectedValue}
        onClick={handleDropdownToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedFilter || "Choose a filter"}
        <svg
          className={`${css.icon} ${isOpen ? css.iconOpen : css.iconClose}`}
          width="20"
          height="20"
        >
          <use href="/icons/icons.svg#icon-chevron-down"></use>
        </svg>
      </div>

      {isOpen && (
        <div
          className={css.dropdown}
          ref={dropdownRef}
          role="listbox"
          aria-labelledby="filter-options"
        >
          <p
            className={css.option}
            onClick={() => handleFilterChange("A to Z")}
          >
            A to Z
          </p>
          <p
            className={css.option}
            onClick={() => handleFilterChange("Z to A")}
          >
            Z to A
          </p>
          <p
            className={css.option}
            onClick={() => handleFilterChange("Low price")}
          >
            Low price
          </p>
          <p
            className={css.option}
            onClick={() => handleFilterChange("High price")}
          >
            High price
          </p>
          <p
            className={css.option}
            onClick={() => handleFilterChange("Popular")}
          >
            Popular
          </p>
          <p
            className={css.option}
            onClick={() => handleFilterChange("Not popular")}
          >
            Not popular
          </p>
          <p
            className={css.option}
            onClick={() => handleFilterChange("Show all")}
          >
            Show all
          </p>
        </div>
      )}
    </div>
  );
};

export default Filters;
