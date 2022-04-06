import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { CartProvider, useCart } from 'react-use-cart';
import '../CSS/Payment.css';
import { Link } from 'react-router-dom';
import {auth} from '../firebase/firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { Card, CardImg } from "react-bootstrap";


export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const [loggedInUser, setCurrentLoggedInUser] = useState({})

    const { items, cartTotal, emptyCart} = useCart();

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
        <form onSubmit={emptyCart}>
   
                <table>
        <tbody>
            {items.map((orderitem) => {
              return (
              <tr key={orderitem.id} >
                <td><img src={orderitem.image} style={{height:"6rem"}}></img></td>
                <td><h5 >{orderitem.name}</h5></td>
                <td><h5 >${orderitem.price}</h5></td>
                <td><h5 >x{orderitem.quantity}</h5></td>
              </tr>
                )
            })}
        </tbody>
  </table>
        <h4>Please fill in your payment information:</h4>
                
                <div className="FormRow">
                
                <Card>
                    <CardNumberElement/>
                    <CardExpiryElement/>
                    <CardCvcElement/>
                </Card>
            
                </div>

        
            <Link to="/order"><button onClick={postOrderHistory}>Pay ${cartTotal}</button></Link>
        </form>
        </div>
        

    )
}