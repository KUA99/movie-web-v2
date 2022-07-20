import { Close } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

import "./modal.scss";

export const Modal = (props) => {
  const { active, onClose } = props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div className={isActive ? "active modal" : "modal"}>
      <div className="modal-content">
        <div className="modal-content-close" onClick={() => onClose()}>
          <Close className="modal-content-close-icon" />
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ucRVDoFkcxc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};
