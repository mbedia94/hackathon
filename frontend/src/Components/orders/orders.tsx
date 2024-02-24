import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "../menus/menu";
export const Orders = () => {
  return (
    <div className="w-full h-screen border">
      <aside>
        <Routes>
          <Route path="/Menus" element={<Menu />} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </aside>
      <main></main>
    </div>
  );
};
