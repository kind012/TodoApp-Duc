import React from "react";
const Preloader = () => {
  return (
    <div className="absolute flex flex-wrap transform top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
      <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default Preloader;
