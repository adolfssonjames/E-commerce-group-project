const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({

    
    product: {
        
        productName: {
        type: String,
        required: true,
        },

        price: {
            type: Number,
            required: true
        },
    
    },
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