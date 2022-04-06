import React, { useState, useEffect } from "react";
import "../CSS/Products.css";
import data from "./ProductData";
import { useCart } from "react-use-cart";
//import axios from "axios";


const Products = () => {
  const { addItem } = useCart();
  
/*  
  const [products, setProducts] = useState([])


  const fetchItems = async () => {
      try {
          const res = await axios.get("http://localhost:4000/get")
          setProducts(res.data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    fetchItems();
  }, [])
  */
  

  return (
    <div>

      <section id="product-page-info">
        <h2>Our Bonsai Trees</h2>
        <h4 id="product-head-txt">Begin Your Bonsai Journey In The Best Possible Way</h4>
        <h6>Here we present our own hand-picked selection of trees that are perfect for beginners. They’re easy to grow, hard to kill, and offer plenty of options for training and pruning. These “starter” bonsai are an excellent way for anyone to enter into the world of bonsai trees. They also make wonderful gifts. Young or old, anyone can learn to care for a bonsai and train it into a wonderful living work of art.</h6>
      </section>
      <div id="articles">

             {data.Items.map((product) => {
                return (
                  <div key={product.id} item={product} className="product">
                    <img src={product.image} alt={product.name} width="100" height="100"></img>
                    <h5>{product.name}</h5>
                    <p className="item-price">${product.price}</p>
                    <button className="to-cart-btn" onClick={() => addItem(product)}>Add to cart</button>

           </div>
          )
        })}
      </div>
    </div>
  );
  
};

export default Products;
