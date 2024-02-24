import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Menus"> Menus </Link>
        </li>
        <li>
          <Link to="/Orders"> Orders </Link>
        </li>
      </ul>
    </nav>
  );
}
