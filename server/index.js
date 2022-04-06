const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const routesURLs = require ('./routes/routes');




mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'))




app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "SEK",
			description: "Bonny Bonsai",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Betalning genomförd!:)",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Betalnings kunde inte genomföras",
			success: false
		})
	}
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', routesURLs);
app.use('/productImages', express.static('productImages'))


app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})