import React from "react";
import { getVersion, getVesion } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
const Footer = () => {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.authReducer.version);

  React.useEffect(() => {
    dispatch(getVersion());
  }, []);
  return (
    <>
      <footer className="container">
        <p className="float-end">
          <a href="#">Back to top</a>
        </p>
        <p>
          © 2022 - {new Date().getFullYear()} Company, Inc. ·{" "}
          <a href="#">Privacy</a> · <a href="#">Terms</a>
          API Version:{version}
        </p>
      </footer>
    </>
  );
};

export default Footer;
