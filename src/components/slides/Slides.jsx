import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./slides.scss";
import movieApi, { movieType } from "../../api/movieApi";
import SlideItem from "./slideItem/SlideItem";
import Loading from "../loading/Loading";

const Slides = () => {
  SwiperCore.use([Autoplay]);

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const params = {
        page: 1,
      };
      try {
        const response = await movieApi.getMovieList(movieType.popular, {
          params,
        });
        setMovies(response.results.slice(0, 4));
        setIsLoading(false);
      } catch (error) {
        console.log("Failed");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="slides">
      {isLoading ? (
        <Loading height="70" mgTop="50" />
      ) : (
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
        >
          {movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <SlideItem
                  movie={movie}
                  className={`${isActive ? "active" : ""}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Slides;
