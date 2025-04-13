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
      <p className={css.title} id="filter-options">
        Filters
      </p>
      <div
        className={css.selectedValue}
        onClick={handleDropdownToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
      >
        {selectedFilter || "Choose a filter"}
        <svg
          className={`${css.icon} ${isOpen ? css.iconOpen : css.iconClose}`}
          width="20"
          height="20"
          aria-hidden="true"
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
            role="option"
            onClick={() => handleFilterChange("A to Z")}
            tabIndex={0}
            aria-selected={selectedFilter === "A to Z"}
          >
            A to Z
          </p>
          <p
            className={css.option}
            role="option"
            onClick={() => handleFilterChange("Z to A")}
            tabIndex={0}
            aria-selected={selectedFilter === "Z to A"}
          >
            Z to A
          </p>
          <p
            className={css.option}
            role="option"
            onClick={() => handleFilterChange("Low price")}
            tabIndex={0}
            aria-selected={selectedFilter === "Low price"}
          >
            Low price
          </p>
          <p
            className={css.option}
            role="option"
            onClick={() => handleFilterChange("High price")}
            tabIndex={0}
            aria-selected={selectedFilter === "High price"}
          >
            High price
          </p>
          <p
            className={css.option}
            role="option"
            onClick={() => handleFilterChange("Popular")}
            tabIndex={0}
            aria-selected={selectedFilter === "Popular"}
          >
            Popular
          </p>
          <p
            className={css.option}
            role="option"
            onClick={() => handleFilterChange("Not popular")}
            tabIndex={0}
            aria-selected={selectedFilter === "Not popular"}
          >
            Not popular
          </p>
          <p
            className={css.option}
            role="option"
            onClick={() => handleFilterChange("Show all")}
            tabIndex={0}
            aria-selected={selectedFilter === "Show all"}
          >
            Show all
          </p>
        </div>
      )}
    </div>
  );
};

export default Filters;
