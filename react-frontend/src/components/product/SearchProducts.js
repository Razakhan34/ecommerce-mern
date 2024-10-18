import React, { Fragment } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./SearchProducts.css";

const SearchProducts = () => {
  const history = useHistory();
  const [keyword, setkeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="Search a product -- Ecommerce" />
      <form className="searchBox" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setkeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default SearchProducts;
