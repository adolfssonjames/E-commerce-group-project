import React, { useState } from 'react'
import '../CSS/Payment.css';
import StripeContainer from './StripeContainer'
import { useCart } from 'react-use-cart';

const Shoppingcart = () => {

  const [showItem, setShowItem] = useState(false);

  const {
    isEmpty,
    items,
    totalItems, 
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart()

  if (isEmpty) return <h2>Din varukorg är tom...</h2> 

  return (
    <div>
        <h1> Shopping Cart</h1>
        <div>
          <p>
            {showItem ? <StripeContainer/> : <> <h3>Price: ex.10kr</h3> <img alt="exempelbild"/>
            <button onClick={() => setShowItem(true)} >Fortsätt till secure payment </button> </>}
          </p>
        </div>
    </div>
  )
}

export default Shoppingcart