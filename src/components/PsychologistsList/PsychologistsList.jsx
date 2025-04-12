import { useState } from "react";

import css from "./PsychologistsList.module.css";
import PsychologistsItem from "../PsychologistsItem/PsychologistsItem.jsx";

export const PsychologistsList = ({
  psychologists,
  sortCriteria,
  sortDirection,
}) => {
  const sortPsychologists = (psychologists) => {
    return psychologists.sort((a, b) => {
      let valueA, valueB;
      if (sortCriteria === "name") {
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
      } else if (sortCriteria === "price") {
        valueA = a.price_per_hour;
        valueB = b.price_per_hour;
      } else if (sortCriteria === "rating") {
        valueA = a.rating;
        valueB = b.rating;
      }
      if (sortDirection === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  };
  const sortedPsychologists = sortPsychologists([...psychologists]);
  return (
    <div>
      {sortedPsychologists.length > 0 ? (
        sortedPsychologists.map((psychologist, index) => (
          <div key={psychologist.name}>
            <PsychologistsItem psychologist={psychologist} index={index} />
          </div>
        ))
      ) : (
        <p>Loading psychologists...</p>
      )}
    </div>
  );
};
