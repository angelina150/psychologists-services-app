import React, { useState, useEffect, useRef } from "react";
import css from "./TimePicker.module.css";

const TimePicker = ({ setValue }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const generateTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 22; hour++) {
      const hourStr = String(hour).padStart(2, "0");
      for (let minute = 0; minute < 60; minute += 30) {
        const minuteStr = String(minute).padStart(2, "0");
        if (!(hour === 22 && minute > 30)) {
          times.push(`${hourStr}:${minuteStr}`);
        }
      }
    }
    return times;
  };

  const times = generateTimes();

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleOptionClick = (time) => {
    setSelectedTime(time);
    setDropdownVisible(false);
    setValue("time", time);
  };
  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.container} ref={containerRef}>
      <input
        type="text"
        className={css.input}
        value={selectedTime}
        placeholder="00:00"
        readOnly
        onClick={toggleDropdown}
      />

      <svg className={css.clock} width="20" height="20">
        <use className={css.clockIcon} href="/icons/icons.svg#icon-clock"></use>
      </svg>
      {dropdownVisible && (
        <div className={css.dropdown} ref={dropdownRef}>
          <div className={css.title}>Meeting time</div>
          {times.map((time) => (
            <div
              key={time}
              className={css.option}
              onClick={() => handleOptionClick(time)}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
