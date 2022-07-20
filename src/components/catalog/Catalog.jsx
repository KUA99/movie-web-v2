import React from "react";
import { useParams } from "react-router-dom";

import MovieGrid from "../movieGrid/MovieGrid";

export const Catalog = () => {
  const { category, keyword } = useParams();

  return (
    <div className="catalog container">
      <MovieGrid category={category} keyword={keyword} />
    </div>
  );
};
