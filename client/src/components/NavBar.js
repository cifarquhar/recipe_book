import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <ul className="navbar">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/recipes">Recipes</Link>
    </li>
    <li>
      <Link to="/add">New Entry</Link>
    </li>
  </ul>
);

export default Navbar;
