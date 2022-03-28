import React from 'react'
import { useCart } from "react-use-cart"

const Shoppingcart = () => {

  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    removeItem,
    emptyCart
  } = useCart();

  if (isEmpty) return <h2>Your cart is empty...</h2>

  return (
    <div>
        <h1>Shopping Cart</h1>
    </div>
  )
}

export default Shoppingcart