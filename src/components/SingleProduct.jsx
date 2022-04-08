import React from "react";
import "../CSS/SingleProduct.css";
import data from "./ProductData";
import { useCart } from "react-use-cart";

const SingleProduct = () => {
  const { addItem } = useCart();

  return (
    <div>
      <h2>Product</h2>


        <button
          id="SingleProduct-to-cart-btn"
          //onClick={() => addItem(product)}
        >
          Add to cart
        </button>
    </div>
  );
};

export default SingleProduct;
