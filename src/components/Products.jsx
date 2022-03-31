import React from "react";
import "../CSS/Products.css";
import data from './ProductData'

const Products = () => {

  console.log(data.Items)


  return (

<div>
  {data.Items.map((item) => {

    return (

          <div key={item.id}>
          <img src={item.image} width="100" height="100"></img>
          <h5>{item.name}</h5> 
          <p>${item.price}</p>
          <button>Add to cart</button>
          </div>
    )
  })}

</div>

  )
  

  /*
  return (
    <div>
      <h1> Products </h1>

      <div id="articles">

        <div class="product">
          <img
            src="../img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Quercus robur"
          />
          <h2>Quercus robur</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../src/img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="P. sylvestris"
          />
          <h2>P. sylvestris</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../src/img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Betula"
          />
          <h2>Betula</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../src/img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Picea abies"
          />
          <h2>Picea abies</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Populus tremula"
          />
          <h2>Populus tremula</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../src/img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Acer platanoides"
          />
          <h2>Acer platanoides</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../src/img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Salix"
          />
          <h2>Salix</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

        <div class="product">
          <img
            src="../src/img/pexels-quang-nguyen-vinh-2149105.jpg"
            alt="Sorbus aucuparia"
          />
          <h2>Sorbus aucuparia</h2>
          <h3>69;-</h3>
          <button>Add to cart</button>
        </div>

      </div>
    </div>
  );
  */
};

export default Products;
