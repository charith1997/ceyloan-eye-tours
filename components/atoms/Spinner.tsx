import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

export default Spinner;