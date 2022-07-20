import { CircularProgress } from "@mui/material";
import React, { useRef, useLayoutEffect } from "react";

import "./loading.scss";

const Loading = (props) => {
  const { height, mgTop } = props;
  const loadingRef = useRef(null);

  useLayoutEffect(() => {
    loadingRef.current.style.height = +height + "rem";
    loadingRef.current.style.marginTop = +mgTop + "rem";
  }, [height, mgTop]);

  return (
    <div className="loading" ref={loadingRef}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
