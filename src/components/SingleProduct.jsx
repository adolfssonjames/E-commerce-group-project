import React from "react";
import "../CSS/SingleProduct.css";
import data from "./ProductData";
import { useCart } from "react-use-cart";

const SingleProduct = () => {
  const { addItem } = useCart();

  return (
    <div>
      <h2>Product</h2>
      <main id="SingleProductMain">
        <h3 id="SingleProductName">Hoppsan något gick fel</h3>
        <p id="SingleProductDesc">Vi kunde inte hitta den här produkten</p>

        <img
          src="https://i.redd.it/7m9gyr3zw6s81.jpg"
          alt=""
          id="SingleProductImg"
        />
        <button
          id="SingleProduct-to-cart-btn"
          //onClick={() => addItem(product)}
        >
          Add to cart
        </button>
      </main>
    </div>
  );
};

export default SingleProduct;
