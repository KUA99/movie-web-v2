import React, { useState } from "react";

import "./readmore.scss";

const Readmore = (props) => {
  const { children, maxLength } = props;
  const [isTruncated, setIsTruncated] = useState(true);

  const text = children;

  const resultText = isTruncated ? `${text.slice(0, maxLength)}... ` : text;

  const handleTruncated = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className="readmore">
      <p className="readmore-text">
        {resultText}&nbsp;
        <span onClick={handleTruncated} className="readmore-btn">
          {isTruncated ? "Read more" : "Read less"}
        </span>
      </p>
    </div>
  );
};

export default Readmore;
