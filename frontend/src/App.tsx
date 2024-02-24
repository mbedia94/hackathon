import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "./Components/menus/menu";
import Nav from "./Components/page/nav";
import { Orders } from "./Components/orders/orders";
import { MenuList } from "./Components/menus/menuList";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/Menus" element={<Menu />} />
        <Route path="/Menus/MenuList" element={<MenuList />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
