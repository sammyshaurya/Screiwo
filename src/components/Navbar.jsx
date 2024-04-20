import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center border-b border-gray-100">
      <img src="/svg/logo.svg" alt="Description" width={80} height={80} />
      <h1 className="text-black">Scriewo</h1>
    </nav>
  );
};

export default Navbar;
