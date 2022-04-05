import React, { useState, useEffect } from "react";
import "../CSS/Products.css";
//import data from "./ProductData";
import { useCart } from "react-use-cart";
import axios from "axios";


const Products = () => {
  const { addItem } = useCart();

  const [items, setItems] = useState([])


  const fetchItems = async () => {
      try {
          const res = await axios.get("http://localhost:5000/get")
          setItems(res.data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    fetchItems();
  }, [])

  return (
    <div>

      <section id="product-page-info">
        <h2>Our Bonsai Trees</h2>
        <h4 id="product-head-txt">Begin Your Bonsai Journey In The Best Possible Way</h4>
        <h6>Here we present our own hand-picked selection of trees that are perfect for beginners. They’re easy to grow, hard to kill, and offer plenty of options for training and pruning. These “starter” bonsai are an excellent way for anyone to enter into the world of bonsai trees. They also make wonderful gifts. Young or old, anyone can learn to care for a bonsai and train it into a wonderful living work of art.</h6>
      </section>
      <div id="articles">
        {items.map((item) => {
          return (
            <div key={item._id} item={item} className="product">
              <img src={item.productImage} alt={item.name} width="100" height="100"></img>
              <h5>{item.productName}</h5>
              <p className="item-price">${item.price}</p>
              <button className="to-cart-btn" onClick={() => addItem(item)}>Add to cart</button>
            </div>
          )
        })}
      </div>
    </div>
  );
  
};

export default Products;
