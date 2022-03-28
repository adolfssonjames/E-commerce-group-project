import React, { useState } from 'react'
import StripeContainer from './StripeContainer'

const Shoppingcart = () => {

  const [showItem, setShowItem] = useState(false);

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