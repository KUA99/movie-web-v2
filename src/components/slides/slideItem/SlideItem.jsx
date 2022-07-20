import React from "react";
import { Link } from "react-router-dom";
import { CalendarMonth, PlayArrow } from "@mui/icons-material";

import "./slideitem.scss";
import apiConfig from "../../../api/apiConfig";

import imdbImg from "../../../assets/image/imdb.png";

const SlideItem = (props) => {
  const { movie, className } = props;

  const imageBg = apiConfig.originalImage(
    movie.backdrop_path || movie.poster_path
  );
  const posterImg = apiConfig.w500Image(
    movie.poster_path || movie.backdrop_path
  );

  return (
    <div
      className={`slide ${className}`}
      style={{ backgroundImage: `url(${imageBg})` }}
    >
      <div className="slide-wrapper ">
        <div className="slide-content">
          <h2 className="slide-content-name">
            {movie.title || movie.original_title}
          </h2>
          <p className="slide-content-overview">{movie.overview}</p>
          <ul className="slide-content-info">
            <li className="rating">
              <img src={imdbImg} alt="imdb logo" />
              {movie.vote_average}
            </li>
            <li className="release-time">
              <CalendarMonth className="release-time-icon" />
              {movie.release_date ? movie.release_date.slice(0, 4) : "2022"}
            </li>
          </ul>
          <Link to={`/movie/${movie.id}`} className="slide-content-play">
            <PlayArrow className="slide-content-play-icon" />
            <span>watch now</span>
          </Link>
        </div>
        <div className="slide-poster">
          <img src={posterImg} alt="movie poster" />
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
