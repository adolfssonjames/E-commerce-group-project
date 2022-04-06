import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useCart } from 'react-use-cart';
import '../CSS/Payment.css';
import {auth} from '../firebase/firebase'
import {onAuthStateChanged} from 'firebase/auth'


export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const [loggedInUser, setCurrentLoggedInUser] = useState({})

// const { items, cartTotal } = useCart();

    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/checkout", {
                amount: cartTotal,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("FUNKAR INTE", error)
        }
    } else {
        console.log(error.message)
    }
}



    const postOrderHistory = async () => {
        
        const product = items;
        const totalPrice = cartTotal;
        const currentLoggedInUser = loggedInUser.email

        
        const newOrder = {
            product, totalPrice, currentLoggedInUser
        }

        await axios.post ('http://localhost:4000/newOrder', newOrder)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    

    return (
    
    <div className="container">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
   
                <table>
        <tbody>
            {items.map((cartitem) => {
              return (
              <tr key={cartitem.id} >
                <td><img className='ItemImg' src={cartitem.productImage}></img></td>
                <td><h5 className='ItemName'>{cartitem.productName}</h5></td>
                <td><h5 className='ItemPrice'>${cartitem.price}</h5></td>
                <td><h5 className='ItemQty'>x{cartitem.quantity}</h5></td>
              </tr>
                )
            })}
        </tbody>
  </table>
        <h2>You will be purschased ${cartTotal}</h2>
                
                <div className="FormRow">
                    <CardElement/>
                </div>

        
            <button>Pay</button>
        </form>
        </div>
        

    )
}