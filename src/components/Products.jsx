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
      <h1>Products</h1>

     <div id="articles">
       {items.map((item) => {
           return (
            <div key={item._id} item={item} className="product">
              <div>
                <img src={item.productImage} width="100" height="100"></img>
                <h5>{item.productName}</h5>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <button onClick={() => addItem(item)}>Add to cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
  
};

export default Products;
