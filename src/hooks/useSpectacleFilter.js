import { useMemo } from "react";
import { filterGroupAndSort } from "../utils/spectacleUtils";

export const useSpectacleFilter = (data, filters) => {
  const groupedSpectacles = useMemo(
    () => filterGroupAndSort(data, filters),
    [data, filters]
  );
  return groupedSpectacles;
};
