import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const Loader = () => {
  return (
    <div className=" flex justify-center items-center">
      <DotLottieReact
        src="/football.lottie"
        loop
        autoplay
        className="w-48 h-48 "
      />
    </div>
  );
};

export default Loader;
