import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'




export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    
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
            const response = await axios.post("http://localhost:4000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <div>
        <form onSubmit={handleSubmit}>
           
            <form action="">
				<div>
			<label htmlFor="">Name</label>
			<input type="name" />
			</div>
			<div>
			<label htmlFor="">Address</label>
			<input type="name" />
			</div>
			<div>
			<label htmlFor="">Stad</label>
			<input type="name" />
			</div>
			<div>
			<label htmlFor="">Postkod</label>
			<input type="name" />
			</div>
			<div>
			<label htmlFor="">Kommun</label>
			<input type="name" />
			</div>
			<div>
			<label htmlFor="">land</label>
			<input type="name" />
			</div>
			</form>
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            
        
            <button>Pay</button>
        </form>
        </div>
        :
       <div>
           <h2>Kortköp godkänt</h2>
       </div> 
        }
            
        </>
    )
}