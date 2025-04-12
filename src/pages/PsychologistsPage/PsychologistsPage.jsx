import { useEffect, useState } from "react";
import { PsychologistsList } from "../../components/PsychologistsList/PsychologistsList.jsx";
import { getDatabase, ref, get } from "firebase/database";

import Filters from "../../components/Filters/Filters.jsx";
import css from "./PsychologistsPage.module.css";
import { database } from "../../firebase.js";

const PAGE_SIZE = 3;

const PsychologistsPage = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [allPsychologists, setAllPsychologists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const loadInitialPsychologists = async () => {
    try {
      const snapshot = await get(ref(database));
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data);
        setAllPsychologists(list);
        setPsychologists(list.slice(0, PAGE_SIZE));
      }
    } catch (error) {
      console.error("Error loading psychologists:", error);
    }
  };

  const loadMorePsychologists = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * PAGE_SIZE;
    const nextItems = allPsychologists.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
    setPsychologists((prev) => [...prev, ...nextItems]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    loadInitialPsychologists();
  }, []);

  const filterMapping = {
    "A to Z": { sortCriteria: "name", sortDirection: "asc" },
    "Z to A": { sortCriteria: "name", sortDirection: "desc" },
    "Less than 10$": { sortCriteria: "price_per_hour", sortDirection: "asc" },
    "Greater than 10$": {
      sortCriteria: "price_per_hour",
      sortDirection: "desc",
    },
    Popular: { sortCriteria: "rating", sortDirection: "desc" },
    "Not popular": { sortCriteria: "rating", sortDirection: "asc" },
    "Show all": { sortCriteria: "name", sortDirection: "asc" },
  };

  const handleFilterChange = (filter) => {
    const selectedFilter = filterMapping[filter] || filterMapping["Show all"];
    setSortCriteria(selectedFilter.sortCriteria);
    setSortDirection(selectedFilter.sortDirection);

    const sorted = [...allPsychologists].sort((a, b) => {
      const aValue = a[selectedFilter.sortCriteria];
      const bValue = b[selectedFilter.sortCriteria];

      if (typeof aValue === "string") {
        return selectedFilter.sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return selectedFilter.sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
    });

    setAllPsychologists(sorted);
    setPsychologists(sorted.slice(0, PAGE_SIZE));
    setCurrentPage(1);
  };

  return (
    <div className={css.container}>
      <Filters onFilterChange={handleFilterChange} />
      <PsychologistsList psychologists={psychologists} />
      {psychologists.length < allPsychologists.length && (
        <button
          className={css.btn}
          onClick={loadMorePsychologists}
          type="button"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default PsychologistsPage;
