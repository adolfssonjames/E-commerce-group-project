import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useCart } from 'react-use-cart';
import '../CSS/Payment.css';




export default function PaymentForm() {
    const {cartTotal} = useCart()
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


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

        
            <button>Pay</button>
        </form>
        </div>
        

    )
}