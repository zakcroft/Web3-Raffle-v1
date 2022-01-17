import React from "react";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex flex-wrap justify-center items-center py-2 text-base bg-amber-300 border-gray-400">
      <Link to={"/"} className="mr-5 hover:text-gray-900 hover:underline">
        Home
      </Link>
    </nav>
  );
}

export default Nav;
