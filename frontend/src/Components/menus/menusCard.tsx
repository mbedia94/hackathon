import React from "react";

export const MenusCard = ({ menu }) => (
  <div>
    <h2>{menu.name}</h2>
    <p>{menu}</p>
    <p>{menu.prices}</p>
  </div>
);
