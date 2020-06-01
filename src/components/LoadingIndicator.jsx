import React from "react";
import { CircularProgress } from "@material-ui/core";

const LoadingIndicator = () => {
  return (
    <div>
      {/* <p>Loading</p> */}
      <CircularProgress color="secondary" />
    </div>
  );
};

export default LoadingIndicator;
