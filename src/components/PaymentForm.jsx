import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useCart } from 'react-use-cart';
import '../CSS/Payment.css';
import {auth} from '../firebase/firebase'
import {onAuthStateChanged} from 'firebase/auth'


export default function PaymentForm() {
    const {items, cartTotal} = useCart()
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const [loggedInUser, setCurrentLoggedInUser] = useState({})

// const { items, cartTotal } = useCart();

    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })
    

    
    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#000",
                with: "200px",
                margin: "0 auto",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }


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

        await axios.post ('http://localhost:5000/newOrder', newOrder)
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
   
                <div>
                    <h2>You will be purschased ${cartTotal}</h2>
                </div>
                <div className="FormRow">
                    <CardElement/>
                </div>

        
            <button onClick={postOrderHistory}>Pay</button>
        </form>
        </div>
        

    )
}