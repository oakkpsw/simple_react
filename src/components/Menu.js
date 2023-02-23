import React from "react";
import useHover from "../hooks/UseHover";

const Menu = () => {
  const [hover, attrs] = useHover();
  return (
    <div>
      <h1> Menu </h1>
      {hover ? <h3>Main Menu</h3> : null}
      <img src="./logo192.png" alt="logo" {...attrs} />
    </div>
  );
};

export default Menu;
