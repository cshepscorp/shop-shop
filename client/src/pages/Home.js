import React from "react";
//import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  // manages the state currentCategory, which is passed to the ProductList component as a prop and instructs which category's products should be retrieved using Apollo
  //const [currentCategory, setCategory] = useState("");

  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;
