import React from "react";
import playstore from "../../../images/playstore.png";
import AppStore from "../../../images/Appstore.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={AppStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Mohammed Raza</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/mohd_raza_72">Instagram</a>
        <a href="http://youtube.com/raza">Twitter</a>
        <a href="http://instagram.com/mohdraza">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
