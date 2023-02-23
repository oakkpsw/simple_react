import React from "react";

function Sidebar() {
  const [fullname, setFullName] = React.useState("John");
  const [isShow, setIsShow] = React.useState(true);
  const changeName = () => {
    // fullname = "mary";
    setFullName("Mary");
    setIsShow(!isShow);
  };

  React.useEffect(() => {
    console.log("side bar use effect");
  });
  React.useEffect(() => {
    console.log("side bar use effect one time only");
  }, []);

  React.useEffect(() => {
    console.log("side bar use effect fullname=>" + fullname);
  }, [fullname]);
  return (
    <>
      <h3>Sidebar</h3>
      {isShow ? <p>Hello</p> : <p>World</p>}
      <p>Hello ! {fullname}</p>
      <button onClick={changeName}>Change Name</button>
    </>
  );
}

export default Sidebar;
