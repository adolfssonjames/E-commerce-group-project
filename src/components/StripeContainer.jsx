import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51KiDChLi4XFEDPnYu3NTYSkRd3VD1XLJYSgtvtbett6b6WBcDLwmy5V9dkSc3sh630jVDg46eZYBIoAANVCr5UcA00tvmbE5Ry"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<div>

		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
		
		</div>
	)
}