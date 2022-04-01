import './App.css';
import './CSS/Allpages.css';
import Home from './components/Home';
import Products from './components/Products';
import Mypage from './components/Mypage';
import MyAccount from './components/MyAccount';
import Shoppingcart from './components/Shoppingcart';
import About from './components/About';
import StripeContainer from './components/StripeContainer';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { CartProvider, useCart } from "react-use-cart"

function App() {

const {
  totalItems
} = useCart()

  return (

    <Router>
        <div className="App">
            
              <ul className='navbar-left'>
                  <button className='navbar-btn'><li> <Link to="/">Home</Link></li></button> 
                  <button className='navbar-btn'><li> <Link to="/Products">Products</Link></li></button>
                  <button className='navbar-btn'><li> <Link to="/About">About</Link></li></button> 
              </ul>
                  
              <ul className='navbar-right'>
                   <button className='navbar-btn'><li> <Link to="/Mypage">My page</Link></li></button> 
                   <button className='navbar-btn'><li> <Link to="/Shoppingcart">Shoppingcart ({totalItems})</Link></li></button>  
              </ul>

              <CartProvider>
            
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/Products" element={<Products />}></Route>
                <Route path="/Mypage" element={<Mypage />}></Route>
                <Route path="/MyAccount" element={<MyAccount />}></Route>
                <Route path="/Shoppingcart" element={<Shoppingcart />}></Route>
                <Route path="/About" element={<About />}></Route>
                <Route path="/payment" element={<StripeContainer />}></Route>
            </Routes>
            </CartProvider>
        </div>
    </Router>
  );
}

export default App;
