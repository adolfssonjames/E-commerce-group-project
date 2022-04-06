const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const routesURLs = require ('./routes/routes');




mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'))




app.post("/checkout", cors(), async (req, res) => {
	let { price, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			price,
			currency: "US",
			description,
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
	console.log("Server is listening on port 4000")
})