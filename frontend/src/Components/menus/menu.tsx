import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Orders } from "../orders/orders";
import React from "react";
import { MenuList } from "./menuList";

export const Menu = () => {
  return (
    <div className="w-full h-screen border">
      <MenuList />
    </div>
  );
};
