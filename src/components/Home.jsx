import React from "react";
import "../CSS/Home.css";

const Home = () => {
  return (
    <div id="homePageAll">
      <h1>Home</h1>
      <div id="homePageMain" class="homePageTextBox">
        <h2>Welcome to the page</h2>
        <p>
          <b>
            Here at <i>(Name)</i> We
          </b>{" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quia
          soluta labore quos modi sequi facere magni impedit? Sequi explicabo
          rerum quidem nisi molestiae, neque assumenda dolorem exercitationem a
          consequuntur.
        </p>
        <img src="https://placeimg.com/400/300/nature" alt="sample image" />
      </div>
      <div id="homePageSecond" class="homePageTextBox">
        <h2>Buy our products</h2>
        <p>
          <b>Our company has</b> Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Alias quia soluta labore quos modi sequi facere
          magni impedit? Sequi explicabo rerum quidem nisi molestiae, neque
          assumenda dolorem exercitationem a consequuntur.
        </p>
        <img src="https://placeimg.com/300/300/nature" alt="sample image" />
      </div>
    </div>
  );
};

export default Home;
