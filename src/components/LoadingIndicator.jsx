import React from "react";
import Loader from "../images/Loader.svg";


const LoadingIndicator = () => {
  return (
    <div>
      <img src={Loader} alt="loading..."></img>
    </div>
  );
};

export default LoadingIndicator;
