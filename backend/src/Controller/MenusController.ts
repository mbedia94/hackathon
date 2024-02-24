import { fromPairs } from "cypress/types/lodash";
import { MenuEntity } from "../entities/menu";

const getMenus = async (req, res) => {
  try {
    const Menus = await MenuEntity.find();
    res.json(Menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const getMenuById = async (req, res) => {
//   const MenuId = req.params.id;
//   try {
//     const foundMenu = await MenuEntity.findById(MenuId);

//     if (foundMenu) {
//       res.json(foundMenu);
//     } else {
//       res.status(404).json({ error: "Menu not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export { getMenus };
