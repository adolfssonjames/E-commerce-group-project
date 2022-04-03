import React from 'react';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import '../CSS/Cart.css';

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

  <h1 className='CartHead'>Shopping cart ({totalItems})</h1>

    <div className='ShoppingCart'>

      {items.map((cartitem) => {
        return (

        <table>
        <tbody>

        <tr key={cartitem.id}>

          <td><img className='ItemImg' src={cartitem.image}></img></td>
          <td><h5 className='ItemName'>{cartitem.name}</h5></td>
          <td><h5 className='ItemPrice'>${cartitem.price}</h5></td>
          <td><h5 className='ItemQty'>{cartitem.quantity}</h5></td>
          <td><button className='MinusBtn' onClick={() => updateItemQuantity(cartitem.id, cartitem.quantity -1)}>-</button></td>
          <td><button className='PlusBtn' onClick={() => updateItemQuantity(cartitem.id, cartitem.quantity +1)}>+</button></td>
          <td><button className='RemoveBtn' onClick={() => removeItem(cartitem.id)}>Remove items</button></td>
        
        </tr>

        </tbody>
        </table>

          )
      })}

    </div>
    
    <div>
      <h4 className='TotalPrice'>Total Price: ${cartTotal}</h4>
     </div>

       <button className='PayBtn'><Link to="/payment" className="PayLink"> Payment </Link></button>
       <button className='EmptyBtn' onClick={emptyCart}> Empty cart </button>

  </section>


  )
}

export default Shoppingcart