import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import "./movielist.scss";
import movieApi, { category } from "../../api/movieApi";
import MovieCard from "../movieCard/MovieCard";
import Loading from "../loading/Loading";

const MovieList = (props) => {
  const { title, categoryProp, typeProp, id } = props;

  SwiperCore.use([Autoplay]);
  const [listItem, setListItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getListItem = async () => {
      let response = null;
      const params = {};
      if (typeProp !== "similar") {
        switch (categoryProp) {
          case category.movie:
            response = await movieApi.getMovieList(typeProp, { params });
            break;
          default:
            response = await movieApi.getTvList(typeProp, { params });
            break;
        }
      } else {
        response = await movieApi.similar(categoryProp, id);
      }

      setListItem(response.results);
      setIsLoading(false);
    };
    getListItem();
  }, []);

  return (
    <div className="movielist">
      <div className="movielist-header">
        <h2 className="movielist-header-title">{title}</h2>
        {typeProp === "similar" ? (
          ""
        ) : (
          <Link to={`/${categoryProp}`} className="movielist-header-btn">
            load more
          </Link>
        )}
      </div>
      <div className="movielist-content">
        {isLoading ? (
          <Loading height="20" mgTop="0" />
        ) : (
          <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={10}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              100: {
                slidesPerView: 2,
              },
              600: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {listItem?.map((item, index) => (
              <SwiperSlide key={index}>
                <MovieCard item={item} categoryCard={categoryProp} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default MovieList;
