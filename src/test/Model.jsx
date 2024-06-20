import React from "react";

const Model = ({ btnClose }) => {
  return (
    <div className="flex flex-col fixed inset-0 justify-center items-center bg-white bg-opacity-75">
      <div className="p-8 w-1/3 border-1 rounded-md">
        <h1>Model title</h1>
        <h3>Model Content</h3>
        <button onClick={btnClose} className="w-full border-1">Close</button>
      </div>
    </div>
  );
};

export default Model;
