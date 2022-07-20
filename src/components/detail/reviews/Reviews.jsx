import React, { useState, useEffect } from "react";

import "./reviews.scss";
import movieApi from "../../../api/movieApi";
import apiConfig from "../../../api/apiConfig";
import Readmore from "../../readmore/Readmore";
import reviewImg from "../../../assets/image/castimg.svg";
import Loading from "../../loading/Loading";

const Reviews = (props) => {
  const { category, id } = props;
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReview = async () => {
      const params = {
        page: 1,
      };
      try {
        const response = await movieApi.reviews(category, id, { params });
        setReviews(response.results.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.log("Error");
      }
    };
    getReview();
  }, [category, id]);

  return (
    <>
      {isLoading ? (
        <Loading height="40" mgTop="0" />
      ) : (
        <div className="review">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-wrapper">
                <div className="review-header">
                  <div className="review-header-avatar">
                    <img
                      src={
                        review.author_details.avatar_path
                          ? review.author_details.avatar_path.includes(
                              "https://"
                            )
                            ? review.author_details.avatar_path.slice(1)
                            : apiConfig.w500Image(
                                review.author_details.avatar_path
                              )
                          : reviewImg
                      }
                      alt="review author avatar"
                    />
                  </div>
                  <div className="review-header-content">
                    <h2 className="review-header-content-name">
                      {review.author_details.name ||
                        review.author_details.username}
                    </h2>
                    <span className="review-header-content-rated">
                      {`${review.author_details.rating || "8"}/10`}
                    </span>
                  </div>
                </div>
                <Readmore maxLength={360}>{review.content}</Readmore>
              </div>
            ))
          ) : (
            <h2>Not Found Reviews</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Reviews;
