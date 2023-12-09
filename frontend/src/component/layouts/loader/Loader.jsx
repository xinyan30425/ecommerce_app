import React from "react";
// import { ReactComponent as CricketBall } from "../../../Image/Loader-svg/LoaderBlack.svg";
// import { ReactComponent as CricketBall } from "../../../Image/Loader-svg/LoaderRed.svg";
import { ReactComponent as CricketBall } from "../../../Image/Loader-svg/earth2.svg";
import "./Loader.css";

const CricketBallLoader = () => (
  <div className="cricket-ball-loader">
    <CricketBall className="spinner" />
  </div>
);

export default CricketBallLoader;
