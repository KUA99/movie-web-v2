import React from "react";
import { PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./moviecard.scss";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const { item, categoryCard } = props;

  const cardBg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const link = `/${item.category ? item.category : categoryCard}/${item.id}`;

  return (
    <Link to={link}>
      <div className="moviecard" style={{ backgroundImage: `url(${cardBg})` }}>
        <button className="moviecard-btn">
          <PlayArrow className="moviecard-btn-icon" />
        </button>
      </div>
      <h3 className="card-title">
        {item.title || item.name || item.original_title}
      </h3>
      <span className="card-date">
        {item.release_date ? item.release_date.slice(0, 4) : "2022"}
      </span>
    </Link>
  );
};

export default MovieCard;
