import React from 'react';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import '../CSS/Cart.css';

const Shoppingcart = () => {

  const { 

    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart

 } = useCart()
 
 if (isEmpty) return <h1 className="CartEmpty">Your cart is empty...</h1>

 return (
  <section>

  <div className='ShoppingCart'>

   <table>
        <tbody>
            {items.map((cartitem) => {
              return (

              <tr key={cartitem.id} >

                <td><img className='ItemImg' src={cartitem.image}></img></td>
                <td><h5 className='ItemName'>{cartitem.name}</h5></td>
                <td><h5 className='ItemPrice'>${cartitem.price}</h5></td>
                <td><h5 className='ItemQty'>{cartitem.quantity}</h5></td>
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
      <h4 className='TotalPrice'>Total Price: ${cartTotal}</h4>
  </div>

  <Link to="/payment" className="PayLink"><button className='PayBtn'> Payment </button></Link>
  <button className='EmptyBtn' onClick={emptyCart}> Empty cart </button>

  </section>


  )
}

export default Shoppingcart