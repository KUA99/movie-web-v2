import React, { useState, useEffect } from "react";

import "./trailer.scss";
import movieApi from "../../../api/movieApi";
import Loading from "../../loading/Loading";

const Trailers = (props) => {
  const { category, id } = props;
  const [trailers, setTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTrailer = async () => {
      const params = {};
      try {
        const response = await movieApi.getVideos(category, id, { params });
        setTrailer(response.results.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTrailer();
  }, [category, id]);

  return (
    <>
      {isLoading ? (
        <Loading height="30" mgTop="0" />
      ) : (
        <div className="trailers">
          {trailers.map((trailer, index) => (
            <div key={index} className="trailer-content">
              <h2 className="trailer-content-title">{trailer.name}</h2>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameborder="0"
                className="trailer-content-video"
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Trailers;
