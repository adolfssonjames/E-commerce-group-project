const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({

    
    product: [{}],
    totalPrice: {
        type: Number,
        required: true
    },
    currentLoggedInUser: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('orderHistory', OrderHistorySchema)