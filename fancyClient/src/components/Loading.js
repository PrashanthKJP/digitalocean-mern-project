import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loading = ({ loading }) => {
  return (
    <div>
      <ClimbingBoxLoader
        color={"#123abc"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
