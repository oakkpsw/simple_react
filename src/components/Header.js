import React from "react";
import Logo from "./Logo";
import Title from "../styles/title/Title";
import { Button } from "../styles/button/Button";
//rafce
const Header = () => {
  let companyName = "CCT";
  const companyAdress = <p>Bangkok</p>;
  let num = 10;
  const showMessage = () => {
    return companyName + ".com ";
  };

  const isLogin = false;
  const showMe = () => {
    alert("Hello React");
  };

  const products = [
    { id: 1, name: "pepsi" },
    { id: 2, name: "coke" },
  ];
  return (
    <>
      <Title>Hello React</Title>
      <h1>Company {companyName}</h1>
      {companyAdress}
      {num + 100}
      {showMessage()}
      {isLogin === true && (
        <>
          <p> Welcome !</p> <p> Welcome2 !</p>
        </>
      )}
      {isLogin ? <Logo /> : "No Login"}

      <br></br>
      {/* <button onClick={showMe}>Click Me</button> */}
      <Button onClick={showMe} primary>
        Click Me
      </Button>
      <br></br>
      <ul>
        {products.map((product, index) => {
          return (
            <li key={product.id}>
              {product.name} {index + 1}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Header;
