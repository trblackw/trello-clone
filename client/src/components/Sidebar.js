import React from "react";
import { slide as Menu } from "react-burger-menu";

const Sidebar = ({ props }) => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/">
        Boards
      </a>

      <a className="menu-item" href="/burgers">
        Organizations
      </a>

      <a className="menu-item" href="/pizzas">
        Groups
      </a>

      <a className="menu-item" href="/desserts">
        Other stuff
      </a>
    </Menu>
  );
};

export default Sidebar;
