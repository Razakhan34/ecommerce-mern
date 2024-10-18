import React, { Fragment } from "react";
import logo from "../../../images/logo.png";
import { FaSearch, FaCartPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Fragment>
      <nav className="navigation">
        <div className="navigation__logo-box">
          <Link to="/">
            <img src={logo} alt="" className="navigation__logo" />
          </Link>
        </div>
        <ul className="navigation__nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="navigation__nav--icon">
          <span>
            <Link to="/search">
              <FaSearch />
            </Link>
          </span>
          <span className="headerCart">
            <Link to="/cart">
              {" "}
              <FaCartPlus />
            </Link>
            <span className="headerCartItem">{cartItems.length}</span>
          </span>
          <span>
            <Link to="/login">
              <FaUser />
            </Link>
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
