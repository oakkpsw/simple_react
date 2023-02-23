import React from "react";
import PropTypes from "prop-types"; // ES6

const Footer = (props) => {
  const { title, website, postcode, isOpen } = props;
  return (
    <div>
      <h1>
        {title} &copy; {new Date().getFullYear()}
        <p style={{ color: "green", fontSize: "16" }}>
          {website} {postcode} isOpen :{isOpen.toString()}
        </p>
        <p style={styles.title}>codingthailand</p>
      </h1>
    </div>
  );
};

const styles = {
  title: {
    color: "red",
  },
};

Footer.propTypes = {
  title: PropTypes.string,
  postcode: PropTypes.number,
  website: PropTypes.string,
  isopen: PropTypes.bool,
};
export default Footer;
