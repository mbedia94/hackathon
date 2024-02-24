import { useEffect, useState } from "react";
import axios from "axios";
import { MenusCard } from "./menusCard";

export const MenuList = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const obtenerMenus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/menus");
        setMenus(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    obtenerMenus();
  }, []);

  return (
    <div>
      <h1>Listado de Menus</h1>
      {menus.map((menu) => (
        <MenusCard key={menu._id} menu={menu} />
      ))}
    </div>
  );
};
