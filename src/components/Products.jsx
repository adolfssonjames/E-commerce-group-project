import React from "react";
import "../CSS/Products.css";
import data from "./ProductData";
import { useCart } from "react-use-cart";

const Products = () => {
  const { addItem } = useCart();

  return (
    <div>
      <h1>Products</h1>

      <div id="articles">
        {data.Items.map((item) => {
          return (
            <div key={item.id} item={item} class="product">
              <img src={item.image} width="100" height="100"></img>
              <h5>{item.name}</h5>
              <p>{item.desc}</p>
              <p>${item.price}</p>
              <button onClick={() => addItem(item)}>Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
