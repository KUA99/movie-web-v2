import React, { useEffect, useState } from "react";

import "./casts.scss";
import movieApi from "../../../api/movieApi";
import apiConfig from "../../../api/apiConfig";
import castImg from "../../../assets/image/castimg.svg";
import Loading from "../../loading/Loading";

const Casts = (props) => {
  const { category, id } = props;
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCasts = async () => {
      try {
        const response = await movieApi.credits(category, id);
        setCasts(response.cast.slice(0, 6));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCasts();
  }, [category, id]);

  return (
    <>
      {isLoading ? (
        <Loading height="40" mgTop="0" />
      ) : (
        <div className="casts-content">
          <h2 className="casts-title">Casts</h2>
          <ul className="casts-list">
            {casts.length > 0 ? (
              casts.map((cast, index) => (
                <li key={index} className="casts-list-item">
                  <img
                    src={
                      cast.profile_path
                        ? apiConfig.w500Image(cast.profile_path)
                        : castImg
                    }
                    alt="cast avatar"
                  />
                  <span>{cast.name || cast.original_name}</span>
                </li>
              ))
            ) : (
              <h2>Not founded</h2>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Casts;
