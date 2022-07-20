import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";
import logo from "../../assets/image/logo.png";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <Link to="/">
            <img src={logo} alt="footer logo" />
          </Link>
          <p>
            It’s very common for movie websites to take up only the height of
            the screen, or just a bit more. It’s rare to find pages that are
            long and require a lot of vertical scrolling. With most websites
            being Flash-based or set against a large background image, the short
            page length keeps everything in view at all times
          </p>
        </div>
        <div className="footer-app">
          <h2>download app</h2>
          <p>You can download this app on: </p>
          <div className="footer-download-app">
            <img
              src="http://preview.gentechtreedesign.com/streamlab/red-demo/wp-content/uploads/sites/2/2021/01/2.png"
              alt="google play"
            />
            <img
              src="http://preview.gentechtreedesign.com/streamlab/red-demo/wp-content/uploads/sites/2/2021/01/1.png"
              alt="apple store"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
