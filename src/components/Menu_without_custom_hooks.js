import React from "react";

const Menu = () => {
  const [hover, setHover] = React.useState(false);

  const mouseOver = () => {
    setHover(true);
  };
  const mouseOut = () => {
    setHover(false);
  };

  return (
    <div>
      <h1> Menu </h1>
      {hover ? <h3>Main Menu</h3> : null}
      <img
        src="./logo192.png"
        alt="logo"
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      />
    </div>
  );
};

export default Menu;
