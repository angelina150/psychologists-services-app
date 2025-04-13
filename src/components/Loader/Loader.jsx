import React from "react";
import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <CircleLoader
        color="#54BE96"
        size="60px"
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Loader;
