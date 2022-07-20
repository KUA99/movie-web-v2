import React from "react";

import MovieList from "../movieList/MovieList";
import Slides from "../slides/Slides";
import { category, movieType, tvType } from "../../api/movieApi";

export const Home = () => {
  return (
    <div className="home">
      <Slides />
      <div className="content container">
        <MovieList
          title="Trending movie"
          categoryProp={category.movie}
          typeProp={movieType.popular}
        />
        <MovieList
          title="Top movie"
          categoryProp={category.movie}
          typeProp={movieType.top_rated}
        />
        <MovieList
          title="Trending TV"
          categoryProp={category.tv}
          typeProp={tvType.popular}
        />
        <MovieList
          title="Top Tv"
          categoryProp={category.tv}
          typeProp={tvType.top_rated}
        />
      </div>
    </div>
  );
};
