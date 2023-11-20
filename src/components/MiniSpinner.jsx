import React from "react";

function MiniSpinner() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/40 text-red-500 flex items-center justify-center">
      <p className="text-3xl font-bold">Loading</p>
    </div>
  );
}

export default MiniSpinner;
