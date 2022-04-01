import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';

const Shoppingcart = () => {

  const { 

    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart

 } = useCart()
 
 if (isEmpty) return <h2>Your cart is empty...</h2>



  return (
  <section>

    <div>
    <h1>Shopping cart ({totalItems})</h1>

      <table className='CartTable'>
      
      <tbody className='CartTbody'>

      {items.map((cartitem) => {
        return (

        <tr key={cartitem.id}>

          <td><img src={cartitem.image} style={{height: '6rem'}}></img></td>
          <td><h5>{cartitem.name}</h5></td>
          <td><h5>${cartitem.price}</h5></td>
          <td><h5>x{cartitem.quantity}</h5></td>
          <td><button className='MinusBtn' onClick={() => updateItemQuantity(cartitem.id, cartitem.quantity -1)}>-</button></td>
          <td><button className='PlusBtn' onClick={() => updateItemQuantity(cartitem.id, cartitem.quantity +1)}>+</button></td>
          <td><button className='RemoveBtn' onClick={() => removeItem(cartitem.id)}>Remove items</button></td>
        
        </tr>

          )
      })}

      </tbody>
      </table>
    </div>
    
    <div>
      <h4>Total Price: ${cartTotal}</h4>
     </div>

     <div>
     <button><Link to="/payment"> Payment </Link></button>
     </div>
  </section>


  )
}

export default Shoppingcart