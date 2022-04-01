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
import { CartProvider } from "react-use-cart"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

function App() {

  return (

    <Router>
        <div className="App">

          <div id='navbar-container'>
            
              <ul className='navbar-left'>
                 <li> <Link to="/" className="link">Home</Link></li>
                  <li> <Link to="/Products" className="link">Products</Link></li>
                  <li> <Link to="/About" className="link">About</Link></li> 
              </ul>    
              <ul className='navbar-right'>
                   <li> <Link to="/Mypage" className="link">My page</Link></li>
                   <li> <Link to="/Shoppingcart" className="link"><ShoppingCartIcon /></Link></li>  
              </ul>
          </div>    

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
