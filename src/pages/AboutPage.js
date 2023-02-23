import React, { useEffect } from "react";
import axios from "axios";

const AboutPage = () => {
  const [version, setVersion] = React.useState("");

  const getData = async () => {
    const url = "https://api.codingthailand.com/api/version";
    const response = await axios.get(url);
    //   console.log(response.data.data.version);
    setVersion(response.data.data.version);
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2> About US</h2>
          {version && <p>Backend API Version: {version}</p>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
